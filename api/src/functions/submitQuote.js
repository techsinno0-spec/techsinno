// ============================================================
// src/functions/submitQuote.js (v4 programming model)
// POST /api/submitQuote
//
// Flow:
//   1. Validate request body
//   2. Save quote to Cosmos DB
//   3. Send email to Frank (info@techsinno.com)
//   4. Send auto-reply to client
//   5. Return success/error response
// ============================================================

const { app } = require('@azure/functions');
const { v4: uuidv4 } = require('uuid');
const { sendQuoteNotification } = require('../../shared/emailer');
const { saveQuote } = require('../../shared/cosmosdb');
const { checkSpam, fakeSuccess } = require('../../shared/spamguard');

const VALID_SERVICES = ['repair', 'automation', 'iot', 'other'];

function sanitise(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen).replace(/[<>]/g, '');
}

function validate(body) {
  const errors = [];
  if (!body.firstName || body.firstName.length < 1)
    errors.push('First name is required.');
  if (!body.lastName || body.lastName.length < 1)
    errors.push('Last name is required.');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.push('A valid email address is required.');
  if (!VALID_SERVICES.includes(body.service))
    errors.push('Please select a valid service.');
  if (!body.message || body.message.length < 10)
    errors.push('Please provide a project description (min 10 characters).');
  return errors;
}

app.http('submitQuote', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    // ── CORS preflight ──────────────────────────────────
    if (request.method === 'OPTIONS') {
      return {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      };
    }

    // ── Parse body ──────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return { status: 400, jsonBody: { error: 'Invalid JSON body.' } };
    }

    // ── Spam protection ─────────────────────────────────
    const spam = checkSpam(body || {}, request, ['message']);
    if (spam.spam) {
      context.log(`[submitQuote] Blocked spam (${spam.reason})`);
      if (spam.fake) return fakeSuccess();
      return { status: 429, jsonBody: { success: false, errors: [spam.reason] } };
    }

    // ── Validate ────────────────────────────────────────
    const errors = validate(body || {});
    if (errors.length > 0) {
      return { status: 422, jsonBody: { success: false, errors } };
    }

    // ── Build quote object ──────────────────────────────
    const quote = {
      id: uuidv4(),
      firstName: sanitise(body.firstName, 100),
      lastName: sanitise(body.lastName, 100),
      company: sanitise(body.company, 200),
      email: sanitise(body.email, 254).toLowerCase(),
      service: body.service,
      message: sanitise(body.message, 2000),
      submittedAt: new Date().toISOString(),
      submittedFrom: request.headers.get('origin') || request.headers.get('referer') || 'unknown',
      status: 'new', // new | contacted | quoted | closed
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('client-ip') || 'unknown',
    };

    context.log(`[submitQuote] New submission — ${quote.id} — ${quote.service} — ${quote.email}`);

    // ── Save to Cosmos DB ───────────────────────────────
    let savedToDb = false;
    try {
      await saveQuote(quote);
      savedToDb = true;
      context.log(`[submitQuote] Saved to Cosmos DB — ${quote.id}`);
    } catch (dbErr) {
      context.error(`[submitQuote] Cosmos DB save failed: ${dbErr.message}`);
    }

    // ── Send emails ─────────────────────────────────────
    let emailSent = false;
    try {
      await sendQuoteNotification(quote);
      emailSent = true;
      context.log(`[submitQuote] Emails sent — to Frank + auto-reply to ${quote.email}`);
    } catch (mailErr) {
      context.error(`[submitQuote] Email send failed: ${mailErr.message}`);
    }

    // ── Return result ───────────────────────────────────
    if (!savedToDb && !emailSent) {
      return {
        status: 500,
        jsonBody: {
          success: false,
          error: 'Submission failed. Please email us directly at info@techsinno.com',
        },
      };
    }

    return {
      status: 200,
      jsonBody: {
        success: true,
        reference: quote.id,
        message: 'Your request has been received. We will be in touch within 1–2 business days.',
        savedToDb,
        emailSent,
      },
    };
  },
});

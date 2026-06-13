// ============================================================
// src/functions/submitFeedback.js (v4 programming model)
// POST /api/submitFeedback
//
// Customer feedback / review / complaint / suggestion.
//   1. Validate + spam-check
//   2. Save to Cosmos DB (feedback container)
//   3. Email notification to info@techsinno.com
//   4. Thank-you confirmation to the customer
// ============================================================

const { app } = require('@azure/functions');
const { v4: uuidv4 } = require('uuid');
const { sendFeedbackNotification } = require('../../shared/emailer');
const { saveFeedback } = require('../../shared/cosmosdb');
const { checkSpam, fakeSuccess } = require('../../shared/spamguard');

const VALID_TYPES = ['review', 'complaint', 'suggestion', 'general'];

function sanitise(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen).replace(/[<>]/g, '');
}

function validate(body) {
  const errors = [];
  if (!body.name || body.name.length < 1)
    errors.push('Your name is required.');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.push('A valid email address is required.');
  if (!body.message || body.message.length < 10)
    errors.push('Please share a little more detail (min 10 characters).');
  if (body.feedbackType && !VALID_TYPES.includes(body.feedbackType))
    errors.push('Please select a valid feedback type.');
  const r = Number(body.rating);
  if (body.rating && (!Number.isInteger(r) || r < 1 || r > 5))
    errors.push('Rating must be between 1 and 5.');
  return errors;
}

app.http('submitFeedback', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
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

    let body;
    try {
      body = await request.json();
    } catch {
      return { status: 400, jsonBody: { error: 'Invalid JSON body.' } };
    }

    // ── Spam protection ─────────────────────────────────
    const spam = checkSpam(body || {}, request, ['message']);
    if (spam.spam) {
      context.log(`[submitFeedback] Blocked spam (${spam.reason})`);
      if (spam.fake) return fakeSuccess();
      return { status: 429, jsonBody: { success: false, errors: [spam.reason] } };
    }

    const errors = validate(body || {});
    if (errors.length > 0) {
      return { status: 422, jsonBody: { success: false, errors } };
    }

    const feedback = {
      id: uuidv4(),
      feedbackType: VALID_TYPES.includes(body.feedbackType) ? body.feedbackType : 'general',
      name: sanitise(body.name, 100),
      email: sanitise(body.email, 254).toLowerCase(),
      company: sanitise(body.company, 200),
      rating: body.rating ? Number(body.rating) : null,
      message: sanitise(body.message, 3000),
      consentToPublish: body.consentToPublish === true || body.consentToPublish === 'true',
      submittedAt: new Date().toISOString(),
      submittedFrom: request.headers.get('origin') || request.headers.get('referer') || 'unknown',
      status: 'new', // new | reviewed | published | archived
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('client-ip') || 'unknown',
    };

    context.log(`[submitFeedback] New ${feedback.feedbackType} — ${feedback.id} — ${feedback.email}`);

    let savedToDb = false;
    try {
      await saveFeedback(feedback);
      savedToDb = true;
    } catch (dbErr) {
      context.error(`[submitFeedback] Cosmos save failed: ${dbErr.message}`);
    }

    let emailSent = false;
    try {
      await sendFeedbackNotification(feedback);
      emailSent = true;
    } catch (mailErr) {
      context.error(`[submitFeedback] Email failed: ${mailErr.message}`);
    }

    if (!savedToDb && !emailSent) {
      return {
        status: 500,
        jsonBody: { success: false, error: 'Could not submit. Please email info@techsinno.com directly.' },
      };
    }

    return {
      status: 200,
      jsonBody: {
        success: true,
        reference: feedback.id,
        message: 'Thank you for your feedback — we truly appreciate you taking the time.',
      },
    };
  },
});

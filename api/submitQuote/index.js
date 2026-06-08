// ============================================================
// submitQuote/index.js
// Azure Function — HTTP POST /api/submitQuote
//
// Flow:
//   1. Validate request body
//   2. Save quote to Cosmos DB
//   3. Send email to Frank (techsinno0@gmail.com)
//   4. Send auto-reply to client
//   5. Return success/error response
// ============================================================

const { v4: uuidv4 }           = require('uuid');
const { sendQuoteNotification } = require('../shared/emailer');
const { saveQuote }             = require('../shared/cosmosdb');

// ── Allowed services ─────────────────────────────────────────
const VALID_SERVICES = ['repair', 'automation', 'iot', 'other'];

// ── Input sanitiser ──────────────────────────────────────────
function sanitise(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen).replace(/[<>]/g, '');
}

// ── Validator ────────────────────────────────────────────────
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

// ── Main handler ─────────────────────────────────────────────
module.exports = async function (context, req) {
  const { log } = context;

  // ── CORS preflight ──────────────────────────────────────
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin':  req.headers.origin || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age':       '86400',
      },
    };
    return;
  }

  // ── Only allow POST ─────────────────────────────────────
  if (req.method !== 'POST') {
    context.res = { status: 405, body: { error: 'Method not allowed.' } };
    return;
  }

  // ── Parse body ──────────────────────────────────────────
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    context.res = { status: 400, body: { error: 'Invalid JSON body.' } };
    return;
  }

  // ── Validate ────────────────────────────────────────────
  const errors = validate(body || {});
  if (errors.length > 0) {
    context.res = {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, errors }),
    };
    return;
  }

  // ── Build quote object ──────────────────────────────────
  const quote = {
    id:            uuidv4(),
    firstName:     sanitise(body.firstName, 100),
    lastName:      sanitise(body.lastName,  100),
    company:       sanitise(body.company,   200),
    email:         sanitise(body.email,     254).toLowerCase(),
    service:       body.service,
    message:       sanitise(body.message,   2000),
    submittedAt:   new Date().toISOString(),
    submittedFrom: req.headers.origin || req.headers.referer || 'unknown',
    status:        'new',   // new | contacted | quoted | closed
    ipAddress:     req.headers['x-forwarded-for'] || req.headers['client-ip'] || 'unknown',
  };

  log.info(`[submitQuote] New submission — ${quote.id} — ${quote.service} — ${quote.email}`);

  // ── Save to Cosmos DB ───────────────────────────────────
  let savedToDb = false;
  try {
    await saveQuote(quote);
    savedToDb = true;
    log.info(`[submitQuote] Saved to Cosmos DB — ${quote.id}`);
  } catch (dbErr) {
    // Log error but don't block the email from sending
    log.error(`[submitQuote] Cosmos DB save failed: ${dbErr.message}`);
  }

  // ── Send emails ─────────────────────────────────────────
  let emailSent = false;
  try {
    await sendQuoteNotification(quote);
    emailSent = true;
    log.info(`[submitQuote] Emails sent — to Frank + auto-reply to ${quote.email}`);
  } catch (mailErr) {
    log.error(`[submitQuote] Email send failed: ${mailErr.message}`);
  }

  // ── Return result ────────────────────────────────────────
  if (!savedToDb && !emailSent) {
    // Both failed — return 500
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: 'Submission failed. Please email us directly at techsinno0@gmail.com',
      }),
    };
    return;
  }

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      success:   true,
      reference: quote.id,
      message:   'Your request has been received. We will be in touch within 1–2 business days.',
      savedToDb,
      emailSent,
    }),
  };
};

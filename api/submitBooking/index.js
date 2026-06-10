// ============================================================
// submitBooking/index.js
// Azure Function — HTTP POST /api/submitBooking
//
// Flow:
//   1. Validate booking request body
//   2. Save booking to Cosmos DB (bookings container)
//   3. Send email to Frank (techsinno0@gmail.com)
//   4. Send confirmation to client
//   5. Return success/error response
// ============================================================

const { v4: uuidv4 }            = require('uuid');
const { sendBookingNotification } = require('../shared/emailer');
const { saveBooking }            = require('../shared/cosmosdb');

// ── Allowed booking types ────────────────────────────────────
const VALID_TYPES = ['meeting', 'call', 'sitevisit'];

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
  if (!body.date)
    errors.push('A booking date is required.');
  if (!body.time)
    errors.push('A booking time is required.');
  if (body.bookingType && !VALID_TYPES.includes(body.bookingType))
    errors.push('Please select a valid booking type.');

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

  // ── Build booking object ────────────────────────────────
  const booking = {
    id:            uuidv4(),
    bookingType:   VALID_TYPES.includes(body.bookingType) ? body.bookingType : 'meeting',
    firstName:     sanitise(body.firstName, 100),
    lastName:      sanitise(body.lastName,  100),
    email:         sanitise(body.email,     254).toLowerCase(),
    phone:         sanitise(body.phone,     50),
    date:          sanitise(body.date,      20),
    time:          sanitise(body.time,      20),
    address:       sanitise(body.address,   300),
    notes:         sanitise(body.notes,     2000),
    submittedAt:   new Date().toISOString(),
    submittedFrom: req.headers.origin || req.headers.referer || 'unknown',
    status:        'requested',   // requested | confirmed | completed | cancelled
    ipAddress:     req.headers['x-forwarded-for'] || req.headers['client-ip'] || 'unknown',
  };

  log.info(`[submitBooking] New booking — ${booking.id} — ${booking.bookingType} — ${booking.email}`);

  // ── Save to Cosmos DB ───────────────────────────────────
  let savedToDb = false;
  try {
    await saveBooking(booking);
    savedToDb = true;
    log.info(`[submitBooking] Saved to Cosmos DB — ${booking.id}`);
  } catch (dbErr) {
    log.error(`[submitBooking] Cosmos DB save failed: ${dbErr.message}`);
  }

  // ── Send emails ─────────────────────────────────────────
  let emailSent = false;
  try {
    await sendBookingNotification(booking);
    emailSent = true;
    log.info(`[submitBooking] Emails sent — to Frank + confirmation to ${booking.email}`);
  } catch (mailErr) {
    log.error(`[submitBooking] Email send failed: ${mailErr.message}`);
  }

  // ── Return result ────────────────────────────────────────
  if (!savedToDb && !emailSent) {
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: 'Booking failed. Please email us directly at techsinno0@gmail.com',
      }),
    };
    return;
  }

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      success:   true,
      reference: booking.id,
      message:   'Your booking request has been received. We will confirm by email within 1 business day.',
      savedToDb,
      emailSent,
    }),
  };
};

// ============================================================
// submitBooking/index.js
// Azure Function — HTTP POST /api/submitBooking
//
// Mirrors submitQuote: origin/honeypot guard, validation, save to
// Cosmos DB, email Frank + auto-reply to client.
// (This endpoint was referenced by js/booking.js but never existed,
//  so every booking previously failed silently.)
// ============================================================

const { v4: uuidv4 }              = require('uuid');
const { sendBookingNotification } = require('../shared/emailer');
const { saveBooking }             = require('../shared/cosmosdb');
const { isAllowedOrigin, isHoneypotTripped } = require('../shared/security');

const VALID_TYPES = ['meeting', 'consultation', 'sitevisit'];

function sanitise(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen);
}

function validate(body) {
  const errors = [];
  if (!VALID_TYPES.includes(body.bookingType))
    errors.push('Please select a valid booking type.');
  if (!body.firstName || String(body.firstName).trim().length < 1)
    errors.push('First name is required.');
  if (!body.lastName || String(body.lastName).trim().length < 1)
    errors.push('Last name is required.');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.push('A valid email address is required.');
  if (!body.date || !/^\d{4}-\d{2}-\d{2}$/.test(body.date))
    errors.push('A valid date is required.');
  if (!body.time || String(body.time).trim().length < 1)
    errors.push('A preferred time is required.');
  return errors;
}

module.exports = async function (context, req) {
  const { log } = context;

  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    context.res = {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin':  isAllowedOrigin(req) && origin ? origin : 'https://techsinno.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age':       '86400',
        'Vary': 'Origin',
      },
    };
    return;
  }

  if (req.method !== 'POST') {
    context.res = { status: 405, body: { error: 'Method not allowed.' } };
    return;
  }

  if (!isAllowedOrigin(req)) {
    log.warn(`[submitBooking] Rejected origin: ${req.headers.origin}`);
    context.res = {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Origin not allowed.' }),
    };
    return;
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    context.res = { status: 400, body: { error: 'Invalid JSON body.' } };
    return;
  }
  body = body || {};

  if (isHoneypotTripped(body)) {
    log.warn('[submitBooking] Honeypot tripped — dropping submission.');
    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, reference: uuidv4() }),
    };
    return;
  }

  const errors = validate(body);
  if (errors.length > 0) {
    context.res = {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, errors }),
    };
    return;
  }

  const booking = {
    id:            uuidv4(),
    bookingType:   body.bookingType,
    firstName:     sanitise(body.firstName, 100),
    lastName:      sanitise(body.lastName,  100),
    email:         sanitise(body.email,     254).toLowerCase(),
    phone:         sanitise(body.phone,     40),
    date:          sanitise(body.date,      10),
    time:          sanitise(body.time,      10),
    address:       sanitise(body.address,   300),
    notes:         sanitise(body.notes,     2000),
    submittedAt:   new Date().toISOString(),
    submittedFrom: req.headers.origin || req.headers.referer || 'unknown',
    status:        'requested',
    ipAddress:     req.headers['x-forwarded-for'] || req.headers['client-ip'] || 'unknown',
  };

  log.info(`[submitBooking] New booking — ${booking.id} — ${booking.bookingType} — ${booking.date} ${booking.time}`);

  let savedToDb = false;
  try {
    await saveBooking(booking);
    savedToDb = true;
  } catch (dbErr) {
    log.error(`[submitBooking] Cosmos DB save failed: ${dbErr.message}`);
  }

  let emailSent = false;
  try {
    await sendBookingNotification(booking);
    emailSent = true;
  } catch (mailErr) {
    log.error(`[submitBooking] Email send failed: ${mailErr.message}`);
  }

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

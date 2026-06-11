// ============================================================
// src/functions/submitBooking.js (v4 programming model)
// POST /api/submitBooking
//
// Flow:
//   1. Validate booking request body
//   2. Save booking to Cosmos DB (bookings container)
//   3. Send email to Frank (techsinno0@gmail.com)
//   4. Send confirmation to client
//   5. Return success/error response
// ============================================================

const { app } = require('@azure/functions');
const { v4: uuidv4 } = require('uuid');
const { sendBookingNotification } = require('../../shared/emailer');
const { saveBooking } = require('../../shared/cosmosdb');

const VALID_TYPES = ['meeting', 'call', 'sitevisit'];

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
  if (!body.date)
    errors.push('A booking date is required.');
  if (!body.time)
    errors.push('A booking time is required.');
  if (body.bookingType && !VALID_TYPES.includes(body.bookingType))
    errors.push('Please select a valid booking type.');
  return errors;
}

app.http('submitBooking', {
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

    // ── Validate ────────────────────────────────────────
    const errors = validate(body || {});
    if (errors.length > 0) {
      return { status: 422, jsonBody: { success: false, errors } };
    }

    // ── Build booking object ────────────────────────────
    const booking = {
      id: uuidv4(),
      bookingType: VALID_TYPES.includes(body.bookingType) ? body.bookingType : 'meeting',
      firstName: sanitise(body.firstName, 100),
      lastName: sanitise(body.lastName, 100),
      email: sanitise(body.email, 254).toLowerCase(),
      phone: sanitise(body.phone, 50),
      date: sanitise(body.date, 20),
      time: sanitise(body.time, 20),
      address: sanitise(body.address, 300),
      notes: sanitise(body.notes, 2000),
      submittedAt: new Date().toISOString(),
      submittedFrom: request.headers.get('origin') || request.headers.get('referer') || 'unknown',
      status: 'requested', // requested | confirmed | completed | cancelled
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('client-ip') || 'unknown',
    };

    context.log(`[submitBooking] New booking — ${booking.id} — ${booking.bookingType} — ${booking.email}`);

    // ── Save to Cosmos DB ───────────────────────────────
    let savedToDb = false;
    try {
      await saveBooking(booking);
      savedToDb = true;
      context.log(`[submitBooking] Saved to Cosmos DB — ${booking.id}`);
    } catch (dbErr) {
      context.error(`[submitBooking] Cosmos DB save failed: ${dbErr.message}`);
    }

    // ── Send emails ─────────────────────────────────────
    let emailSent = false;
    try {
      await sendBookingNotification(booking);
      emailSent = true;
      context.log(`[submitBooking] Emails sent — to Frank + confirmation to ${booking.email}`);
    } catch (mailErr) {
      context.error(`[submitBooking] Email send failed: ${mailErr.message}`);
    }

    // ── Return result ───────────────────────────────────
    if (!savedToDb && !emailSent) {
      return {
        status: 500,
        jsonBody: {
          success: false,
          error: 'Booking failed. Please email us directly at techsinno0@gmail.com',
        },
      };
    }

    return {
      status: 200,
      jsonBody: {
        success: true,
        reference: booking.id,
        message: 'Your booking request has been received. We will confirm by email within 1 business day.',
        savedToDb,
        emailSent,
      },
    };
  },
});

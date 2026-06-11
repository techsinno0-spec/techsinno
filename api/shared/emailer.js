// ============================================================
// shared/emailer.js
// Sends email via Gmail SMTP using nodemailer
// Uses App Password (not your real Gmail password)
// ============================================================

const nodemailer = require('nodemailer');

/**
 * Creates a Gmail SMTP transporter using environment variables.
 * GMAIL_USER     = info@techsinno.com
 * GMAIL_APP_PASS = 16-character App Password from Google Account
 */
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
}

// ── Mail routing (override via Azure environment variables) ──
const MAIL_TO_QUOTES   = process.env.MAIL_TO_QUOTES   || 'sales@techsinno.com';
const MAIL_TO_BOOKINGS = process.env.MAIL_TO_BOOKINGS || 'frank@techsinno.com';
const MAIL_REPLY_TO    = process.env.MAIL_REPLY_TO    || 'info@techsinno.com';

// ── Security: HTML-escape user-supplied values before they are
//    interpolated into HTML email templates (prevents HTML/script
//    injection via form fields).
function escapeHtml(v) {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function escapeFields(obj) {
  const out = { ...obj };
  for (const k of Object.keys(out)) {
    if (typeof out[k] === 'string') out[k] = escapeHtml(out[k]);
  }
  return out;
}

/**
 * Sends a quote notification email to Frank.
 * @param {Object} quote - The parsed quote submission
 */
async function sendQuoteNotification(quote) {
  quote = escapeFields(quote);   // security: neutralise HTML in user input
  const transporter = createTransporter();

  const serviceLabels = {
    repair:     'B2B Electronics Repair',
    automation: 'Industrial Automation',
    iot:        'Agricultural IoT',
    other:      'Other / Consultation',
  };

  const serviceLabel = serviceLabels[quote.service] || quote.service;
  const submittedAt  = new Date(quote.submittedAt).toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // ── Notification email to Frank ──────────────────────────
  const toFrank = {
    from:    `"TECHSINNO Website" <${process.env.GMAIL_USER}>`,
    replyTo: MAIL_REPLY_TO,
    to:      MAIL_TO_QUOTES,
    subject: `[TECHSINNO] New Quote Request — ${serviceLabel} — ${quote.company || quote.firstName}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: 'Courier New', monospace; background: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
    .wrap { max-width: 600px; margin: 0 auto; background: #111; border-top: 4px solid #00FF41; }
    .header { background: #000; padding: 24px 32px; border-bottom: 1px solid #222; }
    .header h1 { color: #00FF41; font-size: 22px; margin: 0; letter-spacing: 4px; }
    .header p { color: #888; font-size: 11px; margin: 6px 0 0; letter-spacing: 2px; }
    .body { padding: 32px; }
    .alert-box { background: #001a00; border: 1px solid #00FF41; padding: 16px 20px; margin-bottom: 24px; }
    .alert-box p { color: #00FF41; font-size: 13px; margin: 0; letter-spacing: 1px; }
    .field { margin-bottom: 16px; border-bottom: 1px solid #1a1a1a; padding-bottom: 16px; }
    .field:last-child { border-bottom: none; }
    .field-label { font-size: 10px; color: #555; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4px; }
    .field-value { font-size: 14px; color: #fff; line-height: 1.5; }
    .field-value.accent { color: #00FF41; font-size: 16px; }
    .message-box { background: #0a0a0a; border-left: 3px solid #00FF41; padding: 16px; margin-top: 8px; }
    .message-box p { color: #ccc; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; }
    .footer { background: #000; padding: 16px 32px; border-top: 1px solid #222; }
    .footer p { color: #444; font-size: 10px; letter-spacing: 1px; margin: 0; line-height: 1.8; }
    .id-badge { display: inline-block; background: #0a0a0a; border: 1px solid #222; padding: 4px 12px; font-size: 11px; color: #555; letter-spacing: 2px; margin-top: 16px; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>// TECHSINNO</h1>
    <p>NEW QUOTE REQUEST — ACTION REQUIRED</p>
  </div>
  <div class="body">
    <div class="alert-box">
      <p>▶ NEW SUBMISSION RECEIVED — ${submittedAt}</p>
    </div>

    <div class="field">
      <div class="field-label">Service Requested</div>
      <div class="field-value accent">${serviceLabel}</div>
    </div>

    <div class="field">
      <div class="field-label">Full Name</div>
      <div class="field-value">${quote.firstName} ${quote.lastName}</div>
    </div>

    ${quote.company ? `
    <div class="field">
      <div class="field-label">Company</div>
      <div class="field-value">${quote.company}</div>
    </div>` : ''}

    <div class="field">
      <div class="field-label">Email Address</div>
      <div class="field-value"><a href="mailto:${quote.email}" style="color:#00FF41;">${quote.email}</a></div>
    </div>

    <div class="field">
      <div class="field-label">Message</div>
      <div class="message-box"><p>${quote.message}</p></div>
    </div>

    <div class="field">
      <div class="field-label">Submitted From</div>
      <div class="field-value">${quote.submittedFrom || 'techsinno.com'}</div>
    </div>

    <div class="id-badge">REF: ${quote.id}</div>
  </div>
  <div class="footer">
    <p>TECHSINNO (Pty) Ltd · Reg: 2022/364165/07 · info@techsinno.com</p>
    <p>This email was generated automatically by the TECHSINNO website contact form.</p>
  </div>
</div>
</body>
</html>
    `,
  };

  // ── Auto-reply to the client ─────────────────────────────
  const toClient = {
    from:    `"TECHSINNO Engineering" <${process.env.GMAIL_USER}>`,
    replyTo: MAIL_REPLY_TO,
    to:      quote.email,
    subject: `We received your request — TECHSINNO`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; color: #333; margin: 0; padding: 0; }
    .wrap { max-width: 600px; margin: 0 auto; background: #ffffff; border-top: 4px solid #00cc33; }
    .header { background: #0a0a0a; padding: 24px 32px; }
    .header h1 { color: #00FF41; font-family: 'Courier New', monospace; font-size: 20px; margin: 0; letter-spacing: 3px; }
    .header p { color: #888; font-size: 12px; margin: 6px 0 0; font-family: monospace; }
    .body { padding: 32px; }
    .body h2 { font-size: 20px; color: #111; margin-bottom: 8px; }
    .body p { font-size: 14px; color: #555; line-height: 1.7; margin-bottom: 16px; }
    .summary { background: #f9f9f9; border-left: 4px solid #00cc33; padding: 16px 20px; margin: 24px 0; }
    .summary p { margin: 4px 0; font-size: 13px; color: #333; }
    .summary strong { color: #111; }
    .cta { display: inline-block; background: #0a0a0a; color: #00FF41; font-family: monospace; font-size: 13px; padding: 12px 28px; text-decoration: none; letter-spacing: 2px; margin-top: 8px; }
    .footer { background: #f0f0f0; padding: 16px 32px; border-top: 1px solid #ddd; }
    .footer p { font-size: 11px; color: #999; margin: 0; line-height: 1.8; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>// TECHSINNO</h1>
    <p>WHERE ELECTRONICS, AUTOMATION &amp; MECHATRONICS MEET SMART, INNOVATIVE ENGINEERING</p>
  </div>
  <div class="body">
    <h2>Thank you, ${quote.firstName}.</h2>
    <p>We have received your quote request and will get back to you within <strong>1–2 business days</strong>. As our site visits and technical work happen on weekends, we may follow up sooner via email to clarify your requirements.</p>

    <div class="summary">
      <p><strong>Reference:</strong> ${quote.id}</p>
      <p><strong>Service:</strong> ${serviceLabel}</p>
      ${quote.company ? `<p><strong>Company:</strong> ${quote.company}</p>` : ''}
      <p><strong>Submitted:</strong> ${submittedAt}</p>
    </div>

    <p>In the meantime, feel free to reply to this email with any additional details about your project. The more context you provide, the faster we can prepare an accurate quote.</p>
    <p>We look forward to working with you.</p>
    <a href="https://techsinno.com" class="cta">Visit techsinno.com →</a>
  </div>
  <div class="footer">
    <p>TECHSINNO (Pty) Ltd · Registered in South Africa · Reg: 2022/364165/07</p>
    <p>Kuilsriver, Western Cape, South Africa · info@techsinno.com</p>
    <p>This is an automated confirmation. Please do not reply to this if you did not submit a form.</p>
  </div>
</div>
</body>
</html>
    `,
  };

  // Send both
  await transporter.sendMail(toFrank);
  await transporter.sendMail(toClient);
}

/**
 * Sends a booking notification email to Frank + confirmation to the client.
 * @param {Object} booking - The parsed booking submission
 */
async function sendBookingNotification(booking) {
  booking = escapeFields(booking);   // security: neutralise HTML in user input
  const transporter = createTransporter();

  const typeLabels = {
    meeting:  'In-Person Meeting',
    call:     'Phone / Video Call',
    sitevisit:'On-Site Visit',
  };

  const typeLabel   = typeLabels[booking.bookingType] || booking.bookingType;
  const submittedAt = new Date(booking.submittedAt).toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // ── Notification email to Frank ──────────────────────────
  const toFrank = {
    from:    `"TECHSINNO Website" <${process.env.GMAIL_USER}>`,
    replyTo: MAIL_REPLY_TO,
    to:      MAIL_TO_BOOKINGS,
    subject: `[TECHSINNO] New Booking — ${typeLabel} — ${booking.date} ${booking.time}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/>
  <style>
    body { font-family: 'Courier New', monospace; background: #0a0a0a; color: #fff; margin: 0; padding: 0; }
    .wrap { max-width: 600px; margin: 0 auto; background: #111; border-top: 4px solid #00FF41; }
    .header { background: #000; padding: 24px 32px; border-bottom: 1px solid #222; }
    .header h1 { color: #00FF41; font-size: 22px; margin: 0; letter-spacing: 4px; }
    .header p { color: #888; font-size: 11px; margin: 6px 0 0; letter-spacing: 2px; }
    .body { padding: 32px; }
    .alert-box { background: #001a00; border: 1px solid #00FF41; padding: 16px 20px; margin-bottom: 24px; }
    .alert-box p { color: #00FF41; font-size: 13px; margin: 0; letter-spacing: 1px; }
    .field { margin-bottom: 16px; border-bottom: 1px solid #1a1a1a; padding-bottom: 16px; }
    .field:last-child { border-bottom: none; }
    .field-label { font-size: 10px; color: #555; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4px; }
    .field-value { font-size: 14px; color: #fff; line-height: 1.5; }
    .field-value.accent { color: #00FF41; font-size: 16px; }
    .message-box { background: #0a0a0a; border-left: 3px solid #00FF41; padding: 16px; margin-top: 8px; }
    .message-box p { color: #ccc; font-size: 13px; line-height: 1.7; margin: 0; white-space: pre-wrap; }
    .footer { background: #000; padding: 16px 32px; border-top: 1px solid #222; }
    .footer p { color: #444; font-size: 10px; letter-spacing: 1px; margin: 0; line-height: 1.8; }
    .id-badge { display: inline-block; background: #0a0a0a; border: 1px solid #222; padding: 4px 12px; font-size: 11px; color: #555; letter-spacing: 2px; margin-top: 16px; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>// TECHSINNO</h1>
    <p>NEW BOOKING REQUEST — ACTION REQUIRED</p>
  </div>
  <div class="body">
    <div class="alert-box">
      <p>&#9654; NEW BOOKING RECEIVED — ${submittedAt}</p>
    </div>

    <div class="field">
      <div class="field-label">Booking Type</div>
      <div class="field-value accent">${typeLabel}</div>
    </div>

    <div class="field">
      <div class="field-label">Requested Date &amp; Time</div>
      <div class="field-value accent">${booking.date} at ${booking.time}</div>
    </div>

    <div class="field">
      <div class="field-label">Full Name</div>
      <div class="field-value">${booking.firstName} ${booking.lastName}</div>
    </div>

    <div class="field">
      <div class="field-label">Email Address</div>
      <div class="field-value"><a href="mailto:${booking.email}" style="color:#00FF41;">${booking.email}</a></div>
    </div>

    ${booking.phone ? `
    <div class="field">
      <div class="field-label">Phone</div>
      <div class="field-value">${booking.phone}</div>
    </div>` : ''}

    ${booking.address ? `
    <div class="field">
      <div class="field-label">Site Address</div>
      <div class="field-value">${booking.address}</div>
    </div>` : ''}

    ${booking.notes ? `
    <div class="field">
      <div class="field-label">Notes</div>
      <div class="message-box"><p>${booking.notes}</p></div>
    </div>` : ''}

    <div class="id-badge">REF: ${booking.id}</div>
  </div>
  <div class="footer">
    <p>TECHSINNO (Pty) Ltd &middot; Reg: 2022/364165/07 &middot; info@techsinno.com</p>
    <p>This email was generated automatically by the TECHSINNO website booking form.</p>
  </div>
</div>
</body>
</html>
    `,
  };

  // ── Confirmation to the client ───────────────────────────
  const toClient = {
    from:    `"TECHSINNO Engineering" <${process.env.GMAIL_USER}>`,
    replyTo: MAIL_REPLY_TO,
    to:      booking.email,
    subject: `Booking received — TECHSINNO`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; color: #333; margin: 0; padding: 0; }
    .wrap { max-width: 600px; margin: 0 auto; background: #fff; border-top: 4px solid #00cc33; }
    .header { background: #0a0a0a; padding: 24px 32px; }
    .header h1 { color: #00FF41; font-family: 'Courier New', monospace; font-size: 20px; margin: 0; letter-spacing: 3px; }
    .header p { color: #888; font-size: 12px; margin: 6px 0 0; font-family: monospace; }
    .body { padding: 32px; }
    .body h2 { font-size: 20px; color: #111; margin-bottom: 8px; }
    .body p { font-size: 14px; color: #555; line-height: 1.7; margin-bottom: 16px; }
    .summary { background: #f9f9f9; border-left: 4px solid #00cc33; padding: 16px 20px; margin: 24px 0; }
    .summary p { margin: 4px 0; font-size: 13px; color: #333; }
    .summary strong { color: #111; }
    .footer { background: #f0f0f0; padding: 16px 32px; border-top: 1px solid #ddd; }
    .footer p { font-size: 11px; color: #999; margin: 0; line-height: 1.8; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>// TECHSINNO</h1>
    <p>WHERE ELECTRONICS, AUTOMATION &amp; MECHATRONICS MEET SMART, INNOVATIVE ENGINEERING</p>
  </div>
  <div class="body">
    <h2>Thank you, ${booking.firstName}.</h2>
    <p>We have received your booking request and will confirm it by email within <strong>1 business day</strong>. As our site visits and technical work happen on weekends, we may follow up to confirm the exact slot.</p>

    <div class="summary">
      <p><strong>Reference:</strong> ${booking.id}</p>
      <p><strong>Type:</strong> ${typeLabel}</p>
      <p><strong>Requested:</strong> ${booking.date} at ${booking.time}</p>
      ${booking.address ? `<p><strong>Address:</strong> ${booking.address}</p>` : ''}
    </div>

    <p>If you need to change anything, simply reply to this email.</p>
    <p>We look forward to working with you.</p>
  </div>
  <div class="footer">
    <p>TECHSINNO (Pty) Ltd &middot; Registered in South Africa &middot; Reg: 2022/364165/07</p>
    <p>Kuilsriver, Western Cape, South Africa &middot; info@techsinno.com</p>
    <p>This is an automated confirmation. Please ignore if you did not submit a booking.</p>
  </div>
</div>
</body>
</html>
    `,
  };

  await transporter.sendMail(toFrank);
  await transporter.sendMail(toClient);
}

module.exports = { sendQuoteNotification, sendBookingNotification };

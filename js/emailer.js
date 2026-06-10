// ============================================================
// shared/emailer.js
// Sends email via Gmail SMTP using nodemailer (App Password).
// All user-supplied values are HTML-escaped before being placed
// into email templates (see esc()).
// ============================================================

const nodemailer = require('nodemailer');

// ── HTML escaping ────────────────────────────────────────────
// Prevents HTML/style injection in the rendered emails. Replaces the
// previous crude "<>" stripping, which also mangled legitimate text
// such as "voltage < 5V".
function esc(value) {
  if (value === undefined || value === null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Shared service labels (single source of truth) ───────────
const SERVICE_LABELS = {
  electronics: 'Electronics Engineering',
  pcb:         'PCB Design & Engineering',
  automation:  'Industrial Automation',
  iot:         'Agricultural IoT',
  other:       'Other / Consultation',
  repair:      'B2B Electronics Repair', // legacy value, kept for back-compat
};

const BOOKING_LABELS = {
  meeting:      'Virtual Meeting',
  consultation: 'Consultation',
  sitevisit:    'Site Visit / Call-out',
};

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
}

function zaTime(iso) {
  return new Date(iso).toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    dateStyle: 'full',
    timeStyle: 'short',
  });
}

// ============================================================
// QUOTE NOTIFICATION
// ============================================================
async function sendQuoteNotification(quote) {
  const transporter = createTransporter();

  const serviceLabel = esc(SERVICE_LABELS[quote.service] || quote.service);
  const submittedAt  = zaTime(quote.submittedAt);

  const fn   = esc(quote.firstName);
  const ln   = esc(quote.lastName);
  const co   = esc(quote.company);
  const em   = esc(quote.email);
  const msg  = esc(quote.message);
  const from = esc(quote.submittedFrom || 'techsinno.com');
  const ref  = esc(quote.id);

  const toFrank = {
    from:    `"TECHSINNO Website" <${process.env.GMAIL_USER}>`,
    to:      process.env.GMAIL_USER,
    replyTo: quote.email,
    subject: `[TECHSINNO] New Quote Request — ${SERVICE_LABELS[quote.service] || quote.service} — ${quote.company || quote.firstName}`,
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
      <p>&#9654; NEW SUBMISSION RECEIVED — ${submittedAt}</p>
    </div>
    <div class="field">
      <div class="field-label">Service Requested</div>
      <div class="field-value accent">${serviceLabel}</div>
    </div>
    <div class="field">
      <div class="field-label">Full Name</div>
      <div class="field-value">${fn} ${ln}</div>
    </div>
    ${co ? `
    <div class="field">
      <div class="field-label">Company</div>
      <div class="field-value">${co}</div>
    </div>` : ''}
    <div class="field">
      <div class="field-label">Email Address</div>
      <div class="field-value"><a href="mailto:${em}" style="color:#00FF41;">${em}</a></div>
    </div>
    <div class="field">
      <div class="field-label">Message</div>
      <div class="message-box"><p>${msg}</p></div>
    </div>
    <div class="field">
      <div class="field-label">Submitted From</div>
      <div class="field-value">${from}</div>
    </div>
    <div class="id-badge">REF: ${ref}</div>
  </div>
  <div class="footer">
    <p>TECHSINNO (Pty) Ltd · Reg: 2022/364165/07 · techsinno0@gmail.com</p>
    <p>This email was generated automatically by the TECHSINNO website contact form.</p>
  </div>
</div>
</body>
</html>`,
  };

  const toClient = {
    from:    `"TECHSINNO Engineering" <${process.env.GMAIL_USER}>`,
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
    <h2>Thank you, ${fn}.</h2>
    <p>We have received your quote request and will get back to you within <strong>1–2 business days</strong>. As our site visits and technical work happen on weekends, we may follow up sooner via email to clarify your requirements.</p>
    <div class="summary">
      <p><strong>Reference:</strong> ${ref}</p>
      <p><strong>Service:</strong> ${serviceLabel}</p>
      ${co ? `<p><strong>Company:</strong> ${co}</p>` : ''}
      <p><strong>Submitted:</strong> ${submittedAt}</p>
    </div>
    <p>In the meantime, feel free to reply to this email with any additional details about your project. The more context you provide, the faster we can prepare an accurate quote.</p>
    <p>We look forward to working with you.</p>
    <a href="https://techsinno.com" class="cta">Visit techsinno.com →</a>
  </div>
  <div class="footer">
    <p>TECHSINNO (Pty) Ltd · Registered in South Africa · Reg: 2022/364165/07</p>
    <p>Kuilsriver, Western Cape, South Africa · techsinno0@gmail.com</p>
    <p>This is an automated confirmation. Please do not reply to this if you did not submit a form.</p>
  </div>
</div>
</body>
</html>`,
  };

  await transporter.sendMail(toFrank);
  await transporter.sendMail(toClient);
}

// ============================================================
// BOOKING NOTIFICATION
// ============================================================
async function sendBookingNotification(booking) {
  const transporter = createTransporter();

  const typeLabel   = esc(BOOKING_LABELS[booking.bookingType] || booking.bookingType);
  const submittedAt = zaTime(booking.submittedAt);

  const fn    = esc(booking.firstName);
  const ln    = esc(booking.lastName);
  const em    = esc(booking.email);
  const phone = esc(booking.phone);
  const date  = esc(booking.date);
  const time  = esc(booking.time);
  const addr  = esc(booking.address);
  const notes = esc(booking.notes);
  const ref   = esc(booking.id);

  const toFrank = {
    from:    `"TECHSINNO Website" <${process.env.GMAIL_USER}>`,
    to:      process.env.GMAIL_USER,
    replyTo: booking.email,
    subject: `[TECHSINNO] New Booking — ${BOOKING_LABELS[booking.bookingType] || booking.bookingType} — ${booking.date} ${booking.time}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
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
    .field-label { font-size: 10px; color: #555; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4px; }
    .field-value { font-size: 14px; color: #fff; line-height: 1.5; }
    .field-value.accent { color: #00FF41; font-size: 16px; }
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
    <div class="alert-box"><p>&#9654; NEW BOOKING RECEIVED — ${submittedAt}</p></div>
    <div class="field"><div class="field-label">Booking Type</div><div class="field-value accent">${typeLabel}</div></div>
    <div class="field"><div class="field-label">Full Name</div><div class="field-value">${fn} ${ln}</div></div>
    <div class="field"><div class="field-label">Email</div><div class="field-value"><a href="mailto:${em}" style="color:#00FF41;">${em}</a></div></div>
    ${phone ? `<div class="field"><div class="field-label">Phone</div><div class="field-value">${phone}</div></div>` : ''}
    <div class="field"><div class="field-label">Requested Slot</div><div class="field-value accent">${date} @ ${time}</div></div>
    ${addr ? `<div class="field"><div class="field-label">Site Address</div><div class="field-value">${addr}</div></div>` : ''}
    ${notes ? `<div class="field"><div class="field-label">Notes</div><div class="field-value" style="white-space:pre-wrap;">${notes}</div></div>` : ''}
    <div class="id-badge">REF: ${ref}</div>
  </div>
  <div class="footer">
    <p>TECHSINNO (Pty) Ltd · Reg: 2022/364165/07 · techsinno0@gmail.com</p>
    <p>This email was generated automatically by the TECHSINNO website booking form.</p>
  </div>
</div>
</body>
</html>`,
  };

  const toClient = {
    from:    `"TECHSINNO Engineering" <${process.env.GMAIL_USER}>`,
    to:      booking.email,
    subject: `Booking request received — TECHSINNO`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; color: #333; margin: 0; padding: 0; }
    .wrap { max-width: 600px; margin: 0 auto; background: #fff; border-top: 4px solid #00cc33; }
    .header { background: #0a0a0a; padding: 24px 32px; }
    .header h1 { color: #00FF41; font-family: 'Courier New', monospace; font-size: 20px; margin: 0; letter-spacing: 3px; }
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
  <div class="header"><h1>// TECHSINNO</h1></div>
  <div class="body">
    <h2>Thank you, ${fn}.</h2>
    <p>We have received your booking request and will confirm by email within <strong>1 business day</strong>. The slot below is a request and is not confirmed until you receive our confirmation.</p>
    <div class="summary">
      <p><strong>Reference:</strong> ${ref}</p>
      <p><strong>Type:</strong> ${typeLabel}</p>
      <p><strong>Requested slot:</strong> ${date} @ ${time}</p>
    </div>
    <p>If you need to change anything, just reply to this email.</p>
  </div>
  <div class="footer">
    <p>TECHSINNO (Pty) Ltd · Registered in South Africa · Reg: 2022/364165/07</p>
    <p>Kuilsriver, Western Cape, South Africa · techsinno0@gmail.com</p>
  </div>
</div>
</body>
</html>`,
  };

  await transporter.sendMail(toFrank);
  await transporter.sendMail(toClient);
}

module.exports = { sendQuoteNotification, sendBookingNotification, SERVICE_LABELS, BOOKING_LABELS };

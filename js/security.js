// ============================================================
// shared/security.js
// Lightweight abuse guards for the public, anonymous endpoints:
//   - Origin allow-list (blocks cross-site use of the form API)
//   - Honeypot check (silently drops obvious bot submissions)
// These are not a substitute for a CAPTCHA/Turnstile, but they
// raise the bar against casual abuse and the open-relay risk of
// an unauthenticated email-sending endpoint.
// ============================================================

// Same-origin browser POSTs often omit the Origin header, so a
// MISSING origin is allowed. An origin that is PRESENT must match.
const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?$/i,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/i,
  /^https:\/\/([a-z0-9-]+\.)*azurestaticapps\.net$/i,
  /^https:\/\/(www\.)?techsinno\.com$/i,
];

function isAllowedOrigin(req) {
  const origin = req.headers && (req.headers.origin || req.headers.Origin);
  if (!origin) return true; // same-origin request, no Origin header
  return ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin));
}

// Honeypot field name must match the hidden input in the forms.
function isHoneypotTripped(body) {
  if (!body) return false;
  const hp = body.company_website;
  return typeof hp === 'string' && hp.trim().length > 0;
}

module.exports = { isAllowedOrigin, isHoneypotTripped };

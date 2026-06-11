// ============================================================
// shared/spamguard.js
// Lightweight spam protection for form endpoints.
//   1. Honeypot  — hidden "website" field; humans never fill it
//   2. Time-trap — submissions faster than MIN_FILL_MS are bots
//   3. Link flood — too many URLs in free text = spam
//   4. Rate limit — max submissions per IP per window (per instance)
// No external services or keys required.
// ============================================================

const MIN_FILL_MS   = 3000;        // forms filled in <3s are bots
const MAX_LINKS     = 3;           // max URLs allowed in message text
const RATE_WINDOW   = 10 * 60e3;   // 10 minutes
const RATE_MAX_HITS = 5;           // max submissions per IP per window

const _hits = new Map(); // ip -> [timestamps]  (per warm instance)

/**
 * Inspect a parsed form body + request for spam signals.
 * Returns { spam: boolean, fake: boolean, reason?: string }
 *   fake=true  -> respond with FAKE SUCCESS (don't tip off the bot)
 *   fake=false -> respond with a normal 422/429 error
 */
function checkSpam(body, request, freeTextFields = []) {
  // 1. Honeypot — bots autofill every field
  if (body.website) {
    return { spam: true, fake: true, reason: 'honeypot' };
  }

  // 2. Time-trap — ts is set by JS when the page loads
  if (body.ts) {
    const elapsed = Date.now() - Number(body.ts);
    if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_MS) {
      return { spam: true, fake: true, reason: 'too-fast' };
    }
  }

  // 3. Link flood in free-text fields
  for (const field of freeTextFields) {
    const text = String(body[field] || '');
    const links = (text.match(/https?:\/\//gi) || []).length;
    if (links > MAX_LINKS) {
      return { spam: true, fake: false, reason: 'Too many links in message. Please remove URLs and try again.' };
    }
  }

  // 4. Per-IP rate limit (best-effort, per warm instance)
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const stamps = (_hits.get(ip) || []).filter(t => now - t < RATE_WINDOW);
  if (stamps.length >= RATE_MAX_HITS) {
    return { spam: true, fake: false, reason: 'Too many submissions. Please wait a few minutes and try again.' };
  }
  stamps.push(now);
  _hits.set(ip, stamps);
  if (_hits.size > 5000) _hits.clear(); // memory guard

  return { spam: false, fake: false };
}

/** Fake success payload — looks identical to a real one, bots move on. */
function fakeSuccess() {
  return {
    status: 200,
    jsonBody: {
      success: true,
      reference: '00000000-0000-0000-0000-000000000000',
      message: 'Your request has been received.',
    },
  };
}

module.exports = { checkSpam, fakeSuccess };

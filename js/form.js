// ============================================================
// js/form.js
// Handles the quote form submission to Azure Functions API
// ============================================================

// ── API endpoint ─────────────────────────────────────────────
// During local dev:  http://localhost:7071/api/submitQuote
// On Azure:          /api/submitQuote  (same domain, no CORS issue)
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:7071/api/submitQuote'
  : '/api/submitQuote';

// ── UI helpers ───────────────────────────────────────────────
function setFormState(form, state) {
  const btn     = form.querySelector('.form-submit-btn');
  const spinner = form.querySelector('.form-spinner');
  const msgBox  = form.querySelector('.form-message');

  if (state === 'loading') {
    btn.disabled      = true;
    btn.style.opacity = '0.6';
    if (spinner) spinner.style.display = 'block';
    if (msgBox)  msgBox.style.display  = 'none';
  }

  if (state === 'success') {
    btn.disabled      = false;
    btn.style.opacity = '1';
    btn.textContent   = '✓ REQUEST SENT';
    btn.style.background = 'var(--green)';
    btn.style.color      = 'var(--black)';
    if (spinner) spinner.style.display = 'none';
    if (msgBox) {
      msgBox.style.display     = 'block';
      msgBox.style.color       = 'var(--green)';
      msgBox.style.borderColor = 'var(--green)';
    }
  }

  if (state === 'error') {
    btn.disabled      = false;
    btn.style.opacity = '1';
    btn.textContent   = 'TRY AGAIN →';
    btn.style.background = '';
    btn.style.color      = '';
    if (spinner) spinner.style.display = 'none';
    if (msgBox) {
      msgBox.style.display     = 'block';
      msgBox.style.color       = '#ff4444';
      msgBox.style.borderColor = '#ff4444';
    }
  }

  if (state === 'idle') {
    btn.disabled      = false;
    btn.style.opacity = '1';
    if (spinner) spinner.style.display = 'none';
  }
}

// ── Inline validation ────────────────────────────────────────
function showFieldError(field, message) {
  clearFieldError(field);
  field.style.borderColor = '#ff4444';
  const err = document.createElement('span');
  err.className   = 'field-error mono';
  err.style.cssText = 'font-size:10px;color:#ff4444;margin-top:4px;display:block;letter-spacing:1px;';
  err.textContent = '▶ ' + message;
  field.parentNode.appendChild(err);
}

function clearFieldError(field) {
  field.style.borderColor = '';
  const existing = field.parentNode.querySelector('.field-error');
  if (existing) existing.remove();
}

function clearAllErrors(form) {
  form.querySelectorAll('.field-error').forEach(e => e.remove());
  form.querySelectorAll('input, select, textarea').forEach(f => f.style.borderColor = '');
}

// ── Submit handler ────────────────────────────────────────────
async function handleQuoteSubmit(e) {
  e.preventDefault();
  const form = e.target;
  clearAllErrors(form);

  // Collect values
  const data = {
    firstName: form.querySelector('[name="firstname"]')?.value?.trim() || '',
    lastName:  form.querySelector('[name="lastname"]')?.value?.trim()  || '',
    company:   form.querySelector('[name="company"]')?.value?.trim()   || '',
    email:     form.querySelector('[name="email"]')?.value?.trim()     || '',
    service:   form.querySelector('[name="service"]')?.value           || '',
    message:   form.querySelector('[name="message"]')?.value?.trim()  || '',
    website:   form.querySelector('[name="website"]')?.value || '',   // honeypot — humans never fill this
    ts:        window._formLoadedAt || Date.now(),                      // time-trap
  };

  // Client-side pre-validation
  let hasError = false;
  if (!data.firstName) { showFieldError(form.querySelector('[name="firstname"]'), 'Required'); hasError = true; }
  if (!data.lastName)  { showFieldError(form.querySelector('[name="lastname"]'),  'Required'); hasError = true; }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    showFieldError(form.querySelector('[name="email"]'), 'Valid email required');
    hasError = true;
  }
  if (!data.service) { showFieldError(form.querySelector('[name="service"]'), 'Please select a service'); hasError = true; }
  if (data.message.length < 10) { showFieldError(form.querySelector('[name="message"]'), 'Min 10 characters'); hasError = true; }
  if (hasError) return;

  setFormState(form, 'loading');

  const msgBox = form.querySelector('.form-message');

  try {
    const res = await fetch(API_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });

    const json = await res.json();

    if (res.ok && json.success) {
      setFormState(form, 'success');
      if (msgBox) {
        msgBox.innerHTML = `
          <strong style="display:block;margin-bottom:4px;">Request received — Ref: ${json.reference}</strong>
          We'll be in touch within 1–2 business days. Check your inbox for a confirmation.
        `;
      }
      // Reset form after 8 seconds
      setTimeout(() => {
        form.reset();
        clearAllErrors(form);
        const btn = form.querySelector('.form-submit-btn');
        const t   = window._currentT || 'en';
        btn.textContent  = 'Send Request →';
        btn.style.background = '';
        btn.style.color      = '';
        if (msgBox) msgBox.style.display = 'none';
      }, 8000);

    } else {
      setFormState(form, 'error');
      const errors = json.errors ? json.errors.join(' · ') : (json.error || 'Unknown error.');
      if (msgBox) msgBox.textContent = '⚠ ' + errors;
    }

  } catch (networkErr) {
    setFormState(form, 'error');
    if (msgBox) {
      msgBox.textContent = '⚠ Could not connect. Please email info@techsinno.com directly.';
    }
    console.error('[TECHSINNO] Form submit error:', networkErr);
  }
}

// ── Wire up on DOM ready ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  window._formLoadedAt = Date.now();   // spam time-trap reference
  const form = document.getElementById('quote-form');
  if (!form) return;
  form.addEventListener('submit', handleQuoteSubmit);
});

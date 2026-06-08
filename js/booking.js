// ============================================================
// js/booking.js — TECHSINNO Booking Section (v2 - event listeners)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // ── Booking type selection via event listeners ──────────
  const types = document.querySelectorAll('.booking-type');
  const hidden = document.getElementById('bookingType');
  const addressGroup = document.getElementById('address-group');

  types.forEach(typeEl => {
    typeEl.addEventListener('click', () => {
      const type = typeEl.getAttribute('data-type');

      // Update active state
      types.forEach(t => t.classList.remove('active'));
      typeEl.classList.add('active');

      // Set hidden field
      if (hidden) hidden.value = type;

      // Show/hide address field for site visits
      if (addressGroup) {
        addressGroup.style.display = (type === 'sitevisit') ? 'flex' : 'none';
      }
    });
  });

  // ── Booking form submission ─────────────────────────────
  const form = document.getElementById('booking-form');
  if (!form) return;

  // Set minimum date to today
  const dateInput = form.querySelector('[name="bk_date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msgBox = form.querySelector('.booking-message');
    const btn = form.querySelector('.btn-primary');
    const origBtn = btn.textContent;

    const data = {
      bookingType: hidden ? hidden.value : 'meeting',
      firstName:   form.querySelector('[name="bk_firstname"]').value.trim(),
      lastName:    form.querySelector('[name="bk_lastname"]').value.trim(),
      email:       form.querySelector('[name="bk_email"]').value.trim(),
      phone:       form.querySelector('[name="bk_phone"]').value.trim(),
      date:        form.querySelector('[name="bk_date"]').value,
      time:        form.querySelector('[name="bk_time"]').value,
      address:     form.querySelector('[name="bk_address"]').value.trim(),
      notes:       form.querySelector('[name="bk_notes"]').value.trim(),
    };

    if (!data.firstName || !data.lastName || !data.email || !data.date || !data.time) {
      if (msgBox) {
        msgBox.style.display = 'block';
        msgBox.style.color = '#ff4444';
        msgBox.style.borderColor = '#ff4444';
        msgBox.textContent = '⚠ Please fill in all required fields.';
      }
      return;
    }

    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.textContent = 'SENDING...';

    const API_URL = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
      ? 'http://localhost:7071/api/submitBooking'
      : '/api/submitBooking';

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        btn.textContent = '✓ BOOKING REQUESTED';
        btn.style.background = 'var(--green)';
        if (msgBox) {
          msgBox.style.display = 'block';
          msgBox.style.color = 'var(--green)';
          msgBox.style.borderColor = 'var(--green)';
          msgBox.innerHTML = `<strong>Booking received — Ref: ${json.reference || 'TBC'}</strong><br>We'll confirm by email within 1 business day.`;
        }
        setTimeout(() => {
          form.reset();
          btn.disabled = false;
          btn.style.opacity = '1';
          btn.textContent = origBtn;
          btn.style.background = '';
          if (msgBox) msgBox.style.display = 'none';
        }, 8000);
      } else {
        throw new Error(json.error || 'Booking failed');
      }
    } catch (err) {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.textContent = 'TRY AGAIN →';
      if (msgBox) {
        msgBox.style.display = 'block';
        msgBox.style.color = '#ff4444';
        msgBox.style.borderColor = '#ff4444';
        msgBox.textContent = '⚠ Could not submit. Please email techsinno0@gmail.com directly.';
      }
      console.error('[TECHSINNO] Booking error:', err);
    }
  });
});

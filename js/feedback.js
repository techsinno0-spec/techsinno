// ============================================================
// feedback.js — Feedback / review form handler
// ============================================================
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    window._formLoadedAt = window._formLoadedAt || Date.now();
    const form = document.getElementById('feedback-form');
    if (!form) return;

    const statusEl = document.getElementById('fb-status');
    const submitBtn = document.getElementById('fb-submit');
    const typeInput = document.getElementById('feedbackType');
    const ratingInput = document.getElementById('fb-rating-val');

    // Feedback type buttons
    form.querySelectorAll('.fb-type').forEach(btn => {
      btn.addEventListener('click', () => {
        form.querySelectorAll('.fb-type').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        typeInput.value = btn.dataset.fbtype;
      });
    });

    // Star rating
    const stars = form.querySelectorAll('.fb-star');
    function paint(val) {
      stars.forEach(s => {
        const on = Number(s.dataset.val) <= val;
        s.classList.toggle('ti-star-filled', on);
        s.classList.toggle('ti-star', !on);
      });
    }
    stars.forEach(star => {
      star.addEventListener('mouseenter', () => paint(Number(star.dataset.val)));
      star.addEventListener('click', () => { ratingInput.value = star.dataset.val; paint(Number(star.dataset.val)); });
    });
    const starWrap = form.querySelector('.fb-stars');
    if (starWrap) starWrap.addEventListener('mouseleave', () => paint(Number(ratingInput.value) || 0));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      statusEl.textContent = '';
      statusEl.className = 'form-status';

      const payload = {
        feedbackType: typeInput.value,
        name:    form.querySelector('[name="name"]')?.value?.trim() || '',
        email:   form.querySelector('[name="email"]')?.value?.trim() || '',
        company: form.querySelector('[name="company"]')?.value?.trim() || '',
        rating:  ratingInput.value || '',
        message: form.querySelector('[name="message"]')?.value?.trim() || '',
        consentToPublish: form.querySelector('#fb-consent')?.checked || false,
        website: form.querySelector('[name="website"]')?.value || '',
        ts: window._formLoadedAt || Date.now(),
      };

      if (!payload.name || !payload.email || payload.message.length < 10) {
        statusEl.textContent = 'Please fill in your name, email, and a short message.';
        statusEl.classList.add('error');
        return;
      }

      submitBtn.disabled = true;
      const original = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';

      try {
        const res = await fetch('/api/submitFeedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          form.reset();
          paint(0); ratingInput.value = '';
          statusEl.textContent = data.message || 'Thank you for your feedback!';
          statusEl.classList.add('success');
        } else {
          const msg = (data.errors && data.errors.join(' ')) || data.error || 'Something went wrong.';
          statusEl.textContent = msg;
          statusEl.classList.add('error');
        }
      } catch {
        statusEl.textContent = 'Could not connect. Please email info@techsinno.com directly.';
        statusEl.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
      }
    });
  });
})();

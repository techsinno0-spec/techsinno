// ============================================================
// js/welcome.js — TECHSINNO Welcome Banner + Voice
// Fixed: audio now only triggers on direct button click
// ============================================================

const WELCOME = {
  en: {
    text: "Welcome to TECHSINNO — smart engineering solutions for industry and agriculture across South Africa and DR Congo. How can we help you today?",
    short: "Welcome to TECHSINNO. Smart Engineering Solutions for South Africa and DR Congo. We specialise in Electronics Engineering, PCB Design, Industrial Automation, and Agricultural IoT. Get in touch for a free quote.",
    btn: "🔊 HEAR IT",
    speaking: "⏹ STOP",
  },
  fr: {
    text: "Bienvenue chez TECHSINNO — solutions d'ingénierie intelligentes pour l'industrie et l'agriculture en Afrique du Sud et en RDC. Comment pouvons-nous vous aider?",
    short: "Bienvenue chez TECHSINNO. Solutions d'ingénierie intelligentes pour l'Afrique du Sud et la RDC. Électronique, conception PCB, automatisation industrielle et IoT agricole. Contactez-nous pour un devis gratuit.",
    btn: "🔊 ÉCOUTER",
    speaking: "⏹ ARRÊTER",
  },
  af: {
    text: "Welkom by TECHSINNO — slim ingenieursoplossings vir industrie en landbou in Suid-Afrika en die DRK. Hoe kan ons u vandag help?",
    short: "Welkom by TECHSINNO. Slim Ingenieursoplossings vir Suid-Afrika en die DRK. Elektronika, PCB-ontwerp, industriële outomatisering en landbou-IoT. Kontak ons vir 'n gratis kwotasie.",
    btn: "🔊 LUISTER",
    speaking: "⏹ STOP",
  },
  pt: {
    text: "Bem-vindo à TECHSINNO — soluções de engenharia inteligentes para a indústria e agricultura na África do Sul e na RDC. Como podemos ajudá-lo hoje?",
    short: "Bem-vindo à TECHSINNO. Soluções de Engenharia para a África do Sul e RDC. Electrónica, design PCB, automação industrial e IoT agrícola. Contacte-nos para um orçamento gratuito.",
    btn: "🔊 OUVIR",
    speaking: "⏹ PARAR",
  },
};

const VOICE_LANG = { en:'en-ZA', fr:'fr-FR', af:'af-ZA', pt:'pt-PT' };

let _typeInterval = null;

// ── Typewriter effect ────────────────────────────────────────
function typeText(el, text, speed) {
  if (_typeInterval) clearInterval(_typeInterval);
  el.textContent = '';
  let i = 0;
  _typeInterval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(_typeInterval);
  }, speed || 26);
}

// ── Show banner ──────────────────────────────────────────────
function showWelcomeBanner(lang) {
  const banner   = document.getElementById('welcome-banner');
  const textEl   = document.getElementById('welcome-text');
  const speakBtn = document.getElementById('speak-btn');
  if (!banner || !textEl) return;

  const w = WELCOME[lang] || WELCOME.en;
  speakBtn.textContent = w.btn;

  setTimeout(() => {
    banner.style.transform = 'translateY(0)';
    banner.style.opacity   = '1';
  }, 1400);

  setTimeout(() => typeText(textEl, w.text, 26), 2000);
}

// ── Speak — only fires on direct click ───────────────────────
window.speakWelcome = function () {
  if (!window.speechSynthesis) {
    alert('Text-to-speech is not supported in this browser. Please use Chrome or Edge.');
    return;
  }

  const lang     = window._currentLang || 'en';
  const w        = WELCOME[lang] || WELCOME.en;
  const speakBtn = document.getElementById('speak-btn');

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    speakBtn.textContent   = w.btn;
    speakBtn.style.background = '#00cc44';
    return;
  }

  const utter    = new SpeechSynthesisUtterance(w.short);
  utter.lang     = VOICE_LANG[lang] || 'en-ZA';
  utter.rate     = 0.90;
  utter.pitch    = 1.05;
  utter.volume   = 1.0;

  // Pick best available voice
  function pickVoice() {
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => v.lang === VOICE_LANG[lang])
      || voices.find(v => v.lang.startsWith(VOICE_LANG[lang].split('-')[0]))
      || voices.find(v => v.lang.startsWith('en'))
      || null;
  }

  const voice = pickVoice();
  if (voice) utter.voice = voice;

  utter.onstart = () => {
    speakBtn.textContent      = w.speaking;
    speakBtn.style.background = '#e05c00';
    speakBtn.style.color      = '#fff';
  };
  utter.onend = utter.onerror = () => {
    speakBtn.textContent      = w.btn;
    speakBtn.style.background = '#00cc44';
    speakBtn.style.color      = '#000';
  };

  // Chrome bug workaround — resume if paused
  window.speechSynthesis.cancel();
  setTimeout(() => window.speechSynthesis.speak(utter), 150);
};

// ── Update on language switch ────────────────────────────────
window.updateWelcomeLang = function(lang) {
  const w        = WELCOME[lang] || WELCOME.en;
  const textEl   = document.getElementById('welcome-text');
  const speakBtn = document.getElementById('speak-btn');
  const banner   = document.getElementById('welcome-banner');

  if (!banner || banner.style.display === 'none') return;

  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  speakBtn.textContent      = w.btn;
  speakBtn.style.background = '#00cc44';
  speakBtn.style.color      = '#000';

  if (textEl) typeText(textEl, w.text, 22);
};

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showWelcomeBanner(window._currentLang || 'en');

  // Patch lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => window.updateWelcomeLang(btn.dataset.lang), 120);
    });
  });

  // Preload voices (Chrome lazy-loads them)
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }
});

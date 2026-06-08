// ============================================================
// js/welcome.js — TECHSINNO Welcome Banner + Voice (v8 clean)
// ============================================================

const WELCOME = {
  en: {
    text: "Welcome to TECHSINNO — smart engineering solutions for industry and agriculture across South Africa and DR Congo. How can we help you today?",
    short: "Welcome to TECHSINNO. Smart Engineering Solutions for South Africa and DR Congo. We specialise in Electronics Engineering, P C B Design, Industrial Automation, and Agricultural I o T.",
    btn: "🔊 HEAR IT", speaking: "⏹ STOP", quote: "GET A QUOTE →",
  },
  fr: {
    text: "Bienvenue chez TECHSINNO — solutions d'ingénierie intelligentes pour l'industrie et l'agriculture en Afrique du Sud et en RDC. Comment pouvons-nous vous aider?",
    short: "Bienvenue chez TECHSINNO. Solutions d'ingénierie intelligentes pour l'Afrique du Sud et la RDC. Électronique, conception PCB, automatisation industrielle et IoT agricole.",
    btn: "🔊 ÉCOUTER", speaking: "⏹ ARRÊTER", quote: "DEVIS →",
  },
  af: {
    text: "Welkom by TECHSINNO — slim ingenieursoplossings vir industrie en landbou in Suid-Afrika en die DRK. Hoe kan ons u vandag help?",
    short: "Welkom by TECHSINNO. Slim Ingenieursoplossings vir Suid-Afrika en die DRK. Elektronika, PCB-ontwerp, industriële outomatisering en landbou-IoT.",
    btn: "🔊 LUISTER", speaking: "⏹ STOP", quote: "KWOTASIE →",
  },
  pt: {
    text: "Bem-vindo à TECHSINNO — soluções de engenharia inteligentes para a indústria e agricultura na África do Sul e na RDC. Como podemos ajudá-lo hoje?",
    short: "Bem-vindo à TECHSINNO. Soluções de Engenharia para a África do Sul e RDC. Electrónica, design PCB, automação industrial e IoT agrícola.",
    btn: "🔊 OUVIR", speaking: "⏹ PARAR", quote: "ORÇAMENTO →",
  },
};

const VOICE_LANG = { en:'en-GB', fr:'fr-FR', af:'af-ZA', pt:'pt-PT' };
let _typeInterval = null;

function getLang() { return window._currentLang || 'en'; }

function typeText(text, speed) {
  const el = document.getElementById('welcome-text');
  if (!el) return;
  if (_typeInterval) clearInterval(_typeInterval);
  el.textContent = '';
  let i = 0;
  _typeInterval = setInterval(() => {
    el.textContent += text[i]; i++;
    if (i >= text.length) clearInterval(_typeInterval);
  }, speed || 26);
}

function refreshLabels() {
  const w = WELCOME[getLang()] || WELCOME.en;
  const speakBtn = document.getElementById('speak-btn');
  const quote = document.getElementById('wb-quote');
  if (speakBtn && !window.speechSynthesis?.speaking) speakBtn.textContent = w.btn;
  if (quote) quote.textContent = w.quote;
}

// ── Speak (only on direct click) ────────────────────────────
function speak() {
  const speakBtn = document.getElementById('speak-btn');
  const w = WELCOME[getLang()] || WELCOME.en;

  if (!('speechSynthesis' in window)) {
    alert('Text-to-speech needs a modern browser (Chrome, Edge, or Safari).');
    return;
  }
  const synth = window.speechSynthesis;

  // Toggle off if speaking
  if (synth.speaking || synth.pending) {
    synth.cancel();
    if (speakBtn) speakBtn.textContent = w.btn;
    return;
  }

  const utter = new SpeechSynthesisUtterance(w.short);
  utter.lang = VOICE_LANG[getLang()] || 'en-GB';
  utter.rate = 0.95; utter.pitch = 1.0; utter.volume = 1.0;

  const voices = synth.getVoices();
  const v = voices.find(x => x.lang === utter.lang)
    || voices.find(x => x.lang && x.lang.startsWith(utter.lang.split('-')[0]))
    || voices.find(x => x.lang && x.lang.startsWith('en'))
    || voices[0];
  if (v) utter.voice = v;

  utter.onstart = () => { if (speakBtn) speakBtn.textContent = w.speaking; };
  utter.onend = utter.onerror = () => { if (speakBtn) speakBtn.textContent = w.btn; };

  synth.cancel();
  synth.speak(utter);
  setTimeout(() => { if (synth.paused) synth.resume(); }, 200);
}

// ── Update on language switch ───────────────────────────────
window.updateWelcomeLang = function(lang) {
  const banner = document.getElementById('welcome-banner');
  if (!banner || banner.classList.contains('wb-hidden')) return;
  const w = WELCOME[lang] || WELCOME.en;
  if (window.speechSynthesis && window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  const speakBtn = document.getElementById('speak-btn');
  const quote = document.getElementById('wb-quote');
  if (speakBtn) speakBtn.textContent = w.btn;
  if (quote) quote.textContent = w.quote;
  typeText(w.text, 22);
};

// ── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const banner   = document.getElementById('welcome-banner');
  const closeBtn = document.getElementById('welcome-close');
  const speakBtn = document.getElementById('speak-btn');
  const quote    = document.getElementById('wb-quote');
  const w = WELCOME[getLang()] || WELCOME.en;

  if (speakBtn) speakBtn.textContent = w.btn;
  if (quote) quote.textContent = w.quote;

  // Show banner + type message
  setTimeout(() => { if (banner) banner.classList.add('wb-show'); }, 1400);
  setTimeout(() => typeText(w.text, 26), 2000);

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (window.speechSynthesis && window.speechSynthesis.speaking) window.speechSynthesis.cancel();
      banner.classList.remove('wb-show');
      banner.classList.add('wb-hidden');
    });
  }

  // Quote link also closes
  if (quote) {
    quote.addEventListener('click', () => {
      banner.classList.remove('wb-show');
      banner.classList.add('wb-hidden');
    });
  }

  // Speak button
  if (speakBtn) speakBtn.addEventListener('click', speak);

  // Prime speech engine on first interaction (Chrome autoplay unlock)
  function prime() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      try { window.speechSynthesis.speak(u); } catch(e){}
    }
    document.removeEventListener('click', prime);
    document.removeEventListener('touchstart', prime);
  }
  document.addEventListener('click', prime, { once:true });
  document.addEventListener('touchstart', prime, { once:true });

  // Preload voices
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  // Hook language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => window.updateWelcomeLang(btn.dataset.lang), 120);
    });
  });
});

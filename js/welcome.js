// ============================================================
// js/welcome.js — TECHSINNO Welcome Banner + Voice (v7 robust)
// ============================================================

const WELCOME = {
  en: {
    text: "Welcome to TECHSINNO — smart engineering solutions for industry and agriculture across South Africa and DR Congo. How can we help you today?",
    short: "Welcome to TECHSINNO. Smart Engineering Solutions for South Africa and DR Congo. We specialise in Electronics Engineering, PCB Design, Industrial Automation, and Agricultural IoT.",
    btn: "🔊 HEAR IT", speaking: "⏹ STOP",
  },
  fr: {
    text: "Bienvenue chez TECHSINNO — solutions d'ingénierie intelligentes pour l'industrie et l'agriculture en Afrique du Sud et en RDC. Comment pouvons-nous vous aider?",
    short: "Bienvenue chez TECHSINNO. Solutions d'ingénierie intelligentes pour l'Afrique du Sud et la RDC. Électronique, conception PCB, automatisation industrielle et IoT agricole.",
    btn: "🔊 ÉCOUTER", speaking: "⏹ ARRÊTER",
  },
  af: {
    text: "Welkom by TECHSINNO — slim ingenieursoplossings vir industrie en landbou in Suid-Afrika en die DRK. Hoe kan ons u vandag help?",
    short: "Welkom by TECHSINNO. Slim Ingenieursoplossings vir Suid-Afrika en die DRK. Elektronika, PCB-ontwerp, industriële outomatisering en landbou-IoT.",
    btn: "🔊 LUISTER", speaking: "⏹ STOP",
  },
  pt: {
    text: "Bem-vindo à TECHSINNO — soluções de engenharia inteligentes para a indústria e agricultura na África do Sul e na RDC. Como podemos ajudá-lo hoje?",
    short: "Bem-vindo à TECHSINNO. Soluções de Engenharia para a África do Sul e RDC. Electrónica, design PCB, automação industrial e IoT agrícola.",
    btn: "🔊 OUVIR", speaking: "⏹ PARAR",
  },
};

const VOICE_LANG = { en:'en-GB', fr:'fr-FR', af:'af-ZA', pt:'pt-PT' };

let _typeInterval = null;
let _voicesReady = false;
let _voiceList = [];

// ── Load voices (handles async loading in Chrome) ───────────
function loadVoices() {
  _voiceList = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  if (_voiceList.length > 0) _voicesReady = true;
  return _voiceList;
}

// ── Typewriter ──────────────────────────────────────────────
function typeText(el, text, speed) {
  if (_typeInterval) clearInterval(_typeInterval);
  el.textContent = '';
  let i = 0;
  _typeInterval = setInterval(() => {
    el.textContent += text[i]; i++;
    if (i >= text.length) clearInterval(_typeInterval);
  }, speed || 26);
}

// ── Show banner ─────────────────────────────────────────────
function showWelcomeBanner(lang) {
  const banner   = document.getElementById('welcome-banner');
  const textEl   = document.getElementById('welcome-text');
  const speakBtn = document.getElementById('speak-btn');
  if (!banner || !textEl) return;
  const w = WELCOME[lang] || WELCOME.en;
  if (speakBtn) speakBtn.textContent = w.btn;
  setTimeout(() => { banner.style.transform = 'translateY(0)'; banner.style.opacity = '1'; }, 1400);
  setTimeout(() => typeText(textEl, w.text, 26), 2000);
}

// ── Speak — robust with voice-ready check ───────────────────
window.speakWelcome = function () {
  const speakBtn = document.getElementById('speak-btn');

  if (!('speechSynthesis' in window)) {
    alert('Text-to-speech is not supported in this browser. Please use Chrome, Edge, or Safari.');
    return;
  }

  const synth = window.speechSynthesis;
  const lang  = window._currentLang || 'en';
  const w     = WELCOME[lang] || WELCOME.en;

  // If already speaking → stop
  if (synth.speaking || synth.pending) {
    synth.cancel();
    if (speakBtn) { speakBtn.textContent = w.btn; speakBtn.style.background = '#00cc44'; speakBtn.style.color = '#000'; }
    return;
  }

  function doSpeak() {
    const utter = new SpeechSynthesisUtterance(w.short);
    utter.lang   = VOICE_LANG[lang] || 'en-GB';
    utter.rate   = 0.92;
    utter.pitch  = 1.05;
    utter.volume = 1.0;

    const voices = loadVoices();
    const v = voices.find(x => x.lang === VOICE_LANG[lang])
      || voices.find(x => x.lang && x.lang.startsWith(VOICE_LANG[lang].split('-')[0]))
      || voices.find(x => x.lang && x.lang.startsWith('en'))
      || voices[0];
    if (v) utter.voice = v;

    utter.onstart = () => {
      if (speakBtn) { speakBtn.textContent = w.speaking; speakBtn.style.background = '#e05c00'; speakBtn.style.color = '#fff'; }
    };
    utter.onend = utter.onerror = () => {
      if (speakBtn) { speakBtn.textContent = w.btn; speakBtn.style.background = '#00cc44'; speakBtn.style.color = '#000'; }
    };

    synth.cancel();
    synth.speak(utter);

    // Chrome bug: sometimes needs a kick
    setTimeout(() => { if (synth.paused) synth.resume(); }, 250);
  }

  // If voices not loaded yet, wait for them
  if (!_voicesReady) {
    loadVoices();
    if (!_voicesReady) {
      synth.onvoiceschanged = () => { loadVoices(); doSpeak(); synth.onvoiceschanged = null; };
      // Fallback: try anyway after 300ms
      setTimeout(() => { if (!synth.speaking) doSpeak(); }, 400);
      return;
    }
  }
  doSpeak();
};

// ── Update on language switch ───────────────────────────────
window.updateWelcomeLang = function(lang) {
  const w        = WELCOME[lang] || WELCOME.en;
  const textEl   = document.getElementById('welcome-text');
  const speakBtn = document.getElementById('speak-btn');
  const banner   = document.getElementById('welcome-banner');
  if (!banner || banner.style.display === 'none') return;
  if (window.speechSynthesis && window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  if (speakBtn) { speakBtn.textContent = w.btn; speakBtn.style.background = '#00cc44'; speakBtn.style.color = '#000'; }
  if (textEl) typeText(textEl, w.text, 22);
};

// ── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showWelcomeBanner(window._currentLang || 'en');

  // Prime the speech engine on first user interaction (fixes Chrome autoplay block)
  function primeSpeech() {
    if ('speechSynthesis' in window) {
      loadVoices();
      // Speak an empty/silent utterance to unlock the engine
      const u = new SpeechSynthesisUtterance('');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    }
    document.removeEventListener('click', primeSpeech);
    document.removeEventListener('touchstart', primeSpeech);
  }
  document.addEventListener('click', primeSpeech, { once: true });
  document.addEventListener('touchstart', primeSpeech, { once: true });

  // Load voices (Chrome async)
  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  // Patch lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => window.updateWelcomeLang(btn.dataset.lang), 120);
    });
  });
});

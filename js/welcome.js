// ============================================================
// js/welcome.js
// Animated welcome banner + Web Speech API voice greeting
// Matches selected language: EN / FR / AF / PT
// ============================================================

const WELCOME = {
  en: {
    text: "Welcome to TECHSINNO — smart engineering solutions for industry and agriculture across South Africa and DR Congo. How can we help you today?",
    short: "Welcome to TECHSINNO — Smart Engineering Solutions for South Africa & DR Congo. We specialise in Electronics, PCB Design, Industrial Automation, and Agricultural IoT.",
    btn: "HEAR IT",
    speaking: "SPEAKING...",
  },
  fr: {
    text: "Bienvenue chez TECHSINNO — des solutions d'ingénierie intelligentes pour l'industrie et l'agriculture en Afrique du Sud et en RDC. Comment pouvons-nous vous aider aujourd'hui?",
    short: "Bienvenue chez TECHSINNO — solutions d'ingénierie pour l'Afrique du Sud et la RDC. Électronique, conception PCB, automatisation industrielle et IoT agricole.",
    btn: "ÉCOUTER",
    speaking: "EN COURS...",
  },
  af: {
    text: "Welkom by TECHSINNO — slim ingenieursoplossings vir industrie en landbou in Suid-Afrika en die DRK. Hoe kan ons u vandag help?",
    short: "Welkom by TECHSINNO — Slim Ingenieursoplossings vir Suid-Afrika en die DRK. Elektronika, PCB-ontwerp, industriële outomatisering en landbou-IoT.",
    btn: "LUISTER",
    speaking: "PRAAT...",
  },
  pt: {
    text: "Bem-vindo à TECHSINNO — soluções de engenharia inteligentes para a indústria e agricultura na África do Sul e na RDC. Como podemos ajudá-lo hoje?",
    short: "Bem-vindo à TECHSINNO — Soluções de Engenharia para a África do Sul e RDC. Electrónica, design PCB, automação industrial e IoT agrícola.",
    btn: "OUVIR",
    speaking: "A FALAR...",
  },
};

// Language voice map — best matching BCP-47 tags
const VOICE_LANG = {
  en: 'en-ZA',  // South African English preferred, fallback en-GB/en-US
  fr: 'fr-FR',
  af: 'af-ZA',
  pt: 'pt-PT',
};

// ── Show banner with animated typing ────────────────────────
function showWelcomeBanner(lang) {
  const banner  = document.getElementById('welcome-banner');
  const textEl  = document.getElementById('welcome-text');
  const btnLabel = document.getElementById('speak-btn-label');
  if (!banner || !textEl) return;

  const w = WELCOME[lang] || WELCOME.en;
  btnLabel.textContent = w.btn;

  // Animate banner in after 1.2s
  setTimeout(() => {
    banner.style.transform = 'translateY(0)';
    banner.style.opacity   = '1';
  }, 1200);

  // Typewriter effect on the text
  let i = 0;
  textEl.textContent = '';
  setTimeout(() => {
    const interval = setInterval(() => {
      textEl.textContent += w.text[i];
      i++;
      if (i >= w.text.length) clearInterval(interval);
    }, 28);
  }, 1800);
}

// ── Web Speech API voice greeting ───────────────────────────
window.speakWelcome = function () {
  if (!window.speechSynthesis) {
    alert('Your browser does not support text-to-speech. Try Chrome or Edge.');
    return;
  }

  const lang     = window._currentLang || 'en';
  const w        = WELCOME[lang] || WELCOME.en;
  const btnLabel = document.getElementById('speak-btn-label');
  const btn      = document.getElementById('speak-btn');

  // Stop if already speaking
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    btnLabel.textContent = w.btn;
    btn.style.background = '#00cc44';
    return;
  }

  const utter = new SpeechSynthesisUtterance(w.short);
  utter.lang  = VOICE_LANG[lang] || 'en-ZA';
  utter.rate  = 0.92;
  utter.pitch = 1.0;

  // Try to find a matching voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith(VOICE_LANG[lang]))
    || voices.find(v => v.lang.startsWith(lang))
    || voices.find(v => v.lang.startsWith('en'));
  if (preferred) utter.voice = preferred;

  utter.onstart = () => {
    btnLabel.textContent = w.speaking;
    btn.style.background = '#ff6b35';
  };
  utter.onend = () => {
    btnLabel.textContent = w.btn;
    btn.style.background = '#00cc44';
  };
  utter.onerror = () => {
    btnLabel.textContent = w.btn;
    btn.style.background = '#00cc44';
  };

  window.speechSynthesis.speak(utter);
};

// ── Update banner language when user switches ────────────────
function updateWelcomeLang(lang) {
  const w        = WELCOME[lang] || WELCOME.en;
  const textEl   = document.getElementById('welcome-text');
  const btnLabel = document.getElementById('speak-btn-label');
  const banner   = document.getElementById('welcome-banner');
  if (!banner || banner.style.display === 'none') return;

  // Cancel any ongoing speech
  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  btnLabel.textContent = w.btn;
  document.getElementById('speak-btn').style.background = '#00cc44';

  // Re-type text in new language
  if (textEl) {
    textEl.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      textEl.textContent += w.text[i];
      i++;
      if (i >= w.text.length) clearInterval(interval);
    }, 22);
  }
}

// ── Hook into language switcher ──────────────────────────────
// Intercept lang button clicks to also update welcome banner
document.addEventListener('DOMContentLoaded', () => {
  // Show banner on load
  const initLang = window._currentLang || 'en';
  showWelcomeBanner(initLang);

  // Patch lang buttons to also update banner
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setTimeout(() => updateWelcomeLang(lang), 100);
    });
  });

  // Voices may not be loaded instantly on some browsers
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }
});

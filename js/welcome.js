// ============================================================
// js/welcome.js — TECHSINNO Welcome Banner + Voice (v9 bulletproof)
// Self-contained, guarded, independent of other scripts.
// ============================================================
(function () {
  'use strict';

  var WELCOME = {
    en: { text: "Welcome to TECHSINNO — smart engineering solutions for industry and agriculture across South Africa and DR Congo. How can we help you today?",
          short: "Welcome to TECHSINNO. Smart Engineering Solutions for South Africa and DR Congo. We specialise in Electronics Engineering, P C B Design, Industrial Automation, and Agricultural I o T.",
          btn: "\uD83D\uDD0A HEAR IT", speaking: "\u23F9 STOP", quote: "GET A QUOTE \u2192" },
    fr: { text: "Bienvenue chez TECHSINNO — solutions d'ing\u00e9nierie intelligentes pour l'industrie et l'agriculture en Afrique du Sud et en RDC. Comment pouvons-nous vous aider?",
          short: "Bienvenue chez TECHSINNO. Solutions d'ing\u00e9nierie pour l'Afrique du Sud et la RDC. \u00c9lectronique, conception PCB, automatisation industrielle et IoT agricole.",
          btn: "\uD83D\uDD0A \u00c9COUTER", speaking: "\u23F9 ARR\u00caTER", quote: "DEVIS \u2192" },
    af: { text: "Welkom by TECHSINNO — slim ingenieursoplossings vir industrie en landbou in Suid-Afrika en die DRK. Hoe kan ons u vandag help?",
          short: "Welkom by TECHSINNO. Slim Ingenieursoplossings vir Suid-Afrika en die DRK. Elektronika, PCB-ontwerp, industri\u00eble outomatisering en landbou-IoT.",
          btn: "\uD83D\uDD0A LUISTER", speaking: "\u23F9 STOP", quote: "KWOTASIE \u2192" },
    pt: { text: "Bem-vindo \u00e0 TECHSINNO — solu\u00e7\u00f5es de engenharia inteligentes para a ind\u00fastria e agricultura na \u00c1frica do Sul e na RDC. Como podemos ajud\u00e1-lo hoje?",
          short: "Bem-vindo \u00e0 TECHSINNO. Solu\u00e7\u00f5es de Engenharia para a \u00c1frica do Sul e RDC. Electr\u00f3nica, design PCB, automa\u00e7\u00e3o industrial e IoT agr\u00edcola.",
          btn: "\uD83D\uDD0A OUVIR", speaking: "\u23F9 PARAR", quote: "OR\u00c7AMENTO \u2192" }
  };
  var VOICE_LANG = { en:'en-GB', fr:'fr-FR', af:'af-ZA', pt:'pt-PT' };
  var typeTimer = null;

  function lang() { return window._currentLang || 'en'; }
  function W() { return WELCOME[lang()] || WELCOME.en; }

  function typeText(text, speed) {
    var el = document.getElementById('welcome-text');
    if (!el) return;
    if (typeTimer) clearInterval(typeTimer);
    el.textContent = '';
    var i = 0;
    typeTimer = setInterval(function () {
      el.textContent += text.charAt(i); i++;
      if (i >= text.length) clearInterval(typeTimer);
    }, speed || 26);
  }

  function speak() {
    var btn = document.getElementById('speak-btn');
    var w = W();
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech needs Chrome, Edge, or Safari.');
      return;
    }
    var synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) {
      synth.cancel();
      if (btn) btn.textContent = w.btn;
      return;
    }
    try {
      var u = new SpeechSynthesisUtterance(w.short);
      u.lang = VOICE_LANG[lang()] || 'en-GB';
      u.rate = 0.95; u.pitch = 1.0; u.volume = 1.0;
      var vs = synth.getVoices();
      var v = null, j;
      for (j = 0; j < vs.length; j++) { if (vs[j].lang === u.lang) { v = vs[j]; break; } }
      if (!v) { for (j = 0; j < vs.length; j++) { if (vs[j].lang && vs[j].lang.indexOf(u.lang.split('-')[0]) === 0) { v = vs[j]; break; } } }
      if (!v) { for (j = 0; j < vs.length; j++) { if (vs[j].lang && vs[j].lang.indexOf('en') === 0) { v = vs[j]; break; } } }
      if (v) u.voice = v;
      u.onstart = function () { if (btn) btn.textContent = w.speaking; };
      u.onend = function () { if (btn) btn.textContent = w.btn; };
      u.onerror = function () { if (btn) btn.textContent = w.btn; };
      synth.cancel();
      synth.speak(u);
      setTimeout(function () { if (synth.paused) synth.resume(); }, 200);
    } catch (e) {
      if (btn) btn.textContent = w.btn;
    }
  }

  window.updateWelcomeLang = function (lng) {
    try {
      var banner = document.getElementById('welcome-banner');
      if (!banner || banner.classList.contains('wb-hidden')) return;
      var w = WELCOME[lng] || WELCOME.en;
      if (window.speechSynthesis && window.speechSynthesis.speaking) window.speechSynthesis.cancel();
      var btn = document.getElementById('speak-btn');
      var q = document.getElementById('wb-quote');
      if (btn) btn.textContent = w.btn;
      if (q) q.textContent = w.quote;
      typeText(w.text, 22);
    } catch (e) {}
  };

  function init() {
    try {
      var banner = document.getElementById('welcome-banner');
      if (!banner) return;
      var closeBtn = document.getElementById('welcome-close');
      var btn = document.getElementById('speak-btn');
      var q = document.getElementById('wb-quote');
      var w = W();

      if (btn) btn.textContent = w.btn;
      if (q) q.textContent = w.quote;

      // Show banner
      setTimeout(function () { banner.classList.add('wb-show'); }, 1200);
      // Type message
      setTimeout(function () { typeText(w.text, 26); }, 1800);

      if (closeBtn) closeBtn.addEventListener('click', function () {
        if (window.speechSynthesis && window.speechSynthesis.speaking) window.speechSynthesis.cancel();
        banner.classList.remove('wb-show');
        banner.classList.add('wb-hidden');
      });
      if (q) q.addEventListener('click', function () {
        banner.classList.remove('wb-show');
        banner.classList.add('wb-hidden');
      });
      if (btn) btn.addEventListener('click', speak);

      // Prime speech engine on first interaction
      function prime() {
        try {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
            var u = new SpeechSynthesisUtterance(' ');
            u.volume = 0;
            window.speechSynthesis.speak(u);
          }
        } catch (e) {}
        document.removeEventListener('click', prime);
        document.removeEventListener('touchstart', prime);
      }
      document.addEventListener('click', prime, { once: true });
      document.addEventListener('touchstart', prime, { once: true });

      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = function () { window.speechSynthesis.getVoices(); };
      }

      // Language buttons
      var btns = document.querySelectorAll('.lang-btn');
      for (var k = 0; k < btns.length; k++) {
        (function (b) {
          b.addEventListener('click', function () {
            setTimeout(function () { window.updateWelcomeLang(b.getAttribute('data-lang')); }, 120);
          });
        })(btns[k]);
      }
    } catch (e) {
      // Even if something fails, force-show the banner
      var b2 = document.getElementById('welcome-banner');
      if (b2) b2.classList.add('wb-show');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

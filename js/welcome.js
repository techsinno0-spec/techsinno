// ============================================================
// js/welcome.js — TECHSINNO Welcome Banner + Voice (v10)
// Fixed: no forced lang, no blocking prime, robust speak.
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
  // Preferred voice language prefix per UI language (NOT forced on utterance)
  var VOICE_PREFIX = { en:'en', fr:'fr', af:'af', pt:'pt' };
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

  function pickVoice(prefix) {
    var vs = window.speechSynthesis.getVoices();
    var i;
    // Exact prefix match (e.g. 'fr')
    for (i = 0; i < vs.length; i++) {
      if (vs[i].lang && vs[i].lang.toLowerCase().indexOf(prefix) === 0) return vs[i];
    }
    // Fallback: any English
    for (i = 0; i < vs.length; i++) {
      if (vs[i].lang && vs[i].lang.toLowerCase().indexOf('en') === 0) return vs[i];
    }
    // Last resort: first available
    return vs.length ? vs[0] : null;
  }

  function speak() {
    console.log('[TECHSINNO] speak() called');
    var btn = document.getElementById('speak-btn');
    var w = W();
    if (!('speechSynthesis' in window)) {
      console.log('[TECHSINNO] no speechSynthesis');
      alert('Text-to-speech needs Chrome, Edge, or Safari.');
      return;
    }
    var synth = window.speechSynthesis;
    console.log('[TECHSINNO] speaking=' + synth.speaking + ' pending=' + synth.pending + ' voices=' + synth.getVoices().length);

    // Toggle off if currently speaking
    if (synth.speaking) {
      synth.cancel();
      if (btn) btn.textContent = w.btn;
      return;
    }

    // Always clear any stuck queue first
    synth.cancel();

    var u = new SpeechSynthesisUtterance(w.short);
    // IMPORTANT: do NOT force u.lang — set the voice instead.
    var v = pickVoice(VOICE_PREFIX[lang()] || 'en');
    console.log('[TECHSINNO] picked voice: ' + (v ? v.name + ' (' + v.lang + ')' : 'NONE'));
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = 0.95; u.pitch = 1.0; u.volume = 1.0;

    u.onstart = function () { console.log('[TECHSINNO] >>> SPEECH STARTED'); if (btn) btn.textContent = w.speaking; };
    u.onend   = function () { console.log('[TECHSINNO] >>> SPEECH ENDED'); if (btn) btn.textContent = w.btn; };
    u.onerror = function (e) { console.log('[TECHSINNO] >>> SPEECH ERROR: ' + (e.error || 'unknown')); if (btn) btn.textContent = w.btn; };

    // Speak after a tiny delay so cancel() fully clears (Chrome quirk)
    setTimeout(function () {
      console.log('[TECHSINNO] calling synth.speak now');
      synth.speak(u);
      console.log('[TECHSINNO] after speak: speaking=' + synth.speaking + ' pending=' + synth.pending);
      setTimeout(function () {
        console.log('[TECHSINNO] 150ms check: speaking=' + synth.speaking + ' paused=' + synth.paused);
        if (synth.paused) synth.resume();
      }, 150);
    }, 60);
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

      setTimeout(function () { banner.classList.add('wb-show'); }, 1200);
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
      if (btn) { btn.addEventListener('click', speak); console.log('[TECHSINNO] speak button listener attached'); }
      else { console.log('[TECHSINNO] WARNING: speak-btn not found!'); }

      // Just warm up voices — do NOT speak a blank utterance (that was jamming the queue)
      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = function () { window.speechSynthesis.getVoices(); };
      }

      var btns = document.querySelectorAll('.lang-btn');
      for (var k = 0; k < btns.length; k++) {
        (function (b) {
          b.addEventListener('click', function () {
            setTimeout(function () { window.updateWelcomeLang(b.getAttribute('data-lang')); }, 120);
          });
        })(btns[k]);
      }
    } catch (e) {
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

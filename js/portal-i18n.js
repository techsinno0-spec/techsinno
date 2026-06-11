// js/portal-i18n.js — TECHSINNO Portal page translations
(function () {
  'use strict';
  var SP = window.SP_PORTAL || {};
  function getLang(){ var l='en'; try{ l=localStorage.getItem('techsinno_lang')||'en'; }catch(e){} return l; }
  function setLang(l){ try{ localStorage.setItem('techsinno_lang',l); }catch(e){} }
  function apply(lang){
    var dict = SP[lang] || SP['en'];
    if(!dict) return;
    var els = document.querySelectorAll('[data-sp]');
    for(var i=0;i<els.length;i++){
      var k = els[i].getAttribute('data-sp');
      if(dict[k]!==undefined) els[i].textContent = dict[k];
    }
    var phs = document.querySelectorAll('[data-sp-ph]');
    for(var p=0;p<phs.length;p++){
      var pk = phs[p].getAttribute('data-sp-ph');
      if(dict[pk]!==undefined) phs[p].placeholder = dict[pk];
    }
    var navs = document.querySelectorAll('[data-spnav]');
    for(var n=0;n<navs.length;n++){
      var nk = navs[n].getAttribute('data-spnav');
      if(dict[nk]!==undefined) navs[n].textContent = dict[nk];
    }
    var btns = document.querySelectorAll('.sp-lang-btn');
    for(var j=0;j<btns.length;j++){
      btns[j].classList.toggle('active', btns[j].getAttribute('data-lang')===lang);
    }
    document.documentElement.setAttribute('lang', lang);
  }
  function init(){
    apply(getLang());
    var btns = document.querySelectorAll('.sp-lang-btn');
    for(var i=0;i<btns.length;i++){
      (function(b){ b.addEventListener('click', function(){ var l=b.getAttribute('data-lang'); setLang(l); apply(l); }); })(btns[i]);
    }
    var tg = document.getElementById('sp-nav-toggle');
    var mn = document.getElementById('sp-mobile-nav');
    if(tg && mn){ tg.addEventListener('click', function(){ mn.classList.toggle('open'); tg.classList.toggle('active'); }); }
    var form = document.getElementById('portal-form');
    if(form){ form.addEventListener('submit', function(){ alert('Portal login is coming soon. Please contact info@techsinno.com for access.'); }); }
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();

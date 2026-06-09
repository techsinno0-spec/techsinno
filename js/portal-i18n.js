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
    var form = document.getElementById('portal-form');
    if(form){ form.addEventListener('submit', function(){ alert('Portal login is coming soon. Please contact frank@techsinno.com for access.'); }); }
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();

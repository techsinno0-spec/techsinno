// js/process-i18n.js — TECHSINNO Process page translations
(function () {
  'use strict';
  var SP = window.SP_PROCESS || {};
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
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();

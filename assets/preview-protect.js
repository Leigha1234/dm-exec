
(() => {
  const ACCESS_CODE = 'DM-FRIDAY-26';
  const EXPIRES_AT = new Date('2026-09-14T20:00:00+01:00');
  const KEY = 'dm_preview_access_v1';

  function expired(){ return new Date() >= EXPIRES_AT; }
  function addBar(){
    if(document.getElementById('tot-preview-bar')) return;
    const bar=document.createElement('div');
    bar.id='tot-preview-bar';
    bar.textContent='Private concept · Prepared for DM Executive Travel by The Organised Types · Preview ends Monday 14 September';
    document.body.appendChild(bar);
  }
  function gate(isExpired=false){
    const wrap=document.createElement('div');
    wrap.className='tot-gate';
    wrap.innerHTML=`<div class="tot-gate__card">
      <img class="tot-gate__logo" src="assets/logo-white.webp" alt="DM Executive Travel">
      <p class="tot-gate__eyebrow">Private website concept</p>
      <h1>${isExpired?'This preview has now expired.':'DM Executive Travel'}</h1>
      <p class="tot-gate__copy">${isExpired?'This private concept is no longer available. Please contact The Organised Types if you would like to continue with the project.':'Prepared exclusively for DM Executive Travel by The Organised Types. Enter the access code provided to view the concept.'}</p>
      ${isExpired?'':`<form class="tot-gate__form"><input type="password" autocomplete="current-password" placeholder="Access code" aria-label="Access code"><button type="submit">View concept</button></form><p class="tot-gate__error" aria-live="polite"></p>`}
      <p class="tot-gate__credit">The Organised Types · Private client preview</p>
    </div>`;
    document.body.appendChild(wrap);
    if(!isExpired){
      const form=wrap.querySelector('form'), input=wrap.querySelector('input'), err=wrap.querySelector('.tot-gate__error');
      form.addEventListener('submit',e=>{e.preventDefault(); if(input.value.trim()===ACCESS_CODE){sessionStorage.setItem(KEY,'1');wrap.remove();addBar();}else{err.textContent='That access code is not correct.';input.select();}});
      setTimeout(()=>input.focus(),50);
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{
    if(expired()){sessionStorage.removeItem(KEY);gate(true);return;}
    if(sessionStorage.getItem(KEY)==='1') addBar(); else gate(false);
  });
})();

/* Disclosed App Review access. Session-only demonstration data, never date overrides. */
let appReviewSnapshot=null;
globalThis.jollyAppReviewActive=false;
const reviewSaveFamilyBefore=saveFamily;
saveFamily=function(){if(!globalThis.jollyAppReviewActive)return reviewSaveFamilyBefore()};
function clearAppReviewSamples(){previewHatched.clear();previewMissionDone.clear();previewCare.clear();secretPreviewStates.clear();previewDoorVisits.clear();cardCapersSeen.clear()}
function leaveAppReview(){
 if(!appReviewSnapshot)return;
 dispose();dispose=()=>{};modal.close();
 state.children=appReviewSnapshot.children;state.activeChildId=appReviewSnapshot.activeChildId;state.sound=appReviewSnapshot.sound;
 appReviewSnapshot=null;globalThis.jollyAppReviewActive=false;preview=false;exploring=false;previewState={};offlineVillage=false;
 clearAppReviewSamples();applyChildPlan();view='calendar';jollyWelcome=true;render();
}
function enterAppReview(){
 if(globalThis.jollyAppReviewActive)return;
 dispose();dispose=()=>{};modal.close();
 appReviewSnapshot={children:state.children,activeChildId:state.activeChildId,sound:state.sound};
 globalThis.jollyAppReviewActive=true;
 const demo=JSON.parse(JSON.stringify(activeChild()));demo.id='app-review-demo';demo.name='App Review';
 demo.years={};demo.hatched={};demo.care={};demo.records={};demo.missionDone={};demo.voiceMystery={};demo.theatre={};
 state.children=[demo];state.activeChildId=demo.id;
 clearAppReviewSamples();globalThis.jollyDateTesting=false;developmentClockOffset=0;offlineVillage=false;applyChildPlan();jollyWelcome=false;exploreEverything();
}
function grownUpLinks(){return '<div class="grown-up-links" aria-label="Information and support"><button class="btn secondary" data-legal-page="privacy">Privacy policy</button><button class="btn secondary" data-legal-page="terms">Terms &amp; conditions</button><button class="btn secondary" data-legal-page="support">Support</button></div>'}
function wireGrownUpLinks(){content.querySelectorAll('[data-legal-page]').forEach(b=>b.onclick=()=>openLegalPage(b.dataset.legalPage))}
function showGrownUps(review=false){
 showModal('<section class="app-review-access"><div class="eyebrow">FOR THE GROWN-UPS</div><h2>Useful information</h2>'+grownUpLinks()+'<details class="review-access-disclosure" '+(review?'open':'')+'><summary>App Review access</summary><form id="app-review-form"><label for="app-review-code">Code</label><input id="app-review-code" type="password" inputmode="numeric" pattern="[0-9]{6}" minlength="6" maxlength="6" autocomplete="off" required><p class="small-note" id="app-review-error" role="status"></p><button class="btn" type="submit">Continue</button></form></details></section>');
 wireGrownUpLinks();
 content.querySelector('form').onsubmit=e=>{e.preventDefault();if(content.querySelector('input').value!=='773011'){content.querySelector('#app-review-error').textContent='That code doesn’t match. Please try again.';return}enterAppReview()};
}
function appReviewAccess(){showGrownUps(true)}
function openLegalPage(key){
 const page=JOLLY_LEGAL_PAGES[key];if(!page)return;
 showModal('<section class="in-app-legal"><div class="eyebrow">FOR THE GROWN-UPS</div><h2>'+page.title+'</h2><p class="small-note">Last updated 20 November 2026 · Available offline</p><article class="legal-article" tabindex="0" aria-label="'+page.title+'">'+page.html+'</article><div class="btn-row"><button class="btn secondary" id="legal-back">Back</button><button class="btn secondary" id="legal-website">Open website ↗</button></div></section>');
 content.querySelector('#legal-back').onclick=()=>showGrownUps();
 content.querySelector('#legal-website').onclick=()=>parentalLinkGate(page.url,key);
 content.querySelectorAll('.legal-article a').forEach(a=>{
  const href=a.getAttribute('href'),url=new URL(href,page.url);a.setAttribute('href','#');
  a.onclick=e=>{e.preventDefault();if(href.startsWith('#')){content.querySelector(href)?.scrollIntoView({block:'start'});return}
   const local=url.hostname==='jollymix.co.uk'&&/^\/(privacy|terms|support)\/$/.exec(url.pathname);
   if(local)return openLegalPage(local[1]);parentalLinkGate(url.href,key);
  };
 });
}
function parentalLinkGate(url,returnPage){
 if(!/^(https:\/\/|mailto:)/i.test(url))return;
 const first=12+Math.floor(Math.random()*8),second=3+Math.floor(Math.random()*6),answer=first*second;
 showModal('<section class="parental-link-gate"><div class="eyebrow">FOR THE GROWN-UPS</div><h2>A quick grown-up check</h2><p>This opens a website or your email app. Ask a grown-up to continue.</p><form id="parental-link-form"><label for="parental-answer">What is '+first+' × '+second+'?</label><input id="parental-answer" inputmode="numeric" type="text" pattern="[0-9]+" maxlength="3" autocomplete="off" required><p id="parental-link-error" class="small-note" role="status"></p><div class="btn-row"><button class="btn" type="submit">Continue</button><button class="btn secondary" id="parental-link-cancel" type="button">Cancel</button></div></form></section>');
 content.querySelector('#parental-link-cancel').onclick=()=>openLegalPage(returnPage);
 content.querySelector('form').onsubmit=e=>{e.preventDefault();const input=content.querySelector('input');if(input.value.trim()===''||Number(input.value)!==answer){content.querySelector('#parental-link-error').textContent='That doesn’t match. Please ask a grown-up to try again.';input.value='';return}openLegalPage(returnPage);window.open(url,'_blank','noopener,noreferrer')};
}
function removeDevelopmentControls(){
 document.querySelectorAll('.development-entry,#testing-badge,#date-testing-label,.welcome-preview-wait').forEach(e=>e.remove());
}
// Public access to the former test unlock is replaced by the disclosed code entry.
const reviewExploreBefore=exploreEverything;
exploreEverything=function(){if(!globalThis.jollyAppReviewActive)return appReviewAccess();return reviewExploreBefore()};
developmentTools=appReviewAccess;
setCalendarTest=function(){toast('Date simulation is unavailable in this build.')};
const reviewAccessWelcomeBefore=renderJollyWelcome;
renderJollyWelcome=function(){reviewAccessWelcomeBefore();removeDevelopmentControls();const host=main.querySelector('#jolly-production-opening');if(!host)return;const b=document.createElement('button');b.className='app-review-entry';b.textContent='Grown-ups';b.onclick=()=>showGrownUps();host.appendChild(b)};
const reviewAccessStationBefore=powerStation;
powerStation=function(){reviewAccessStationBefore();content.querySelectorAll('button').forEach(b=>{if(/Development:|dates and unlocks|testing/i.test(b.textContent))b.remove()});const links=document.createElement('section');links.innerHTML=grownUpLinks();content.appendChild(links);wireGrownUpLinks();if(globalThis.jollyAppReviewActive){content.querySelector('#station-child')?.remove();const b=content.querySelector('#station-preview');if(b){b.textContent='Leave App Review';b.onclick=leaveAppReview}}else{content.querySelector('#station-preview')?.remove();const b=document.createElement('button');b.className='btn secondary';b.textContent='App Review access';b.onclick=appReviewAccess;content.appendChild(b)}};
const reviewAccessRenderBefore=render;
render=function(){reviewAccessRenderBefore();removeDevelopmentControls();document.querySelector('.app-review-banner')?.remove();if(!globalThis.jollyAppReviewActive)return;const banner=document.createElement('div');banner.className='app-review-banner';banner.innerHTML='<span>Review mode</span><button type="button">Leave review</button>';banner.querySelector('button').onclick=leaveAppReview;document.body.appendChild(banner)};

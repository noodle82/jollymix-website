/* Suppress Safari's selection loupe/callout on play surfaces without blocking
   settings inputs, ordinary scrolling, buttons or VoiceOver activation. */
function isGameSurface(target){return target instanceof Element&&!!target.closest('.water-film-session,.ink-fluid-session,.arcade-session,.personal-care-tool,.workshop-stage,.personal-play,.surprise-prop,.hideout-world')&&!target.closest('input,textarea,select,[contenteditable=true]')}
for(const name of ['selectstart','contextmenu','dragstart'])document.addEventListener(name,e=>{if(isGameSurface(e.target))e.preventDefault()},{capture:true});
document.addEventListener('touchstart',e=>{if(isGameSurface(e.target)&&e.target.closest('canvas')&&!e.target.closest('.difference-picture')){e.preventDefault();window.getSelection()?.removeAllRanges()}},{passive:false});

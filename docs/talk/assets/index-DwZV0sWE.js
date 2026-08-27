(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t)=>{for(let n in t)e[n]=t[n];return e},t=(e,t)=>Array.from(e.querySelectorAll(t)),n=(e,t,n)=>{n?e.classList.add(t):e.classList.remove(t)},r=e=>{if(typeof e==`string`){if(e===`null`)return null;if(e===`true`)return!0;if(e===`false`)return!1;if(e.match(/^-?[\d\.]+$/))return parseFloat(e)}return e},i=(e,t)=>{e.style.transform=t},a=(e,t)=>{let n=e.matches||e.matchesSelector||e.msMatchesSelector;return!!(n&&n.call(e,t))},o=(e,t)=>{if(e&&typeof e.closest==`function`)return e.closest(t);for(;e;){if(a(e,t))return e;e=e.parentElement}return null},s=e=>{e||=document.documentElement;let t=e.requestFullscreen||e.webkitRequestFullscreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullscreen;t&&t.apply(e)},c=(e,t,n,r=``)=>{let i=e.querySelectorAll(`.`+n);for(let t=0;t<i.length;t++){let n=i[t];if(n.parentNode===e)return n}let a=document.createElement(t);return a.className=n,a.innerHTML=r,e.appendChild(a),a},l=e=>{let t=document.createElement(`style`);return e&&e.length>0&&t.appendChild(document.createTextNode(e)),document.head.appendChild(t),t},u=()=>{let e={};location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi,t=>{let n=t.split(`=`).shift(),r=t.split(`=`).pop();return n&&r!==void 0&&(e[n]=r),t});for(let t in e){let n=e[t];e[t]=r(unescape(n))}return e.dependencies!==void 0&&delete e.dependencies,e},d=(e,t=0)=>{if(e){let n,r=e.style.height;return e.style.height=`0px`,e.parentElement&&(e.parentElement.style.height=`auto`),n=t-(e.parentElement?.offsetHeight||0),e.style.height=r+`px`,e.parentElement&&e.parentElement.style.removeProperty(`height`),n}return t},f={mp4:`video/mp4`,m4a:`video/mp4`,ogv:`video/ogg`,mpeg:`video/mpeg`,webm:`video/webm`},p=(e=``)=>{let t=e.split(`.`).pop();return t?f[t]:void 0},m=(e=``)=>encodeURI(e).replace(/%5B/g,`[`).replace(/%5D/g,`]`).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`),h=navigator.userAgent,g=/(iphone|ipod|ipad|android)/gi.test(h)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1;/chrome/i.test(h)&&/edge/i.test(h);var _=/android/gi.test(h),v=function(e){if(e){var t=function(e){return[].slice.call(e)},n=0,r=1,i=2,a=3,o=[],s=null,c=`requestAnimationFrame`in e?function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{sync:!1};e.cancelAnimationFrame(s);var n=function(){return u(o.filter((function(e){return e.dirty&&e.active})))};if(t.sync)return n();s=e.requestAnimationFrame(n)}:function(){},l=function(e){return function(t){o.forEach((function(t){return t.dirty=e})),c(t)}},u=function(e){e.filter((function(e){return!e.styleComputed})).forEach((function(e){e.styleComputed=m(e)})),e.filter(h).forEach(g);var t=e.filter(p);t.forEach(f),t.forEach((function(e){g(e),d(e)})),t.forEach(_)},d=function(e){return e.dirty=n},f=function(e){e.availableWidth=e.element.parentNode.clientWidth,e.currentWidth=e.element.scrollWidth,e.previousFontSize=e.currentFontSize,e.currentFontSize=Math.min(Math.max(e.minSize,e.availableWidth/e.currentWidth*e.previousFontSize),e.maxSize),e.whiteSpace=e.multiLine&&e.currentFontSize===e.minSize?`normal`:`nowrap`},p=function(e){return e.dirty!==i||e.dirty===i&&e.element.parentNode.clientWidth!==e.availableWidth},m=function(t){var n=e.getComputedStyle(t.element,null);return t.currentFontSize=parseFloat(n.getPropertyValue(`font-size`)),t.display=n.getPropertyValue(`display`),t.whiteSpace=n.getPropertyValue(`white-space`),!0},h=function(e){var t=!1;return!e.preStyleTestCompleted&&(/inline-/.test(e.display)||(t=!0,e.display=`inline-block`),e.whiteSpace!==`nowrap`&&(t=!0,e.whiteSpace=`nowrap`),e.preStyleTestCompleted=!0,t)},g=function(e){e.element.style.whiteSpace=e.whiteSpace,e.element.style.display=e.display,e.element.style.fontSize=e.currentFontSize+`px`},_=function(e){e.element.dispatchEvent(new CustomEvent(`fit`,{detail:{oldValue:e.previousFontSize,newValue:e.currentFontSize,scaleFactor:e.currentFontSize/e.previousFontSize}}))},v=function(e,t){return function(n){e.dirty=t,e.active&&c(n)}},y=function(e){return function(){o=o.filter((function(t){return t.element!==e.element})),e.observeMutations&&e.observer.disconnect(),e.element.style.whiteSpace=e.originalStyle.whiteSpace,e.element.style.display=e.originalStyle.display,e.element.style.fontSize=e.originalStyle.fontSize}},b=function(e){return function(){e.active||(e.active=!0,c())}},x=function(e){return function(){return e.active=!1}},S=function(e){e.observeMutations&&(e.observer=new MutationObserver(v(e,r)),e.observer.observe(e.element,e.observeMutations))},C={minSize:16,maxSize:512,multiLine:!0,observeMutations:`MutationObserver`in e&&{subtree:!0,childList:!0,characterData:!0}},w=null,T=function(){e.clearTimeout(w),w=e.setTimeout(l(i),O.observeWindowDelay)},E=[`resize`,`orientationchange`];return Object.defineProperty(O,"observeWindow",{set:function(t){var n=`${t?`add`:`remove`}EventListener`;E.forEach((function(t){e[n](t,T)}))}}),O.observeWindow=!0,O.observeWindowDelay=100,O.fitAll=l(a),O}function D(e,t){var n=Object.assign({},C,t),r=e.map((function(e){var t=Object.assign({},n,{element:e,active:!0});return function(e){e.originalStyle={whiteSpace:e.element.style.whiteSpace,display:e.element.style.display,fontSize:e.element.style.fontSize},S(e),e.newbie=!0,e.dirty=!0,o.push(e)}(t),{element:e,fit:v(t,a),unfreeze:b(t),freeze:x(t),unsubscribe:y(t)}}));return c(),r}function O(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return typeof e==`string`?D(t(document.querySelectorAll(e)),n):D([e],n)[0]}}(typeof window>`u`?null:window);function y(e){"@babel/helpers - typeof";return y=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},y(e)}function b(e,t){if(y(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(y(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function x(e){var t=b(e,`string`);return y(t)==`symbol`?t:t+``}function S(e,t,n){return(t=x(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var C=class{constructor(e){S(this,`allowedToPlayAudio`,null),this.Reveal=e,this.startEmbeddedMedia=this.startEmbeddedMedia.bind(this),this.startEmbeddedIframe=this.startEmbeddedIframe.bind(this),this.preventIframeAutoFocus=this.preventIframeAutoFocus.bind(this),this.ensureMobileMediaPlaying=this.ensureMobileMediaPlaying.bind(this),this.failedAudioPlaybackTargets=new Set,this.failedVideoPlaybackTargets=new Set,this.failedMutedVideoPlaybackTargets=new Set,this.renderMediaPlayButton()}renderMediaPlayButton(){this.mediaPlayButton=document.createElement(`button`),this.mediaPlayButton.className=`r-overlay-button r-media-play-button`,this.mediaPlayButton.addEventListener(`click`,()=>{this.resetTemporarilyMutedMedia(),new Set([...this.failedAudioPlaybackTargets,...this.failedVideoPlaybackTargets,...this.failedMutedVideoPlaybackTargets]).forEach(e=>{this.startEmbeddedMedia({target:e})}),this.clearMediaPlaybackErrors()})}shouldPreload(e){if(this.Reveal.isScrollView())return!0;let t=this.Reveal.getConfig().preloadIframes;return typeof t!=`boolean`&&(t=e.hasAttribute(`data-preload`)),t}load(e,n={}){let r=this.Reveal.getConfig().display;if(r.includes(`!important`)){let t=r.replace(/\s*!important\s*$/,``).trim();e.style.setProperty(`display`,t,`important`)}else e.style.display=r;t(e,`img[data-src], video[data-src], audio[data-src], iframe[data-src]`).forEach(e=>{let t=e.tagName===`IFRAME`;(!t||this.shouldPreload(e))&&(e.setAttribute(`src`,e.getAttribute(`data-src`)),e.setAttribute(`data-lazy-loaded`,``),e.removeAttribute(`data-src`),t&&e.addEventListener(`load`,this.preventIframeAutoFocus))}),t(e,`video, audio`).forEach(e=>{let n=0;t(e,`source[data-src]`).forEach(e=>{e.setAttribute(`src`,e.getAttribute(`data-src`)),e.removeAttribute(`data-src`),e.setAttribute(`data-lazy-loaded`,``),n+=1}),g&&e.tagName===`VIDEO`&&e.setAttribute(`playsinline`,``),n>0&&e.load()});let i=e.slideBackgroundElement;if(i){i.style.display=`block`;let t=e.slideBackgroundContentElement,r=e.getAttribute(`data-background-iframe`);if(i.hasAttribute(`data-loaded`)===!1){i.setAttribute(`data-loaded`,`true`);let a=e.getAttribute(`data-background-image`),o=e.getAttribute(`data-background-video`),s=e.hasAttribute(`data-background-video-loop`),c=e.hasAttribute(`data-background-video-muted`);if(a)/^data:/.test(a.trim())?t.style.backgroundImage=`url(${a.trim()})`:t.style.backgroundImage=a.split(`,`).map(e=>`url(${m(decodeURI(e.trim()))})`).join(`,`);else if(o){let e=document.createElement(`video`);s&&e.setAttribute(`loop`,``),(c||this.Reveal.isSpeakerNotes())&&(e.muted=!0),g&&e.setAttribute(`playsinline`,``),o.split(`,`).forEach(t=>{let n=document.createElement(`source`);n.setAttribute(`src`,t);let r=p(t);r&&n.setAttribute(`type`,r),e.appendChild(n)}),t.appendChild(e)}else if(r&&n.excludeIframes!==!0){let e=document.createElement(`iframe`);e.setAttribute(`allowfullscreen`,``),e.setAttribute(`mozallowfullscreen`,``),e.setAttribute(`webkitallowfullscreen`,``),e.setAttribute(`allow`,`autoplay`),e.setAttribute(`data-src`,r),e.style.width=`100%`,e.style.height=`100%`,e.style.maxHeight=`100%`,e.style.maxWidth=`100%`,t.appendChild(e)}}let a=t.querySelector(`iframe[data-src]`);a&&this.shouldPreload(i)&&!/autoplay=(1|true|yes)/gi.test(r)&&a.getAttribute(`src`)!==r&&a.setAttribute(`src`,r)}this.layout(e)}layout(e){Array.from(e.querySelectorAll(`.r-fit-text`)).forEach(e=>{v(e,{minSize:24,maxSize:this.Reveal.getConfig().height*.8,observeMutations:!1,observeWindow:!1})})}unload(e){e.style.display=`none`;let n=this.Reveal.getSlideBackground(e);n&&(n.style.display=`none`,t(n,`iframe[src]`).forEach(e=>{e.removeAttribute(`src`)})),t(e,`video[data-lazy-loaded][src], audio[data-lazy-loaded][src], iframe[data-lazy-loaded][src]`).forEach(e=>{e.setAttribute(`data-src`,e.getAttribute(`src`)),e.removeAttribute(`src`)}),t(e,`video[data-lazy-loaded] source[src], audio source[src]`).forEach(e=>{e.setAttribute(`data-src`,e.getAttribute(`src`)),e.removeAttribute(`src`)})}formatEmbeddedContent(){let e=(e,n,r)=>{t(this.Reveal.getSlidesElement(),`iframe[`+e+`*="`+n+`"]`).forEach(t=>{let n=t.getAttribute(e);n&&n.indexOf(r)===-1&&t.setAttribute(e,n+(/\?/.test(n)?`&`:`?`)+r)})};e(`src`,`youtube.com/embed/`,`enablejsapi=1`),e(`data-src`,`youtube.com/embed/`,`enablejsapi=1`),e(`src`,`player.vimeo.com/`,`api=1`),e(`data-src`,`player.vimeo.com/`,`api=1`)}startEmbeddedContent(e){if(e){let n=this.Reveal.isSpeakerNotes();t(e,`img[src$=".gif"]`).forEach(e=>{e.setAttribute(`src`,e.getAttribute(`src`))}),t(e,`video, audio`).forEach(e=>{if(o(e,`.fragment`)&&!o(e,`.fragment.visible`))return;let t=this.Reveal.getConfig().autoPlayMedia;if(typeof t!=`boolean`&&(t=e.hasAttribute(`data-autoplay`)||!!o(e,`.slide-background`)),t&&typeof e.play==`function`){if(n&&!e.muted)return;e.readyState>1?this.startEmbeddedMedia({target:e}):g?(e.addEventListener(`canplay`,this.ensureMobileMediaPlaying),this.playMediaElement(e)):(e.removeEventListener(`loadeddata`,this.startEmbeddedMedia),e.addEventListener(`loadeddata`,this.startEmbeddedMedia))}}),n||(t(e,`iframe[src]`).forEach(e=>{o(e,`.fragment`)&&!o(e,`.fragment.visible`)||this.startEmbeddedIframe({target:e})}),t(e,`iframe[data-src]`).forEach(e=>{o(e,`.fragment`)&&!o(e,`.fragment.visible`)||e.getAttribute(`src`)!==e.getAttribute(`data-src`)&&(e.removeEventListener(`load`,this.startEmbeddedIframe),e.addEventListener(`load`,this.startEmbeddedIframe),e.setAttribute(`src`,e.getAttribute(`data-src`)))}))}}ensureMobileMediaPlaying(e){let t=e.target;typeof t.getVideoPlaybackQuality==`function`&&setTimeout(()=>{let e=t.paused===!1,n=t.getVideoPlaybackQuality().totalVideoFrames;e&&n===0&&(t.load(),t.play())},1e3)}startEmbeddedMedia(e){let t=!!o(e.target,`html`),n=!!o(e.target,`.present`);t&&n&&(e.target.paused||e.target.ended)&&(e.target.currentTime=0,this.playMediaElement(e.target)),e.target.removeEventListener(`loadeddata`,this.startEmbeddedMedia)}playMediaElement(e){let t=e.play();t&&typeof t.catch==`function`&&t.then(()=>{e.muted||(this.allowedToPlayAudio=!0)}).catch(t=>{if(t.name===`NotAllowedError`){if(this.allowedToPlayAudio=!1,e.tagName===`VIDEO`){this.onVideoPlaybackNotAllowed(e);let t=!!o(e,`html`),n=!!o(e,`.present`),r=e.muted;t&&n&&!r&&(e.setAttribute(`data-muted-by-reveal`,`true`),e.muted=!0,e.play().catch(()=>{this.onMutedVideoPlaybackNotAllowed(e)}))}else e.tagName===`AUDIO`&&this.onAudioPlaybackNotAllowed(e)}})}startEmbeddedIframe(e){let t=e.target;if(this.preventIframeAutoFocus(e),t&&t.contentWindow){let n=!!o(e.target,`html`),r=!!o(e.target,`.present`);if(n&&r){let e=this.Reveal.getConfig().autoPlayMedia;typeof e!=`boolean`&&(e=t.hasAttribute(`data-autoplay`)||!!o(t,`.slide-background`)),/youtube\.com\/embed\//.test(t.getAttribute(`src`))&&e?t.contentWindow.postMessage(`{"event":"command","func":"playVideo","args":""}`,`*`):/player\.vimeo\.com\//.test(t.getAttribute(`src`))&&e?t.contentWindow.postMessage(`{"method":"play"}`,`*`):t.contentWindow.postMessage(`slide:start`,`*`)}}}stopEmbeddedContent(n,r={}){r=e({unloadIframes:!0},r),n&&n.parentNode&&(t(n,`video, audio`).forEach(e=>{!e.hasAttribute(`data-ignore`)&&typeof e.pause==`function`&&(e.setAttribute(`data-paused-by-reveal`,``),e.pause(),g&&e.removeEventListener(`canplay`,this.ensureMobileMediaPlaying))}),t(n,`iframe`).forEach(e=>{e.contentWindow&&e.contentWindow.postMessage(`slide:stop`,`*`),e.removeEventListener(`load`,this.preventIframeAutoFocus),e.removeEventListener(`load`,this.startEmbeddedIframe)}),t(n,`iframe[src*="youtube.com/embed/"]`).forEach(e=>{!e.hasAttribute(`data-ignore`)&&e.contentWindow&&typeof e.contentWindow.postMessage==`function`&&e.contentWindow.postMessage(`{"event":"command","func":"pauseVideo","args":""}`,`*`)}),t(n,`iframe[src*="player.vimeo.com/"]`).forEach(e=>{!e.hasAttribute(`data-ignore`)&&e.contentWindow&&typeof e.contentWindow.postMessage==`function`&&e.contentWindow.postMessage(`{"method":"pause"}`,`*`)}),r.unloadIframes===!0&&t(n,`iframe[data-src]`).forEach(e=>{e.setAttribute(`src`,`about:blank`),e.removeAttribute(`src`)}))}isAllowedToPlayAudio(){return this.allowedToPlayAudio}showPlayOrUnmuteButton(){let e=this.failedAudioPlaybackTargets.size,t=this.failedVideoPlaybackTargets.size,n=this.failedMutedVideoPlaybackTargets.size,r=`Play media`;n>0?r=`Play video`:t>0?r=`Unmute video`:e>0&&(r=`Play audio`),this.mediaPlayButton.textContent=r,this.Reveal.getRevealElement().appendChild(this.mediaPlayButton)}onAudioPlaybackNotAllowed(e){this.failedAudioPlaybackTargets.add(e),this.showPlayOrUnmuteButton(e)}onVideoPlaybackNotAllowed(e){this.failedVideoPlaybackTargets.add(e),this.showPlayOrUnmuteButton()}onMutedVideoPlaybackNotAllowed(e){this.failedMutedVideoPlaybackTargets.add(e),this.showPlayOrUnmuteButton()}resetTemporarilyMutedMedia(){new Set([...this.failedAudioPlaybackTargets,...this.failedVideoPlaybackTargets,...this.failedMutedVideoPlaybackTargets]).forEach(e=>{e.hasAttribute(`data-muted-by-reveal`)&&(e.muted=!1,e.removeAttribute(`data-muted-by-reveal`))})}clearMediaPlaybackErrors(){this.resetTemporarilyMutedMedia(),this.failedAudioPlaybackTargets.clear(),this.failedVideoPlaybackTargets.clear(),this.failedMutedVideoPlaybackTargets.clear(),this.mediaPlayButton&&this.mediaPlayButton.parentNode&&this.mediaPlayButton.remove()}preventIframeAutoFocus(e){let t=e.target;if(t&&this.Reveal.getConfig().preventIframeAutoFocus){let e=0,n=()=>{document.activeElement===t?document.activeElement.blur():e<1e3&&(e+=100,setTimeout(n,100))};setTimeout(n,100)}}afterSlideChanged(){this.clearMediaPlaybackErrors()}},w=`.slides section`,T=`.slides>section`,E=`.slides>section.present>section`,D=`.backgrounds>.slide-background`,O=/registerPlugin|registerKeyboardShortcut|addKeyBinding|addEventListener|showPreview|previewIframe/,k=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement(`div`),this.element.className=`slide-number`,this.Reveal.getRevealElement().appendChild(this.element)}configure(e,t){let n=`none`;e.slideNumber&&!this.Reveal.isPrintView()&&(e.showSlideNumber===`all`||e.showSlideNumber===`speaker`&&this.Reveal.isSpeakerNotes())&&(n=`block`),this.element.style.display=n}update(){this.Reveal.getConfig().slideNumber&&this.element&&(this.element.innerHTML=this.getSlideNumber())}getSlideNumber(e=this.Reveal.getCurrentSlide()){let t=this.Reveal.getConfig(),n,r=`h.v`;if(typeof t.slideNumber==`function`)n=t.slideNumber(e);else{typeof t.slideNumber==`string`&&(r=t.slideNumber),!/c/.test(r)&&this.Reveal.getHorizontalSlides().length===1&&(r=`c`);let i=e&&e.dataset.visibility===`uncounted`?0:1;switch(n=[],r){case`c`:n.push(this.Reveal.getSlidePastCount(e)+i);break;case`c/t`:n.push(this.Reveal.getSlidePastCount(e)+i,`/`,this.Reveal.getTotalSlides());break;default:let t=this.Reveal.getIndices(e);n.push(t.h+i);let a=r===`h/v`?`/`:`.`;this.Reveal.isVerticalSlide(e)&&n.push(a,t.v+1)}}let i=`#`+this.Reveal.location.getHash(e);return this.formatNumber(n[0],n[1],n[2],i)}formatNumber(e,t,n,r=`#`+this.Reveal.location.getHash()){return typeof n==`number`&&!isNaN(n)?`<a href="${r}">
					<span class="slide-number-a">${e}</span>
					<span class="slide-number-delimiter">${t}</span>
					<span class="slide-number-b">${n}</span>
					</a>`:`<a href="${r}">
					<span class="slide-number-a">${e}</span>
					</a>`}destroy(){this.element.remove()}},ee=class{constructor(e){this.Reveal=e,this.onInput=this.onInput.bind(this),this.onBlur=this.onBlur.bind(this),this.onKeyDown=this.onKeyDown.bind(this)}render(){this.element=document.createElement(`div`),this.element.className=`jump-to-slide`,this.jumpInput=document.createElement(`input`),this.jumpInput.type=`text`,this.jumpInput.className=`jump-to-slide-input`,this.jumpInput.placeholder=`Jump to slide`,this.jumpInput.addEventListener(`input`,this.onInput),this.jumpInput.addEventListener(`keydown`,this.onKeyDown),this.jumpInput.addEventListener(`blur`,this.onBlur),this.element.appendChild(this.jumpInput)}show(){this.indicesOnShow=this.Reveal.getIndices(),this.Reveal.getRevealElement().appendChild(this.element),this.jumpInput.focus()}hide(){this.isVisible()&&(this.element.remove(),this.jumpInput.value=``,clearTimeout(this.jumpTimeout),delete this.jumpTimeout)}isVisible(){return!!this.element.parentNode}jump(){clearTimeout(this.jumpTimeout),delete this.jumpTimeout;let e=this.jumpInput.value.trim(``),t;if(/^\d+$/.test(e)){let n=this.Reveal.getConfig().slideNumber;if(n===`c`||n===`c/t`){let n=this.Reveal.getSlides()[parseInt(e,10)-1];n&&(t=this.Reveal.getIndices(n))}}return t||=(/^\d+\.\d+$/.test(e)&&(e=e.replace(`.`,`/`)),this.Reveal.location.getIndicesFromHash(e,{oneBasedIndex:!0})),!t&&/\S+/i.test(e)&&e.length>1&&(t=this.search(e)),t&&e!==``?(this.Reveal.slide(t.h,t.v,t.f),!0):(this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),!1)}jumpAfter(e){clearTimeout(this.jumpTimeout),this.jumpTimeout=setTimeout(()=>this.jump(),e)}search(e){let t=RegExp(`\\b`+e.trim()+`\\b`,`i`),n=this.Reveal.getSlides().find(e=>t.test(e.innerText));return n?this.Reveal.getIndices(n):null}cancel(){this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),this.hide()}confirm(){this.jump(),this.hide()}destroy(){this.jumpInput.removeEventListener(`input`,this.onInput),this.jumpInput.removeEventListener(`keydown`,this.onKeyDown),this.jumpInput.removeEventListener(`blur`,this.onBlur),this.element.remove()}onKeyDown(e){e.keyCode===13?this.confirm():e.keyCode===27&&(this.cancel(),e.stopImmediatePropagation())}onInput(e){this.jumpAfter(200)}onBlur(){setTimeout(()=>this.hide(),1)}},A=e=>{let t=e.match(/^#([0-9a-f]{3})$/i);if(t&&t[1]){let e=t[1];return{r:parseInt(e.charAt(0),16)*17,g:parseInt(e.charAt(1),16)*17,b:parseInt(e.charAt(2),16)*17}}let n=e.match(/^#([0-9a-f]{6})$/i);if(n&&n[1]){let e=n[1];return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16)}}let r=e.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);if(r)return{r:parseInt(r[1],10),g:parseInt(r[2],10),b:parseInt(r[3],10)};let i=e.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i);return i?{r:parseInt(i[1],10),g:parseInt(i[2],10),b:parseInt(i[3],10),a:parseFloat(i[4])}:null},j=e=>(typeof e==`string`&&(e=A(e)),e?(e.r*299+e.g*587+e.b*114)/1e3:null),te=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement(`div`),this.element.className=`backgrounds`,this.Reveal.getRevealElement().appendChild(this.element)}create(){this.element.innerHTML=``,this.element.classList.add(`no-transition`),this.Reveal.getHorizontalSlides().forEach(e=>{let n=this.createBackground(e,this.element);t(e,`section`).forEach(e=>{this.createBackground(e,n),n.classList.add(`stack`)})}),this.Reveal.getConfig().parallaxBackgroundImage?(this.element.style.backgroundImage=`url("`+this.Reveal.getConfig().parallaxBackgroundImage+`")`,this.element.style.backgroundSize=this.Reveal.getConfig().parallaxBackgroundSize,this.element.style.backgroundRepeat=this.Reveal.getConfig().parallaxBackgroundRepeat,this.element.style.backgroundPosition=this.Reveal.getConfig().parallaxBackgroundPosition,setTimeout(()=>{this.Reveal.getRevealElement().classList.add(`has-parallax-background`)},1)):(this.element.style.backgroundImage=``,this.Reveal.getRevealElement().classList.remove(`has-parallax-background`))}createBackground(e,t){let n=document.createElement(`div`);n.className=`slide-background `+e.className.replace(/present|past|future/,``);let r=document.createElement(`div`);return r.className=`slide-background-content`,n.appendChild(r),t.appendChild(n),e.slideBackgroundElement=n,e.slideBackgroundContentElement=r,this.sync(e),n}sync(e){let t=e.slideBackgroundElement,n=e.slideBackgroundContentElement,r={background:e.getAttribute(`data-background`),backgroundSize:e.getAttribute(`data-background-size`),backgroundImage:e.getAttribute(`data-background-image`),backgroundVideo:e.getAttribute(`data-background-video`),backgroundIframe:e.getAttribute(`data-background-iframe`),backgroundColor:e.getAttribute(`data-background-color`),backgroundGradient:e.getAttribute(`data-background-gradient`),backgroundRepeat:e.getAttribute(`data-background-repeat`),backgroundPosition:e.getAttribute(`data-background-position`),backgroundTransition:e.getAttribute(`data-background-transition`),backgroundOpacity:e.getAttribute(`data-background-opacity`)},i=e.hasAttribute(`data-preload`);e.classList.remove(`has-dark-background`),e.classList.remove(`has-light-background`),t.removeAttribute(`data-loaded`),t.removeAttribute(`data-background-hash`),t.removeAttribute(`data-background-size`),t.removeAttribute(`data-background-transition`),t.style.backgroundColor=``,n.style.backgroundSize=``,n.style.backgroundRepeat=``,n.style.backgroundPosition=``,n.style.backgroundImage=``,n.style.opacity=``,n.innerHTML=``,r.background&&(/^(http|file|\/\/)/gi.test(r.background)||/\.(svg|png|jpg|jpeg|gif|bmp|webp)([?#\s]|$)/gi.test(r.background)?e.setAttribute(`data-background-image`,r.background):t.style.background=r.background),(r.background||r.backgroundColor||r.backgroundGradient||r.backgroundImage||r.backgroundVideo||r.backgroundIframe)&&t.setAttribute(`data-background-hash`,r.background+r.backgroundSize+r.backgroundImage+r.backgroundVideo+r.backgroundIframe+r.backgroundColor+r.backgroundGradient+r.backgroundRepeat+r.backgroundPosition+r.backgroundTransition+r.backgroundOpacity),r.backgroundSize&&t.setAttribute(`data-background-size`,r.backgroundSize),r.backgroundColor&&(t.style.backgroundColor=r.backgroundColor),r.backgroundGradient&&(t.style.backgroundImage=r.backgroundGradient),r.backgroundTransition&&t.setAttribute(`data-background-transition`,r.backgroundTransition),i&&t.setAttribute(`data-preload`,``),r.backgroundSize&&(n.style.backgroundSize=r.backgroundSize),r.backgroundRepeat&&(n.style.backgroundRepeat=r.backgroundRepeat),r.backgroundPosition&&(n.style.backgroundPosition=r.backgroundPosition),r.backgroundOpacity&&(n.style.opacity=r.backgroundOpacity);let a=this.getContrastClass(e);typeof a==`string`&&e.classList.add(a)}getContrastClass(e){let t=e.slideBackgroundElement,n=e.getAttribute(`data-background-color`);if(!n||!A(n)){let e=window.getComputedStyle(t);e&&e.backgroundColor&&(n=e.backgroundColor)}if(n){let e=A(n);if(e&&e.a!==0)return j(n)<128?`has-dark-background`:`has-light-background`}return null}bubbleSlideContrastClassToElement(e,t){[`has-light-background`,`has-dark-background`].forEach(n=>{e.classList.contains(n)?t.classList.add(n):t.classList.remove(n)},this)}update(e=!1){let n=this.Reveal.getConfig(),r=this.Reveal.getCurrentSlide(),i=this.Reveal.getIndices(),a=null,o=n.rtl?`future`:`past`,s=n.rtl?`past`:`future`;if(Array.from(this.element.childNodes).forEach((n,r)=>{n.classList.remove(`past`,`present`,`future`),r<i.h?n.classList.add(o):r>i.h?n.classList.add(s):(n.classList.add(`present`),a=n),(e||r===i.h)&&t(n,`.slide-background`).forEach((e,t)=>{e.classList.remove(`past`,`present`,`future`);let n=typeof i.v==`number`?i.v:0;t<n?e.classList.add(`past`):t>n?e.classList.add(`future`):(e.classList.add(`present`),r===i.h&&(a=e))})}),this.previousBackground&&!this.previousBackground.closest(`body`)&&(this.previousBackground=null),a&&this.previousBackground){let e=this.previousBackground.getAttribute(`data-background-hash`),t=a.getAttribute(`data-background-hash`);if(t&&t===e&&a!==this.previousBackground){this.element.classList.add(`no-transition`);let e=a.querySelector(`video`),t=this.previousBackground.querySelector(`video`);if(e&&t){let n=e.parentNode;t.parentNode.appendChild(e),n.appendChild(t)}}}let c=a!==this.previousBackground;if(c&&this.previousBackground&&this.Reveal.slideContent.stopEmbeddedContent(this.previousBackground,{unloadIframes:!this.Reveal.slideContent.shouldPreload(this.previousBackground)}),c&&a){this.Reveal.slideContent.startEmbeddedContent(a);let e=a.querySelector(`.slide-background-content`);if(e){let t=e.style.backgroundImage||``;/\.gif/i.test(t)&&(e.style.backgroundImage=``,window.getComputedStyle(e).opacity,e.style.backgroundImage=t)}this.previousBackground=a}r&&this.bubbleSlideContrastClassToElement(r,this.Reveal.getRevealElement()),setTimeout(()=>{this.element.classList.remove(`no-transition`)},10)}updateParallax(){let e=this.Reveal.getIndices();if(this.Reveal.getConfig().parallaxBackgroundImage){let t=this.Reveal.getHorizontalSlides(),n=this.Reveal.getVerticalSlides(),r=this.element.style.backgroundSize.split(` `),i,a;r.length===1?i=a=parseInt(r[0],10):(i=parseInt(r[0],10),a=parseInt(r[1],10));let o=this.element.offsetWidth,s=t.length,c,l;c=typeof this.Reveal.getConfig().parallaxBackgroundHorizontal==`number`?this.Reveal.getConfig().parallaxBackgroundHorizontal:s>1?(i-o)/(s-1):0,l=c*e.h*-1;let u=this.element.offsetHeight,d=n.length,f,p;f=typeof this.Reveal.getConfig().parallaxBackgroundVertical==`number`?this.Reveal.getConfig().parallaxBackgroundVertical:(a-u)/(d-1),p=d>0?f*e.v:0,this.element.style.backgroundPosition=l+`px `+-p+`px`}}destroy(){this.element.remove()}},M=0,ne=class{constructor(e){this.Reveal=e}run(e,t){this.reset();let n=this.Reveal.getSlides(),r=n.indexOf(t),i=n.indexOf(e);if(e&&t&&e.hasAttribute(`data-auto-animate`)&&t.hasAttribute(`data-auto-animate`)&&e.getAttribute(`data-auto-animate-id`)===t.getAttribute(`data-auto-animate-id`)&&!(r>i?t:e).hasAttribute(`data-auto-animate-restart`)){this.autoAnimateStyleSheet=this.autoAnimateStyleSheet||l();let n=this.getAutoAnimateOptions(t);e.dataset.autoAnimate=`pending`,t.dataset.autoAnimate=`pending`,n.slideDirection=r>i?`forward`:`backward`;let a=e.style.display===`none`;a&&(e.style.display=this.Reveal.getConfig().display);let o=this.getAutoAnimatableElements(e,t).map(e=>this.autoAnimateElements(e.from,e.to,e.options||{},n,M++));if(a&&(e.style.display=`none`),t.dataset.autoAnimateUnmatched!==`false`&&this.Reveal.getConfig().autoAnimateUnmatched===!0){let e=n.duration*.8,r=n.duration*.2;this.getUnmatchedAutoAnimateElements(t).forEach(e=>{let t=this.getAutoAnimateOptions(e,n),r=`unmatched`;(t.duration!==n.duration||t.delay!==n.delay)&&(r=`unmatched-`+M++,o.push(`[data-auto-animate="running"] [data-auto-animate-target="${r}"] { transition: opacity ${t.duration}s ease ${t.delay}s; }`)),e.dataset.autoAnimateTarget=r},this),o.push(`[data-auto-animate="running"] [data-auto-animate-target="unmatched"] { transition: opacity ${e}s ease ${r}s; }`)}this.autoAnimateStyleSheet.innerHTML=o.join(``),requestAnimationFrame(()=>{this.autoAnimateStyleSheet&&(getComputedStyle(this.autoAnimateStyleSheet).fontWeight,t.dataset.autoAnimate=`running`)}),this.Reveal.dispatchEvent({type:`autoanimate`,data:{fromSlide:e,toSlide:t,sheet:this.autoAnimateStyleSheet}})}}reset(){t(this.Reveal.getRevealElement(),`[data-auto-animate]:not([data-auto-animate=""])`).forEach(e=>{e.dataset.autoAnimate=``}),t(this.Reveal.getRevealElement(),`[data-auto-animate-target]`).forEach(e=>{delete e.dataset.autoAnimateTarget}),this.autoAnimateStyleSheet&&this.autoAnimateStyleSheet.parentNode&&(this.autoAnimateStyleSheet.parentNode.removeChild(this.autoAnimateStyleSheet),this.autoAnimateStyleSheet=null)}autoAnimateElements(e,t,n,r,i){e.dataset.autoAnimateTarget=``,t.dataset.autoAnimateTarget=i;let a=this.getAutoAnimateOptions(t,r);n.delay!==void 0&&(a.delay=n.delay),n.duration!==void 0&&(a.duration=n.duration),n.easing!==void 0&&(a.easing=n.easing);let o=this.getAutoAnimatableProperties(`from`,e,n),s=this.getAutoAnimatableProperties(`to`,t,n);if(t.classList.contains(`fragment`)&&delete s.styles.opacity,n.translate!==!1||n.scale!==!1){let e=this.Reveal.getScale(),t={x:(o.x-s.x)/e,y:(o.y-s.y)/e,scaleX:o.width/s.width,scaleY:o.height/s.height};t.x=Math.round(t.x*1e3)/1e3,t.y=Math.round(t.y*1e3)/1e3,t.scaleX=Math.round(t.scaleX*1e3)/1e3,t.scaleX=Math.round(t.scaleX*1e3)/1e3;let r=n.translate!==!1&&(t.x!==0||t.y!==0),i=n.scale!==!1&&(t.scaleX!==0||t.scaleY!==0);if(r||i){let e=[];r&&e.push(`translate(${t.x}px, ${t.y}px)`),i&&e.push(`scale(${t.scaleX}, ${t.scaleY})`),o.styles.transform=e.join(` `),o.styles[`transform-origin`]=`top left`,s.styles.transform=`none`}}for(let e in s.styles){let t=s.styles[e],n=o.styles[e];t===n?delete s.styles[e]:(t.explicitValue===!0&&(s.styles[e]=t.value),n.explicitValue===!0&&(o.styles[e]=n.value))}let c=``,l=Object.keys(s.styles);if(l.length>0){o.styles.transition=`none`,s.styles.transition=`all ${a.duration}s ${a.easing} ${a.delay}s`,s.styles[`transition-property`]=l.join(`, `),s.styles[`will-change`]=l.join(`, `);let e=Object.keys(o.styles).map(e=>e+`: `+o.styles[e]+` !important;`).join(``),t=Object.keys(s.styles).map(e=>e+`: `+s.styles[e]+` !important;`).join(``);c=`[data-auto-animate-target="`+i+`"] {`+e+`}[data-auto-animate="running"] [data-auto-animate-target="`+i+`"] {`+t+`}`}return c}getAutoAnimateOptions(t,n){let r={easing:this.Reveal.getConfig().autoAnimateEasing,duration:this.Reveal.getConfig().autoAnimateDuration,delay:0};if(r=e(r,n),t.parentNode){let e=o(t.parentNode,`[data-auto-animate-target]`);e&&(r=this.getAutoAnimateOptions(e,r))}return t.dataset.autoAnimateEasing&&(r.easing=t.dataset.autoAnimateEasing),t.dataset.autoAnimateDuration&&(r.duration=parseFloat(t.dataset.autoAnimateDuration)),t.dataset.autoAnimateDelay&&(r.delay=parseFloat(t.dataset.autoAnimateDelay)),r}getAutoAnimatableProperties(e,t,n){let r=this.Reveal.getConfig(),i={styles:[]};if(n.translate!==!1||n.scale!==!1){let e;if(typeof n.measure==`function`)e=n.measure(t);else if(r.center)e=t.getBoundingClientRect();else{let n=this.Reveal.getScale();e={x:t.offsetLeft*n,y:t.offsetTop*n,width:t.offsetWidth*n,height:t.offsetHeight*n}}i.x=e.x,i.y=e.y,i.width=e.width,i.height=e.height}let a=getComputedStyle(t);return(n.styles||r.autoAnimateStyles).forEach(t=>{let n;typeof t==`string`&&(t={property:t}),t.from!==void 0&&e===`from`?n={value:t.from,explicitValue:!0}:t.to!==void 0&&e===`to`?n={value:t.to,explicitValue:!0}:(t.property===`line-height`&&(n=parseFloat(a[`line-height`])/parseFloat(a[`font-size`])),isNaN(n)&&(n=a[t.property])),n!==``&&(i.styles[t.property]=n)}),i}getAutoAnimatableElements(e,t){let n=(typeof this.Reveal.getConfig().autoAnimateMatcher==`function`?this.Reveal.getConfig().autoAnimateMatcher:this.getAutoAnimatePairs).call(this,e,t),r=[];return n.filter((e,t)=>{if(r.indexOf(e.to)===-1)return r.push(e.to),!0})}getAutoAnimatePairs(e,t){let n=[],r=`h1, h2, h3, h4, h5, h6, p, li`;return this.findAutoAnimateMatches(n,e,t,`[data-id]`,e=>e.nodeName+`:::`+e.getAttribute(`data-id`)),this.findAutoAnimateMatches(n,e,t,r,e=>e.nodeName+`:::`+e.textContent.trim()),this.findAutoAnimateMatches(n,e,t,`img, video, iframe`,e=>e.nodeName+`:::`+(e.getAttribute(`src`)||e.getAttribute(`data-src`))),this.findAutoAnimateMatches(n,e,t,`pre`,e=>e.nodeName+`:::`+e.textContent.trim()),n.forEach(e=>{a(e.from,r)?e.options={scale:!1}:a(e.from,`pre`)&&(e.options={scale:!1,styles:[`width`,`height`]},this.findAutoAnimateMatches(n,e.from,e.to,`.hljs .hljs-ln-code`,e=>e.textContent,{scale:!1,styles:[],measure:this.getLocalBoundingBox.bind(this)}),this.findAutoAnimateMatches(n,e.from,e.to,`.hljs .hljs-ln-numbers[data-line-number]`,e=>e.getAttribute(`data-line-number`),{scale:!1,styles:[`width`],measure:this.getLocalBoundingBox.bind(this)}))},this),n}getLocalBoundingBox(e){let t=this.Reveal.getScale();return{x:Math.round(e.offsetLeft*t*100)/100,y:Math.round(e.offsetTop*t*100)/100,width:Math.round(e.offsetWidth*t*100)/100,height:Math.round(e.offsetHeight*t*100)/100}}findAutoAnimateMatches(e,t,n,r,i,a){let o={},s={};[].slice.call(t.querySelectorAll(r)).forEach((e,t)=>{let n=i(e);typeof n==`string`&&n.length&&(o[n]=o[n]||[],o[n].push(e))}),[].slice.call(n.querySelectorAll(r)).forEach((t,n)=>{let r=i(t);s[r]=s[r]||[],s[r].push(t);let c;if(o[r]){let e=s[r].length-1,t=o[r].length-1;o[r][e]?(c=o[r][e],o[r][e]=null):o[r][t]&&(c=o[r][t],o[r][t]=null)}c&&e.push({from:c,to:t,options:a})})}getUnmatchedAutoAnimateElements(e){return[].slice.call(e.children).reduce((e,t)=>{let n=t.querySelector(`[data-auto-animate-target]`);return!t.hasAttribute(`data-auto-animate-target`)&&!n&&e.push(t),t.querySelector(`[data-auto-animate-target]`)&&(e=e.concat(this.getUnmatchedAutoAnimateElements(t))),e},[])}},re=500,ie=4,ae=6,N=8,oe=class{constructor(e){this.Reveal=e,this.active=!1,this.activatedCallbacks=[],this.onScroll=this.onScroll.bind(this)}activate(){if(this.active)return;let e=this.Reveal.getState();this.active=!0,this.slideHTMLBeforeActivation=this.Reveal.getSlidesElement().innerHTML;let n=t(this.Reveal.getRevealElement(),T),r=t(this.Reveal.getRevealElement(),D);this.viewportElement.classList.add(`loading-scroll-mode`,`reveal-scroll`);let i,a=window.getComputedStyle(this.viewportElement);a&&a.background&&(i=a.background);let o=[],s=n[0].parentNode,c,l=(e,t,n,a)=>{let s;if(c&&this.Reveal.shouldAutoAnimateBetween(c,e))s=document.createElement(`div`),s.className=`scroll-page-content scroll-auto-animate-page`,s.style.display=`none`,c.closest(`.scroll-page-content`).parentNode.appendChild(s);else{let e=document.createElement(`div`);if(e.className=`scroll-page`,o.push(e),a&&r.length>t){let n=r[t],a=window.getComputedStyle(n);a&&a.background?e.style.background=a.background:i&&(e.style.background=i)}else i&&(e.style.background=i);let n=document.createElement(`div`);n.className=`scroll-page-sticky`,e.appendChild(n),s=document.createElement(`div`),s.className=`scroll-page-content`,n.appendChild(s)}s.appendChild(e),e.classList.remove(`past`,`future`),e.setAttribute(`data-index-h`,t),e.setAttribute(`data-index-v`,n),e.slideBackgroundElement&&(e.slideBackgroundElement.remove(`past`,`future`),s.insertBefore(e.slideBackgroundElement,e)),c=e};n.forEach((e,t)=>{this.Reveal.isVerticalStack(e)?e.querySelectorAll(`section`).forEach((e,n)=>{l(e,t,n,!0)}):l(e,t,0)},this),this.createProgressBar(),t(this.Reveal.getRevealElement(),`.stack`).forEach(e=>e.remove()),o.forEach(e=>s.appendChild(e)),this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()),this.Reveal.layout(),this.Reveal.setState(e),this.activatedCallbacks.forEach(e=>e()),this.activatedCallbacks=[],this.restoreScrollPosition(),this.viewportElement.classList.remove(`loading-scroll-mode`),this.viewportElement.addEventListener(`scroll`,this.onScroll,{passive:!0})}deactivate(){if(!this.active)return;let e=this.Reveal.getState();this.active=!1,this.viewportElement.removeEventListener(`scroll`,this.onScroll),this.viewportElement.classList.remove(`reveal-scroll`),this.removeProgressBar(),this.Reveal.getSlidesElement().innerHTML=this.slideHTMLBeforeActivation,this.Reveal.sync(),this.Reveal.setState(e),this.slideHTMLBeforeActivation=null}toggle(e){typeof e==`boolean`?e?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate()}isActive(){return this.active}createProgressBar(){this.progressBar=document.createElement(`div`),this.progressBar.className=`scrollbar`,this.progressBarInner=document.createElement(`div`),this.progressBarInner.className=`scrollbar-inner`,this.progressBar.appendChild(this.progressBarInner),this.progressBarPlayhead=document.createElement(`div`),this.progressBarPlayhead.className=`scrollbar-playhead`,this.progressBarInner.appendChild(this.progressBarPlayhead),this.viewportElement.insertBefore(this.progressBar,this.viewportElement.firstChild);let e=e=>{let t=(e.clientY-this.progressBarInner.getBoundingClientRect().top)/this.progressBarHeight;t=Math.max(Math.min(t,1),0),this.viewportElement.scrollTop=t*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight)},t=n=>{this.draggingProgressBar=!1,this.showProgressBar(),document.removeEventListener(`mousemove`,e),document.removeEventListener(`mouseup`,t)};this.progressBarInner.addEventListener(`mousedown`,n=>{n.preventDefault(),this.draggingProgressBar=!0,document.addEventListener(`mousemove`,e),document.addEventListener(`mouseup`,t),e(n)})}removeProgressBar(){this.progressBar&&=(this.progressBar.remove(),null)}layout(){this.isActive()&&(this.syncPages(),this.syncScrollPosition())}syncPages(){let e=this.Reveal.getConfig(),t=this.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),n=this.Reveal.getScale(),r=e.scrollLayout===`compact`,i=this.viewportElement.offsetHeight,a=t.height*n,o=r?a:i;this.scrollTriggerHeight=r?a:i,this.viewportElement.style.setProperty(`--page-height`,o+`px`),this.viewportElement.style.scrollSnapType=typeof e.scrollSnap==`string`?`y ${e.scrollSnap}`:``,this.slideTriggers=[],this.pages=Array.from(this.Reveal.getRevealElement().querySelectorAll(`.scroll-page`)).map(n=>{let a=this.createPage({pageElement:n,slideElement:n.querySelector(`section`),stickyElement:n.querySelector(`.scroll-page-sticky`),contentElement:n.querySelector(`.scroll-page-content`),backgroundElement:n.querySelector(`.slide-background`),autoAnimateElements:n.querySelectorAll(`.scroll-auto-animate-page`),autoAnimatePages:[]});a.pageElement.style.setProperty(`--slide-height`,e.center===!0?`auto`:t.height+`px`),this.slideTriggers.push({page:a,activate:()=>this.activatePage(a),deactivate:()=>this.deactivatePage(a)}),this.createFragmentTriggersForPage(a),a.autoAnimateElements.length>0&&this.createAutoAnimateTriggersForPage(a);let s=Math.max(a.scrollTriggers.length-1,0);s+=a.autoAnimatePages.reduce((e,t)=>e+Math.max(t.scrollTriggers.length-1,0),a.autoAnimatePages.length),a.pageElement.querySelectorAll(`.scroll-snap-point`).forEach(e=>e.remove());for(let e=0;e<s+1;e++){let t=document.createElement(`div`);t.className=`scroll-snap-point`,t.style.height=this.scrollTriggerHeight+`px`,t.style.scrollSnapAlign=r?`center`:`start`,a.pageElement.appendChild(t),e===0&&(t.style.marginTop=-this.scrollTriggerHeight+`px`)}return r&&a.scrollTriggers.length>0?(a.pageHeight=i,a.pageElement.style.setProperty(`--page-height`,i+`px`)):(a.pageHeight=o,a.pageElement.style.removeProperty(`--page-height`)),a.scrollPadding=this.scrollTriggerHeight*s,a.totalHeight=a.pageHeight+a.scrollPadding,a.pageElement.style.setProperty(`--page-scroll-padding`,a.scrollPadding+`px`),s>0?(a.stickyElement.style.position=`sticky`,a.stickyElement.style.top=Math.max((i-a.pageHeight)/2,0)+`px`):(a.stickyElement.style.position=`relative`,a.pageElement.style.scrollSnapAlign=a.pageHeight<i?`center`:`start`),a}),this.setTriggerRanges(),this.viewportElement.setAttribute(`data-scrollbar`,e.scrollProgress),e.scrollProgress&&this.totalScrollTriggerCount>1?(this.progressBar||this.createProgressBar(),this.syncProgressBar()):this.removeProgressBar()}setTriggerRanges(){this.totalScrollTriggerCount=this.slideTriggers.reduce((e,t)=>e+Math.max(t.page.scrollTriggers.length,1),0);let e=0;this.slideTriggers.forEach((t,n)=>{t.range=[e,e+Math.max(t.page.scrollTriggers.length,1)/this.totalScrollTriggerCount];let r=(t.range[1]-t.range[0])/t.page.scrollTriggers.length;t.page.scrollTriggers.forEach((t,n)=>{t.range=[e+n*r,e+(n+1)*r]}),e=t.range[1]}),this.slideTriggers[this.slideTriggers.length-1].range[1]=1}createFragmentTriggersForPage(e,t){t||=e.slideElement;let n=this.Reveal.fragments.sort(t.querySelectorAll(`.fragment`),!0);return n.length&&(e.fragments=this.Reveal.fragments.sort(t.querySelectorAll(`.fragment:not(.disabled)`)),e.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(-1,e.fragments,t)}}),n.forEach((n,r)=>{e.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(r,e.fragments,t)}})})),e.scrollTriggers.length}createAutoAnimateTriggersForPage(e){e.autoAnimateElements.length>0&&this.slideTriggers.push(...Array.from(e.autoAnimateElements).map((t,n)=>{let r=this.createPage({slideElement:t.querySelector(`section`),contentElement:t,backgroundElement:t.querySelector(`.slide-background`)});return this.createFragmentTriggersForPage(r,r.slideElement),e.autoAnimatePages.push(r),{page:r,activate:()=>this.activatePage(r),deactivate:()=>this.deactivatePage(r)}}))}createPage(e){return e.scrollTriggers=[],e.indexh=parseInt(e.slideElement.getAttribute(`data-index-h`),10),e.indexv=parseInt(e.slideElement.getAttribute(`data-index-v`),10),e}syncProgressBar(){this.progressBarInner.querySelectorAll(`.scrollbar-slide`).forEach(e=>e.remove());let e=this.viewportElement.scrollHeight,t=this.viewportElement.offsetHeight,n=t/e;this.progressBarHeight=this.progressBarInner.offsetHeight,this.playheadHeight=Math.max(n*this.progressBarHeight,N),this.progressBarScrollableHeight=this.progressBarHeight-this.playheadHeight;let r=t/e*this.progressBarHeight,i=Math.min(r/8,ie);this.progressBarPlayhead.style.height=this.playheadHeight-i+`px`,r>ae?this.slideTriggers.forEach(e=>{let{page:t}=e;t.progressBarSlide=document.createElement(`div`),t.progressBarSlide.className=`scrollbar-slide`,t.progressBarSlide.style.top=e.range[0]*this.progressBarHeight+`px`,t.progressBarSlide.style.height=(e.range[1]-e.range[0])*this.progressBarHeight-i+`px`,t.progressBarSlide.classList.toggle(`has-triggers`,t.scrollTriggers.length>0),this.progressBarInner.appendChild(t.progressBarSlide),t.scrollTriggerElements=t.scrollTriggers.map((n,r)=>{let a=document.createElement(`div`);return a.className=`scrollbar-trigger`,a.style.top=(n.range[0]-e.range[0])*this.progressBarHeight+`px`,a.style.height=(n.range[1]-n.range[0])*this.progressBarHeight-i+`px`,t.progressBarSlide.appendChild(a),r===0&&(a.style.display=`none`),a})}):this.pages.forEach(e=>e.progressBarSlide=null)}syncScrollPosition(){let e=this.viewportElement.offsetHeight,t=e/this.viewportElement.scrollHeight,n=this.viewportElement.scrollTop,r=this.viewportElement.scrollHeight-e,i=Math.max(Math.min(n/r,1),0),a=Math.max(Math.min((n+e/2)/this.viewportElement.scrollHeight,1),0),o;this.slideTriggers.forEach(e=>{let{page:n}=e;i>=e.range[0]-t*2&&i<=e.range[1]+t*2&&!n.loaded?(n.loaded=!0,this.Reveal.slideContent.load(n.slideElement)):n.loaded&&(n.loaded=!1,this.Reveal.slideContent.unload(n.slideElement)),i>=e.range[0]&&i<=e.range[1]?(this.activateTrigger(e),o=e.page):e.active&&this.deactivateTrigger(e)}),o&&o.scrollTriggers.forEach(e=>{a>=e.range[0]&&a<=e.range[1]?this.activateTrigger(e):e.active&&this.deactivateTrigger(e)}),this.setProgressBarValue(n/(this.viewportElement.scrollHeight-e))}setProgressBarValue(e){this.progressBar&&(this.progressBarPlayhead.style.transform=`translateY(${e*this.progressBarScrollableHeight}px)`,this.getAllPages().filter(e=>e.progressBarSlide).forEach(e=>{e.progressBarSlide.classList.toggle(`active`,e.active===!0),e.scrollTriggers.forEach((t,n)=>{e.scrollTriggerElements[n].classList.toggle(`active`,e.active===!0&&t.active===!0)})}),this.showProgressBar())}showProgressBar(){this.progressBar.classList.add(`visible`),clearTimeout(this.hideProgressBarTimeout),this.Reveal.getConfig().scrollProgress===`auto`&&!this.draggingProgressBar&&(this.hideProgressBarTimeout=setTimeout(()=>{this.progressBar&&this.progressBar.classList.remove(`visible`)},re))}prev(){this.viewportElement.scrollTop-=this.scrollTriggerHeight}next(){this.viewportElement.scrollTop+=this.scrollTriggerHeight}scrollToSlide(e){if(!this.active)this.activatedCallbacks.push(()=>this.scrollToSlide(e));else{let t=this.getScrollTriggerBySlide(e);t&&(this.viewportElement.scrollTop=t.range[0]*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight))}}storeScrollPosition(){clearTimeout(this.storeScrollPositionTimeout),this.storeScrollPositionTimeout=setTimeout(()=>{sessionStorage.setItem(`reveal-scroll-top`,this.viewportElement.scrollTop),sessionStorage.setItem(`reveal-scroll-origin`,location.origin+location.pathname),this.storeScrollPositionTimeout=null},50)}restoreScrollPosition(){let e=sessionStorage.getItem(`reveal-scroll-top`),t=sessionStorage.getItem(`reveal-scroll-origin`);e&&t===location.origin+location.pathname&&(this.viewportElement.scrollTop=parseInt(e,10))}activatePage(e){if(!e.active){e.active=!0;let{slideElement:t,backgroundElement:n,contentElement:r,indexh:i,indexv:a}=e;r.style.display=`block`,t.classList.add(`present`),n&&n.classList.add(`present`),this.Reveal.setCurrentScrollPage(t,i,a),this.Reveal.backgrounds.bubbleSlideContrastClassToElement(t,this.viewportElement),Array.from(r.parentNode.querySelectorAll(`.scroll-page-content`)).forEach(e=>{e!==r&&(e.style.display=`none`)})}}deactivatePage(e){e.active&&(e.active=!1,e.slideElement&&e.slideElement.classList.remove(`present`),e.backgroundElement&&e.backgroundElement.classList.remove(`present`))}activateTrigger(e){e.active||(e.active=!0,e.activate())}deactivateTrigger(e){e.active&&(e.active=!1,e.deactivate&&e.deactivate())}getSlideByIndices(e,t){let n=this.getAllPages().find(n=>n.indexh===e&&n.indexv===t);return n?n.slideElement:null}getScrollTriggerBySlide(e){return this.slideTriggers.find(t=>t.page.slideElement===e)}getAllPages(){return this.pages.flatMap(e=>[e,...e.autoAnimatePages||[]])}onScroll(){this.syncScrollPosition(),this.storeScrollPosition()}get viewportElement(){return this.Reveal.getViewportElement()}};function P(e,t,n,r,i,a,o){try{var s=e[a](o),c=s.value}catch(e){n(e);return}s.done?t(c):Promise.resolve(c).then(r,i)}function se(e){return function(){var t=this,n=arguments;return new Promise(function(r,i){var a=e.apply(t,n);function o(e){P(a,r,i,o,s,`next`,e)}function s(e){P(a,r,i,o,s,`throw`,e)}o(void 0)})}}var ce=class{constructor(e){this.Reveal=e}activate(){var e=this;return se(function*(){let n=e.Reveal.getConfig(),r=t(e.Reveal.getRevealElement(),w),i=n.slideNumber&&/all|print/i.test(n.showSlideNumber),a=e.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),o=Math.floor(a.width*(1+n.margin)),s=Math.floor(a.height*(1+n.margin)),c=a.width,u=a.height;yield new Promise(requestAnimationFrame),l(`@page{size:`+o+`px `+s+`px; margin: 0px;}`),l(`.reveal section>img, .reveal section>video, .reveal section>iframe{max-width: `+c+`px; max-height:`+u+`px}`),document.documentElement.classList.add(`reveal-print`,`print-pdf`),document.body.style.width=o+`px`,document.body.style.height=s+`px`;let d=e.Reveal.getViewportElement(),f;if(d){let e=window.getComputedStyle(d);e&&e.background&&(f=e.background)}yield new Promise(requestAnimationFrame),e.Reveal.layoutSlideContents(c,u),yield new Promise(requestAnimationFrame);let p=r.map(e=>e.scrollHeight),m=[],h=r[0].parentNode,g=1;r.forEach(function(e,r){if(e.classList.contains(`stack`)===!1){let a=(o-c)/2,l=(s-u)/2,d=p[r],h=Math.max(Math.ceil(d/s),1);h=Math.min(h,n.pdfMaxPagesPerSlide),(h===1&&n.center||e.classList.contains(`center`))&&(l=Math.max((s-d)/2,0));let _=document.createElement(`div`);if(m.push(_),_.className=`pdf-page`,_.style.height=(s+n.pdfPageHeightOffset)*h+`px`,f&&(_.style.background=f),_.appendChild(e),e.style.left=a+`px`,e.style.top=l+`px`,e.style.width=c+`px`,this.Reveal.slideContent.layout(e),e.slideBackgroundElement&&_.insertBefore(e.slideBackgroundElement,e),n.showNotes){let t=this.Reveal.getSlideNotes(e);if(t){let e=typeof n.showNotes==`string`?n.showNotes:`inline`,r=document.createElement(`div`);r.classList.add(`speaker-notes`),r.classList.add(`speaker-notes-pdf`),r.setAttribute(`data-layout`,e),r.innerHTML=t,e===`separate-page`?m.push(r):(r.style.left=`8px`,r.style.bottom=`8px`,r.style.width=o-16+`px`,_.appendChild(r))}}if(i){let e=document.createElement(`div`);e.classList.add(`slide-number`),e.classList.add(`slide-number-pdf`),e.innerHTML=g++,_.appendChild(e)}if(n.pdfSeparateFragments){let e=this.Reveal.fragments.sort(_.querySelectorAll(`.fragment`),!0),t;e.forEach(function(e,n){t&&t.forEach(function(e){e.classList.remove(`current-fragment`)}),e.forEach(function(e){e.classList.add(`visible`,`current-fragment`)},this);let r=_.cloneNode(!0);if(i){let e=r.querySelector(`.slide-number-pdf`),t=n+1;e.innerHTML+=`.`+t}m.push(r),t=e},this),e.forEach(function(e){e.forEach(function(e){e.classList.remove(`visible`,`current-fragment`)})})}else t(_,`.fragment:not(.fade-out)`).forEach(function(e){e.classList.add(`visible`)})}},e),yield new Promise(requestAnimationFrame),m.forEach(e=>h.appendChild(e)),e.Reveal.slideContent.layout(e.Reveal.getSlidesElement()),e.Reveal.dispatchEvent({type:`pdf-ready`}),d.classList.remove(`loading-scroll-mode`)})()}isActive(){return this.Reveal.getConfig().view===`print`}},le=class{constructor(e){this.Reveal=e}configure(e,t){e.fragments===!1?this.disable():t.fragments===!1&&this.enable()}disable(){t(this.Reveal.getSlidesElement(),`.fragment`).forEach(e=>{e.classList.add(`visible`),e.classList.remove(`current-fragment`)})}enable(){t(this.Reveal.getSlidesElement(),`.fragment`).forEach(e=>{e.classList.remove(`visible`),e.classList.remove(`current-fragment`)})}availableRoutes(){let e=this.Reveal.getCurrentSlide();if(e&&this.Reveal.getConfig().fragments){let t=e.querySelectorAll(`.fragment:not(.disabled)`),n=e.querySelectorAll(`.fragment:not(.disabled):not(.visible)`);return{prev:t.length-n.length>0,next:!!n.length}}return{prev:!1,next:!1}}sort(e,t=!1){e=Array.from(e);let n=[],r=[],i=[];e.forEach(e=>{if(e.hasAttribute(`data-fragment-index`)){let t=parseInt(e.getAttribute(`data-fragment-index`),10);n[t]||(n[t]=[]),n[t].push(e)}else r.push([e])}),n=n.concat(r);let a=0;return n.forEach(e=>{e.forEach(e=>{i.push(e),e.setAttribute(`data-fragment-index`,a)}),a++}),t===!0?n:i}sortAll(){this.Reveal.getHorizontalSlides().forEach(e=>{let n=t(e,`section`);n.forEach((e,t)=>{this.sort(e.querySelectorAll(`.fragment`))},this),n.length===0&&this.sort(e.querySelectorAll(`.fragment`))})}update(e,t,n=this.Reveal.getCurrentSlide()){let r={shown:[],hidden:[]};if(n&&this.Reveal.getConfig().fragments&&(t||=this.sort(n.querySelectorAll(`.fragment`)),t.length)){let i=0;if(typeof e!=`number`){let t=this.sort(n.querySelectorAll(`.fragment.visible`)).pop();t&&(e=parseInt(t.getAttribute(`data-fragment-index`)||0,10))}Array.from(t).forEach((t,n)=>{if(t.hasAttribute(`data-fragment-index`)&&(n=parseInt(t.getAttribute(`data-fragment-index`),10)),i=Math.max(i,n),n<=e){let i=t.classList.contains(`visible`);t.classList.add(`visible`),t.classList.remove(`current-fragment`),n===e&&(this.Reveal.announceStatus(this.Reveal.getStatusText(t)),t.classList.add(`current-fragment`),this.Reveal.slideContent.startEmbeddedContent(t)),i||(r.shown.push(t),this.Reveal.dispatchEvent({target:t,type:`visible`,bubbles:!1}))}else{let e=t.classList.contains(`visible`);t.classList.remove(`visible`),t.classList.remove(`current-fragment`),e&&(this.Reveal.slideContent.stopEmbeddedContent(t),r.hidden.push(t),this.Reveal.dispatchEvent({target:t,type:`hidden`,bubbles:!1}))}}),e=typeof e==`number`?e:-1,e=Math.max(Math.min(e,i),-1),n.setAttribute(`data-fragment`,e)}return r.hidden.length&&this.Reveal.dispatchEvent({type:`fragmenthidden`,data:{fragment:r.hidden[0],fragments:r.hidden}}),r.shown.length&&this.Reveal.dispatchEvent({type:`fragmentshown`,data:{fragment:r.shown[0],fragments:r.shown}}),r}sync(e=this.Reveal.getCurrentSlide()){return this.sort(e.querySelectorAll(`.fragment`))}goto(e,t=0){let n=this.Reveal.getCurrentSlide();if(n&&this.Reveal.getConfig().fragments){let r=this.sort(n.querySelectorAll(`.fragment:not(.disabled)`));if(r.length){if(typeof e!=`number`){let t=this.sort(n.querySelectorAll(`.fragment:not(.disabled).visible`)).pop();e=t?parseInt(t.getAttribute(`data-fragment-index`)||0,10):-1}e+=t;let i=this.update(e,r);return this.Reveal.controls.update(),this.Reveal.progress.update(),this.Reveal.getConfig().fragmentInURL&&this.Reveal.location.writeURL(),!!(i.shown.length||i.hidden.length)}}return!1}next(){return this.goto(null,1)}prev(){return this.goto(null,-1)}},ue=class{constructor(e){this.Reveal=e,this.active=!1,this.onSlideClicked=this.onSlideClicked.bind(this)}activate(){if(this.Reveal.getConfig().overview&&!this.Reveal.isScrollView()&&!this.isActive()){this.active=!0,this.Reveal.getRevealElement().classList.add(`overview`),this.Reveal.cancelAutoSlide(),this.Reveal.getSlidesElement().appendChild(this.Reveal.getBackgroundsElement()),t(this.Reveal.getRevealElement(),w).forEach(e=>{e.classList.contains(`stack`)||e.addEventListener(`click`,this.onSlideClicked,!0)});let e=this.Reveal.getComputedSlideSize();this.overviewSlideWidth=e.width+70,this.overviewSlideHeight=e.height+70,this.Reveal.getConfig().rtl&&(this.overviewSlideWidth=-this.overviewSlideWidth),this.Reveal.updateSlidesVisibility(),this.layout(),this.update(),this.Reveal.layout();let n=this.Reveal.getIndices();this.Reveal.dispatchEvent({type:`overviewshown`,data:{indexh:n.h,indexv:n.v,currentSlide:this.Reveal.getCurrentSlide()}})}}layout(){this.Reveal.getHorizontalSlides().forEach((e,n)=>{e.setAttribute(`data-index-h`,n),i(e,`translate3d(`+n*this.overviewSlideWidth+`px, 0, 0)`),e.classList.contains(`stack`)&&t(e,`section`).forEach((e,t)=>{e.setAttribute(`data-index-h`,n),e.setAttribute(`data-index-v`,t),i(e,`translate3d(0, `+t*this.overviewSlideHeight+`px, 0)`)})}),Array.from(this.Reveal.getBackgroundsElement().childNodes).forEach((e,n)=>{i(e,`translate3d(`+n*this.overviewSlideWidth+`px, 0, 0)`),t(e,`.slide-background`).forEach((e,t)=>{i(e,`translate3d(0, `+t*this.overviewSlideHeight+`px, 0)`)})})}update(){let e=Math.min(window.innerWidth,window.innerHeight),t=Math.max(e/5,150)/e,n=this.Reveal.getIndices();this.Reveal.transformSlides({overview:[`scale(`+t+`)`,`translateX(`+-n.h*this.overviewSlideWidth+`px)`,`translateY(`+-n.v*this.overviewSlideHeight+`px)`].join(` `)})}deactivate(){if(this.Reveal.getConfig().overview){this.active=!1,this.Reveal.getRevealElement().classList.remove(`overview`),this.Reveal.getRevealElement().classList.add(`overview-deactivating`),setTimeout(()=>{this.Reveal.getRevealElement().classList.remove(`overview-deactivating`)},1),this.Reveal.getRevealElement().appendChild(this.Reveal.getBackgroundsElement()),t(this.Reveal.getRevealElement(),w).forEach(e=>{i(e,``),e.removeEventListener(`click`,this.onSlideClicked,!0)}),t(this.Reveal.getBackgroundsElement(),`.slide-background`).forEach(e=>{i(e,``)}),this.Reveal.transformSlides({overview:``});let e=this.Reveal.getIndices();this.Reveal.slide(e.h,e.v),this.Reveal.layout(),this.Reveal.cueAutoSlide(),this.Reveal.dispatchEvent({type:`overviewhidden`,data:{indexh:e.h,indexv:e.v,currentSlide:this.Reveal.getCurrentSlide()}})}}toggle(e){typeof e==`boolean`?e?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate()}isActive(){return this.active}onSlideClicked(e){if(this.isActive()){e.preventDefault();let t=e.target;for(;t&&!t.nodeName.match(/section/gi);)t=t.parentNode;if(t&&!t.classList.contains(`disabled`)&&(this.deactivate(),t.nodeName.match(/section/gi))){let e=parseInt(t.getAttribute(`data-index-h`),10),n=parseInt(t.getAttribute(`data-index-v`),10);this.Reveal.slide(e,n)}}}},de=class{constructor(e){this.Reveal=e,this.shortcuts={},this.bindings={},this.onDocumentKeyDown=this.onDocumentKeyDown.bind(this)}configure(e,t){e.navigationMode===`linear`?(this.shortcuts[`&#8594;  ,  &#8595;  ,  SPACE  ,  N  ,  L  ,  J`]=`Next slide`,this.shortcuts[`&#8592;  ,  &#8593;  ,  P  ,  H  ,  K`]=`Previous slide`):(this.shortcuts[`N  ,  SPACE`]=`Next slide`,this.shortcuts[`P  ,  Shift SPACE`]=`Previous slide`,this.shortcuts[`&#8592;  ,  H`]=`Navigate left`,this.shortcuts[`&#8594;  ,  L`]=`Navigate right`,this.shortcuts[`&#8593;  ,  K`]=`Navigate up`,this.shortcuts[`&#8595;  ,  J`]=`Navigate down`),this.shortcuts[`Alt + &#8592;/&#8593/&#8594;/&#8595;`]=`Navigate without fragments`,this.shortcuts[`Shift + &#8592;/&#8593/&#8594;/&#8595;`]=`Jump to first/last slide`,this.shortcuts[`B  ,  .`]=`Pause`,this.shortcuts.F=`Fullscreen`,this.shortcuts.G=`Jump to slide`,this.shortcuts[`ESC, O`]=`Slide overview`}bind(){document.addEventListener(`keydown`,this.onDocumentKeyDown,!1)}unbind(){document.removeEventListener(`keydown`,this.onDocumentKeyDown,!1)}addKeyBinding(e,t){typeof e==`object`&&e.keyCode?this.bindings[e.keyCode]={callback:t,key:e.key,description:e.description}:this.bindings[e]={callback:t,key:null,description:null}}removeKeyBinding(e){delete this.bindings[e]}triggerKey(e){this.onDocumentKeyDown({keyCode:e})}registerKeyboardShortcut(e,t){this.shortcuts[e]=t}getShortcuts(){return this.shortcuts}getBindings(){return this.bindings}onDocumentKeyDown(e){let t=this.Reveal.getConfig();if(typeof t.keyboardCondition==`function`&&t.keyboardCondition(e)===!1||t.keyboardCondition===`focused`&&!this.Reveal.isFocused())return!0;let n=e.keyCode,r=!this.Reveal.isAutoSliding();this.Reveal.onUserInput(e);let i=document.activeElement&&document.activeElement.isContentEditable===!0,a=document.activeElement&&document.activeElement.tagName&&/input|textarea/i.test(document.activeElement.tagName),o=document.activeElement&&document.activeElement.className&&/speaker-notes/i.test(document.activeElement.className),c=!([32,37,38,39,40,63,78,80,191].indexOf(e.keyCode)!==-1&&e.shiftKey||e.altKey)&&(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey);if(i||a||o||c)return;let l=[66,86,190,191,112],u;if(typeof t.keyboard==`object`)for(u in t.keyboard)t.keyboard[u]===`togglePause`&&l.push(parseInt(u,10));if(this.Reveal.isOverlayOpen()&&![`Escape`,`f`,`c`,`b`,`.`].includes(e.key)||this.Reveal.isPaused()&&l.indexOf(n)===-1)return!1;let d=t.navigationMode===`linear`||!this.Reveal.hasHorizontalSlides()||!this.Reveal.hasVerticalSlides(),f=!1;if(typeof t.keyboard==`object`){for(u in t.keyboard)if(parseInt(u,10)===n){let n=t.keyboard[u];typeof n==`function`?n.apply(null,[e]):typeof n==`string`&&typeof this.Reveal[n]==`function`&&this.Reveal[n].call(),f=!0}}if(f===!1){for(u in this.bindings)if(parseInt(u,10)===n){let t=this.bindings[u].callback;typeof t==`function`?t.apply(null,[e]):typeof t==`string`&&typeof this.Reveal[t]==`function`&&this.Reveal[t].call(),f=!0}}f===!1&&(f=!0,n===80||n===33?this.Reveal.prev({skipFragments:e.altKey}):n===78||n===34?this.Reveal.next({skipFragments:e.altKey}):n===72||n===37?e.shiftKey?this.Reveal.slide(0):!this.Reveal.overview.isActive()&&d?t.rtl?this.Reveal.next({skipFragments:e.altKey}):this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.left({skipFragments:e.altKey}):n===76||n===39?e.shiftKey?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):!this.Reveal.overview.isActive()&&d?t.rtl?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.next({skipFragments:e.altKey}):this.Reveal.right({skipFragments:e.altKey}):n===75||n===38?e.shiftKey?this.Reveal.slide(void 0,0):!this.Reveal.overview.isActive()&&d?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.up({skipFragments:e.altKey}):n===74||n===40?e.shiftKey?this.Reveal.slide(void 0,Number.MAX_VALUE):!this.Reveal.overview.isActive()&&d?this.Reveal.next({skipFragments:e.altKey}):this.Reveal.down({skipFragments:e.altKey}):n===36?this.Reveal.slide(0):n===35?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):n===32?(this.Reveal.overview.isActive()&&this.Reveal.overview.deactivate(),e.shiftKey?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.next({skipFragments:e.altKey})):[58,59,66,86,190].includes(n)||n===191&&!e.shiftKey?this.Reveal.togglePause():n===70?s(t.embedded?this.Reveal.getViewportElement():document.documentElement):n===65?t.autoSlideStoppable&&this.Reveal.toggleAutoSlide(r):n===71?t.jumpToSlide&&this.Reveal.toggleJumpToSlide():n===67&&this.Reveal.isOverlayOpen()?this.Reveal.closeOverlay():(n===63||n===191)&&e.shiftKey||n===112?this.Reveal.toggleHelp():f=!1),f?e.preventDefault&&e.preventDefault():n===27||n===79?(this.Reveal.closeOverlay()===!1&&this.Reveal.overview.toggle(),e.preventDefault&&e.preventDefault()):n===13&&this.Reveal.overview.isActive()&&(this.Reveal.overview.deactivate(),e.preventDefault&&e.preventDefault()),this.Reveal.cueAutoSlide()}};function fe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function pe(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?fe(Object(n),!0).forEach(function(t){S(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):fe(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var me=class{constructor(e){S(this,`MAX_REPLACE_STATE_FREQUENCY`,1e3),this.Reveal=e,this.writeURLTimeout=0,this.replaceStateTimestamp=0,this.onWindowHashChange=this.onWindowHashChange.bind(this)}bind(){window.addEventListener(`hashchange`,this.onWindowHashChange,!1)}unbind(){window.removeEventListener(`hashchange`,this.onWindowHashChange,!1)}getIndicesFromHash(e=window.location.hash,t={}){let n=e.replace(/^#\/?/,``),r=n.split(`/`);if(!/^[0-9]*$/.test(r[0])&&n.length){let e,t;/\/[-\d]+$/g.test(n)&&(t=parseInt(n.split(`/`).pop(),10),t=isNaN(t)?void 0:t,n=n.split(`/`).shift());try{let t=decodeURIComponent(n);e=(document.getElementById(t)||document.querySelector(`[data-id="${t}"]`)).closest(`.slides section`)}catch{}if(e)return pe(pe({},this.Reveal.getIndices(e)),{},{f:t})}else{let e=this.Reveal.getConfig(),n=e.hashOneBasedIndex||t.oneBasedIndex?1:0,i=parseInt(r[0],10)-n||0,a=parseInt(r[1],10)-n||0,o;return e.fragmentInURL&&(o=parseInt(r[2],10),isNaN(o)&&(o=void 0)),{h:i,v:a,f:o}}return null}readURL(){let e=this.Reveal.getIndices(),t=this.getIndicesFromHash();t?(t.h!==e.h||t.v!==e.v||t.f!==void 0)&&this.Reveal.slide(t.h,t.v,t.f):this.Reveal.slide(e.h||0,e.v||0)}writeURL(e){let t=this.Reveal.getConfig(),n=this.Reveal.getCurrentSlide();if(clearTimeout(this.writeURLTimeout),typeof e==`number`)this.writeURLTimeout=setTimeout(this.writeURL,e);else if(n){let e=this.getHash();t.history?window.location.hash=e:t.hash&&(e===`/`?this.debouncedReplaceState(window.location.pathname+window.location.search):this.debouncedReplaceState(`#`+e))}}replaceState(e){window.history.replaceState(null,null,e),this.replaceStateTimestamp=Date.now()}debouncedReplaceState(e){clearTimeout(this.replaceStateTimeout),Date.now()-this.replaceStateTimestamp>this.MAX_REPLACE_STATE_FREQUENCY?this.replaceState(e):this.replaceStateTimeout=setTimeout(()=>this.replaceState(e),this.MAX_REPLACE_STATE_FREQUENCY)}getHash(e){let t=`/`,n=e||this.Reveal.getCurrentSlide(),r=n?n.getAttribute(`id`):null;r&&=encodeURIComponent(r);let i=this.Reveal.getIndices(e);if(this.Reveal.getConfig().fragmentInURL||(i.f=void 0),typeof r==`string`&&r.length)t=`/`+r,i.f>=0&&(t+=`/`+i.f);else{let e=+!!this.Reveal.getConfig().hashOneBasedIndex;(i.h>0||i.v>0||i.f>=0)&&(t+=i.h+e),(i.v>0||i.f>=0)&&(t+=`/`+(i.v+e)),i.f>=0&&(t+=`/`+i.f)}return t}onWindowHashChange(e){this.readURL()}},he=class{constructor(e){this.Reveal=e,this.onNavigateLeftClicked=this.onNavigateLeftClicked.bind(this),this.onNavigateRightClicked=this.onNavigateRightClicked.bind(this),this.onNavigateUpClicked=this.onNavigateUpClicked.bind(this),this.onNavigateDownClicked=this.onNavigateDownClicked.bind(this),this.onNavigatePrevClicked=this.onNavigatePrevClicked.bind(this),this.onNavigateNextClicked=this.onNavigateNextClicked.bind(this),this.onEnterFullscreen=this.onEnterFullscreen.bind(this)}render(){let e=this.Reveal.getConfig().rtl,n=this.Reveal.getRevealElement();this.element=document.createElement(`aside`),this.element.className=`controls`,this.element.innerHTML=`<button class="navigate-left" aria-label="${e?`next slide`:`previous slide`}"><div class="controls-arrow"></div></button>
			<button class="navigate-right" aria-label="${e?`previous slide`:`next slide`}"><div class="controls-arrow"></div></button>
			<button class="navigate-up" aria-label="above slide"><div class="controls-arrow"></div></button>
			<button class="navigate-down" aria-label="below slide"><div class="controls-arrow"></div></button>`,this.Reveal.getRevealElement().appendChild(this.element),this.controlsLeft=t(n,`.navigate-left`),this.controlsRight=t(n,`.navigate-right`),this.controlsUp=t(n,`.navigate-up`),this.controlsDown=t(n,`.navigate-down`),this.controlsPrev=t(n,`.navigate-prev`),this.controlsNext=t(n,`.navigate-next`),this.controlsFullscreen=t(n,`.enter-fullscreen`),this.controlsRightArrow=this.element.querySelector(`.navigate-right`),this.controlsLeftArrow=this.element.querySelector(`.navigate-left`),this.controlsDownArrow=this.element.querySelector(`.navigate-down`)}configure(e,t){let n=e.controls===`speaker`||e.controls===`speaker-only`;this.element.style.display=e.controls&&(!n||this.Reveal.isSpeakerNotes())?`block`:`none`,this.element.setAttribute(`data-controls-layout`,e.controlsLayout),this.element.setAttribute(`data-controls-back-arrows`,e.controlsBackArrows)}bind(){let e=[`touchstart`,`click`];_&&(e=[`touchend`]),e.forEach(e=>{this.controlsLeft.forEach(t=>t.addEventListener(e,this.onNavigateLeftClicked,!1)),this.controlsRight.forEach(t=>t.addEventListener(e,this.onNavigateRightClicked,!1)),this.controlsUp.forEach(t=>t.addEventListener(e,this.onNavigateUpClicked,!1)),this.controlsDown.forEach(t=>t.addEventListener(e,this.onNavigateDownClicked,!1)),this.controlsPrev.forEach(t=>t.addEventListener(e,this.onNavigatePrevClicked,!1)),this.controlsNext.forEach(t=>t.addEventListener(e,this.onNavigateNextClicked,!1)),this.controlsFullscreen.forEach(t=>t.addEventListener(e,this.onEnterFullscreen,!1))})}unbind(){[`touchstart`,`touchend`,`click`].forEach(e=>{this.controlsLeft.forEach(t=>t.removeEventListener(e,this.onNavigateLeftClicked,!1)),this.controlsRight.forEach(t=>t.removeEventListener(e,this.onNavigateRightClicked,!1)),this.controlsUp.forEach(t=>t.removeEventListener(e,this.onNavigateUpClicked,!1)),this.controlsDown.forEach(t=>t.removeEventListener(e,this.onNavigateDownClicked,!1)),this.controlsPrev.forEach(t=>t.removeEventListener(e,this.onNavigatePrevClicked,!1)),this.controlsNext.forEach(t=>t.removeEventListener(e,this.onNavigateNextClicked,!1)),this.controlsFullscreen.forEach(t=>t.removeEventListener(e,this.onEnterFullscreen,!1))})}update(){let e=this.Reveal.availableRoutes();[...this.controlsLeft,...this.controlsRight,...this.controlsUp,...this.controlsDown,...this.controlsPrev,...this.controlsNext].forEach(e=>{e.classList.remove(`enabled`,`fragmented`),e.setAttribute(`disabled`,`disabled`)}),e.left&&this.controlsLeft.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)}),e.right&&this.controlsRight.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)}),e.up&&this.controlsUp.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)}),e.down&&this.controlsDown.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)}),(e.left||e.up)&&this.controlsPrev.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)}),(e.right||e.down)&&this.controlsNext.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)});let t=this.Reveal.getCurrentSlide();if(t){let e=this.Reveal.fragments.availableRoutes();e.prev&&this.controlsPrev.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)}),e.next&&this.controlsNext.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)});let n=this.Reveal.isVerticalSlide(t),r=n&&t.parentElement&&t.parentElement.querySelectorAll(`:scope > section`).length>1;n&&r?(e.prev&&this.controlsUp.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)}),e.next&&this.controlsDown.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)})):(e.prev&&this.controlsLeft.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)}),e.next&&this.controlsRight.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)}))}if(this.Reveal.getConfig().controlsTutorial){let t=this.Reveal.getIndices();!this.Reveal.hasNavigatedVertically()&&e.down?this.controlsDownArrow.classList.add(`highlight`):(this.controlsDownArrow.classList.remove(`highlight`),this.Reveal.getConfig().rtl?!this.Reveal.hasNavigatedHorizontally()&&e.left&&t.v===0?this.controlsLeftArrow.classList.add(`highlight`):this.controlsLeftArrow.classList.remove(`highlight`):!this.Reveal.hasNavigatedHorizontally()&&e.right&&t.v===0?this.controlsRightArrow.classList.add(`highlight`):this.controlsRightArrow.classList.remove(`highlight`))}}destroy(){this.unbind(),this.element.remove()}onNavigateLeftClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.getConfig().navigationMode===`linear`?this.Reveal.prev():this.Reveal.left()}onNavigateRightClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.getConfig().navigationMode===`linear`?this.Reveal.next():this.Reveal.right()}onNavigateUpClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.up()}onNavigateDownClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.down()}onNavigatePrevClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.prev()}onNavigateNextClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.next()}onEnterFullscreen(e){let t=this.Reveal.getConfig(),n=this.Reveal.getViewportElement();s(t.embedded?n:n.parentElement)}},ge=class{constructor(e){this.Reveal=e,this.onProgressClicked=this.onProgressClicked.bind(this)}render(){this.element=document.createElement(`div`),this.element.className=`progress`,this.Reveal.getRevealElement().appendChild(this.element),this.bar=document.createElement(`span`),this.element.appendChild(this.bar)}configure(e,t){this.element.style.display=e.progress?`block`:`none`}bind(){this.Reveal.getConfig().progress&&this.element&&this.element.addEventListener(`click`,this.onProgressClicked,!1)}unbind(){this.Reveal.getConfig().progress&&this.element&&this.element.removeEventListener(`click`,this.onProgressClicked,!1)}update(){if(this.Reveal.getConfig().progress&&this.bar){let e=this.Reveal.getProgress();this.Reveal.getTotalSlides()<2&&(e=0),this.bar.style.transform=`scaleX(`+e+`)`}}getMaxWidth(){return this.Reveal.getRevealElement().offsetWidth}onProgressClicked(e){this.Reveal.onUserInput(e),e.preventDefault();let t=this.Reveal.getSlides(),n=t.length,r=Math.floor(e.clientX/this.getMaxWidth()*n);this.Reveal.getConfig().rtl&&(r=n-r);let i=this.Reveal.getIndices(t[r]);this.Reveal.slide(i.h,i.v)}destroy(){this.element.remove()}},_e=class{constructor(e){this.Reveal=e,this.lastMouseWheelStep=0,this.cursorHidden=!1,this.cursorInactiveTimeout=0,this.onDocumentCursorActive=this.onDocumentCursorActive.bind(this),this.onDocumentMouseScroll=this.onDocumentMouseScroll.bind(this)}configure(e,t){e.mouseWheel?document.addEventListener(`wheel`,this.onDocumentMouseScroll,!1):document.removeEventListener(`wheel`,this.onDocumentMouseScroll,!1),e.hideInactiveCursor?(document.addEventListener(`mousemove`,this.onDocumentCursorActive,!1),document.addEventListener(`mousedown`,this.onDocumentCursorActive,!1)):(this.showCursor(),document.removeEventListener(`mousemove`,this.onDocumentCursorActive,!1),document.removeEventListener(`mousedown`,this.onDocumentCursorActive,!1))}showCursor(){this.cursorHidden&&(this.cursorHidden=!1,this.Reveal.getRevealElement().style.cursor=``)}hideCursor(){this.cursorHidden===!1&&(this.cursorHidden=!0,this.Reveal.getRevealElement().style.cursor=`none`)}destroy(){this.showCursor(),document.removeEventListener(`wheel`,this.onDocumentMouseScroll,!1),document.removeEventListener(`mousemove`,this.onDocumentCursorActive,!1),document.removeEventListener(`mousedown`,this.onDocumentCursorActive,!1)}onDocumentCursorActive(e){this.showCursor(),clearTimeout(this.cursorInactiveTimeout),this.cursorInactiveTimeout=setTimeout(this.hideCursor.bind(this),this.Reveal.getConfig().hideCursorTime)}onDocumentMouseScroll(e){if(Date.now()-this.lastMouseWheelStep>1e3){this.lastMouseWheelStep=Date.now();let t=e.detail||-e.wheelDelta;t>0?this.Reveal.next():t<0&&this.Reveal.prev()}}},ve=(e,t)=>{let n=document.createElement(`script`);n.type=`text/javascript`,n.async=!1,n.defer=!1,n.src=e,typeof t==`function`&&(n.onload=e=>{e.type===`load`&&(n.onload=n.onerror=null,t())},n.onerror=e=>{n.onload=n.onerror=null,t(Error(`Failed loading script: `+n.src+`
`+e))});let r=document.querySelector(`head`);r&&r.insertBefore(n,r.lastChild)},ye=class{constructor(e){this.Reveal=e,this.state=`idle`,this.registeredPlugins={},this.asyncDependencies=[]}load(e,t){return this.state=`loading`,e.forEach(this.registerPlugin.bind(this)),new Promise(e=>{let n=[],r=0;if(t.forEach(e=>{(!e.condition||e.condition())&&(e.async?this.asyncDependencies.push(e):n.push(e))}),n.length){r=n.length;let t=t=>{t&&typeof t.callback==`function`&&t.callback(),--r===0&&this.initPlugins().then(e)};n.forEach(e=>{typeof e.id==`string`?(this.registerPlugin(e),t(e)):typeof e.src==`string`?ve(e.src,()=>t(e)):(console.warn(`Unrecognized plugin format`,e),t())})}else this.initPlugins().then(e)})}initPlugins(){return new Promise(e=>{let t=Object.values(this.registeredPlugins),n=t.length;if(n===0)this.loadAsync().then(e);else{let r,i=()=>{--n===0?this.loadAsync().then(e):r()},a=0;r=()=>{let e=t[a++];if(typeof e.init==`function`){let t=e.init(this.Reveal);t&&typeof t.then==`function`?t.then(i):i()}else i()},r()}})}loadAsync(){return this.state=`loaded`,this.asyncDependencies.length&&this.asyncDependencies.forEach(e=>{ve(e.src,e.callback)}),Promise.resolve()}registerPlugin(e){arguments.length===2&&typeof arguments[0]==`string`?(e=arguments[1],e.id=arguments[0]):typeof e==`function`&&(e=e());let t=e.id;typeof t==`string`?this.registeredPlugins[t]===void 0?(this.registeredPlugins[t]=e,this.state===`loaded`&&typeof e.init==`function`&&e.init(this.Reveal)):console.warn(`reveal.js: "`+t+`" plugin has already been registered`):console.warn(`Unrecognized plugin format; can't find plugin.id`,e)}hasPlugin(e){return!!this.registeredPlugins[e]}getPlugin(e){return this.registeredPlugins[e]}getRegisteredPlugins(){return this.registeredPlugins}destroy(){Object.values(this.registeredPlugins).forEach(e=>{typeof e.destroy==`function`&&e.destroy()}),this.registeredPlugins={},this.asyncDependencies=[]}},be=class{constructor(e){this.Reveal=e,this.onSlidesClicked=this.onSlidesClicked.bind(this),this.iframeTriggerSelector=null,this.mediaTriggerSelector=`[data-preview-image], [data-preview-video]`,this.stateProps=[`previewIframe`,`previewImage`,`previewVideo`,`previewFit`],this.state={}}update(){this.iframeTriggerSelector=this.Reveal.getConfig().previewLinks?`a[href]:not([data-preview-link=false]), [data-preview-link]:not(a):not([data-preview-link=false])`:`[data-preview-link]:not([data-preview-link=false])`;let e=this.Reveal.getSlidesElement().querySelectorAll(this.iframeTriggerSelector).length>0,t=this.Reveal.getSlidesElement().querySelectorAll(this.mediaTriggerSelector).length>0;e||t?this.Reveal.getSlidesElement().addEventListener(`click`,this.onSlidesClicked,!1):this.Reveal.getSlidesElement().removeEventListener(`click`,this.onSlidesClicked,!1)}createOverlay(e){this.dom=document.createElement(`div`),this.dom.classList.add(`r-overlay`),this.dom.classList.add(e),this.viewport=document.createElement(`div`),this.viewport.classList.add(`r-overlay-viewport`),this.dom.appendChild(this.viewport),this.Reveal.getRevealElement().appendChild(this.dom)}previewIframe(e){this.close(),this.state={previewIframe:e},this.createOverlay(`r-overlay-preview`),this.dom.dataset.state=`loading`,this.viewport.innerHTML=`<header class="r-overlay-header">
				<a class="r-overlay-header-button r-overlay-external" href="${e}" target="_blank"><span class="icon"></span></a>
				<button class="r-overlay-header-button r-overlay-close"><span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content">
				<iframe src="${e}"></iframe>
				<small class="r-overlay-content-inner">
					<span class="r-overlay-error x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>
				</small>
			</div>`,this.dom.querySelector(`iframe`).addEventListener(`load`,e=>{this.dom.dataset.state=`loaded`},!1),this.dom.querySelector(`.r-overlay-close`).addEventListener(`click`,e=>{this.close(),e.preventDefault()},!1),this.dom.querySelector(`.r-overlay-external`).addEventListener(`click`,e=>{this.close()},!1),this.Reveal.dispatchEvent({type:`previewiframe`,data:{url:e}})}previewMedia(e,t,n){if(t!==`image`&&t!==`video`){console.warn(`Please specify a valid media type to preview (image|video)`);return}this.close(),n||=`scale-down`,this.createOverlay(`r-overlay-preview`),this.dom.dataset.state=`loading`,this.dom.dataset.previewFit=n,this.viewport.innerHTML=`<header class="r-overlay-header">
				<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content"></div>`;let r=this.dom.querySelector(`.r-overlay-content`);if(t===`image`){this.state={previewImage:e,previewFit:n};let t=document.createElement(`img`,{});t.src=e,r.appendChild(t),t.addEventListener(`load`,()=>{this.dom.dataset.state=`loaded`},!1),t.addEventListener(`error`,()=>{this.dom.dataset.state=`error`,r.innerHTML=`<span class="r-overlay-error">Unable to load image.</span>`},!1),this.dom.style.cursor=`zoom-out`,this.dom.addEventListener(`click`,e=>{this.close()},!1),this.Reveal.dispatchEvent({type:`previewimage`,data:{url:e}})}else if(t===`video`){this.state={previewVideo:e,previewFit:n};let t=document.createElement(`video`);t.autoplay=this.dom.dataset.previewAutoplay!==`false`,t.controls=this.dom.dataset.previewControls!==`false`,t.loop=this.dom.dataset.previewLoop===`true`,t.muted=this.dom.dataset.previewMuted===`true`,t.playsInline=!0,t.src=e,r.appendChild(t),t.addEventListener(`loadeddata`,()=>{this.dom.dataset.state=`loaded`},!1),t.addEventListener(`error`,()=>{this.dom.dataset.state=`error`,r.innerHTML=`<span class="r-overlay-error">Unable to load video.</span>`},!1),this.Reveal.dispatchEvent({type:`previewvideo`,data:{url:e}})}else throw Error(`Please specify a valid media type to preview`);this.dom.querySelector(`.r-overlay-close`).addEventListener(`click`,e=>{this.close(),e.preventDefault()},!1)}previewImage(e,t){this.previewMedia(e,`image`,t)}previewVideo(e,t){this.previewMedia(e,`video`,t)}toggleHelp(e){typeof e==`boolean`?e?this.showHelp():this.close():this.dom?this.close():this.showHelp()}showHelp(){if(this.Reveal.getConfig().help){this.close(),this.createOverlay(`r-overlay-help`);let e=`<p class="title">Keyboard Shortcuts</p>`,t=this.Reveal.keyboard.getShortcuts(),n=this.Reveal.keyboard.getBindings();e+=`<table><th>KEY</th><th>ACTION</th>`;for(let n in t)e+=`<tr><td>${n}</td><td>${t[n]}</td></tr>`;for(let t in n)n[t].key&&n[t].description&&(e+=`<tr><td>${n[t].key}</td><td>${n[t].description}</td></tr>`);e+=`</table>`,this.viewport.innerHTML=`
				<header class="r-overlay-header">
					<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
				</header>
				<div class="r-overlay-content">
					<div class="r-overlay-help-content">${e}</div>
				</div>
			`,this.dom.querySelector(`.r-overlay-close`).addEventListener(`click`,e=>{this.close(),e.preventDefault()},!1),this.Reveal.dispatchEvent({type:`showhelp`})}}isOpen(){return!!this.dom}close(){return this.dom?(this.dom.remove(),this.dom=null,this.state={},this.Reveal.dispatchEvent({type:`closeoverlay`}),!0):!1}getState(){return this.state}setState(e){this.stateProps.every(t=>this.state[t]===e[t])||(e.previewIframe?this.previewIframe(e.previewIframe):e.previewImage?this.previewImage(e.previewImage,e.previewFit):e.previewVideo?this.previewVideo(e.previewVideo,e.previewFit):this.close())}onSlidesClicked(e){let t=e.target,n=t.closest(this.iframeTriggerSelector),r=t.closest(this.mediaTriggerSelector);if(n){if(e.metaKey||e.shiftKey||e.altKey)return;let t=n.getAttribute(`data-preview-link`),r=typeof t==`string`&&t.startsWith(`http`)?t:n.getAttribute(`href`);r&&(this.previewIframe(r),e.preventDefault())}else if(r){if(r.hasAttribute(`data-preview-image`)){let t=r.dataset.previewImage||r.getAttribute(`src`);t&&(this.previewImage(t,r.dataset.previewFit),e.preventDefault())}else if(r.hasAttribute(`data-preview-video`)){let t=r.dataset.previewVideo||r.getAttribute(`src`);if(!t){let e=r.querySelector(`source`);e&&(t=e.getAttribute(`src`))}t&&(this.previewVideo(t,r.dataset.previewFit),e.preventDefault())}}}destroy(){this.close()}},xe=40,Se=class{constructor(e){this.Reveal=e,this.touchStartX=0,this.touchStartY=0,this.touchStartCount=0,this.touchCaptured=!1,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this)}bind(){let e=this.Reveal.getRevealElement();`onpointerdown`in window?(e.addEventListener(`pointerdown`,this.onPointerDown,!1),e.addEventListener(`pointermove`,this.onPointerMove,!1),e.addEventListener(`pointerup`,this.onPointerUp,!1)):window.navigator.msPointerEnabled?(e.addEventListener(`MSPointerDown`,this.onPointerDown,!1),e.addEventListener(`MSPointerMove`,this.onPointerMove,!1),e.addEventListener(`MSPointerUp`,this.onPointerUp,!1)):(e.addEventListener(`touchstart`,this.onTouchStart,!1),e.addEventListener(`touchmove`,this.onTouchMove,!1),e.addEventListener(`touchend`,this.onTouchEnd,!1))}unbind(){let e=this.Reveal.getRevealElement();e.removeEventListener(`pointerdown`,this.onPointerDown,!1),e.removeEventListener(`pointermove`,this.onPointerMove,!1),e.removeEventListener(`pointerup`,this.onPointerUp,!1),e.removeEventListener(`MSPointerDown`,this.onPointerDown,!1),e.removeEventListener(`MSPointerMove`,this.onPointerMove,!1),e.removeEventListener(`MSPointerUp`,this.onPointerUp,!1),e.removeEventListener(`touchstart`,this.onTouchStart,!1),e.removeEventListener(`touchmove`,this.onTouchMove,!1),e.removeEventListener(`touchend`,this.onTouchEnd,!1)}isSwipePrevented(e){if(a(e,`video[controls], audio[controls]`))return!0;for(;e&&typeof e.hasAttribute==`function`;){if(e.hasAttribute(`data-prevent-swipe`))return!0;e=e.parentNode}return!1}onTouchStart(e){if(this.touchCaptured=!1,this.isSwipePrevented(e.target))return!0;this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.touchStartCount=e.touches.length}onTouchMove(e){if(this.isSwipePrevented(e.target))return!0;let t=this.Reveal.getConfig();if(this.touchCaptured)_&&e.preventDefault();else{this.Reveal.onUserInput(e);let n=e.touches[0].clientX,r=e.touches[0].clientY;if(e.touches.length===1&&this.touchStartCount!==2){let i=this.Reveal.availableRoutes({includeFragments:!0}),a=n-this.touchStartX,o=r-this.touchStartY;a>xe&&Math.abs(a)>Math.abs(o)?(this.touchCaptured=!0,t.navigationMode===`linear`?t.rtl?this.Reveal.next():this.Reveal.prev():this.Reveal.left()):a<-xe&&Math.abs(a)>Math.abs(o)?(this.touchCaptured=!0,t.navigationMode===`linear`?t.rtl?this.Reveal.prev():this.Reveal.next():this.Reveal.right()):o>xe&&i.up?(this.touchCaptured=!0,t.navigationMode===`linear`?this.Reveal.prev():this.Reveal.up()):o<-xe&&i.down&&(this.touchCaptured=!0,t.navigationMode===`linear`?this.Reveal.next():this.Reveal.down()),t.embedded?(this.touchCaptured||this.Reveal.isVerticalSlide())&&e.preventDefault():e.preventDefault()}}}onTouchEnd(e){this.touchCaptured&&!this.Reveal.slideContent.isAllowedToPlayAudio()&&this.Reveal.startEmbeddedContent(this.Reveal.getCurrentSlide()),this.touchCaptured=!1}onPointerDown(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType===`touch`)&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchStart(e))}onPointerMove(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType===`touch`)&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchMove(e))}onPointerUp(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType===`touch`)&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchEnd(e))}},F=`focus`,Ce=`blur`,we=class{constructor(e){this.Reveal=e,this.onRevealPointerDown=this.onRevealPointerDown.bind(this),this.onDocumentPointerDown=this.onDocumentPointerDown.bind(this)}configure(e,t){e.embedded?this.blur():(this.focus(),this.unbind())}bind(){this.Reveal.getConfig().embedded&&this.Reveal.getRevealElement().addEventListener(`pointerdown`,this.onRevealPointerDown,!1)}unbind(){this.Reveal.getRevealElement().removeEventListener(`pointerdown`,this.onRevealPointerDown,!1),document.removeEventListener(`pointerdown`,this.onDocumentPointerDown,!1)}focus(){this.state!==F&&(this.Reveal.getRevealElement().classList.add(`focused`),document.addEventListener(`pointerdown`,this.onDocumentPointerDown,!1)),this.state=F}blur(){this.state!==Ce&&(this.Reveal.getRevealElement().classList.remove(`focused`),document.removeEventListener(`pointerdown`,this.onDocumentPointerDown,!1)),this.state=Ce}isFocused(){return this.state===F}destroy(){this.Reveal.getRevealElement().classList.remove(`focused`)}onRevealPointerDown(e){this.focus()}onDocumentPointerDown(e){let t=o(e.target,`.reveal`);(!t||t!==this.Reveal.getRevealElement())&&this.blur()}},Te=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement(`div`),this.element.className=`speaker-notes`,this.element.setAttribute(`data-prevent-swipe`,``),this.element.setAttribute(`tabindex`,`0`),this.Reveal.getRevealElement().appendChild(this.element)}configure(e,t){e.showNotes&&this.element.setAttribute(`data-layout`,typeof e.showNotes==`string`?e.showNotes:`inline`)}update(){this.Reveal.getConfig().showNotes&&this.element&&this.Reveal.getCurrentSlide()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()&&(this.element.innerHTML=this.getSlideNotes()||`<span class="notes-placeholder">No notes on this slide.</span>`)}updateVisibility(){this.Reveal.getConfig().showNotes&&this.hasNotes()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()?this.Reveal.getRevealElement().classList.add(`show-notes`):this.Reveal.getRevealElement().classList.remove(`show-notes`)}hasNotes(){return this.Reveal.getSlidesElement().querySelectorAll(`[data-notes], aside.notes`).length>0}isSpeakerNotesWindow(){return!!window.location.search.match(/receiver/gi)}getSlideNotes(e=this.Reveal.getCurrentSlide()){if(e.hasAttribute(`data-notes`))return e.getAttribute(`data-notes`);let t=e.querySelectorAll(`aside.notes`);return t?Array.from(t).map(e=>e.innerHTML).join(`
`):null}destroy(){this.element.remove()}},Ee=class{constructor(e,t){this.diameter=100,this.diameter2=this.diameter/2,this.thickness=6,this.playing=!1,this.progress=0,this.progressOffset=1,this.container=e,this.progressCheck=t,this.canvas=document.createElement(`canvas`),this.canvas.className=`playback`,this.canvas.width=this.diameter,this.canvas.height=this.diameter,this.canvas.style.width=this.diameter2+`px`,this.canvas.style.height=this.diameter2+`px`,this.context=this.canvas.getContext(`2d`),this.container.appendChild(this.canvas),this.render()}setPlaying(e){let t=this.playing;this.playing=e,!t&&this.playing?this.animate():this.render()}animate(){let e=this.progress;this.progress=this.progressCheck(),e>.8&&this.progress<.2&&(this.progressOffset=this.progress),this.render(),this.playing&&requestAnimationFrame(this.animate.bind(this))}render(){let e=this.playing?this.progress:0,t=this.diameter2-this.thickness,n=this.diameter2,r=this.diameter2;this.progressOffset+=(1-this.progressOffset)*.1;let i=-Math.PI/2+Math.PI*2*e,a=-Math.PI/2+this.progressOffset*(Math.PI*2);this.context.save(),this.context.clearRect(0,0,this.diameter,this.diameter),this.context.beginPath(),this.context.arc(n,r,t+4,0,Math.PI*2,!1),this.context.fillStyle=`rgba( 0, 0, 0, 0.4 )`,this.context.fill(),this.context.beginPath(),this.context.arc(n,r,t,0,Math.PI*2,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle=`rgba( 255, 255, 255, 0.2 )`,this.context.stroke(),this.playing&&(this.context.beginPath(),this.context.arc(n,r,t,a,i,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle=`#fff`,this.context.stroke()),this.context.translate(n-14,r-14),this.playing?(this.context.fillStyle=`#fff`,this.context.fillRect(0,0,10,28),this.context.fillRect(18,0,10,28)):(this.context.beginPath(),this.context.translate(4,0),this.context.moveTo(0,0),this.context.lineTo(24,14),this.context.lineTo(0,28),this.context.fillStyle=`#fff`,this.context.fill()),this.context.restore()}on(e,t){this.canvas.addEventListener(e,t,!1)}off(e,t){this.canvas.removeEventListener(e,t,!1)}destroy(){this.playing=!1,this.canvas.parentNode&&this.container.removeChild(this.canvas)}},De={width:960,height:700,margin:.04,minScale:.2,maxScale:2,controls:!0,controlsTutorial:!0,controlsLayout:`bottom-right`,controlsBackArrows:`faded`,progress:!0,slideNumber:!1,showSlideNumber:`all`,hashOneBasedIndex:!1,hash:!1,respondToHashChanges:!0,jumpToSlide:!0,history:!1,keyboard:!0,keyboardCondition:null,disableLayout:!1,overview:!0,center:!0,touch:!0,loop:!1,rtl:!1,navigationMode:`default`,shuffle:!1,fragments:!0,fragmentInURL:!0,embedded:!1,help:!0,pause:!0,showNotes:!1,showHiddenSlides:!1,autoPlayMedia:null,preloadIframes:null,mouseWheel:!1,previewLinks:!1,viewDistance:3,mobileViewDistance:2,display:`block`,hideInactiveCursor:!0,hideCursorTime:5e3,sortFragmentsOnSync:!0,autoAnimate:!0,autoAnimateMatcher:null,autoAnimateEasing:`ease`,autoAnimateDuration:1,autoAnimateUnmatched:!0,autoAnimateStyles:[`opacity`,`color`,`background-color`,`padding`,`font-size`,`line-height`,`letter-spacing`,`border-width`,`border-color`,`border-radius`,`outline`,`outline-offset`],autoSlide:0,autoSlideStoppable:!0,autoSlideMethod:null,defaultTiming:null,postMessage:!0,postMessageEvents:!1,focusBodyOnPageVisibilityChange:!0,transition:`slide`,transitionSpeed:`default`,backgroundTransition:`fade`,parallaxBackgroundImage:``,parallaxBackgroundSize:``,parallaxBackgroundRepeat:``,parallaxBackgroundPosition:``,parallaxBackgroundHorizontal:null,parallaxBackgroundVertical:null,view:null,scrollLayout:`full`,scrollSnap:`mandatory`,scrollProgress:`auto`,scrollActivationWidth:435,pdfMaxPagesPerSlide:1/0,pdfSeparateFragments:!0,pdfPageHeightOffset:-1,dependencies:[],plugins:[]},Oe=`6.0.1`;function I(a,s){arguments.length<2&&(s=arguments[0],a=document.querySelector(`.reveal`));let l={},f={},p=!1,m=!1,h,_,v,y,b={hasNavigatedHorizontally:!1,hasNavigatedVertically:!1},x=[],S=1,D={layout:``,overview:``},A={},j=`idle`,M=0,re,ie=0,ae=-1,N=!1,P=new C(l),se=new k(l),fe=new ee(l),ve=new ne(l),xe=new te(l),F=new oe(l),Ce=new ce(l),I=new le(l),L=new ue(l),ke=new de(l),Ae=new me(l),je=new he(l),Me=new ge(l),Ne=new _e(l),Pe=new ye(l),R=new be(l),Fe=new we(l),Ie=new Se(l),Le=new Te(l);function Re(e){if(!a)throw`Unable to find presentation root (<div class="reveal">).`;if(p)throw`Reveal.js has already been initialized.`;if(p=!0,A.wrapper=a,A.slides=a.querySelector(`.slides`),!A.slides)throw`Unable to find slides container (<div class="slides">).`;return f=pe(pe(pe(pe(pe({},De),f),s),e),u()),/print-pdf/gi.test(window.location.search)&&(f.view=`print`),ze(),window.addEventListener(`load`,st,!1),Pe.load(f.plugins,f.dependencies).then(Be),new Promise(e=>l.on(`ready`,e))}function ze(){f.embedded===!0?A.viewport=o(a,`.reveal-viewport`)||a:(A.viewport=document.body,document.documentElement.classList.add(`reveal-full-page`)),A.viewport.classList.add(`reveal-viewport`)}function Be(){p!==!1&&(m=!0,He(),Ue(),Xe(),Je(),Ye(),At(),Ze(),xe.update(!0),Ve(),Ae.readURL(),setTimeout(()=>{A.slides.classList.remove(`no-transition`),A.wrapper.classList.add(`ready`),it({type:`ready`,data:{indexh:h,indexv:_,currentSlide:y}})},1))}function Ve(){let e=f.view===`print`,t=f.view===`scroll`||f.view===`reader`;(e||t)&&(e?$e():Ie.unbind(),A.viewport.classList.add(`loading-scroll-mode`),e?document.readyState===`complete`?Ce.activate():window.addEventListener(`load`,()=>Ce.activate()):F.activate())}function He(){f.showHiddenSlides||t(A.wrapper,`section[data-visibility="hidden"]`).forEach(e=>{let t=e.parentNode;t.childElementCount===1&&/section/i.test(t.nodeName)?t.remove():e.remove()})}function Ue(){A.slides.classList.add(`no-transition`),g?A.wrapper.classList.add(`no-hover`):A.wrapper.classList.remove(`no-hover`),xe.render(),se.render(),fe.render(),je.render(),Me.render(),Le.render(),A.pauseOverlay=c(A.wrapper,`div`,`pause-overlay`,f.controls?`<button class="resume-button">Resume presentation</button>`:null),A.statusElement=We(),A.wrapper.setAttribute(`role`,`application`)}function We(){let e=A.wrapper.querySelector(`.aria-status`);return e||(e=document.createElement(`div`),e.style.position=`absolute`,e.style.height=`1px`,e.style.width=`1px`,e.style.overflow=`hidden`,e.style.clip=`rect( 1px, 1px, 1px, 1px )`,e.classList.add(`aria-status`),e.setAttribute(`aria-live`,`polite`),e.setAttribute(`aria-atomic`,`true`),A.wrapper.appendChild(e)),e}function Ge(e){A.statusElement.textContent=e}function Ke(e){let t=``;if(e.nodeType===3)t+=e.textContent.trim();else if(e.nodeType===1){let n=e.getAttribute(`aria-hidden`),r=window.getComputedStyle(e).display===`none`;if(n!==`true`&&!r){if(e.tagName===`IMG`||e.tagName===`VIDEO`){let n=e.getAttribute(`alt`);n&&(t+=qe(n))}Array.from(e.childNodes).forEach(e=>{t+=Ke(e)}),[`P`,`DIV`,`UL`,`OL`,`LI`,`H1`,`H2`,`H3`,`H4`,`H5`,`H6`,`BLOCKQUOTE`].includes(e.tagName)&&t.trim()!==``&&(t=qe(t))}}return t=t.trim(),t===``?``:t+` `}function qe(e){let t=e.trim();return t===``?e:/[.!?]$/.test(t)?t:t+`.`}function Je(){setInterval(()=>{(!F.isActive()&&A.wrapper.scrollTop!==0||A.wrapper.scrollLeft!==0)&&(A.wrapper.scrollTop=0,A.wrapper.scrollLeft=0)},1e3)}function Ye(){document.addEventListener(`fullscreenchange`,B),document.addEventListener(`webkitfullscreenchange`,B)}function Xe(){f.postMessage&&window.addEventListener(`message`,ln,!1)}function Ze(t){let r=pe({},f);if(typeof t==`object`&&e(f,t),l.isReady()===!1)return;let i=A.wrapper.querySelectorAll(w).length;A.wrapper.classList.remove(r.transition),A.wrapper.classList.add(f.transition),A.wrapper.setAttribute(`data-transition-speed`,f.transitionSpeed),A.wrapper.setAttribute(`data-background-transition`,f.backgroundTransition),A.viewport.style.setProperty(`--slide-width`,typeof f.width==`string`?f.width:f.width+`px`),A.viewport.style.setProperty(`--slide-height`,typeof f.height==`string`?f.height:f.height+`px`),f.shuffle&&jt(),n(A.wrapper,`embedded`,f.embedded),n(A.wrapper,`rtl`,f.rtl),n(A.wrapper,`center`,f.center),f.pause===!1&&yt(),ve.reset(),re&&=(re.destroy(),null),i>1&&f.autoSlide&&f.autoSlideStoppable&&(re=new Ee(A.wrapper,()=>Math.min(Math.max((Date.now()-ae)/M,0),1)),re.on(`click`,V),N=!1),f.navigationMode==="default"?A.wrapper.removeAttribute(`data-navigation-mode`):A.wrapper.setAttribute(`data-navigation-mode`,f.navigationMode),Le.configure(f,r),Fe.configure(f,r),Ne.configure(f,r),je.configure(f,r),Me.configure(f,r),ke.configure(f,r),I.configure(f,r),se.configure(f,r),Ot()}function Qe(){window.addEventListener(`resize`,fn,!1),f.touch&&Ie.bind(),f.keyboard&&ke.bind(),f.progress&&Me.bind(),f.respondToHashChanges&&Ae.bind(),je.bind(),Fe.bind(),A.slides.addEventListener(`click`,dn,!1),A.slides.addEventListener(`transitionend`,un,!1),A.pauseOverlay.addEventListener(`click`,yt,!1),f.focusBodyOnPageVisibilityChange&&document.addEventListener(`visibilitychange`,pn,!1)}function $e(){Ie.unbind(),Fe.unbind(),ke.unbind(),je.unbind(),Me.unbind(),Ae.unbind(),window.removeEventListener(`resize`,fn,!1),A.slides.removeEventListener(`click`,dn,!1),A.slides.removeEventListener(`transitionend`,un,!1),A.pauseOverlay.removeEventListener(`click`,yt,!1)}function et(){p=!1,m!==!1&&($e(),$t(),Le.destroy(),Fe.destroy(),R.destroy(),Pe.destroy(),Ne.destroy(),je.destroy(),Me.destroy(),xe.destroy(),se.destroy(),fe.destroy(),document.removeEventListener(`fullscreenchange`,B),document.removeEventListener(`webkitfullscreenchange`,B),document.removeEventListener(`visibilitychange`,pn,!1),window.removeEventListener(`message`,ln,!1),window.removeEventListener(`load`,st,!1),A.pauseOverlay&&A.pauseOverlay.remove(),A.statusElement&&A.statusElement.remove(),document.documentElement.classList.remove(`reveal-full-page`),A.wrapper.classList.remove(`ready`,`center`,`has-horizontal-slides`,`has-vertical-slides`),A.wrapper.removeAttribute(`data-transition-speed`),A.wrapper.removeAttribute(`data-background-transition`),A.viewport.classList.remove(`reveal-viewport`),A.viewport.style.removeProperty(`--slide-width`),A.viewport.style.removeProperty(`--slide-height`),A.slides.style.removeProperty(`width`),A.slides.style.removeProperty(`height`),A.slides.style.removeProperty(`zoom`),A.slides.style.removeProperty(`left`),A.slides.style.removeProperty(`top`),A.slides.style.removeProperty(`bottom`),A.slides.style.removeProperty(`right`),A.slides.style.removeProperty(`transform`),Array.from(A.wrapper.querySelectorAll(w)).forEach(e=>{e.style.removeProperty(`display`),e.style.removeProperty(`top`),e.removeAttribute(`hidden`),e.removeAttribute(`aria-hidden`)}))}function tt(e,t,n){a.addEventListener(e,t,n)}function nt(e,t,n){a.removeEventListener(e,t,n)}function rt(e){typeof e.layout==`string`&&(D.layout=e.layout),typeof e.overview==`string`&&(D.overview=e.overview),D.layout?i(A.slides,D.layout+` `+D.overview):i(A.slides,D.overview)}function it({target:t=A.wrapper,type:n,data:r,bubbles:i=!0}){let a=document.createEvent(`HTMLEvents`,1,2);return a.initEvent(n,i,!0),e(a,r),t.dispatchEvent(a),t===A.wrapper&&ot(n),a}function at(e){it({type:`slidechanged`,data:{indexh:h,indexv:_,previousSlide:v,currentSlide:y,origin:e}})}function ot(t,n){if(f.postMessageEvents&&window.parent!==window.self){let r={namespace:`reveal`,eventName:t,state:Xt()};e(r,n),window.parent.postMessage(JSON.stringify(r),`*`)}}function st(){if(A.wrapper&&!Ce.isActive()){let e=A.viewport.offsetWidth,t=A.viewport.offsetHeight;if(!f.disableLayout){g&&!f.embedded&&document.documentElement.style.setProperty(`--vh`,window.innerHeight*.01+`px`);let n=F.isActive()?ut(e,t):ut(),r=S;ct(f.width,f.height),A.slides.style.width=n.width+`px`,A.slides.style.height=n.height+`px`,S=Math.min(n.presentationWidth/n.width,n.presentationHeight/n.height),S=Math.max(S,f.minScale),S=Math.min(S,f.maxScale),S===1||F.isActive()?(A.slides.style.zoom=``,A.slides.style.left=``,A.slides.style.top=``,A.slides.style.bottom=``,A.slides.style.right=``,rt({layout:``})):(A.slides.style.zoom=``,A.slides.style.left=`50%`,A.slides.style.top=`50%`,A.slides.style.bottom=`auto`,A.slides.style.right=`auto`,rt({layout:`translate(-50%, -50%) scale(`+S+`)`}));let i=Array.from(A.wrapper.querySelectorAll(w));for(let e=0,t=i.length;e<t;e++){let t=i[e];t.style.display!==`none`&&(f.center||t.classList.contains(`center`)?t.classList.contains(`stack`)?t.style.top=0:t.style.top=Math.max((n.height-t.scrollHeight)/2,0)+`px`:t.style.top=``)}r!==S&&it({type:`resize`,data:{oldScale:r,scale:S,size:n}})}lt(),A.viewport.style.setProperty(`--slide-scale`,S),A.viewport.style.setProperty(`--viewport-width`,e+`px`),A.viewport.style.setProperty(`--viewport-height`,t+`px`),F.layout(),Me.update(),xe.updateParallax(),L.isActive()&&L.update()}}function ct(e,n){t(A.slides,`section > .stretch, section > .r-stretch`).forEach(t=>{let r=d(t,n);if(/(img|video)/gi.test(t.nodeName)){let n=t.naturalWidth||t.videoWidth,i=t.naturalHeight||t.videoHeight,a=Math.min(e/n,r/i);t.style.width=n*a+`px`,t.style.height=i*a+`px`}else t.style.width=e+`px`,t.style.height=r+`px`})}function lt(){if(A.wrapper&&!f.disableLayout&&!Ce.isActive()&&typeof f.scrollActivationWidth==`number`&&f.view!==`scroll`){let e=ut();e.presentationWidth>0&&e.presentationWidth<=f.scrollActivationWidth?F.isActive()||(xe.create(),F.activate()):F.isActive()&&F.deactivate()}}function ut(e,t){let n=f.width,r=f.height;f.disableLayout&&(n=A.slides.offsetWidth,r=A.slides.offsetHeight);let i={width:n,height:r,presentationWidth:e||A.wrapper.offsetWidth,presentationHeight:t||A.wrapper.offsetHeight};return i.presentationWidth-=i.presentationWidth*f.margin,i.presentationHeight-=i.presentationHeight*f.margin,typeof i.width==`string`&&/%$/.test(i.width)&&(i.width=parseInt(i.width,10)/100*i.presentationWidth),typeof i.height==`string`&&/%$/.test(i.height)&&(i.height=parseInt(i.height,10)/100*i.presentationHeight),i}function dt(e,t){typeof e==`object`&&typeof e.setAttribute==`function`&&e.setAttribute(`data-previous-indexv`,t||0)}function ft(e){if(typeof e==`object`&&typeof e.setAttribute==`function`&&e.classList.contains(`stack`)){let t=e.hasAttribute(`data-start-indexv`)?`data-start-indexv`:`data-previous-indexv`;return parseInt(e.getAttribute(t)||0,10)}return 0}function pt(e=y){return e&&e.parentNode&&!!e.parentNode.nodeName.match(/section/i)}function mt(e=y){return e.classList.contains(`.stack`)||e.querySelector(`section`)!==null}function ht(){return y&&pt(y)?!y.nextElementSibling:!1}function gt(){return h===0&&_===0}function _t(){return y?!(y.nextElementSibling||pt(y)&&y.parentNode.nextElementSibling):!1}function vt(){if(f.pause){let e=A.wrapper.classList.contains(`paused`);$t(),A.wrapper.classList.add(`paused`),e===!1&&it({type:`paused`})}}function yt(){let e=A.wrapper.classList.contains(`paused`);A.wrapper.classList.remove(`paused`),Qt(),e&&it({type:`resumed`})}function bt(e){typeof e==`boolean`?e?vt():yt():xt()?yt():vt()}function xt(){return A.wrapper.classList.contains(`paused`)}function St(e){typeof e==`boolean`?e?fe.show():fe.hide():fe.isVisible()?fe.hide():fe.show()}function Ct(e){typeof e==`boolean`?e?tn():en():N?tn():en()}function wt(){return!!(M&&!N)}function Tt(e,t,n,r){if(it({type:`beforeslidechange`,data:{indexh:e===void 0?h:e,indexv:t===void 0?_:t,origin:r}}).defaultPrevented)return;v=y;let i=A.wrapper.querySelectorAll(T);if(F.isActive()){let n=F.getSlideByIndices(e,t);n&&F.scrollToSlide(n);return}if(i.length===0)return;t===void 0&&!L.isActive()&&(t=ft(i[e])),v&&v.parentNode&&v.parentNode.classList.contains(`stack`)&&dt(v.parentNode,_);let o=x.concat();x.length=0;let s=h||0,c=_||0;h=Mt(T,e===void 0?h:e),_=Mt(E,t===void 0?_:t);let l=h!==s||_!==c;l||(v=null);let u=i[h],d=u.querySelectorAll(`section`);a.classList.toggle(`is-vertical-slide`,d.length>1),y=d[_]||u;let p=!1;l&&v&&y&&!L.isActive()&&(j=`running`,p=Et(v,y,s,c),p&&A.slides.classList.add(`disable-slide-transitions`)),Ft(),st(),L.isActive()&&L.update(),n!==void 0&&I.goto(n),v&&v!==y&&(v.classList.remove(`present`),v.setAttribute(`aria-hidden`,`true`),gt()&&setTimeout(()=>{Ut().forEach(e=>{dt(e,0)})},0));stateLoop:for(let e=0,t=x.length;e<t;e++){for(let t=0;t<o.length;t++)if(o[t]===x[e]){o.splice(t,1);continue stateLoop}A.viewport.classList.add(x[e]),it({type:x[e]})}for(;o.length;)A.viewport.classList.remove(o.pop());l&&(P.afterSlideChanged(),at(r)),(l||!v)&&(P.stopEmbeddedContent(v),P.startEmbeddedContent(y)),requestAnimationFrame(()=>{Ge(Ke(y))}),Me.update(),je.update(),Le.update(),xe.update(),xe.updateParallax(),se.update(),I.update(),Ae.writeURL(),Qt(),p&&(setTimeout(()=>{A.slides.classList.remove(`disable-slide-transitions`)},0),f.autoAnimate&&ve.run(v,y))}function Et(e,t,n,r){return e.hasAttribute(`data-auto-animate`)&&t.hasAttribute(`data-auto-animate`)&&e.getAttribute(`data-auto-animate-id`)===t.getAttribute(`data-auto-animate-id`)&&!(h>n||_>r?t:e).hasAttribute(`data-auto-animate-restart`)}function Dt(e,t,n){let r=h||0;h=t,_=n;let i=y!==e;v=y,y=e,y&&v&&f.autoAnimate&&Et(v,y,r,_)&&ve.run(v,y),i&&(P.afterSlideChanged(),v&&(P.stopEmbeddedContent(v),P.stopEmbeddedContent(v.slideBackgroundElement)),P.startEmbeddedContent(y),P.startEmbeddedContent(y.slideBackgroundElement)),requestAnimationFrame(()=>{Ge(Ke(y))}),at()}function Ot(){$e(),Qe(),st(),M=f.autoSlide,Qt(),xe.create(),Ae.writeURL(),f.sortFragmentsOnSync===!0&&I.sortAll(),h!==void 0&&(h=Mt(T,h),_=Mt(E,_)),je.update(),Me.update(),Ft(),Le.update(),Le.updateVisibility(),R.update(),xe.update(!0),se.update(),P.formatEmbeddedContent(),f.autoPlayMedia===!1?P.stopEmbeddedContent(y,{unloadIframes:!1}):P.startEmbeddedContent(y),L.isActive()&&L.layout(),it({type:`sync`})}function kt(e=y){xe.sync(e),I.sync(e),P.load(e),xe.update(),Le.update(),it({type:`slidesync`,data:{slide:e}})}function At(){Vt().forEach(e=>{t(e,`section`).forEach((e,t)=>{t>0&&(e.classList.remove(`present`),e.classList.remove(`past`),e.classList.add(`future`),e.setAttribute(`aria-hidden`,`true`))})})}function jt(e=Vt()){e.forEach((t,n)=>{let r=e[Math.floor(Math.random()*e.length)];r.parentNode===t.parentNode&&t.parentNode.insertBefore(t,r);let i=t.querySelectorAll(`section`);i.length&&jt(i)})}function Mt(e,n){let r=t(A.wrapper,e),i=r.length,a=F.isActive()||Ce.isActive(),o=!1,s=!1;if(i){f.loop&&(n>=i&&(o=!0),n%=i,n<0&&(n=i+n,s=!0)),n=Math.max(Math.min(n,i-1),0);for(let e=0;e<i;e++){let t=r[e],i=f.rtl&&!pt(t);if(t.classList.remove(`past`),t.classList.remove(`present`),t.classList.remove(`future`),t.setAttribute(`hidden`,``),t.setAttribute(`aria-hidden`,`true`),t.querySelector(`section`)&&t.classList.add(`stack`),a){t.classList.add(`present`);continue}e<n?(t.classList.add(i?`future`:`past`),f.fragments&&Nt(t)):e>n?(t.classList.add(i?`past`:`future`),f.fragments&&Pt(t)):e===n&&f.fragments&&(o?Pt(t):s&&Nt(t))}let e=r[n],t=e.classList.contains(`present`);e.classList.add(`present`),e.removeAttribute(`hidden`),e.removeAttribute(`aria-hidden`),t||it({target:e,type:`visible`,bubbles:!1});let c=e.getAttribute(`data-state`);c&&(x=x.concat(c.split(` `)))}else n=0;return n}function Nt(e){t(e,`.fragment`).forEach(e=>{e.classList.add(`visible`),e.classList.remove(`current-fragment`)})}function Pt(e){t(e,`.fragment.visible`).forEach(e=>{e.classList.remove(`visible`,`current-fragment`)})}function Ft(){let e=Vt(),n=e.length,r,i;if(n&&h!==void 0){let a=L.isActive(),o=a?10:f.viewDistance;g&&(o=a?6:f.mobileViewDistance),Ce.isActive()&&(o=Number.MAX_VALUE);for(let s=0;s<n;s++){let c=e[s],l=t(c,`section`),u=l.length;if(r=Math.abs((h||0)-s)||0,f.loop&&(r=Math.abs(((h||0)-s)%(n-o))||0),r<o?P.load(c):P.unload(c),u){let e=a?0:ft(c);for(let t=0;t<u;t++){let n=l[t];i=Math.abs(s===(h||0)?(_||0)-t:t-e),r+i<o?P.load(n):P.unload(n)}}}Gt()?A.wrapper.classList.add(`has-vertical-slides`):A.wrapper.classList.remove(`has-vertical-slides`),Wt()?A.wrapper.classList.add(`has-horizontal-slides`):A.wrapper.classList.remove(`has-horizontal-slides`)}}function It({includeFragments:e=!1}={}){let t=A.wrapper.querySelectorAll(T),n=A.wrapper.querySelectorAll(E),r={left:h>0,right:h<t.length-1,up:_>0,down:_<n.length-1};if(f.loop&&(t.length>1&&(r.left=!0,r.right=!0),n.length>1&&(r.up=!0,r.down=!0)),t.length>1&&f.navigationMode===`linear`&&(r.right=r.right||r.down,r.left=r.left||r.up),e===!0){let e=I.availableRoutes();r.left=r.left||e.prev,r.up=r.up||e.prev,r.down=r.down||e.next,r.right=r.right||e.next}if(f.rtl){let e=r.left;r.left=r.right,r.right=e}return r}function Lt(e=y){let t=Vt(),n=0;mainLoop:for(let r=0;r<t.length;r++){let i=t[r],a=i.querySelectorAll(`section`);for(let t=0;t<a.length;t++){if(a[t]===e)break mainLoop;a[t].dataset.visibility!==`uncounted`&&n++}if(i===e)break;i.classList.contains(`stack`)===!1&&i.dataset.visibility!==`uncounted`&&n++}return n}function Rt(){let e=qt(),t=Lt();if(y){let e=y.querySelectorAll(`.fragment`);if(e.length>0){let n=y.querySelectorAll(`.fragment.visible`);t+=n.length/e.length*.9}}return Math.min(t/(e-1),1)}function zt(e){let n=h,r=_,i;if(e){if(F.isActive())n=parseInt(e.getAttribute(`data-index-h`),10),e.getAttribute(`data-index-v`)&&(r=parseInt(e.getAttribute(`data-index-v`),10));else{let i=pt(e),a=i?e.parentNode:e,o=Vt();n=Math.max(o.indexOf(a),0),r=void 0,i&&(r=Math.max(t(e.parentNode,`section`).indexOf(e),0))}}if(!e&&y&&y.querySelectorAll(`.fragment`).length>0){let e=y.querySelector(`.current-fragment`);i=e&&e.hasAttribute(`data-fragment-index`)?parseInt(e.getAttribute(`data-fragment-index`),10):y.querySelectorAll(`.fragment.visible`).length-1}return{h:n,v:r,f:i}}function Bt(){return t(A.wrapper,w+`:not(.stack):not([data-visibility="uncounted"])`)}function Vt(){return t(A.wrapper,T)}function Ht(){return t(A.wrapper,`.slides>section>section`)}function Ut(){return t(A.wrapper,T+`.stack`)}function Wt(){return Vt().length>1}function Gt(){return Ht().length>1}function Kt(){return Bt().map(e=>{let t={};for(let n=0;n<e.attributes.length;n++){let r=e.attributes[n];t[r.name]=r.value}return t})}function qt(){return Bt().length}function Jt(e,t){let n=Vt()[e],r=n&&n.querySelectorAll(`section`);return r&&r.length&&typeof t==`number`?r?r[t]:void 0:n}function Yt(e,t){let n=typeof e==`number`?Jt(e,t):e;if(n)return n.slideBackgroundElement}function Xt(){let e=zt();return pe({indexh:e.h,indexv:e.v,indexf:e.f,paused:xt(),overview:L.isActive()},R.getState())}function Zt(e){if(typeof e==`object`){Tt(r(e.indexh),r(e.indexv),r(e.indexf));let t=r(e.paused),n=r(e.overview);typeof t==`boolean`&&t!==xt()&&bt(t),typeof n==`boolean`&&n!==L.isActive()&&L.toggle(n),R.setState(e)}}function Qt(){if($t(),y&&f.autoSlide!==!1){let e=y.querySelector(`.current-fragment[data-autoslide]`),n=e?e.getAttribute(`data-autoslide`):null,r=y.parentNode?y.parentNode.getAttribute(`data-autoslide`):null,i=y.getAttribute(`data-autoslide`);n?M=parseInt(n,10):i?M=parseInt(i,10):r?M=parseInt(r,10):(M=f.autoSlide,y.querySelectorAll(`.fragment`).length===0&&t(y,`video, audio`).forEach(e=>{e.hasAttribute(`data-autoplay`)&&M&&e.duration*1e3/e.playbackRate>M&&(M=e.duration*1e3/e.playbackRate+1e3)})),M&&!N&&!xt()&&!L.isActive()&&(!_t()||I.availableRoutes().next||f.loop===!0)&&(ie=setTimeout(()=>{typeof f.autoSlideMethod==`function`?f.autoSlideMethod():sn(),Qt()},M),ae=Date.now()),re&&re.setPlaying(ie!==-1)}}function $t(){clearTimeout(ie),ie=-1}function en(){M&&!N&&(N=!0,it({type:`autoslidepaused`}),clearTimeout(ie),re&&re.setPlaying(!1))}function tn(){M&&N&&(N=!1,it({type:`autoslideresumed`}),Qt())}function nn({skipFragments:e=!1}={}){if(b.hasNavigatedHorizontally=!0,F.isActive())return F.prev();f.rtl?(L.isActive()||e||I.next()===!1)&&It().left&&Tt(h+1,f.navigationMode===`grid`?_:void 0):(L.isActive()||e||I.prev()===!1)&&It().left&&Tt(h-1,f.navigationMode===`grid`?_:void 0)}function rn({skipFragments:e=!1}={}){if(b.hasNavigatedHorizontally=!0,F.isActive())return F.next();f.rtl?(L.isActive()||e||I.prev()===!1)&&It().right&&Tt(h-1,f.navigationMode===`grid`?_:void 0):(L.isActive()||e||I.next()===!1)&&It().right&&Tt(h+1,f.navigationMode===`grid`?_:void 0)}function an({skipFragments:e=!1}={}){if(F.isActive())return F.prev();(L.isActive()||e||I.prev()===!1)&&It().up&&Tt(h,_-1)}function z({skipFragments:e=!1}={}){if(b.hasNavigatedVertically=!0,F.isActive())return F.next();(L.isActive()||e||I.next()===!1)&&It().down&&Tt(h,_+1)}function on({skipFragments:e=!1}={}){if(F.isActive())return F.prev();if(e||I.prev()===!1){if(It().up)an({skipFragments:e});else{let n;if(n=f.rtl?t(A.wrapper,T+`.future`).pop():t(A.wrapper,T+`.past`).pop(),n&&n.classList.contains(`stack`)){let e=n.querySelectorAll(`section`).length-1||void 0;Tt(h-1,e)}else f.rtl?rn({skipFragments:e}):nn({skipFragments:e})}}}function sn({skipFragments:e=!1}={}){if(b.hasNavigatedHorizontally=!0,b.hasNavigatedVertically=!0,F.isActive())return F.next();if(e||I.next()===!1){let t=It();t.down&&t.right&&f.loop&&ht()&&(t.down=!1),t.down?z({skipFragments:e}):f.rtl?nn({skipFragments:e}):rn({skipFragments:e})}}function cn(e){f.autoSlideStoppable&&en()}function ln(e){let t=e.data;if(typeof t==`string`&&t.charAt(0)===`{`&&t.charAt(t.length-1)===`}`&&(t=JSON.parse(t),t.method&&typeof l[t.method]==`function`)){if(O.test(t.method)===!1){let e=l[t.method].apply(l,t.args);ot(`callback`,{method:t.method,result:e})}else console.warn(`reveal.js: "`+t.method+`" is is blacklisted from the postMessage API`)}}function un(e){j===`running`&&/section/gi.test(e.target.nodeName)&&(j=`idle`,it({type:`slidetransitionend`,data:{indexh:h,indexv:_,previousSlide:v,currentSlide:y}}))}function dn(e){let t=o(e.target,`a[href^="#"]`);if(t){let n=t.getAttribute(`href`),r=Ae.getIndicesFromHash(n);r&&(l.slide(r.h,r.v,r.f),e.preventDefault())}}function fn(e){st()}function pn(e){document.hidden===!1&&document.activeElement!==document.body&&(typeof document.activeElement.blur==`function`&&document.activeElement.blur(),document.body.focus())}function B(e){(document.fullscreenElement||document.webkitFullscreenElement)===A.wrapper&&(e.stopImmediatePropagation(),setTimeout(()=>{l.layout(),l.focus.focus()},1))}function V(e){_t()&&f.loop===!1?(Tt(0,0),tn()):N?tn():en()}let mn={VERSION:Oe,initialize:Re,configure:Ze,destroy:et,sync:Ot,syncSlide:kt,syncFragments:I.sync.bind(I),slide:Tt,left:nn,right:rn,up:an,down:z,prev:on,next:sn,navigateLeft:nn,navigateRight:rn,navigateUp:an,navigateDown:z,navigatePrev:on,navigateNext:sn,navigateFragment:I.goto.bind(I),prevFragment:I.prev.bind(I),nextFragment:I.next.bind(I),on:tt,off:nt,addEventListener:tt,removeEventListener:nt,layout:st,shuffle:jt,availableRoutes:It,availableFragments:I.availableRoutes.bind(I),toggleHelp:R.toggleHelp.bind(R),toggleOverview:L.toggle.bind(L),toggleScrollView:F.toggle.bind(F),togglePause:bt,toggleAutoSlide:Ct,toggleJumpToSlide:St,isFirstSlide:gt,isLastSlide:_t,isLastVerticalSlide:ht,isVerticalSlide:pt,isVerticalStack:mt,isPaused:xt,isAutoSliding:wt,isSpeakerNotes:Le.isSpeakerNotesWindow.bind(Le),isOverview:L.isActive.bind(L),isFocused:Fe.isFocused.bind(Fe),isOverlayOpen:R.isOpen.bind(R),isScrollView:F.isActive.bind(F),isPrintView:Ce.isActive.bind(Ce),isReady:()=>m,loadSlide:P.load.bind(P),unloadSlide:P.unload.bind(P),startEmbeddedContent:()=>P.startEmbeddedContent(y),stopEmbeddedContent:()=>P.stopEmbeddedContent(y,{unloadIframes:!1}),previewIframe:R.previewIframe.bind(R),previewImage:R.previewImage.bind(R),previewVideo:R.previewVideo.bind(R),showPreview:R.previewIframe.bind(R),hidePreview:R.close.bind(R),addEventListeners:Qe,removeEventListeners:$e,dispatchEvent:it,getState:Xt,setState:Zt,getProgress:Rt,getIndices:zt,getSlidesAttributes:Kt,getSlidePastCount:Lt,getTotalSlides:qt,getSlide:Jt,getPreviousSlide:()=>v,getCurrentSlide:()=>y,getSlideBackground:Yt,getSlideNotes:Le.getSlideNotes.bind(Le),getSlides:Bt,getHorizontalSlides:Vt,getVerticalSlides:Ht,hasHorizontalSlides:Wt,hasVerticalSlides:Gt,hasNavigatedHorizontally:()=>b.hasNavigatedHorizontally,hasNavigatedVertically:()=>b.hasNavigatedVertically,shouldAutoAnimateBetween:Et,addKeyBinding:ke.addKeyBinding.bind(ke),removeKeyBinding:ke.removeKeyBinding.bind(ke),triggerKey:ke.triggerKey.bind(ke),registerKeyboardShortcut:ke.registerKeyboardShortcut.bind(ke),getComputedSlideSize:ut,setCurrentScrollPage:Dt,removeHiddenSlides:He,getScale:()=>S,getConfig:()=>f,getQueryHash:u,getSlidePath:Ae.getHash.bind(Ae),getRevealElement:()=>a,getSlidesElement:()=>A.slides,getViewportElement:()=>A.viewport,getBackgroundsElement:()=>xe.element,registerPlugin:Pe.registerPlugin.bind(Pe),hasPlugin:Pe.hasPlugin.bind(Pe),getPlugin:Pe.getPlugin.bind(Pe),getPlugins:Pe.getRegisteredPlugins.bind(Pe)};return e(l,pe(pe({},mn),{},{announceStatus:Ge,getStatusText:Ke,focus:Fe,scroll:F,progress:Me,controls:je,location:Ae,overview:L,keyboard:ke,fragments:I,backgrounds:xe,slideContent:P,slideNumber:se,onUserInput:cn,closeOverlay:R.close.bind(R),updateSlidesVisibility:Ft,layoutSlideContents:ct,transformSlides:rt,cueAutoSlide:Qt,cancelAutoSlide:$t})),mn}var L=I,ke=[];L.initialize=e=>{let t=document.querySelector(`.reveal`);if(!(t instanceof HTMLElement))throw Error(`Unable to find presentation root (<div class="reveal">).`);return Object.assign(L,new I(t,e)),ke.map(e=>e(L)),L.initialize()},[`configure`,`on`,`off`,`addEventListener`,`removeEventListener`,`registerPlugin`].forEach(e=>{L[e]=(...t)=>{ke.push(n=>n[e].call(null,...t))}}),L.isReady=()=>!1,L.VERSION=Oe;var Ae=`<!--
	NOTE: You need to build the notes plugin after making changes to this file.
-->
<html lang="en">
	<head>
		<meta charset="utf-8">

		<title>reveal.js - Speaker View</title>

		<style>
			body {
				font-family: Helvetica;
				font-size: 18px;
			}

			#current-slide,
			#upcoming-slide,
			#speaker-controls {
				padding: 6px;
				box-sizing: border-box;
				-moz-box-sizing: border-box;
			}

			#current-slide iframe,
			#upcoming-slide iframe {
				width: 100%;
				height: 100%;
				border: 1px solid #ddd;
			}

			#current-slide .label,
			#upcoming-slide .label {
				position: absolute;
				top: 10px;
				left: 10px;
				z-index: 2;
			}

			#connection-status {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 20;
				padding: 30% 20% 20% 20%;
				font-size: 18px;
				color: #222;
				background: #fff;
				text-align: center;
				box-sizing: border-box;
				line-height: 1.4;
			}

			.overlay-element {
				height: 34px;
				line-height: 34px;
				padding: 0 10px;
				text-shadow: none;
				background: rgba( 220, 220, 220, 0.8 );
				color: #222;
				font-size: 14px;
			}

			.overlay-element.interactive:hover {
				background: rgba( 220, 220, 220, 1 );
			}

			#current-slide {
				position: absolute;
				width: 60%;
				height: 100%;
				top: 0;
				left: 0;
				padding-right: 0;
			}

			#upcoming-slide {
				position: absolute;
				width: 40%;
				height: 40%;
				right: 0;
				top: 0;
			}

			/* Speaker controls */
			#speaker-controls {
				position: absolute;
				top: 40%;
				right: 0;
				width: 40%;
				height: 60%;
				overflow: auto;
				font-size: 18px;
			}

				.speaker-controls-time.hidden,
				.speaker-controls-notes.hidden {
					display: none;
				}

				.speaker-controls-time .label,
				.speaker-controls-pace .label,
				.speaker-controls-notes .label {
					text-transform: uppercase;
					font-weight: normal;
					font-size: 0.66em;
					color: #666;
					margin: 0;
				}

				.speaker-controls-time, .speaker-controls-pace {
					border-bottom: 1px solid rgba( 200, 200, 200, 0.5 );
					margin-bottom: 10px;
					padding: 10px 16px;
					padding-bottom: 20px;
					cursor: pointer;
				}

				.speaker-controls-time .reset-button {
					opacity: 0;
					float: right;
					color: #666;
					text-decoration: none;
				}
				.speaker-controls-time:hover .reset-button {
					opacity: 1;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock {
					width: 50%;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock,
				.speaker-controls-time .pacing .hours-value,
				.speaker-controls-time .pacing .minutes-value,
				.speaker-controls-time .pacing .seconds-value {
					font-size: 1.9em;
				}

				.speaker-controls-time .timer {
					float: left;
				}

				.speaker-controls-time .clock {
					float: right;
					text-align: right;
				}

				.speaker-controls-time span.mute {
					opacity: 0.3;
				}

				.speaker-controls-time .pacing-title {
					margin-top: 5px;
				}

				.speaker-controls-time .pacing.ahead {
					color: blue;
				}

				.speaker-controls-time .pacing.on-track {
					color: green;
				}

				.speaker-controls-time .pacing.behind {
					color: red;
				}

				.speaker-controls-notes {
					padding: 10px 16px;
				}

				.speaker-controls-notes .value {
					margin-top: 5px;
					line-height: 1.4;
					font-size: 1.2em;
				}

			/* Layout selector\xA0*/
			#speaker-layout {
				position: absolute;
				top: 10px;
				right: 10px;
				color: #222;
				z-index: 10;
			}
				#speaker-layout select {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					border: 0;
					box-shadow: 0;
					cursor: pointer;
					opacity: 0;

					font-size: 1em;
					background-color: transparent;

					-moz-appearance: none;
					-webkit-appearance: none;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				}

				#speaker-layout select:focus {
					outline: none;
					box-shadow: none;
				}

			.clear {
				clear: both;
			}

			/* Speaker layout: Wide */
			body[data-speaker-layout="wide"] #current-slide,
			body[data-speaker-layout="wide"] #upcoming-slide {
				width: 50%;
				height: 45%;
				padding: 6px;
			}

			body[data-speaker-layout="wide"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="wide"] #upcoming-slide {
				top: 0;
				left: 50%;
			}

			body[data-speaker-layout="wide"] #speaker-controls {
				top: 45%;
				left: 0;
				width: 100%;
				height: 50%;
				font-size: 1.25em;
			}

			/* Speaker layout: Tall */
			body[data-speaker-layout="tall"] #current-slide,
			body[data-speaker-layout="tall"] #upcoming-slide {
				width: 45%;
				height: 50%;
				padding: 6px;
			}

			body[data-speaker-layout="tall"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="tall"] #upcoming-slide {
				top: 50%;
				left: 0;
			}

			body[data-speaker-layout="tall"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 45%;
				width: 55%;
				height: 100%;
				font-size: 1.25em;
			}

			/* Speaker layout: Notes only */
			body[data-speaker-layout="notes-only"] #current-slide,
			body[data-speaker-layout="notes-only"] #upcoming-slide {
				display: none;
			}

			body[data-speaker-layout="notes-only"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				font-size: 1.25em;
			}

			@media screen and (max-width: 1080px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 16px;
				}
			}

			@media screen and (max-width: 900px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 14px;
				}
			}

			@media screen and (max-width: 800px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 12px;
				}
			}

		</style>
	</head>

	<body>

		<div id="connection-status">Loading speaker view...</div>

		<div id="current-slide"></div>
		<div id="upcoming-slide"><span class="overlay-element label">Upcoming</span></div>
		<div id="speaker-controls">
			<div class="speaker-controls-time">
				<h4 class="label">Time <span class="reset-button">Click to Reset</span></h4>
				<div class="clock">
					<span class="clock-value">0:00 AM</span>
				</div>
				<div class="timer">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
				<div class="clear"></div>

				<h4 class="label pacing-title" style="display: none">Pacing – Time to finish current slide</h4>
				<div class="pacing" style="display: none">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
			</div>

			<div class="speaker-controls-notes hidden">
				<h4 class="label">Notes</h4>
				<div class="value"></div>
			</div>
		</div>
		<div id="speaker-layout" class="overlay-element interactive">
			<span class="speaker-layout-label"></span>
			<select class="speaker-layout-dropdown"></select>
		</div>

		<script>

			(function() {

				var notes,
					notesValue,
					currentState,
					currentSlide,
					upcomingSlide,
					layoutLabel,
					layoutDropdown,
					pendingCalls = {},
					lastRevealApiCallId = 0,
					connected = false

				var connectionStatus = document.querySelector( '#connection-status' );

				var SPEAKER_LAYOUTS = {
					'default': 'Default',
					'wide': 'Wide',
					'tall': 'Tall',
					'notes-only': 'Notes only'
				};

				setupLayout();

				let openerOrigin;

				try {
					openerOrigin = window.opener.location.origin;
				}
				catch ( error ) { console.warn( error ) }

				// In order to prevent XSS, the speaker view will only run if its
				// opener has the same origin as itself
				if( window.location.origin !== openerOrigin ) {
					connectionStatus.innerHTML = 'Cross origin error.<br>The speaker window can only be opened from the same origin.';
					return;
				}

				var connectionTimeout = setTimeout( function() {
					connectionStatus.innerHTML = 'Error connecting to main window.<br>Please try closing and reopening the speaker view.';
				}, 5000 );

				window.addEventListener( 'message', function( event ) {

					// Validate the origin of all messages to avoid parsing messages
					// that aren't meant for us. Ignore when running off file:// so
					// that the speaker view continues to work without a web server.
					if( window.location.origin !== event.origin && window.location.origin !== 'file://' ) {
						return
					}

					clearTimeout( connectionTimeout );
					connectionStatus.style.display = 'none';

					var data = JSON.parse( event.data );

					// The overview mode is only useful to the reveal.js instance
					// where navigation occurs so we don't sync it
					if( data.state ) delete data.state.overview;

					// Messages sent by the notes plugin inside of the main window
					if( data && data.namespace === 'reveal-notes' ) {
						if( data.type === 'connect' ) {
							handleConnectMessage( data );
						}
						else if( data.type === 'state' ) {
							handleStateMessage( data );
						}
						else if( data.type === 'return' ) {
							pendingCalls[data.callId](data.result);
							delete pendingCalls[data.callId];
						}
					}
					// Messages sent by the reveal.js inside of the current slide preview
					else if( data && data.namespace === 'reveal' ) {
						const supportedEvents = [
							'slidechanged',
							'fragmentshown',
							'fragmenthidden',
							'paused',
							'resumed',
							'previewiframe',
							'previewimage',
							'previewvideo',
							'closeoverlay'
						];

						if( /ready/.test( data.eventName ) ) {
							// Send a message back to notify that the handshake is complete
							window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'connected'} ), '*' );
						}
						else if( supportedEvents.includes( data.eventName ) && currentState !== JSON.stringify( data.state ) ) {
							dispatchStateToMainWindow( data.state );
						}
					}

				} );

				/**
				 * Updates the presentation in the main window to match the state
				 * of the presentation in the notes window.
				 */
				const dispatchStateToMainWindow = debounce(( state ) => {
					window.opener.postMessage( JSON.stringify({ method: 'setState', args: [ state ]} ), '*' );
				}, 500);

				/**
				 * Asynchronously calls the Reveal.js API of the main frame.
				 */
				function callRevealApi( methodName, methodArguments, callback ) {

					var callId = ++lastRevealApiCallId;
					pendingCalls[callId] = callback;
					window.opener.postMessage( JSON.stringify( {
						namespace: 'reveal-notes',
						type: 'call',
						callId: callId,
						methodName: methodName,
						arguments: methodArguments
					} ), '*' );

				}

				/**
				 * Called when the main window is trying to establish a
				 * connection.
				 */
				function handleConnectMessage( data ) {

					if( connected === false ) {
						connected = true;

						setupIframes( data );
						setupKeyboard();
						setupNotes();
						setupTimer();
						setupHeartbeat();
					}

				}

				/**
				 * Called when the main window sends an updated state.
				 */
				function handleStateMessage( data ) {

					// Store the most recently set state to avoid circular loops
					// applying the same state
					currentState = JSON.stringify( data.state );

					// No need for updating the notes in case of fragment changes
					if ( data.notes ) {
						notes.classList.remove( 'hidden' );
						notesValue.style.whiteSpace = data.whitespace;
						if( data.markdown ) {
							notesValue.innerHTML = marked.parse( data.notes );
						}
						else {
							notesValue.innerHTML = data.notes;
						}
					}
					else {
						notes.classList.add( 'hidden' );
					}

					// Don't show lightboxes in the upcoming slide
					const { previewVideo, previewImage, previewIframe, ...upcomingState } = data.state;

					// Update the note slides
					currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ upcomingState ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'next' }), '*' );

				}

				// Limit to max one state update per X ms
				handleStateMessage = debounce( handleStateMessage, 200 );

				/**
				 * Forward keyboard events to the current slide window.
				 * This enables keyboard events to work even if focus
				 * isn't set on the current slide iframe.
				 *
				 * Block F5 default handling, it reloads and disconnects
				 * the speaker notes window.
				 */
				function setupKeyboard() {

					document.addEventListener( 'keydown', function( event ) {
						if( event.keyCode === 116 || ( event.metaKey && event.keyCode === 82 ) ) {
							event.preventDefault();
							return false;
						}
						currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'triggerKey', args: [ event.keyCode ] }), '*' );
					} );

				}

				/**
				 * Creates the preview iframes.
				 */
				function setupIframes( data ) {

					var params = [
						'receiver',
						'progress=false',
						'history=false',
						'transition=none',
						'autoSlide=0',
						'backgroundTransition=none'
					].join( '&' );

					var urlSeparator = /\\?/.test(data.url) ? '&' : '?';
					var hash = '#/' + data.state.indexh + '/' + data.state.indexv;
					var currentURL = data.url + urlSeparator + params + '&scrollActivationWidth=false&postMessageEvents=true' + hash;
					var upcomingURL = data.url + urlSeparator + params + '&scrollActivationWidth=false&controls=false' + hash;

					currentSlide = document.createElement( 'iframe' );
					currentSlide.setAttribute( 'width', 1280 );
					currentSlide.setAttribute( 'height', 1024 );
					currentSlide.setAttribute( 'src', currentURL );
					document.querySelector( '#current-slide' ).appendChild( currentSlide );

					upcomingSlide = document.createElement( 'iframe' );
					upcomingSlide.setAttribute( 'width', 640 );
					upcomingSlide.setAttribute( 'height', 512 );
					upcomingSlide.setAttribute( 'src', upcomingURL );
					document.querySelector( '#upcoming-slide' ).appendChild( upcomingSlide );

				}

				/**
				 * Setup the notes UI.
				 */
				function setupNotes() {

					notes = document.querySelector( '.speaker-controls-notes' );
					notesValue = document.querySelector( '.speaker-controls-notes .value' );

				}

				/**
				 * We send out a heartbeat at all times to ensure we can
				 * reconnect with the main presentation window after reloads.
				 */
				function setupHeartbeat() {

					setInterval( () => {
						window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'heartbeat'} ), '*' );
					}, 1000 );

				}

				function getTimings( callback ) {

					callRevealApi( 'getSlidesAttributes', [], function ( slideAttributes ) {
						callRevealApi( 'getConfig', [], function ( config ) {
							var totalTime = config.totalTime;
							var minTimePerSlide = config.minimumTimePerSlide || 0;
							var defaultTiming = config.defaultTiming;
							if ((defaultTiming == null) && (totalTime == null)) {
								callback(null);
								return;
							}
							// Setting totalTime overrides defaultTiming
							if (totalTime) {
								defaultTiming = 0;
							}
							var timings = [];
							for ( var i in slideAttributes ) {
								var slide = slideAttributes[ i ];
								var timing = defaultTiming;
								if( slide.hasOwnProperty( 'data-timing' )) {
									var t = slide[ 'data-timing' ];
									timing = parseInt(t);
									if( isNaN(timing) ) {
										console.warn("Could not parse timing '" + t + "' of slide " + i + "; using default of " + defaultTiming);
										timing = defaultTiming;
									}
								}
								timings.push(timing);
							}
							if ( totalTime ) {
								// After we've allocated time to individual slides, we summarize it and
								// subtract it from the total time
								var remainingTime = totalTime - timings.reduce( function(a, b) { return a + b; }, 0 );
								// The remaining time is divided by the number of slides that have 0 seconds
								// allocated at the moment, giving the average time-per-slide on the remaining slides
								var remainingSlides = (timings.filter( function(x) { return x == 0 }) ).length
								var timePerSlide = Math.round( remainingTime / remainingSlides, 0 )
								// And now we replace every zero-value timing with that average
								timings = timings.map( function(x) { return (x==0 ? timePerSlide : x) } );
							}
							var slidesUnderMinimum = timings.filter( function(x) { return (x < minTimePerSlide) } ).length
							if ( slidesUnderMinimum ) {
								message = "The pacing time for " + slidesUnderMinimum + " slide(s) is under the configured minimum of " + minTimePerSlide + " seconds. Check the data-timing attribute on individual slides, or consider increasing the totalTime or minimumTimePerSlide configuration options (or removing some slides).";
								alert(message);
							}
							callback( timings );
						} );
					} );

				}

				/**
				 * Return the number of seconds allocated for presenting
				 * all slides up to and including this one.
				 */
				function getTimeAllocated( timings, callback ) {

					callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
						var allocated = 0;
						for (var i in timings.slice(0, currentSlide + 1)) {
							allocated += timings[i];
						}
						callback( allocated );
					} );

				}

				/**
				 * Create the timer and clock and start updating them
				 * at an interval.
				 */
				function setupTimer() {

					var start = new Date(),
					timeEl = document.querySelector( '.speaker-controls-time' ),
					clockEl = timeEl.querySelector( '.clock-value' ),
					hoursEl = timeEl.querySelector( '.hours-value' ),
					minutesEl = timeEl.querySelector( '.minutes-value' ),
					secondsEl = timeEl.querySelector( '.seconds-value' ),
					pacingTitleEl = timeEl.querySelector( '.pacing-title' ),
					pacingEl = timeEl.querySelector( '.pacing' ),
					pacingHoursEl = pacingEl.querySelector( '.hours-value' ),
					pacingMinutesEl = pacingEl.querySelector( '.minutes-value' ),
					pacingSecondsEl = pacingEl.querySelector( '.seconds-value' );

					var timings = null;
					getTimings( function ( _timings ) {

						timings = _timings;
						if (_timings !== null) {
							pacingTitleEl.style.removeProperty('display');
							pacingEl.style.removeProperty('display');
						}

						// Update once directly
						_updateTimer();

						// Then update every second
						setInterval( _updateTimer, 1000 );

					} );


					function _resetTimer() {

						if (timings == null) {
							start = new Date();
							_updateTimer();
						}
						else {
							// Reset timer to beginning of current slide
							getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
								var slideEndTiming = slideEndTimingSeconds * 1000;
								callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
									var currentSlideTiming = timings[currentSlide] * 1000;
									var previousSlidesTiming = slideEndTiming - currentSlideTiming;
									var now = new Date();
									start = new Date(now.getTime() - previousSlidesTiming);
									_updateTimer();
								} );
							} );
						}

					}

					timeEl.addEventListener( 'click', function() {
						_resetTimer();
						return false;
					} );

					function _displayTime( hrEl, minEl, secEl, time) {

						var sign = Math.sign(time) == -1 ? "-" : "";
						time = Math.abs(Math.round(time / 1000));
						var seconds = time % 60;
						var minutes = Math.floor( time / 60 ) % 60 ;
						var hours = Math.floor( time / ( 60 * 60 )) ;
						hrEl.innerHTML = sign + zeroPadInteger( hours );
						if (hours == 0) {
							hrEl.classList.add( 'mute' );
						}
						else {
							hrEl.classList.remove( 'mute' );
						}
						minEl.innerHTML = ':' + zeroPadInteger( minutes );
						if (hours == 0 && minutes == 0) {
							minEl.classList.add( 'mute' );
						}
						else {
							minEl.classList.remove( 'mute' );
						}
						secEl.innerHTML = ':' + zeroPadInteger( seconds );
					}

					function _updateTimer() {

						var diff, hours, minutes, seconds,
						now = new Date();

						diff = now.getTime() - start.getTime();

						clockEl.innerHTML = now.toLocaleTimeString( 'en-US', { hour12: true, hour: '2-digit', minute:'2-digit' } );
						_displayTime( hoursEl, minutesEl, secondsEl, diff );
						if (timings !== null) {
							_updatePacing(diff);
						}

					}

					function _updatePacing(diff) {

						getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
							var slideEndTiming = slideEndTimingSeconds * 1000;

							callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
								var currentSlideTiming = timings[currentSlide] * 1000;
								var timeLeftCurrentSlide = slideEndTiming - diff;
								if (timeLeftCurrentSlide < 0) {
									pacingEl.className = 'pacing behind';
								}
								else if (timeLeftCurrentSlide < currentSlideTiming) {
									pacingEl.className = 'pacing on-track';
								}
								else {
									pacingEl.className = 'pacing ahead';
								}
								_displayTime( pacingHoursEl, pacingMinutesEl, pacingSecondsEl, timeLeftCurrentSlide );
							} );
						} );
					}

				}

				/**
				 * Sets up the speaker view layout and layout selector.
				 */
				function setupLayout() {

					layoutDropdown = document.querySelector( '.speaker-layout-dropdown' );
					layoutLabel = document.querySelector( '.speaker-layout-label' );

					// Render the list of available layouts
					for( var id in SPEAKER_LAYOUTS ) {
						var option = document.createElement( 'option' );
						option.setAttribute( 'value', id );
						option.textContent = SPEAKER_LAYOUTS[ id ];
						layoutDropdown.appendChild( option );
					}

					// Monitor the dropdown for changes
					layoutDropdown.addEventListener( 'change', function( event ) {

						setLayout( layoutDropdown.value );

					}, false );

					// Restore any currently persisted layout
					setLayout( getLayout() );

				}

				/**
				 * Sets a new speaker view layout. The layout is persisted
				 * in local storage.
				 */
				function setLayout( value ) {

					var title = SPEAKER_LAYOUTS[ value ];

					layoutLabel.innerHTML = 'Layout' + ( title ? ( ': ' + title ) : '' );
					layoutDropdown.value = value;

					document.body.setAttribute( 'data-speaker-layout', value );

					// Persist locally
					if( supportsLocalStorage() ) {
						window.localStorage.setItem( 'reveal-speaker-layout', value );
					}

				}

				/**
				 * Returns the ID of the most recently set speaker layout
				 * or our default layout if none has been set.
				 */
				function getLayout() {

					if( supportsLocalStorage() ) {
						var layout = window.localStorage.getItem( 'reveal-speaker-layout' );
						if( layout ) {
							return layout;
						}
					}

					// Default to the first record in the layouts hash
					for( var id in SPEAKER_LAYOUTS ) {
						return id;
					}

				}

				function supportsLocalStorage() {

					try {
						localStorage.setItem('test', 'test');
						localStorage.removeItem('test');
						return true;
					}
					catch( e ) {
						return false;
					}

				}

				function zeroPadInteger( num ) {

					var str = '00' + parseInt( num );
					return str.substring( str.length - 2 );

				}

				/**
				 * Limits the frequency at which a function can be called.
				 */
				function debounce( fn, ms ) {

					var lastTime = 0,
						timeout;

					return function() {

						var args = arguments;
						var context = this;

						clearTimeout( timeout );

						var timeSinceLastCall = Date.now() - lastTime;
						if( timeSinceLastCall > ms ) {
							fn.apply( context, args );
							lastTime = Date.now();
						}
						else {
							timeout = setTimeout( function() {
								fn.apply( context, args );
								lastTime = Date.now();
							}, ms - timeSinceLastCall );
						}

					}

				}

			})();

		<\/script>
	</body>
</html>`;function je(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Me=je();function Ne(e){Me=e}var Pe={exec:()=>null};function R(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(Ie.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var Fe=(()=>{try{return!0}catch{return!1}})(),Ie={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,`i`),blockquoteBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}>`)},Le=/^(?:[ \t]*(?:\n|$))+/,Re=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ze=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Be=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ve=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,He=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Ue=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,We=R(Ue).replace(/bull/g,He).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),Ge=R(Ue).replace(/bull/g,He).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ke=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qe=/^[^\n]+/,Je=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ye=R(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,Je).replace(`title`,/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Xe=R(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,He).getRegex(),Ze=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,Qe=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,$e=R(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,Qe).replace(`tag`,Ze).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),et=R(Ke).replace(`hr`,Be).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Ze).getRegex(),tt={blockquote:R(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace(`paragraph`,et).getRegex(),code:Re,def:Ye,fences:ze,heading:Ve,hr:Be,html:$e,lheading:We,list:Xe,newline:Le,paragraph:et,table:Pe,text:qe},nt=R(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,Be).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Ze).getRegex(),rt={...tt,lheading:Ge,table:nt,paragraph:R(Ke).replace(`hr`,Be).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,nt).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Ze).getRegex()},it={...tt,html:R(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace(`comment`,Qe).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Pe,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:R(Ke).replace(`hr`,Be).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,We).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},at=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ot=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,st=/^( {2,}|\\)\n(?!\s*$)/,ct=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,lt=/[\p{P}\p{S}]/u,ut=/[\s\p{P}\p{S}]/u,dt=/[^\s\p{P}\p{S}]/u,ft=R(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,ut).getRegex(),pt=/(?!~)[\p{P}\p{S}]/u,mt=/(?!~)[\s\p{P}\p{S}]/u,ht=/(?:[^\s\p{P}\p{S}]|~)/u,gt=R(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,Fe?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),_t=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,vt=R(_t,`u`).replace(/punct/g,lt).getRegex(),yt=R(_t,`u`).replace(/punct/g,pt).getRegex(),bt=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,xt=R(bt,`gu`).replace(/notPunctSpace/g,dt).replace(/punctSpace/g,ut).replace(/punct/g,lt).getRegex(),St=R(bt,`gu`).replace(/notPunctSpace/g,ht).replace(/punctSpace/g,mt).replace(/punct/g,pt).getRegex(),Ct=R(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,dt).replace(/punctSpace/g,ut).replace(/punct/g,lt).getRegex(),wt=R(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,lt).getRegex(),Tt=R(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,dt).replace(/punctSpace/g,ut).replace(/punct/g,lt).getRegex(),Et=R(/\\(punct)/,`gu`).replace(/punct/g,lt).getRegex(),Dt=R(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ot=R(Qe).replace(`(?:-->|$)`,`-->`).getRegex(),kt=R(`^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,Ot).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),At=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,jt=R(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace(`label`,At).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace(`title`,/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Mt=R(/^!?\[(label)\]\[(ref)\]/).replace(`label`,At).replace(`ref`,Je).getRegex(),Nt=R(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,Je).getRegex(),Pt=R(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,Mt).replace(`nolink`,Nt).getRegex(),Ft=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,It={_backpedal:Pe,anyPunctuation:Et,autolink:Dt,blockSkip:gt,br:st,code:ot,del:Pe,delLDelim:Pe,delRDelim:Pe,emStrongLDelim:vt,emStrongRDelimAst:xt,emStrongRDelimUnd:Ct,escape:at,link:jt,nolink:Nt,punctuation:ft,reflink:Mt,reflinkSearch:Pt,tag:kt,text:ct,url:Pe},Lt={...It,link:R(/^!?\[(label)\]\((.*?)\)/).replace(`label`,At).getRegex(),reflink:R(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,At).getRegex()},Rt={...It,emStrongRDelimAst:St,emStrongLDelim:yt,delLDelim:wt,delRDelim:Tt,url:R(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`protocol`,Ft).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:R(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace(`protocol`,Ft).getRegex()},zt={...Rt,br:R(st).replace(`{2,}`,`*`).getRegex(),text:R(Rt.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},Bt={normal:tt,gfm:rt,pedantic:it},Vt={normal:It,gfm:Rt,breaks:zt,pedantic:Lt},Ht={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Ut=e=>Ht[e];function Wt(e,t){if(t){if(Ie.escapeTest.test(e))return e.replace(Ie.escapeReplace,Ut)}else if(Ie.escapeTestNoEncode.test(e))return e.replace(Ie.escapeReplaceNoEncode,Ut);return e}function Gt(e){try{e=encodeURI(e).replace(Ie.percentDecode,`%`)}catch{return null}return e}function Kt(e,t){let n=e.replace(Ie.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(Ie.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t){if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``)}for(;r<n.length;r++)n[r]=n[r].trim().replace(Ie.slashPipe,`|`);return n}function qt(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function Jt(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Yt(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function Xt(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`);r.state.inLink=!0;let c={type:e[0].charAt(0)===`!`?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:r.inlineTokens(s)};return r.state.inLink=!1,c}function Zt(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return r.length>=i.length?e.slice(i.length):e}).join(`
`)}var Qt=class{options;rules;lexer;constructor(e){this.options=e||Me}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,``);return{type:`code`,raw:t[0],codeBlockStyle:`indented`,text:this.options.pedantic?e:qt(e,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=Zt(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=qt(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:qt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=qt(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o;for(o=0;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,``);n=n?`${n}
${s}`:s,r=r?`${r}
${c}`:c;let l=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=l,e.length===0)break;let u=i.at(-1);if(u?.type===`code`)break;if(u?.type===`blockquote`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.blockquote(a);i[i.length-1]=o,n=n.substring(0,n.length-t.raw.length)+o.raw,r=r.substring(0,r.length-t.text.length)+o.text;break}if(u?.type===`list`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.list(a);i[i.length-1]=o,n=n.substring(0,n.length-u.raw.length)+o.raw,r=r.substring(0,r.length-t.raw.length)+o.raw,e=a.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:`blockquote`,raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,i={type:`list`,raw:``,ordered:r,start:r?+n.slice(0,-1):``,loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:`[*+-]`);let a=this.rules.other.listItemRegex(n),o=!1;for(;e;){let n=!1,r=``,s=``;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let c=Yt(t[2].split(`
`,1)[0],t[1].length),l=e.split(`
`,1)[0],u=!c.trim(),d=0;if(this.options.pedantic?(d=2,s=c.trimStart()):u?d=t[1].length+1:(d=c.search(this.rules.other.nonSpaceChar),d=d>4?1:d,s=c.slice(d),d+=t[1].length),u&&this.rules.other.blankLine.test(l)&&(r+=l+`
`,e=e.substring(l.length+1),n=!0),!n){let t=this.rules.other.nextBulletRegex(d),n=this.rules.other.hrRegex(d),i=this.rules.other.fencesBeginRegex(d),a=this.rules.other.headingBeginRegex(d),o=this.rules.other.htmlBeginRegex(d),f=this.rules.other.blockquoteBeginRegex(d);for(;e;){let p=e.split(`
`,1)[0],m;if(l=p,this.options.pedantic?(l=l.replace(this.rules.other.listReplaceNesting,`  `),m=l):m=l.replace(this.rules.other.tabCharGlobal,`    `),i.test(l)||a.test(l)||o.test(l)||f.test(l)||t.test(l)||n.test(l))break;if(m.search(this.rules.other.nonSpaceChar)>=d||!l.trim())s+=`
`+m.slice(d);else{if(u||c.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||i.test(c)||a.test(c)||n.test(c))break;s+=`
`+l}u=!l.trim(),r+=p+`
`,e=e.substring(p.length+1),c=m.slice(d)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(o=!0)),i.items.push({type:`list_item`,raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(s),loose:!1,text:s,tokens:[]}),i.raw+=r}let s=i.items.at(-1);if(s)s.raw=s.raw.trimEnd(),s.text=s.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let e of i.items){if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),e.task){if(e.text=e.text.replace(this.rules.other.listReplaceTask,``),e.tokens[0]?.type===`text`||e.tokens[0]?.type===`paragraph`){e.tokens[0].raw=e.tokens[0].raw.replace(this.rules.other.listReplaceTask,``),e.tokens[0].text=e.tokens[0].text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}}let t=this.rules.other.listTaskCheckbox.exec(e.raw);if(t){let n={type:`checkbox`,raw:t[0]+` `,checked:t[0]!==`[ ]`};e.checked=n.checked,i.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=n.raw+e.tokens[0].raw,e.tokens[0].text=n.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(n)):e.tokens.unshift({type:`paragraph`,raw:n.raw,text:n.raw,tokens:[n]}):e.tokens.unshift(n)}}if(!i.loose){let t=e.tokens.filter(e=>e.type===`space`);i.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(i.loose)for(let e of i.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:`html`,block:!0,raw:t[0],pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal,` `),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:t[0],href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Kt(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(Kt(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:t[0],depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=qt(e.slice(0,-1),`\\`);if((e.length-t.length)%2==0)return}else{let e=Jt(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let n=t[2],r=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(n);e&&(n=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):``;return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(n=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?n.slice(1):n.slice(1,-1)),Xt(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,`$1`),title:r&&r.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=t[(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal,` `).toLowerCase()];if(!e){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return Xt(n,e,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=0,c=r[0][0]===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+n);(r=c.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(a=[...i].length,r[3]||r[4]){o+=a;continue}if((r[5]||r[6])&&n%3&&!((n+a)%3)){s+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o+s);let t=[...r[0]][0].length,c=e.slice(0,n+r.index+t+a);if(Math.min(n,a)%2){let e=c.slice(1,-1);return{type:`em`,raw:c,text:e,tokens:this.lexer.inlineTokens(e)}}let l=c.slice(2,-2);return{type:`strong`,raw:c,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim;for(s.lastIndex=0,t=t.slice(-1*e.length+n);(r=s.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:t[0],escaped:e}}}},$t=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Me,this.options.tokenizer=this.options.tokenizer||new Qt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:Ie,block:Bt.normal,inline:Vt.normal};this.options.pedantic?(t.block=Bt.pedantic,t.inline=Vt.pedantic):this.options.gfm&&(t.block=Bt.gfm,t.inline=this.options.breaks?Vt.breaks:Vt.gfm),this.tokenizer.rules=t}static get rules(){return{block:Bt,inline:Vt}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(Ie.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){for(this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(Ie.tabCharGlobal,`    `).replace(Ie.spaceLine,``));e;){let r;if(this.options.extensions?.block?.some(n=>(r=n.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let n=t.at(-1);r.raw.length===1&&n!==void 0?n.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.text,this.inlineQueue.at(-1).src=n.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(i=e.substring(0,t+1))}if(this.state.top&&(r=this.tokenizer.paragraph(i))){let a=t.at(-1);n&&a?.type===`paragraph`?(a.raw+=(a.raw.endsWith(`
`)?``:`
`)+r.raw,a.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):t.push(r),n=i.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(r);continue}if(e){let t=`Infinite loop on byte: `+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=e,r=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)e.includes(r[0].slice(r[0].lastIndexOf(`[`)+1,-1))&&(n=n.slice(0,r.index)+`[`+`a`.repeat(r[0].length-2)+`]`+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,r.index)+`++`+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)i=r[2]?r[2].length:0,n=n.slice(0,r.index+i)+`[`+`a`.repeat(r[0].length-i-2)+`]`+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,o=``;for(;e;){a||(o=``),a=!1;let r;if(this.options.extensions?.inline?.some(n=>(r=n.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.escape(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.tag(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.link(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(r.raw.length);let n=t.at(-1);r.type===`text`&&n?.type===`text`?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if(r=this.tokenizer.emStrong(e,n,o)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.codespan(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.br(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.del(e,n,o)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.autolink(e)){e=e.substring(r.raw.length),t.push(r);continue}if(!this.state.inLink&&(r=this.tokenizer.url(e))){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(i=e.substring(0,t+1))}if(r=this.tokenizer.inlineText(i)){e=e.substring(r.raw.length),r.raw.slice(-1)!==`_`&&(o=r.raw.slice(-1)),a=!0;let n=t.at(-1);n?.type===`text`?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if(e){let t=`Infinite loop on byte: `+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw Error(t)}}return t}},en=class{options;parser;constructor(e){this.options=e||Me}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(Ie.notSpaceStart)?.[0],i=e.replace(Ie.endingNewline,``)+`
`;return r?`<pre><code class="language-`+Wt(r)+`">`+(n?i:Wt(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:Wt(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return``}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r=``;for(let t=0;t<e.items.length;t++){let n=e.items[t];r+=this.listitem(n)}let i=t?`ol`:`ul`,a=t&&n!==1?` start="`+n+`"`:``;return`<`+i+a+`>
`+r+`</`+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return`<input `+(e?`checked="" `:``)+`disabled="" type="checkbox"> `}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t=``,n=``;for(let t=0;t<e.header.length;t++)n+=this.tablecell(e.header[t]);t+=this.tablerow({text:n});let r=``;for(let t=0;t<e.rows.length;t++){let i=e.rows[t];n=``;for(let e=0;e<i.length;e++)n+=this.tablecell(i[e]);r+=this.tablerow({text:n})}return r&&=`<tbody>${r}</tbody>`,`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?`th`:`td`;return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Wt(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),i=Gt(e);if(i===null)return r;e=i;let a=`<a href="`+e+`"`;return t&&(a+=` title="`+Wt(t)+`"`),a+=`>`+r+`</a>`,a}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=Gt(e);if(i===null)return Wt(n);e=i;let a=`<img src="${e}" alt="${Wt(n)}"`;return t&&(a+=` title="${Wt(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:Wt(e.text)}},tn=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return``+e}image({text:e}){return``+e}br(){return``}checkbox({raw:e}){return e}},nn=class e{options;renderer;textRenderer;constructor(e){this.options=e||Me,this.options.renderer=this.options.renderer||new en,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new tn}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n||``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e||``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},rn=class{options;block;constructor(e){this.options=e||Me}static passThroughHooks=new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?$t.lex:$t.lexInline}provideParser(){return this.block?nn.parse:nn.parseInline}},an=new class{defaults=je();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=nn;Renderer=en;TextRenderer=tn;Lexer=$t;Tokenizer=Qt;Hooks=rn;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)n=n.concat(this.walkTokens(e.tokens,t));break}case`list`:{let e=r;n=n.concat(this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);n=n.concat(this.walkTokens(i,t))}):e.tokens&&(n=n.concat(this.walkTokens(e.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new en(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n||``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Qt(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new rn;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];t[r]=rn.passThroughHooks.has(n)?e=>{if(this.defaults.async&&rn.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:(...e)=>{if(this.defaults.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&(n=n.concat(t.call(this,e))),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return $t.lex(e,t??this.defaults)}parser(e,t){return nn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer():e?$t.lex:$t.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser():e?nn.parse:nn.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer():e?$t.lex:$t.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser():e?nn.parse:nn.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+Wt(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function z(e,t){return an.parse(e,t)}z.options=z.setOptions=function(e){return an.setOptions(e),z.defaults=an.defaults,Ne(z.defaults),z},z.getDefaults=je,z.defaults=Me,z.use=function(...e){return an.use(...e),z.defaults=an.defaults,Ne(z.defaults),z},z.walkTokens=function(e,t){return an.walkTokens(e,t)},z.parseInline=an.parseInline,z.Parser=nn,z.parser=nn.parse,z.Renderer=en,z.TextRenderer=tn,z.Lexer=$t,z.lexer=$t.lex,z.Tokenizer=Qt,z.Hooks=rn,z.parse=z,z.options,z.setOptions,z.use,z.walkTokens,z.parseInline,nn.parse,$t.lex;var on=()=>{let e,t=null,n;function r(){if(t&&!t.closed)t.focus();else{if(t=window.open(`about:blank`,`reveal.js - Notes`,`width=1100,height=700`),t.marked=z,t.document.write(Ae),!t){alert(`Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.`);return}a()}}function i(e){t&&!t.closed?t.focus():(t=e,window.addEventListener(`message`,l),u())}function a(){let r=n.getConfig().url,i=typeof r==`string`?r:window.location.protocol+`//`+window.location.host+window.location.pathname+window.location.search;e=setInterval(function(){t.postMessage(JSON.stringify({namespace:`reveal-notes`,type:`connect`,state:n.getState(),url:i}),`*`)},500),window.addEventListener(`message`,l)}function o(e,r,i){let a=n[e].apply(n,r);t.postMessage(JSON.stringify({namespace:`reveal-notes`,type:`return`,result:a,callId:i}),`*`)}function s(e){let r=n.getCurrentSlide(),i=r.querySelectorAll(`aside.notes`),a=r.querySelector(`.current-fragment`),o={namespace:`reveal-notes`,type:`state`,notes:``,markdown:!1,whitespace:`normal`,state:n.getState()};if(r.hasAttribute(`data-notes`)&&(o.notes=r.getAttribute(`data-notes`),o.whitespace=`pre-wrap`),a){let e=a.querySelector(`aside.notes`);e?(o.notes=e.innerHTML,o.markdown=typeof e.getAttribute(`data-markdown`)==`string`,i=null):a.hasAttribute(`data-notes`)&&(o.notes=a.getAttribute(`data-notes`),o.whitespace=`pre-wrap`,i=null)}i&&i.length&&(i=Array.from(i).filter(e=>e.closest(`.fragment`)===null),o.notes=i.map(e=>e.innerHTML).join(`
`),o.markdown=i[0]&&typeof i[0].getAttribute(`data-markdown`)==`string`),t.postMessage(JSON.stringify(o),`*`)}function c(e){try{return window.location.origin===e.source.location.origin}catch{return!1}}function l(t){if(c(t))try{let n=JSON.parse(t.data);n&&n.namespace===`reveal-notes`&&n.type===`connected`?(clearInterval(e),u()):n&&n.namespace===`reveal-notes`&&n.type===`call`&&o(n.methodName,n.arguments,n.callId)}catch{}}function u(){n.on(`slidechanged`,s),n.on(`fragmentshown`,s),n.on(`fragmenthidden`,s),n.on(`overviewhidden`,s),n.on(`overviewshown`,s),n.on(`paused`,s),n.on(`resumed`,s),n.on(`previewiframe`,s),n.on(`previewimage`,s),n.on(`previewvideo`,s),n.on(`closeoverlay`,s),s()}return{id:`notes`,init:function(e){n=e,/receiver/i.test(window.location.search)||(window.location.search.match(/(\?|\&)notes/gi)===null?window.addEventListener(`message`,e=>{if(!t&&typeof e.data==`string`){let t;try{t=JSON.parse(e.data)}catch{}t&&t.namespace===`reveal-notes`&&t.type===`heartbeat`&&i(e.source)}}):r(),n.addKeyBinding({keyCode:83,key:`S`,description:`Speaker notes view`},function(){r()}))},open:r}},sn={title:`Building AI That Runs on the Device, Not the Cloud`,subtitle:`On-device LLMs, and where the ecosystem is headed`,speaker:`Naman Rajpal`,event:`Tech Coast Conference 2026`,sessionType:`Breakout session`,draftLabel:`WORKING DECK · CONTENT IN FLUX`},cn=[{id:`title`,type:`title`,status:`working`,motion:`title`,eyebrow:`Tech Coast Conference 2026 · Breakout session`,title:`Building AI That Runs [[on the Device]], Not the Cloud`,subtitle:`On-device LLMs, and where the ecosystem is headed`,byline:`Naman Rajpal`,notes:`Good morning. I am Naman Rajpal.

Most generative AI experiences today run in a data center. Over the last two years, a second option has become practical: language models that run on a phone, a personal computer, or a server close to the data.

This session is a map of that ecosystem. I will cover what exists, where it can run, what the current tradeoffs look like, and then show results from my own experiments with local models.`},{id:`questions-we-will-answer`,type:`rows`,status:`working`,motion:`rows`,compact:!0,eyebrow:`A map of the session`,title:`Questions we will answer`,items:[{label:`01`,body:`What is local AI?`},{label:`02`,body:`Why is it becoming practical now?`},{label:`03`,body:`Where is it already appearing?`},{label:`04`,body:`What should run locally versus in the cloud?`},{label:`05`,body:`What products and workflows does it enable?`},{label:`06`,body:`What can I try myself?`}],notes:`Here is the route through the session.

First, I will define local AI. Then we will look at why it became practical, where it is appearing, and the choices between device, edge, self-hosted cloud, and managed cloud.

After that I will show one experiment, its measured results, the limits I found, and a practical way to test one workflow yourself.`},{id:`cloud-baseline`,type:`journey`,status:`working`,motion:`draw`,eyebrow:`Where AI runs today`,title:`Today, most generative AI runs [[in a data center.]]`,caption:`Web chat, phone assistants, editor assistants, terminal coding agents`,notes:`Today, most generative AI tools send your request to a model running in a data center and wait for the response.

That includes web chat, phone assistants, editor assistants, and terminal tools. The interface may be on your device while the model call happens remotely.

A large language model, or LLM, is the kind of AI behind chat assistants and writing tools. Remote inference gives us capability and scale that consumer hardware cannot always provide. This is the baseline for the choices that follow.`},{id:`how-we-got-here`,type:`rows`,status:`working`,motion:`rows`,compact:!0,eyebrow:`A short history`,title:`How the local option appeared`,items:[{label:`Until recently`,body:`Useful language models were too large to run anywhere but a data center.`},{label:`2024 to 2025`,body:`Open models got smaller and better, and compression made them fit in ordinary memory.`},{label:`2025`,body:`Phone and laptop makers began shipping models that run directly on hardware people already own.`},{label:`Today`,body:`Local models run inside apps most people use daily, and anyone can download one for free.`}],notes:`Until recently, useful language models were too large to run outside a data center.

During 2024 and 2025, open models improved, and compression made them fit into ordinary computer memory. Phone and laptop makers then began exposing on-device models to applications.

Today, local models appear inside consumer applications, and downloadable models run on hardware many people already own. That combination made local AI a practical deployment option.

Sources:
https://ai.meta.com/blog/executorch-reality-labs-on-device-ai/
https://pytorch.org/executorch/`},{id:`three-decisions`,type:`cards`,status:`working`,motion:`cards`,eyebrow:`Choosing where a model runs`,title:`Three questions to answer first`,items:[{label:`Capability`,title:`How good does it need to be?`,body:`The most capable model available, or one that is good enough at a narrow job.`},{label:`Location`,title:`Where should it run?`,body:`On the person's device, on a server in your building, or in a data center.`},{label:`Control`,title:`Who runs it?`,body:`A vendor runs it for you, or your own team runs it.`}],notes:`Every workload starts with three questions.

How capable does the model need to be? Where should the computation happen? Who should operate it?

Those answers are independent. A vendor-managed model can run on your device. An open model operated by your team can run in a remote data center. Keeping these questions separate makes the deployment choices clearer.`},{id:`deployment-map`,type:`rows`,status:`working`,motion:`rows`,compact:!0,eyebrow:`Execution location`,title:`Five deployment choices`,items:[{label:`Device`,body:`Phone, wearable, or specialized consumer hardware`},{label:`Computer`,body:`Laptop or desktop running a local model`},{label:`Edge`,body:`An office or on-premises server close to the data`},{label:`Cloud GPU`,body:`A remote model and deployment you operate`},{label:`Cloud service`,body:`A managed model and infrastructure`}],notes:`Those three questions produce five practical locations.

A model can run on a device, on a laptop or desktop, on an office server close to the data, on a remote cloud GPU that your team operates, or through a managed cloud service.

Each choice balances capability, proximity, control, capacity, and operating effort. Local and cloud each cover more than one architecture.`},{id:`what-is-local`,type:`statement`,status:`working`,motion:`underline`,eyebrow:`Local or on-device AI`,title:`Execution happens [[on or near the source.]]`,subtitle:`No remote cloud round trip is required for that operation.`,notes:`I will use local or on-device AI to mean that a particular operation happens on or near the source of its input.

That operation requires no remote cloud round trip. An office server may be local to an organization, while a rented GPU remains remote even when your team controls it.

Execution location and operational control are separate decisions.`},{id:`llm-advancements`,type:`section`,status:`working`,motion:`numbers`,eyebrow:`The LLM shift`,title:`What changed?`,numbers:[`01`,`02`,`03`],labels:[`Capability`,`Efficiency`,`Action`],notes:`Three changes in language models made this possible.

Capability improved in smaller models. Efficiency reduced the memory and computation they need. Structured outputs and tool use made them more useful inside repeatable workflows.

Hardware and runtimes matter, but the main technical shift begins with the models.`},{id:`smaller-capable-models`,type:`statement`,status:`working`,motion:`underline`,eyebrow:`Capability`,title:`Useful work now fits in [[smaller models.]]`,subtitle:`A constrained task may need less capability than a broad one.`,notes:`Smaller models now do useful work when the task is constrained and the result is evaluated.

A small model may be sufficient for classifying an inbox, extracting known fields, transcribing audio, or answering questions over controlled documents.

The useful question is whether it meets the quality bar for this particular job.`},{id:`four-llm-advances`,type:`rows`,status:`working`,motion:`rows`,compact:!0,eyebrow:`A focused survey`,title:`Four relevant LLM advances`,items:[{label:`Efficiency`,body:`Compression and quantization reduce memory and compute requirements.`},{label:`Specialization`,body:`Models can be adapted or selected for constrained jobs.`},{label:`Structured action`,body:`Models increasingly produce schemas and choose known actions.`},{label:`Multimodality`,body:`Local models increasingly work across text, images, and audio.`}],notes:`Four model advances matter here.

Compression reduces memory and computation. Specialization focuses a model on a narrower class of work. Structured action lets it return known fields or choose known operations. Multimodality brings text, images, and audio into the same local workflow.

Together, these changes make smaller models easier to place inside products.`},{id:`enabling-layers`,type:`cards`,status:`working`,motion:`cards`,eyebrow:`Why deployment became practical`,title:`Hardware, runtimes, and tools`,items:[{label:`Hardware`,title:`Accelerators`,body:`Phones and computers gained more efficient AI compute.`},{label:`Runtimes`,title:`Deployment`,body:`Frameworks target local CPUs, GPUs, and NPUs.`},{label:`Tools`,title:`Access`,body:`Ollama and LM Studio make experimentation approachable.`}],notes:`The model is one layer of the ecosystem.

Phones and computers gained more efficient processors for AI workloads. Runtimes learned to target the processors already present. Tools such as Ollama and LM Studio made downloading and testing a model approachable.

All three layers improved at the same time, which made experimentation much easier.`},{id:`public-evidence`,type:`cards`,status:`optional`,motion:`cards`,eyebrow:`Public evidence`,title:`Current platform support`,items:[{label:`Phones and laptops`,title:`Apple · Microsoft`,body:`The model already on the machine is exposed to any app through a first-party API.`},{label:`The browser`,title:`Chrome`,body:`A local model ships with the browser. A web page can call it with no API key.`},{label:`Weights you can download`,title:`Meta · Qwen`,body:`Models released this month that run on one consumer GPU or a Mac.`}],notes:`This is a snapshot of current platform support as of August 2026.

Apple and Microsoft expose on-device models through first-party application interfaces. Chrome ships a local model that a web page can call without a separate API key. Meta and Qwen released downloadable models this month that fit on a consumer GPU or a recent Mac.

Together these show local inference appearing through operating systems, browsers, application runtimes, and downloadable weights.

Sources:
https://developer.apple.com/apple-intelligence/
https://learn.microsoft.com/en-us/windows/ai/apis/phi-silica
https://developer.chrome.com/docs/ai/prompt-api
https://research.meta.ai/blog/introducing-muse-glimmer-open-agentic-model
https://github.com/AlibabaCloud-Official/Qwen3.8-27B`},{id:`why-it-matters`,type:`section`,status:`working`,motion:`numbers`,eyebrow:``,title:`Why this matters`,numbers:[`01`,`02`,`03`],labels:[`Performance + experience`,`Privacy + control`,`Possibility`],notes:`These deployment choices create three practical consequences.

The first is the experience when a network path disappears. The second is privacy and control over the input. The third is repeated work without a per-run model-service charge.

I will take those one at a time.`},{id:`performance-experience`,type:`principle`,status:`working`,motion:`principle`,number:`01`,eyebrow:`Performance and experience`,title:`Local execution removes the [[network round trip.]]`,notes:`Local execution removes the network round trip for that operation.

Total response time still depends heavily on model size and device compute, so local execution can be slower than a cloud model. The useful properties are predictability, availability without connectivity, and repeated background work independent of network conditions.

For some products, those properties matter more than peak capability.`},{id:`privacy-control`,type:`principle`,status:`working`,motion:`principle`,number:`02`,eyebrow:`Privacy and control`,title:`A fully local operation can keep [[its inputs on the device.]]`,notes:`The important unit here is one operation.

When every step runs locally and the application transmits nothing, its inputs can remain on the device. That removes transmission to an external model provider and that provider's retention of the input.

The full system still includes local logs, caches, backups, access controls, updates, and any cloud fallback. Security and compliance depend on the complete system and operating process.`},{id:`business-possibility`,type:`principle`,status:`working`,motion:`principle`,number:`03`,eyebrow:`Business and developer possibility`,title:`Local execution has no [[per-run inference charge.]]`,notes:`A local run uses hardware you already own instead of creating a cloud inference charge each time.

The run still consumes electricity, memory, hardware capacity, and engineering effort. The specific economic change is the absence of a metered model-service charge for each operation.

That can make frequent background assistance or high-volume narrow workflows practical.`},{id:`hard-data-boundaries`,type:`rows`,status:`working`,motion:`rows`,compact:!0,eyebrow:`So what?`,title:`Some workflows begin with [[a hard data boundary.]]`,items:[{label:`Clinic`,body:`Visit recordings and patient notes inside an approved local workflow`},{label:`Law practice`,body:`Matter files when a client has not approved another processor`},{label:`Accounting`,body:`Tax, payroll, and financial records under restricted handling rules`},{label:`Agency or IT`,body:`Customer documents covered by contract or insurer conditions`}],notes:`These are illustrative situations where the rule for one workflow may be that the input stays inside a controlled environment.

A clinic may have an approved local workflow for visit recordings or patient notes. A law practice may have a client who has not approved another processor for matter files. An accounting firm may restrict how tax and payroll records are handled. An agency or IT provider may have a customer contract or insurer condition that limits subprocessors or retention.

The requirement is specific to the workflow. HIPAA permits cloud processing under defined conditions, including the required business associate agreement. Local execution gives an organization another data path when its policy, contract, insurer, or risk assessment requires one.

Sources:
https://www.hhs.gov/hipaa/for-professionals/faq/2075/may-a-hipaa-covered-entity-or-business-associate-use-cloud-service-to-store-or-process-ephi/index.html
https://www.americanbar.org/advocacy/governmental_legislative_work/publications/washingtonletter/august-24-wl/ai-ethics-guidance-0824wl/
https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know`},{id:`define-once-execute-locally`,type:`cards`,status:`working`,motion:`cards`,eyebrow:`My experiment: understudy`,title:`Define once. [[Execute locally.]]`,items:[{label:`Define`,title:`Capable model`,body:`Produces a structured workflow, checks, and output format.`},{label:`Execute`,title:`Local model`,body:`Repeats the constrained work against local inputs.`},{label:`Escalate`,title:`Cloud when needed`,body:`Handles exceptional cases that need greater capability.`}],notes:`My experiment is called understudy.

A capable cloud model writes a runbook once. It contains the steps, output fields, validation checks, and failure handling. A smaller local model follows that runbook against each new input.

I tested the pattern on 46 synthetic documents: 25 emails and 21 contracts. The local model still judges each document. The runbook removes decisions that should stay constant across runs.`},{id:`once-or-every-run`,type:`comparison`,status:`working`,motion:`comparison`,eyebrow:`Dividing the work`,title:`Decided once, or decided every run`,leftTitle:`Once, in the cloud`,rightTitle:`Every run, on this laptop`,rows:[{dimension:`Steps`,left:`Which steps run, and in what order`,right:`What this particular document says`},{dimension:`Fields`,left:`Which fields to pull out, and their types`,right:`Where the date actually sits in this sentence`},{dimension:`Valid output`,left:`What counts as a valid result`,right:`Whether this one is too ambiguous to accept`},{dimension:`Failure`,left:`What to do when a step fails`,right:`Which of these cases needs a person`},{dimension:`Placement`,left:`Online, once`,right:`Offline, every time`}],payoff:`The plan is reasoned once. Each run reasons only about its own input.`,notes:`This is how the work is divided.

The capable model decides the workflow once: which steps run, which fields matter, what valid output looks like, and what happens when a check fails.

On every local run, the smaller model reads one document, finds the facts, handles ambiguity, and decides whether the case needs a person. Both models reason about different parts of the problem at different frequencies.`},{id:`demo-punchline`,type:`statement`,status:`working`,motion:`underline`,eyebrow:`The hybrid pattern`,title:`A capable model plans the workflow. [[An efficient model repeats it.]]`,subtitle:`Use cloud compute when it adds value, then keep suitable repeated work local.`,notes:`The pattern uses the more capable model for decisions made once, then an efficient model for suitable repeated work.

Cloud capability remains available for exceptional cases. Local execution handles volume when the quality bar, data boundary, and hardware fit.

The planning examples and all 46 evaluation documents in this experiment were synthetic. The repeated runs used no cloud inference.`},{id:`email-through-pipeline`,type:`email-pipeline`,status:`working`,motion:`still`,eyebrow:`Understudy, one document`,title:`One email through [[the local pipeline.]]`,email:{sender:`Rosalind Achebe`,senderEmail:`r.achebe@mailbox.example`,avatar:`RA`,subject:`Need to change my delivery address urgently`,date:`Mon, Aug 24, 6:31 AM`,paragraphs:[`Please change the delivery address on my standing order, acct 4471-88213.`,`I'm being admitted for a hip replacement on Wednesday. Send everything to 882 Ashgrove Lane, Unit 12 until the middle of October.`,`If there's a problem call me today on 904-555-0198.`]},classification:[{label:`Category`,value:`Support request`},{label:`Urgency`,value:`Today`},{label:`Owner`,value:`Support`},{label:`Personal data`,value:`Found`}],removals:[`Name`,`Email`,`Account ID`,`Medical detail`,`Address`,`Phone`],redactedPreview:`[PERSON_NAME] needs an urgent delivery-address change for account [ACCOUNT_ID]. Contact: [PHONE].`,notes:`Before the charts, here is one document moving through the system.

This is a synthetic email from the evaluation corpus, shown in a familiar inbox format. The customer asks for an urgent address change and includes a name, email address, account number, medical detail, street address, and phone number.

The triage runbook classifies it as a support request, marks it urgent for today, routes it to support, and flags that personal data is present. That flag triggers the redaction runbook. The model identifies the sensitive spans, code replaces them, and a deterministic scan checks the output.

This is the work behind the measurements on the next three slides.`},{id:`results-model-size`,type:`chart`,status:`working`,motion:`chart`,eyebrow:`Measured result 01`,title:`A 7.6 GB model scored [[93% on both tasks.]]`,image:`./charts/accuracy-by-size.svg`,alt:`Line chart comparing contract and inbox accuracy across five local models from 3.4 to 18 GB`,takeaway:`Same runbooks, same 46 synthetic documents, five models.`,notes:`I ran the same two workflows over the same 46 synthetic documents with five local models.

The 7.6 gigabyte model is the practical consumer-hardware point in this set. It scored 93.2 percent on contract triage and 93.0 percent on inbox triage.

The shape matters more than one score. Inbox accuracy stays fairly flat across model sizes because it is classification into short lists. Contract accuracy rises sharply because the model has to connect clauses and calculate dates. A model can be good enough for one job and clearly insufficient for another.`},{id:`results-runbook-quality`,type:`chart`,status:`working`,motion:`chart`,eyebrow:`Measured result 02`,title:`Inbox accuracy rose from [[55% to 93%.]]`,image:`./charts/runbook-ladder.svg`,alt:`Two-panel line chart showing accuracy as progressively more complete instructions are added for inbox and contract triage`,takeaway:`Same model and 25 emails: 55 correct field decisions became 93.`,notes:`There are 25 emails and four scored fields for each email, so this test contains exactly 100 field decisions.

With only the output fields defined, the model got 55 of those 100 decisions right. As the runbook added definitions and decision rules, the same model reached 93 correct decisions. That is an increase of 38 percentage points: 93 minus 55.

A larger model using the complete instructions improved the inbox result by only 2 more decisions. Contracts behave differently because they require more clause reading and date arithmetic. The balance between better instructions and a larger model depends on the task.`},{id:`results-redaction-gate`,type:`chart`,status:`working`,motion:`chart`,eyebrow:`Measured result 03`,title:`All five models removed [[every planted identifier.]]`,image:`./charts/redaction-gate.svg`,alt:`Matrix showing that zero of ten planted direct identifiers survived redaction for all five models`,takeaway:`0 of 10 direct identifiers survived the deterministic scan on any model.`,notes:`The privacy test used ten direct identifiers planted in the synthetic documents: names, addresses, phone numbers, email addresses, and account identifiers.

The model identified the spans, code applied the removals, and a deterministic scanner checked the result. Zero of the ten direct identifiers survived on any of the five models.

Facts about a person were reported separately because their treatment depends on policy. This result measures planted identifiers in synthetic documents. A production system still needs access control, encryption, retention rules, logging, endpoint security, and an audited process.`},{id:`limits`,type:`rows`,status:`working`,motion:`rows`,compact:!0,eyebrow:`Honest constraints`,title:`Four limits worth knowing`,items:[{label:`Hardware claims`,body:`A laptop sold for AI does not mean the local tools you download will actually use that hardware.`},{label:`Task boundaries`,body:`Quality can drop sharply outside the work a small model was evaluated on.`},{label:`Speed and heat`,body:`Answers can come slowly, and phones and laptops slow down further as they warm up.`},{label:`Setup effort`,body:`Getting a small model reliably good at one job takes real work, not just a download.`}],notes:`Four limits showed up clearly.

Dedicated AI hardware in a laptop does not guarantee that a local tool will use it. Quality can drop outside work the model was evaluated on. Generation can be slow, and sustained use creates heat. Reliable performance takes deliberate instructions, evaluation, and verification.

A download makes a model available. Dependability comes from testing the actual workflow.`},{id:`when-to-use-what`,type:`comparison`,status:`working`,motion:`comparison`,eyebrow:`When to use what`,title:`Match the workload to the location`,leftTitle:`Cloud`,rightTitle:`Device`,rows:[{dimension:`Capability`,left:`Frontier or broad tasks`,right:`Constrained repeated tasks`},{dimension:`Freshness`,left:`Current shared knowledge`,right:`Available offline`},{dimension:`Privacy`,left:`Inputs travel remotely`,right:`Whole path can stay local`},{dimension:`Latency`,left:`Network plus compute`,right:`No network round trip`},{dimension:`Operations`,left:`Elastic remote capacity`,right:`Hardware and limits nearby`}],payoff:`Hybrid systems use each where it is strongest.`,notes:`This brings us back to the deployment map.

Cloud services fit frontier capability, broad tasks, current shared knowledge, and elastic capacity. Device execution fits constrained repeated tasks, offline availability, and operations whose whole data path can remain local.

Edge servers and self-hosted cloud fill the space between those endpoints. Hybrid systems route each part to the location that fits it.`},{id:`where-this-is-going`,type:`cards`,status:`working`,motion:`cards`,eyebrow:`Where this is going`,title:`More models, more deliberate routing`,items:[{label:`Models`,title:`Smaller`,body:`Improving capability on constrained tasks.`},{label:`Interfaces`,title:`Multimodal`,body:`More combinations of text, image, and audio.`},{label:`Systems`,title:`Hybrid`,body:`Routine work local, exceptional work escalated.`}],notes:`The direction is toward more deliberate routing.

Smaller models will improve on constrained tasks. Interfaces will combine more text, image, and audio. Systems will choose among device, edge, and cloud based on the work in front of them.

The growing capability is deliberate placement for each operation.`},{id:`try-it`,type:`resources`,status:`working`,motion:`cards`,eyebrow:`How to start`,title:`Test one constrained workflow`,items:[{label:`Run`,title:`Ollama · LM Studio`,body:`Try a model locally on hardware you already own.`},{label:`Evaluate`,title:`Quality first`,body:`Confirm that the smaller model handles the actual task reliably.`},{label:`Place`,title:`Choose deliberately`,body:`Decide which inputs and steps belong local or in the cloud.`}],notes:`Start with one repetitive, constrained workflow.

Run a local model on hardware you already own. Evaluate it against real examples and a clear quality bar. Then decide which inputs and steps belong locally, which need a cloud model, and which still need a person.

Let the evaluation determine the placement.`},{id:`close`,type:`close`,status:`working`,motion:`title`,eyebrow:`The opportunity`,title:`Where a model runs is now [[a design decision.]]`,subtitle:`Match model capability, execution location, and control to the job.`,notes:`The ecosystem now gives us a real set of choices.

Model capability, execution location, and operational control can be selected separately. Some work belongs on a device, some on an office server, some on infrastructure you operate remotely, and some with a managed cloud service.

Where a model runs is now a design decision. Match the placement to the job.`},{id:`questions`,type:`qa`,status:`working`,motion:`still`,eyebrow:`Thank you`,title:`Questions?`,subtitle:`Naman Rajpal · Consumer AI devices and spatial computing`,notes:`Thank you.

I am happy to take questions about the five deployment choices, the local model ecosystem, the understudy experiment, or the measurements behind the charts.`}];function ln(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function un(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var dn={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},fn={duration:.5,overwrite:!1,delay:0},pn,B,V,mn=1e8,H=1/mn,hn=Math.PI*2,gn=hn/4,_n=0,vn=Math.sqrt,yn=Math.cos,bn=Math.sin,xn=function(e){return typeof e==`string`},U=function(e){return typeof e==`function`},Sn=function(e){return typeof e==`number`},Cn=function(e){return e===void 0},wn=function(e){return typeof e==`object`},Tn=function(e){return e!==!1},En=function(){return typeof window<`u`},Dn=function(e){return U(e)||xn(e)},On=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},kn=Array.isArray,An=/random\([^)]+\)/g,jn=/,\s*/g,Mn=/(?:-?\.?\d|\.)+/gi,Nn=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Pn=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Fn=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,In=/[+-]=-?[.\d]+/,Ln=/[^,'"\[\]\s]+/gi,Rn=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,W,zn,Bn,Vn,Hn={},Un={},Wn,Gn=function(e){return(Un=xr(e,Hn))&&La},Kn=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},qn=function(e,t){return!t&&console.warn(e)},Jn=function(e,t){return e&&(Hn[e]=t)&&Un&&(Un[e]=t)||Hn},Yn=function(){return 0},Xn={suppressEvents:!0,isStart:!0,kill:!1},Zn={suppressEvents:!0,kill:!1},Qn={suppressEvents:!0},$n={},er=[],tr={},nr,rr={},ir={},ar=30,or=[],sr=``,cr=function(e){var t=e[0],n,r;if(wn(t)||U(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=or.length;r--&&!or[r].targetTest(t););n=or[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Ji(e[r],n)))||e.splice(r,1);return e},lr=function(e){return e._gsap||cr(ii(e))[0]._gsap},ur=function(e,t,n){return(n=e[t])&&U(n)?e[t]():Cn(n)&&e.getAttribute&&e.getAttribute(t)||n},dr=function(e,t){return(e=e.split(`,`)).forEach(t)||e},G=function(e){return Math.round(e*1e5)/1e5||0},K=function(e){return Math.round(e*1e7)/1e7||0},fr=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},pr=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},mr=function(){var e=er.length,t=er.slice(0),n,r;for(tr={},er.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},hr=function(e){return!!(e._initted||e._startAt||e.add)},gr=function(e,t,n,r){er.length&&!B&&mr(),e.render(t,n,r||!!(B&&t<0&&hr(e))),er.length&&!B&&mr()},_r=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(Ln).length<2?t:xn(e)?e.trim():e},vr=function(e){return e},yr=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},br=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},xr=function(e,t){for(var n in t)e[n]=t[n];return e},Sr=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=wn(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},Cr=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},wr=function(e){var t=e.parent||W,n=e.keyframes?br(kn(e.keyframes)):yr;if(Tn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Tr=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},Er=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Dr=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},Or=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},kr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Ar=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},jr=function(e,t,n,r){return e._startAt&&(B?e._startAt.revert(Zn):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Mr=function e(t){return!t||t._ts&&e(t.parent)},Nr=function(e){return e._repeat?Pr(e._tTime,e=e.duration()+e._rDelay)*e:0},Pr=function(e,t){var n=Math.floor(e=K(e/t));return e&&n===e?n-1:n},Fr=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ir=function(e){return e._end=K(e._start+(e._tDur/Math.abs(e._ts||e._rts||H)||0))},Lr=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=K(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ir(e),n._dirty||kr(n,e)),e},Rr=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Fr(e.rawTime(),t),(!t._dur||Qr(0,t.totalDuration(),n)-t._tTime>H)&&t.render(n,!0)),kr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-H}},zr=function(e,t,n,r){return t.parent&&Or(t),t._start=K((Sn(n)?n:n||e!==W?Yr(e,n,t):e._time)+t._delay),t._end=K(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Er(e,t,`_first`,`_last`,e._sort?`_start`:0),Ur(t)||(e._recent=t),r||Rr(e,t),e._ts<0&&Lr(e,e._tTime),e},Br=function(e,t){return(Hn.ScrollTrigger||Kn(`scrollTrigger`,t))&&Hn.ScrollTrigger.create(t,e)},Vr=function(e,t,n,r,i){if(ra(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!B&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&nr!==Fi.frame)return er.push(e),e._lazy=[i,r],1},Hr=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},Ur=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},Wr=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&Hr(e)&&!(!e._initted&&Ur(e))||(e._ts<0||e._dp._ts<0)&&!Ur(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=Qr(0,e._tDur,t),l=Pr(s,o),e._yoyo&&l&1&&(a=1-a),l!==Pr(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||B||r||e._zTime===H||!t&&e._zTime){if(!e._initted&&Vr(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?H:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&jr(e,t,n,!0),e._onUpdate&&!n&&xi(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&xi(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Or(e,1),!n&&!B&&(xi(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},Gr=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},Kr=function(e,t,n,r){var i=e._repeat,a=K(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:K(a*(i+1)+e._rDelay*i):a,o>0&&!r&&Lr(e,e._tTime=e._tDur*o),e.parent&&Ir(e),n||kr(e.parent,e),e},qr=function(e){return e instanceof Xi?kr(e):Kr(e,e._dur)},Jr={_start:0,endTime:Yn,totalDuration:Yn},Yr=function e(t,n,r){var i=t.labels,a=t._recent||Jr,o=t.duration()>=mn?a.endTime(!1):t._dur,s,c,l;return xn(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(kn(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},Xr=function(e,t,n){var r=Sn(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=Tn(s.vars.inherit)&&s.parent;a.immediateRender=Tn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new Y(t[0],a,t[i+1])},Zr=function(e,t){return e||e===0?t(e):t},Qr=function(e,t,n){return n<e?e:n>t?t:n},$r=function(e,t){return!xn(e)||!(t=Rn.exec(e))?``:t[1]},ei=function(e,t,n){return Zr(n,function(n){return Qr(e,t,n)})},ti=[].slice,ni=function(e,t){return e&&wn(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&wn(e[0]))&&!e.nodeType&&e!==zn},ri=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return xn(e)&&!t||ni(e,1)?(r=n).push.apply(r,ii(e)):n.push(e)})||n},ii=function(e,t,n){return V&&!t&&V.selector?V.selector(e):xn(e)&&!n&&(Bn||!Ii())?ti.call((t||Vn).querySelectorAll(e),0):kn(e)?ri(e,n):ni(e)?ti.call(e,0):e?[e]:[]},ai=function(e){return e=ii(e)[0]||qn(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return ii(t,n.querySelectorAll?n:n===e?qn(`Invalid scope`)||Vn.createElement(`div`):e)}},oi=function(e){return e.sort(function(){return .5-Math.random()})},si=function(e){if(U(e))return e;var t=wn(e)?e:{each:e},n=Ui(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return xn(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,mn])[1],!S){for(b=-mn;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===mn?0:s?f*u/S-.5:r/S|0,b=0,x=mn,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):vn(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&oi(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=$r(t.amount||t.each)||0,n=n&&f<0?Hi(n):n}return f=(p[e]-p.min)/p.max||0,K(p.b+(n?n(f):f)*p.v)+p.u}},ci=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=K(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Sn(n)?0:$r(n))}},li=function(e,t){var n=kn(e),r,i;return!n&&wn(e)&&(r=n=e.radius||mn,e.values?(e=ii(e.values),(i=!Sn(e[0]))&&(r*=r)):e=ci(e.increment)),Zr(t,n?U(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=mn,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||Sn(t)?s:s+$r(t)}:ci(e))},ui=function(e,t,n,r){return Zr(kn(e)?!t:n===!0?!!(n=0):!r,function(){return kn(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},di=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},fi=function(e,t){return function(n){return e(parseFloat(n))+(t||$r(n))}},pi=function(e,t,n){return vi(e,t,0,1,n)},mi=function(e,t,n){return Zr(n,function(n){return e[~~t(n)]})},hi=function e(t,n,r){var i=n-t;return kn(t)?mi(t,e(0,t.length),n):Zr(r,function(e){return(i+(e-t)%i)%i+t})},gi=function e(t,n,r){var i=n-t,a=i*2;return kn(t)?mi(t,e(0,t.length-1),n):Zr(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},_i=function(e){return e.replace(An,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(jn);return ui(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},vi=function(e,t,n,r,i){var a=t-e,o=r-n;return Zr(i,function(t){return n+((t-e)/a*o||0)})},yi=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=xn(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(kn(t)&&!kn(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=xr(kn(t)?[]:{},t));if(!u){for(c in n)Qi.call(s,t,c,`get`,n[c]);a=function(e){return va(e,s)||(o?t.p:t)}}}return Zr(r,a)},bi=function(e,t,n){var r=e.labels,i=mn,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},xi=function(e,t,n){var r=e.vars,i=r[t],a=V,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&er.length&&mr(),o&&(V=o),l=s?i.apply(c,s):i.call(c),V=a,l},Si=function(e){return Or(e),e.scrollTrigger&&e.scrollTrigger.kill(!!B),e.progress()<1&&xi(e,`onInterrupt`),e},Ci,wi=[],Ti=function(e){if(e){if(e=!e.name&&e.default||e,En()||e.headless){var t=e.name,n=U(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:Yn,render:va,add:Qi,kill:ba,modifier:ya,rawVars:0},a={targetTest:0,get:0,getSetter:ma,aliases:{},register:0};if(Ii(),e!==r){if(rr[t])return;yr(r,yr(Cr(e,i),a)),xr(r.prototype,xr(i,Cr(e,a))),rr[r.prop=t]=r,e.targetTest&&(or.push(r),$n[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}Jn(t,r),e.register&&e.register(La,r,Ca)}else wi.push(e)}},q=255,Ei={aqua:[0,q,q],lime:[0,q,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,q],navy:[0,0,128],white:[q,q,q],olive:[128,128,0],yellow:[q,q,0],orange:[q,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[q,0,0],pink:[q,192,203],cyan:[0,q,q],transparent:[q,q,q,0]},Di=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*q+.5|0},Oi=function(e,t,n){var r=e?Sn(e)?[e>>16,e>>8&q,e&q]:0:Ei.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),Ei[e])r=Ei[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&q,r&q,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&q,e&q]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(Mn),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=Di(s+1/3,i,a),r[1]=Di(s,i,a),r[2]=Di(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(Nn),n&&r.length<4&&(r[3]=1),r}else r=e.match(Mn)||Ei.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/q,a=r[1]/q,o=r[2]/q,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},ki=function(e){var t=[],n=[],r=-1;return e.split(ji).forEach(function(e){var i=e.match(Pn)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},Ai=function(e,t,n){var r=``,i=(e+r).match(ji),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=Oi(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=ki(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(ji,`1`).split(Pn),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(ji),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},ji=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in Ei)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),Mi=/hsl[a]?\(/,Ni=function(e){var t=e.join(` `),n;if(ji.lastIndex=0,ji.test(t))return n=Mi.test(t),e[1]=Ai(e[1],n),e[0]=Ai(e[0],n,ki(e[1])),!0},Pi,Fi=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){Wn&&(!Bn&&En()&&(zn=Bn=window,Vn=zn.document||{},Hn.gsap=La,(zn.gsapVersions||(zn.gsapVersions=[])).push(La.version),Gn(Un||zn.GreenSockGlobals||!zn.gsap&&zn||{}),wi.forEach(Ti)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},Pi=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Pi=0,l=Yn},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),Ii(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),Ii=function(){return!Pi&&Fi.wake()},J={},Li=/^[\d.\-M][\d.\-,\s]/,Ri=/["']/g,zi=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(Ri,``).trim():+c,r=s.substr(o+1).trim();return t},Bi=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},Vi=function(e){var t=(e+``).split(`(`),n=J[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[zi(t[1])]:Bi(e).split(`,`).map(_r)):J._CE&&Li.test(e)?J._CE(``,e):n},Hi=function(e){return function(t){return 1-e(1-t)}},Ui=function(e,t){return e&&(U(e)?e:J[e]||Vi(e))||t},Wi=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return dr(e,function(e){for(var t in J[e]=Hn[e]=i,J[a=e.toLowerCase()]=n,i)J[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=J[e+`.`+t]=i[t]}),i},Gi=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ki=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/hn*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*bn((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:Gi(s);return a=hn/a,c.config=function(n,r){return e(t,n,r)},c},qi=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:Gi(r);return i.config=function(n){return e(t,n)},i};dr(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;Wi(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),J.Linear.easeNone=J.none=J.Linear.easeIn,Wi(`Elastic`,Ki(`in`),Ki(`out`),Ki()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};Wi(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),Wi(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),Wi(`Circ`,function(e){return-(vn(1-e*e)-1)}),Wi(`Sine`,function(e){return e===1?1:-yn(e*gn)+1}),Wi(`Back`,qi(`in`),qi(`out`),qi()),J.SteppedEase=J.steps=Hn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-H;return function(e){return((r*Qr(0,a,e)|0)+i)*n}}},fn.ease=J[`quad.out`],dr(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return sr+=e+`,`+e+`Params,`});var Ji=function(e,t){this.id=_n++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:ur,this.set=t?t.getSetter:ma},Yi=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Kr(this,+e.duration,1,1),this.data=e.data,V&&(this._ctx=V,V.data.push(this)),Pi||Fi.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,Kr(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(Ii(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Lr(this,e),!n._dp||n.parent||Rr(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&zr(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===H||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),gr(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Nr(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+Nr(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?Pr(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-H?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?Fr(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-H?0:this._rts,this.totalTime(Qr(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),Ir(this),Ar(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ii(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==H&&(this._tTime-=H)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=K(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&zr(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(Tn(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Fr(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=Qn);var t=B;return B=e,hr(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),B=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,qr(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,qr(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(Yr(this,e),Tn(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,Tn(t)),this._dur||(this._zTime=-H),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-H:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-H,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-H)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=U(e)?e:vr,a=function(){var e=t.then;t.then=null,n&&n(),U(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){Si(this)},e}();yr(Yi.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-H,_prom:0,_ps:!1,_rts:1});var Xi=function(e){un(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=Tn(t.sortChildren),W&&zr(t.parent||W,ln(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&Br(ln(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return Xr(0,arguments,this),this},n.from=function(e,t,n){return Xr(1,arguments,this),this},n.fromTo=function(e,t,n,r){return Xr(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,wr(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new Y(e,t,Yr(this,n),1),this},n.call=function(e,t,n){return zr(this,Y.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new Y(e,n,Yr(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,wr(n).immediateRender=Tn(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,wr(r).immediateRender=Tn(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:K(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==W&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=K(o%f),o===i?(d=this._repeat,c=a):(_=K(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=Pr(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:K(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&xi(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=Gr(this,K(r),K(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(xi(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-H);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||B&&hr(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-H:H);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-H)._zTime=c>=r?1:-1,this._ts))return this._start=g,Ir(this),this.render(e,t,n);this._onUpdate&&!t&&xi(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&Or(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(xi(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(Sn(t)||(t=Yr(this,t,e)),!(e instanceof Yi)){if(kn(e))return e.forEach(function(e){return n.add(e,t)}),this;if(xn(e))return this.addLabel(e,t);if(U(e))e=Y.delayedCall(0,e);else return this}return this===e?this:zr(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-mn);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof Y?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return xn(e)?this.removeLabel(e):U(e)?this.killTweensOf(e):(e.parent===this&&Dr(this,e),e===this._recent&&(this._recent=this._last),kr(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=K(Fi.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=Yr(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=Y.delayedCall(0,t||Yn,n);return r.data=`isPause`,this._hasPause=1,zr(this,r,Yr(this,e))},n.removePause=function(e){var t=this._first;for(e=Yr(this,e);t;)t._start===e&&t.data===`isPause`&&Or(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)ta!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=ii(e),i=this._first,a=Sn(t),o;i;)i instanceof Y?pr(i._targets,r)&&(a?(!ta||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=Yr(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=Y.to(n,yr({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||H,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&Kr(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,yr({startAt:{time:Yr(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),bi(this,Yr(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),bi(this,Yr(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+H)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=K(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return kr(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),kr(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=mn,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,zr(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=K(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;Kr(n,n===W&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(W._ts&&(gr(W,Fr(e,W)),nr=Fi.frame),Fi.frame>=ar){ar+=dn.autoSleep||120;var t=W._first;if((!t||!t._ts)&&dn.autoSleep&&Fi._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||Fi.sleep()}}},t}(Yi);yr(Xi.prototype,{_lock:0,_hasPause:0,_forcing:0});var Zi=function(e,t,n,r,i,a,o){var s=new Ca(this._pt,e,t,0,1,_a,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=_i(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(Fn)||[];u=Fn.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?fr(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=Fn.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(In.test(r)||g)&&(s.e=0),this._pt=s,s},Qi=function(e,t,n,r,i,a,o,s,c,l){U(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?U(u)?c?e[t.indexOf(`set`)||!U(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=U(u)?c?fa:da:ua,p;if(xn(r)&&(~r.indexOf(`random(`)&&(r=_i(r)),r.charAt(1)===`=`&&(p=fr(d,r)+($r(d)||0),(p||p===0)&&(r=p))),!l||d!==r||na)return!isNaN(d*r)&&r!==``?(p=new Ca(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?ga:ha,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&Kn(t,r),Zi.call(this,e,t,d,r,f,s||dn.stringFilter,c))},$i=function(e,t,n,r,i){if(U(e)&&(e=sa(e,i,t,n,r)),!wn(e)||e.style&&e.nodeType||kn(e)||On(e))return xn(e)?sa(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=sa(e[o],i,t,n,r);return a},ea=function(e,t,n,r,i,a){var o,s,c,l;if(rr[e]&&(o=new rr[e]).init(i,o.rawVars?t[e]:$i(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new Ca(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==Ci))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},ta,na,ra=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!pn,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,O,k,ee,A,j,te,M;if(b&&(!f||!a)&&(a=`none`),t._ease=Ui(a,fn.ease),t._rEase=x&&(Ui(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(k=g[0]?lr(g[0]).harness:0,te=k&&i[k.prop],S=Cr(i,$n),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?Zn:Xn),h._lazy=0),o){if(Or(t._startAt=Y.set(g,yr({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&Tn(c),startAt:null,delay:0,onUpdate:l&&function(){return xi(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(B||!s&&!p)&&t._startAt.revert(Zn),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=yr({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&Tn(c),immediateRender:s,stagger:0,parent:_},S),te&&(w[k.prop]=te),Or(t._startAt=Y.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(B?t._startAt.revert(Zn):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,H,H);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&Tn(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],O=E._gsap||cr(g)[C]._gsap,t._ptLookup[C]=A={},tr[O.id]&&er.length&&mr(),j=v===g?C:v.indexOf(E),k&&(ee=new k).init(E,te||S,t,j,v)!==!1&&(t._pt=T=new Ca(t._pt,E,ee.name,0,1,ee.render,ee,0,ee.priority),ee._props.forEach(function(e){A[e]=T}),ee.priority&&(D=1)),!k||te)for(w in S)rr[w]&&(ee=ea(w,S,t,j,E,v))?ee.priority&&(D=1):A[w]=T=Qi.call(t,E,w,`get`,S[w],j,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(ta=t,W.killTweensOf(E,A,t.globalTime(n)),M=!t.parent,ta=0),t._pt&&c&&(tr[O.id]=1)}D&&Sa(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!M,f&&n<=0&&b.render(mn,!0,!0)},ia=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return na=1,e.vars[t]=`+=0`,ra(e,o),na=0,s?qn(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=G(n)+$r(u.e)),u.b&&(u.b=l.s+$r(u.b))},aa=function(e,t){var n=e[0]?lr(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=xr({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},oa=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(kn(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},sa=function(e,t,n,r,i){return U(e)?e.call(t,n,r,i):xn(e)&&~e.indexOf(`random(`)?_i(e):e},ca=sr+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,la={};dr(ca+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return la[e]=1});var Y=function(e){un(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:wr(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||W,g=(kn(t)||On(t)?Sn(t[0]):`length`in n)?[t]:ii(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?cr(g):qn(`GSAP target `+t+` not found. https://gsap.com`,!dn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||Dn(s)||Dn(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new Xi({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=ln(a),_._start=0,u||Dn(s)||Dn(c)){if(b=g.length,C=u&&si(u),wn(u))for(x in u)~ca.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=Cr(n,la),y.stagger=0,T&&(y.easeReverse=T),w&&xr(y,w),S=g[v],y.duration=+sa(s,ln(a),v,S,g),y.delay=(+sa(c,ln(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=J.none;_.duration()?s=c=0:a.timeline=0}else if(f){wr(yr(_.vars.defaults,{ease:`none`})),_._ease=Ui(f.ease||n.ease||`none`);var E=0,D,O,k;if(kn(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||oa(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)O=D[v],k={ease:O.e,duration:(O.t-(v?D[v-1].t:0))/100*s},k[x]=O.v,_.to(g,k,E),E+=k.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!pn&&(ta=ln(a),W.killTweensOf(g),ta=0),zr(h,ln(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===K(h._time)&&Tn(l)&&Mr(ln(a))&&h.data!==`nested`)&&(a._tTime=-H,a.render(Math.max(0,-c)||0)),m&&Br(ln(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-H&&!o?i:e<H?0:e,c,l,u,d,f,p,m,h;if(!a)Wr(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=K(s%d),s===i?(u=this._repeat,c=a):(f=K(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=Pr(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(K(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(Vr(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(xi(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&jr(this,e,t,n),xi(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&xi(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&jr(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&Or(this,1),!t&&!(o&&!r)&&(s||r||p)&&(xi(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){Pi||Fi.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||ra(this,a),o=this._ease(a/this._dur),ia(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(Lr(this,0),this.parent||Er(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?Si(this):this.scrollTrigger&&this.scrollTrigger.kill(!!B),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,ta&&ta.vars.overwrite!==!0)._first||Si(this),this.parent&&n!==this.timeline.totalDuration()&&Kr(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?ii(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&Tr(r,i))return t===`all`&&(this._pt=0),Si(this);for(s=this._op=this._op||[],t!==`all`&&(xn(t)&&(d={},dr(t,function(e){return d[e]=1}),t=d),t=aa(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&Dr(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&Si(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return Xr(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return Xr(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return W.killTweensOf(e,t,n)},t}(Yi);yr(Y.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),dr(`staggerTo,staggerFrom,staggerFromTo`,function(e){Y[e]=function(){var t=new Xi,n=ti.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var ua=function(e,t,n){return e[t]=n},da=function(e,t,n){return e[t](n)},fa=function(e,t,n,r){return e[t](r.fp,n)},pa=function(e,t,n){return e.setAttribute(t,n)},ma=function(e,t){return U(e[t])?da:Cn(e[t])&&e.setAttribute?pa:ua},ha=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},ga=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},_a=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},va=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},ya=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},ba=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Dr(this,t,`_pt`):t.dep||(n=1),t=r;return!n},xa=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Sa=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},Ca=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||ha,this.d=o||this,this.set=s||ua,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=xa,this.m=e,this.mt=n,this.tween=t},e}();dr(sr+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return $n[e]=1}),Hn.TweenMax=Hn.TweenLite=Y,Hn.TimelineLite=Hn.TimelineMax=Xi,W=new Xi({sortChildren:!1,defaults:fn,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),dn.stringFilter=Ni;var wa=[],Ta={},Ea=[],Da=0,Oa=0,ka=function(e){return(Ta[e]||Ea).map(function(e){return e()})},Aa=function(){var e=Date.now(),t=[];e-Da>2&&(ka(`matchMediaInit`),wa.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=zn.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),ka(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Da=e,ka(`matchMedia`))},ja=function(){function e(e,t){this.selector=t&&ai(t),this.data=[],this._r=[],this.isReverted=!1,this.id=Oa++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){U(e)&&(n=t,t=e,e=U);var r=this,i=function(){var e=V,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=ai(n)),V=r,a=t.apply(r,arguments),U(a)&&r._r.push(a),V=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===U?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=V;V=null,e(this),V=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof Y&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof Xi?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof Y)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=wa.length;r--;)wa[r].id===this.id&&wa.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),Ma=function(){function e(e){this.contexts=[],this.scope=e,V&&V.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){wn(e)||(e={matches:e});var r=new ja(0,n||this.scope),i=r.conditions={},a,o,s;for(o in V&&!r.selector&&(r.selector=V.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=zn.matchMedia(e[o]),a&&(wa.indexOf(r)<0&&wa.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(Aa):a.addEventListener(`change`,Aa)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),Na={registerPlugin:function(){[...arguments].forEach(function(e){return Ti(e)})},timeline:function(e){return new Xi(e)},getTweensOf:function(e,t){return W.getTweensOf(e,t)},getProperty:function(e,t,n,r){xn(e)&&(e=ii(e)[0]);var i=lr(e||{}).get,a=n?vr:_r;return n===`native`&&(n=``),e&&(t?a((rr[t]&&rr[t].get||i)(e,t,n,r)):function(t,n,r){return a((rr[t]&&rr[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=ii(e),e.length>1){var r=e.map(function(e){return La.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=rr[t],o=lr(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;Ci._pt=0,r.init(e,n?t+n:t,Ci,0,[e]),r.render(1,r),Ci._pt&&va(1,Ci)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=La.to(e,yr((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return W.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ui(e.ease,fn.ease)),Sr(fn,e||{})},config:function(e){return Sr(dn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!rr[e]&&!Hn[e]&&qn(t+` effect requires `+e+` plugin.`)}),ir[t]=function(e,t,r){return n(ii(e),yr(t||{},i),r)},a&&(Xi.prototype[t]=function(e,n,r){return this.add(ir[t](e,wn(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){J[e]=Ui(t)},parseEase:function(e,t){return arguments.length?Ui(e,t):J},getById:function(e){return W.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Xi(e),r,i;for(n.smoothChildTiming=Tn(e.smoothChildTiming),W.remove(n),n._dp=0,n._time=n._tTime=W._time,r=W._first;r;)i=r._next,(t||!(!r._dur&&r instanceof Y&&r.vars.onComplete===r._targets[0]))&&zr(n,r,r._start-r._delay),r=i;return zr(W,n,0),n},context:function(e,t){return e?new ja(e,t):V},matchMedia:function(e){return new Ma(e)},matchMediaRefresh:function(){return wa.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Aa()},addEventListener:function(e,t){var n=Ta[e]||(Ta[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Ta[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:hi,wrapYoyo:gi,distribute:si,random:ui,snap:li,normalize:pi,getUnit:$r,clamp:ei,splitColor:Oi,toArray:ii,selector:ai,mapRange:vi,pipe:di,unitize:fi,interpolate:yi,shuffle:oi},install:Gn,effects:ir,ticker:Fi,updateRoot:Xi.updateRoot,plugins:rr,globalTimeline:W,core:{PropTween:Ca,globals:Jn,Tween:Y,Timeline:Xi,Animation:Yi,getCache:lr,_removeLinkedListItem:Dr,reverting:function(){return B},context:function(e){return e&&V&&(V.data.push(e),e._ctx=V),V},suppressOverwrites:function(e){return pn=e}}};dr(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return Na[e]=Y[e]}),Fi.add(Xi.updateRoot),Ci=Na.to({},{duration:0});var Pa=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Fa=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=Pa(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},Ia=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(xn(n)&&(r={},dr(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}Fa(e,n)}}}},La=Na.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)B?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Ia(`roundProps`,ci),Ia(`modifiers`),Ia(`snap`,li))||Na;Y.version=Xi.version=La.version=`3.15.0`,Wn=1,En()&&Ii(),J.Power0,J.Power1,J.Power2,J.Power3,J.Power4,J.Linear,J.Quad,J.Cubic,J.Quart,J.Quint,J.Strong,J.Elastic,J.Back,J.SteppedEase,J.Bounce,J.Sine,J.Expo,J.Circ;var Ra,za,Ba,Va,Ha,Ua,Wa,Ga=function(){return typeof window<`u`},Ka={},qa=180/Math.PI,Ja=Math.PI/180,Ya=Math.atan2,Xa=1e8,Za=/([A-Z])/g,Qa=/(left|right|width|margin|padding|x)/i,$a=/[\s,\(]\S/,eo={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},to=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},no=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ro=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},io=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},ao=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},oo=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},so=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},co=function(e,t,n){return e.style[t]=n},lo=function(e,t,n){return e.style.setProperty(t,n)},uo=function(e,t,n){return e._gsap[t]=n},fo=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},po=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},mo=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},X=`transform`,ho=X+`Origin`,go=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in Ka&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=eo[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=Fo(i,e)}):this.tfm[t]=o.x?o[t]:Fo(i,t),t===ho&&(this.tfm.zOrigin=o.zOrigin);else return eo.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(X)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(ho,n,``)),t=X}(a||n)&&this.props.push(t,n,a[t])},_o=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},vo=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,i,a;for(i=0;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(Za,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=Wa(),(!i||!i.isStart)&&!n[X]&&(_o(n),r.zOrigin&&n[ho]&&(n[ho]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},yo=function(e,t){var n={target:e,props:[],revert:vo,save:go};return e._gsap||La.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},bo,xo=function(e,t){var n=za.createElementNS?za.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):za.createElement(e);return n&&n.style?n:za.createElement(e)},So=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(Za,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,wo(n)||n,1)||``},Co=`O,Moz,ms,Ms,Webkit`.split(`,`),wo=function(e,t,n){var r=(t||Ha).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(Co[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?Co[i]:``)+e},To=function(){Ga()&&window.document&&(Ra=window,za=Ra.document,Ba=za.documentElement,Ha=xo(`div`)||{style:{}},xo(`div`),X=wo(X),ho=X+`Origin`,Ha.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,bo=!!wo(`perspective`),Wa=La.core.reverting,Va=1)},Eo=function(e){var t=e.ownerSVGElement,n=xo(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),Ba.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),Ba.removeChild(n),i},Do=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Oo=function(e){var t,n;try{t=e.getBBox()}catch{t=Eo(e),n=1}return t&&(t.width||t.height)||n||(t=Eo(e)),t&&!t.width&&!t.x&&!t.y?{x:+Do(e,[`x`,`cx`,`x1`])||0,y:+Do(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},ko=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Oo(e))},Ao=function(e,t){if(t){var n=e.style,r;t in Ka&&t!==ho&&(t=X),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(Za,`-$1`).toLowerCase())):n.removeAttribute(t)}},jo=function(e,t,n,r,i,a){var o=new Ca(e._pt,t,n,0,1,a?so:oo);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},Mo={deg:1,rad:1,turn:1},No={grid:1,flex:1},Po=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=Ha.style,c=Qa.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||Mo[i]||Mo[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&ko(t),(p||o===`%`)&&(Ka[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],G(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===za||!h.appendChild)&&(h=za.body),g=h._gsap,g&&p&&g.width&&c&&g.time===Fi.time&&!g.uncache)return G(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:Ao(t,n)}else(p||o===`%`)&&!No[So(h,`display`)]&&(s.position=So(t,`position`)),h===t&&(s.position=`static`),h.appendChild(Ha),m=Ha[u],h.removeChild(Ha),s.position=`absolute`;return c&&p&&(g=lr(h),g.time=Fi.time,g.width=h[u]),G(f?m*a/d:m&&a?d/m*a:0)},Fo=function(e,t,n,r){var i;return Va||To(),t in eo&&t!==`transform`&&(t=eo[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),Ka[t]&&t!==`transform`?(i=qo(e,r),i=t===`transformOrigin`?i.svg?i.origin:Jo(So(e,ho))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=Bo[t]&&Bo[t](e,t,n)||So(e,t)||ur(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?Po(e,t,i,n)+n:i},Io=function(e,t,n,r){if(!n||n===`none`){var i=wo(t,e,1),a=i&&So(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=So(e,`borderTopColor`))}var o=new Ca(this._pt,e.style,t,0,1,_a),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=So(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=So(e,t)||r,m?e.style[t]=m:Ao(e,t)),l=[n,r],Ni(l),n=l[0],r=l[1],d=n.match(Pn)||[],b=r.match(Pn)||[],b.length){for(;u=Pn.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=fr(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=Pn.lastIndex-v.length,v||(v=v||dn.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=Po(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?so:oo;return In.test(r)&&(o.e=0),this._pt=o,o},Lo={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},Ro=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=Lo[n]||n,t[1]=Lo[r]||r,t.join(` `)},zo=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],Ka[o]&&(s=1,o=o===`transformOrigin`?ho:X),Ao(n,o);s&&(Ao(n,X),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,qo(n,1),a.uncache=1,_o(r)))}},Bo={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new Ca(e._pt,t,n,0,0,zo);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},Vo=[1,0,0,1,0,0],Ho={},Uo=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},Wo=function(e){var t=So(e,X);return Uo(t)?Vo:t.substr(7).match(Nn).map(G)},Go=function(e,t){var n=e._gsap||lr(e),r=e.style,i=Wo(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?Vo:i):(i===Vo&&!e.offsetParent&&e!==Ba&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Ba.appendChild(e)),i=Wo(e),s?r.display=s:Ao(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Ba.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},Ko=function(e,t,n,r,i,a){var o=e._gsap,s=i||Go(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==Vo&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=Oo(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[ho]=`0px 0px`,a&&(jo(a,o,`xOrigin`,c,y),jo(a,o,`yOrigin`,l,b),jo(a,o,`xOffset`,u,o.xOffset),jo(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},qo=function(e,t){var n=e._gsap||new Ji(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=So(e,ho)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,ee,A,j,te,M,ne,re,ie,ae,N,oe;return n.svg=!!(e.getCTM&&ko(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[X]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[X]===`none`?``:s[X])),r.scale=r.rotate=r.translate=`none`),S=Go(e,n.svg),n.svg&&(n.uncache?(te=e.getBBox(),c=n.xOrigin-te.x+`px `+(n.yOrigin-te.y)+`px`,j=``):j=!t&&e.getAttribute(`data-svg-origin`),Ko(e,j||c,!!j||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==Vo&&(E=S[0],D=S[1],O=S[2],k=S[3],l=ee=S[4],u=A=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(k*k+O*O),m=E||D?Ya(D,E)*qa:0,_=O||k?Ya(O,k)*qa+m:0,_&&(p*=Math.abs(Math.cos(_*Ja))),n.svg&&(l-=b-(b*E+x*O),u-=x-(b*D+x*k))):(oe=S[6],ae=S[7],ne=S[8],re=S[9],ie=S[10],N=S[11],l=S[12],u=S[13],d=S[14],C=Ya(oe,ie),h=C*qa,C&&(w=Math.cos(-C),T=Math.sin(-C),j=ee*w+ne*T,te=A*w+re*T,M=oe*w+ie*T,ne=ee*-T+ne*w,re=A*-T+re*w,ie=oe*-T+ie*w,N=ae*-T+N*w,ee=j,A=te,oe=M),C=Ya(-O,ie),g=C*qa,C&&(w=Math.cos(-C),T=Math.sin(-C),j=E*w-ne*T,te=D*w-re*T,M=O*w-ie*T,N=k*T+N*w,E=j,D=te,O=M),C=Ya(D,E),m=C*qa,C&&(w=Math.cos(C),T=Math.sin(C),j=E*w+D*T,te=ee*w+A*T,D=D*w-E*T,A=A*w-ee*T,E=j,ee=te),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=G(Math.sqrt(E*E+D*D+O*O)),p=G(Math.sqrt(A*A+oe*oe)),C=Ya(ee,A),_=Math.abs(C)>2e-4?C*qa:0,y=N?1/(N<0?-N:N):0),n.svg&&(j=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!Uo(So(e,X)),j&&e.setAttribute(`transform`,j))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=G(f),n.scaleY=G(p),n.rotation=G(m)+o,n.rotationX=G(h)+o,n.rotationY=G(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[ho]=Jo(c)),n.xOffset=n.yOffset=0,n.force3D=dn.force3D,n.renderTransform=n.svg?ts:bo?es:Xo,n.uncache=0,n},Jo=function(e){return(e=e.split(` `))[0]+` `+e[1]},Yo=function(e,t,n){var r=$r(t);return G(parseFloat(t)+parseFloat(Po(e,`x`,n+`px`,r)))+r},Xo=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,es(e,t)},Zo=`0deg`,Qo=`0px`,$o=`) `,es=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==Zo||l!==Zo)){var x=parseFloat(l)*Ja,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*Ja,w=Math.cos(x),a=Yo(_,a,S*w*-v),o=Yo(_,o,-Math.sin(x)*-v),s=Yo(_,s,C*w*-v+v)}h!==Qo&&(y+=`perspective(`+h+$o),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==Qo||o!==Qo||s!==Qo)&&(y+=s!==Qo||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+$o),c!==Zo&&(y+=`rotate(`+c+$o),l!==Zo&&(y+=`rotateY(`+l+$o),u!==Zo&&(y+=`rotateX(`+u+$o),(d!==Zo||f!==Zo)&&(y+=`skew(`+d+`, `+f+$o),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+$o),_.style[X]=y||`translate(0, 0)`},ts=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=Ja,c*=Ja,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=Ja,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=G(b),x=G(x),S=G(S),C=G(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=Po(f,`x`,a,`px`),y=Po(f,`y`,o,`px`)),(p||m||h||g)&&(v=G(v+p-(p*b+m*S)+h),y=G(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=G(v+r/100*w.width),y=G(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[X]=w)},ns=function(e,t,n,r,i){var a=360,o=xn(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?qa:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*Xa)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*Xa)%a-~~(s/a)*a)),e._pt=u=new Ca(e._pt,t,n,r,s,no),u.e=c,u.u=`deg`,e._props.push(n),u},rs=function(e,t){for(var n in t)e[n]=t[n];return e},is=function(e,t,n){var r=rs({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[X]=t,o=qo(n,1),Ao(n,X),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[X],a[X]=t,o=qo(n,1),a[X]=c),Ka)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=$r(c),p=$r(l),u=f===p?parseFloat(c):Po(n,s,c,p),d=parseFloat(l),e._pt=new Ca(e._pt,o,s,u,d-u,to),e._pt.u=p||0,e._props.push(s));rs(o,r)};dr(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});Bo[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return Fo(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var as={name:`css`,register:To,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in Va||To(),this.styles=this.styles||yo(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(rr[m]&&ea(m,t,n,r,e,i)))){if(f=typeof l,p=Bo[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=_i(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,ji.lastIndex=0,ji.test(c)||(h=$r(c),g=$r(l),g?h!==g&&(c=Po(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],xn(c)&&~c.indexOf(`random(`)&&(c=_i(c)),$r(c+``)||c===`auto`||(c+=dn.units[m]||$r(Fo(e,m))||``),(c+``).charAt(1)===`=`&&(c=Fo(e,m))):c=Fo(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in eo&&(m===`autoAlpha`&&(d===1&&Fo(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),jo(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=eo[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in Ka,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=So(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=So(e,`perspective`),T?e.style.perspective=T:Ao(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||qo(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new Ca(this._pt,o,X,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new Ca(this._pt,b,`scaleY`,b.scaleY,(_?fr(b.scaleY,_+u):u)-b.scaleY||0,to),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push(ho,0,o[ho]),l=Ro(l),b.svg?Ko(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&jo(this,b,`zOrigin`,b.zOrigin,g),jo(this,o,m,Jo(c),Jo(l)));continue}else if(m===`svgOrigin`){Ko(e,l,1,x,0,this);continue}else if(m in Ho){ns(this,b,m,d,_?fr(d,_+l):l);continue}else if(m===`smoothOrigin`){jo(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){is(this,l,e);continue}}else m in o||(m=wo(m)||m);if(v||(u||u===0)&&(d||d===0)&&!$a.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=$r(l)||(m in dn.units?dn.units[m]:h),h!==g&&(d=Po(e,m,c,g)),this._pt=new Ca(this._pt,v?b:o,m,d,(_?fr(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?ao:to),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=io):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=ro);else if(m in o)Io.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){Kn(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&Sa(this)},render:function(e,t){if(t.tween._time||!Wa())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Fo,aliases:eo,getSetter:function(e,t,n){var r=eo[t];return r&&r.indexOf(`,`)<0&&(t=r),t in Ka&&t!==ho&&(e._gsap.x||Fo(e,`x`))?n&&Ua===n?t===`scale`?fo:uo:(Ua=n||{})&&(t===`scale`?po:mo):e.style&&!Cn(e.style[t])?co:~t.indexOf(`-`)?lo:ma(e,t)},core:{_removeProperty:Ao,_getMatrix:Go}};La.utils.checkPrefix=wo,La.core.getStyleSaver=yo,(function(e,t,n,r){var i=dr(e+`,`+t+`,`+n,function(e){Ka[e]=1});dr(t,function(e){dn.units[e]=`deg`,Ho[e]=1}),eo[i[13]]=e+`,`+t,dr(r,function(e){var t=e.split(`:`);eo[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),dr(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){dn.units[e]=`px`}),La.registerPlugin(as);var os=La.registerPlugin(as)||La;os.core.Tween;var ss=new WeakMap,cs=window.matchMedia(`(prefers-reduced-motion: reduce)`),ls=(e,t)=>[...e.querySelectorAll(t)].filter(e=>!e.closest(`.fragment`)),us=e=>{for(let t of e.querySelectorAll(`.js-draw`)){let e=t.getTotalLength();os.set(t,{strokeDasharray:e,strokeDashoffset:e})}},ds=e=>{e&&(ss.get(e)?.kill(),ss.delete(e),os.killTweensOf(e.querySelectorAll(`*`)),os.set(e.querySelectorAll(`.js-word, .js-eyebrow, .js-subtitle, .js-byline, .js-caption, .js-detail, .js-question-mark, .js-device, .js-orbit, .js-model-core, .js-scale-device, .js-principle-number, .js-underline, .js-divider, .js-offline-ring, .js-chart, .js-auto-item`),{clearProps:`all`}),us(e))},fs=e=>{let t=os.timeline({paused:!0,defaults:{ease:`power4.out`}}),n=ls(e,`.js-eyebrow`);return n.length&&t.fromTo(n,{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.45},0),t},ps=(e,t,n=`-=0.24`)=>{let r=ls(t,`.js-subtitle, .js-byline, .js-caption, .js-detail`);r.length&&e.fromTo(r,{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.55,stagger:.08},n)},ms=(e,t)=>{let n=e.querySelector(`.js-counter`);if(!n)return;let r=Number(n.dataset.countTo??0),i={value:0};t.to(i,{value:r,duration:1.4,ease:`power3.out`,snap:{value:1},onUpdate:()=>{n.textContent=Math.round(i.value).toLocaleString()}},.3),t.fromTo(`.js-meter-fill`,{scaleX:0},{scaleX:1,duration:1.25,transformOrigin:`left center`},.35)},hs=e=>{let t=e.dataset.motion,n=fs(e),r=e.querySelectorAll(`.js-auto-item`);if(r.length&&n.fromTo(r,{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.46,stagger:.07},.28),[`title`,`words`,`principle`,`underline`,`still`,`comparison`,`meta`].includes(t)&&ps(n,e),t===`words`&&n.fromTo(`.js-question-mark`,{autoAlpha:0,scale:.85},{autoAlpha:.13,scale:1,duration:.8},.45),t===`draw`){ps(n,e),n.fromTo(`.js-device`,{autoAlpha:0,y:30},{autoAlpha:1,y:0,duration:.7},.15);let t=e.querySelectorAll(`.js-draw`);n.to(t,{strokeDashoffset:0,duration:1.25,stagger:.18,ease:`power2.inOut`},.45)}if(t===`scale`&&(ps(n,e),n.fromTo(`.js-orbit`,{autoAlpha:0,scale:1.4},{autoAlpha:.5,scale:1,duration:.9,stagger:.1},.25),n.fromTo(`.js-model-core`,{autoAlpha:0,scale:1.55},{autoAlpha:1,scale:1,duration:.85},.35),n.fromTo(`.js-scale-device`,{autoAlpha:0,x:60},{autoAlpha:1,x:0,duration:.75},.58)),t===`principle`&&n.fromTo(`.js-principle-number`,{autoAlpha:0,x:-70},{autoAlpha:.16,x:0,duration:.9},.05),t===`underline`&&n.fromTo(`.js-underline`,{scaleX:0},{scaleX:1,duration:.8,transformOrigin:`left center`},`-=0.18`),t===`chart`){let t=e.querySelector(`.js-chart`);t&&n.fromTo(t,{autoAlpha:0,y:24,scale:.99},{autoAlpha:1,y:0,scale:1,duration:.72},.18),ps(n,e,.36)}return t===`counter`&&ms(e,n),t===`comparison`&&n.fromTo(`.js-divider`,{scaleY:0},{scaleY:1,duration:.85,transformOrigin:`top center`},.28),t===`meta`&&n.fromTo(`.js-offline-ring`,{autoAlpha:0,rotate:-8,scale:.88},{autoAlpha:1,rotate:0,scale:1,duration:.8},.12),n},gs=e=>{if(ds(e),cs.matches){os.set(e.querySelectorAll(`.js-draw`),{strokeDashoffset:0});return}let t=hs(e);ss.set(e,t),t.play(0)},_s=e=>{e.on(`ready`,({currentSlide:e})=>gs(e)),e.on(`slidechanged`,({previousSlide:e,currentSlide:t})=>{ds(e),gs(t)}),cs.addEventListener(`change`,()=>gs(e.getCurrentSlide()))},vs=`# Tech Coast Conference 2026: Talk Outline

**Program title (published):** Building AI That Runs on the Device, Not the Cloud  
**Deck title (working):** Building AI That Runs on the Device  
**Deck subtitle (working):** What stays local, what uses the cloud  
**Audience:** smart non-specialists: business owners, IT leaders, economic-development and workforce professionals, students, and a technical minority.  
**Session:** breakout. Confirm the final slot length before locking slide count and timing.  
**Date:** August 27, 2026.

## What the conference published

> "Learn how on-device AI is transforming performance, privacy, and user experiences while opening new possibilities for businesses and developers alike."

That description is the contract with the audience. The talk must explicitly deliver:

1. Performance and user experience
2. Privacy and control
3. Business and developer possibility

## One takeaway

Useful language models became smaller and more efficient, device hardware became more capable, and deployment runtimes matured. Together, those changes created more viable places to run AI.

The design question is no longer simply device or cloud. It is:

1. What model capability does the workload require?
2. Where should execution happen?
3. Who should operate and control the model?

## Definitions and taxonomy

Do not collapse model size, execution location, and operational control into one concept.

| Decision | Choices | What it changes |
|---|---|---|
| Model capability | Small specialist to large general model | Quality, breadth, memory, compute |
| Execution location | Device to on-premises edge to cloud | Latency, connectivity, data movement |
| Operational control | Managed service to self-hosted | Model choice, deployment control, retention policy |

### Terms to use precisely

- **On-device or local AI:** the model executes on or near the user’s device or data source, without a remote cloud round trip for that operation.
- **Edge or on-premises AI:** execution happens on infrastructure close to the organization or data source.
- **Self-hosted cloud AI:** the organization operates its own model on rented remote infrastructure. It provides control, but it still requires connectivity and remote execution.
- **Managed cloud AI:** a provider operates both the model and infrastructure.
- **Hybrid AI:** different parts of the workflow run in different places based on their requirements.

A small model running on a rented GPU is self-hosted cloud AI, not on-device AI. It can provide model and deployment control, but it does not automatically provide offline operation, device-local data, or zero network latency.

## Questions the session will answer

1. What is local AI?
2. Why is it becoming practical now?
3. Where is it already appearing?
4. What should run locally versus in the cloud?
5. What products and workflows does it enable?
6. What can someone try themselves?

Use this as a factual session map, not a promise or a learning-objectives slide.

## Opening framing

Keep the published program title for continuity. Correct the false binary without dramatizing or apologizing for it.

**Suggested opening:**

> "The program title sets up device versus cloud. The actual architecture has more than two choices. Three separate decisions matter: what model to use, where it should run, and who should operate it. This session maps those choices, with particular attention to what is now practical directly on consumer devices."

Then show the three decisions: **capability, location, control.**

## Provisional timing

| # | Segment | Min | Purpose |
|---|---|---:|---|
| 0 | Opening and session map | 3 | Establish scope and correct the binary |
| 1 | Three decisions and five deployment choices | 5 | Give the audience a durable framework |
| 2 | Focused LLM advancements survey | 7 | Explain why useful local LLMs are practical now |
| 3 | Why it matters | 6 | Deliver the three groups of published promises |
| 4 | Live demo: define once, execute locally | 7 | Make the hybrid pattern concrete |
| 5 | When to use each deployment choice | 4 | Turn the demo into a decision framework |
| 6 | Where this is going and how to start | 4 | Current trajectory and practical next step |
| 7 | Close | 2 | Restate the takeaway |
| | Q&A | Remainder | Use the prepared distinctions below |

**Scaling:** for a 30-minute slot, compress the LLM survey to two slides and combine trajectory with the close. For a 40-minute slot, retain the full structure. Do not expand the ecosystem survey into a vendor catalog.

## Segment 0: Opening and session map

### Factual baseline

- Cloud-hosted inference remains the dominant architecture for generative AI.
- Useful language, vision, speech, and automation models can now run on phones, personal computers, browsers, and specialized devices.
- The result is a wider set of practical deployment choices, not the replacement of data centers.

Avoid claims such as "the cloud was the only answer for years." State the architecture and evidence directly.

### Session map

Show the six questions the session will answer. Then ask the three questions that decide placement, phrased as a team would ask them:

1. How good does the model need to be?
2. Where should it run?
3. Who runs it?

Keep the underlying axes (capability, location, control) as your own vocabulary and as the wording of the close. Do not put the abstract axis names on the slide; the plain questions carry the same framework and land faster.

### Short history: how the local option appeared

About ninety seconds, placed right after the baseline. Its job is to establish that this is a recent change rather than a permanent fact.

- Until recently, useful language models were too large to run anywhere but a data center.
- Through 2024 and 2025, open models got smaller and better, and compression made them fit in ordinary memory.
- In 2025, Apple and Google shipped models that run directly on phones and laptops people already own.
- Today, local models run inside apps most people use daily, and anyone can download one for free.

No parameter counts and no model names on this slide. The shape of the change is the point. The strongest closing proof is that on-device models already ship inside widely used consumer apps through the ExecuTorch runtime; verify the specific app names against Meta's and PyTorch's own posts before stating them.

## Segment 1: Five deployment choices

| Execution location | Example | Primary advantages | Important trade-offs |
|---|---|---|---|
| On a phone or wearable | An operating-system or app model | Proximity, offline use, private context | Tight memory, power, and thermal limits |
| On a laptop or desktop | A model running through Ollama or LM Studio | Local files, experimentation, repeat work | Hardware variability and setup |
| On an edge or office server | Shared model inside an organization | Shared capacity with local data boundary | Infrastructure and maintenance |
| On a cloud GPU you operate | An open model on rented compute | Model control and scalable hardware | Remote latency, connectivity, cloud cost |
| Behind a managed cloud service | A hosted frontier model API | Highest capability, elastic scale, current knowledge | Less deployment control and per-use cost |

**Takeaway:** these choices balance proximity, control, capacity, and cost differently. A rented GPU can be under your control while still being cloud-hosted.

Do not call the first four "local AI." Do not define locality as ownership.

## Segment 2: Focused survey of LLM advancements

Keep this segment focused on language-model progress. Hardware and runtimes provide context, not the main story.

### 2.1 Capability per unit of compute

Useful capability is available in smaller models than before. Do not imply that a small model is automatically as capable as a frontier model. The useful claim is narrower:

> A smaller model can be sufficient, and sometimes preferable, for a constrained and well-evaluated workflow.

### 2.2 Efficiency and quantization

Model compression and lower-precision representations reduce memory and compute requirements. Explain this without numeric claims unless verified:

> The model can use fewer bits to represent what it learned, reducing the memory and hardware needed to run it.

### 2.3 Specialization

A small model can be adapted or selected for a narrow job such as classification, extraction, summarization, or structured action. Specialization is an engineering choice, not an automatic property of being small.

### 2.4 Structured outputs and tool use

Smaller models are increasingly useful for producing schemas, choosing from known actions, and executing constrained workflow steps. This is the advancement most relevant to the live demo.

### 2.5 Emerging multimodality

Local models increasingly accept combinations of text, images, and audio. Keep this to one verified example rather than expanding into a separate survey.

### One supporting slide: why deployment became practical

- **Hardware:** phones and computers gained efficient AI accelerators.
- **Runtimes:** operating systems and frameworks can target local CPUs, GPUs, and NPUs.
- **Tools:** applications such as Ollama and LM Studio make local experimentation accessible.

Suggested public evidence, kept brief and verified before use:

- Google: Gemini Nano, Gemma, LiteRT-LM
- Apple: Foundation Models framework and on-device Apple Intelligence models
- Microsoft: Phi family and Windows AI APIs
- Meta/PyTorch: ExecuTorch and current open on-device models
- Chrome: built-in local summarization, translation, rewriting, and prompt capabilities where supported

The conclusion is not "all three got good at once." Use:

> The maturity of models, hardware, and runtimes converged enough to make local LLM deployment practical.

## Segment 3: Why it matters

Deliver the published description through three grouped outcomes.

### 3.1 Performance and user experience

Accurate claim:

> For workloads that fit the device, removing the network round trip can reduce latency and variability.

Additional benefits:

- Features can remain available without connectivity.
- Interfaces can respond without waiting for a remote request.
- Repeated background assistance becomes more practical.

Do not claim that local is always faster. Local hardware and model choice matter.

### 3.2 Privacy and control

Accurate claim:

> Local execution can keep sensitive inputs on the device when the implementation performs the full operation locally.

A hybrid application may still transmit some data. Be explicit about the boundary rather than treating "on-device" as an automatic privacy guarantee.

### 3.3 Business and developer possibility

- Repeated local execution can avoid a per-run cloud inference charge.
- Self-hosted cloud deployment can provide model and operational control at larger scale.
- New workflows become viable when latency, privacy, and marginal inference cost improve together.
- A small team can prototype with local and open models without first building dedicated inference infrastructure.

Do not call local execution free. It still uses hardware, electricity, memory, and engineering effort.

## Segment 4: Live demo, the centerpiece

### Slide title

**Define once. Execute locally.**

### Architecture

1. A high-capability cloud model defines the workflow.
2. Its output becomes a readable structured plan with inputs, steps, checks, and an output format.
3. A smaller model executes the repeated task locally against local inputs.
4. Deterministic checks validate the output where possible.
5. Difficult exceptions can escalate to a more capable cloud model.

Use **cloud planner and local worker** as the technical description. Do not say teacher-student unless the larger model generates training signals used to train or distill the smaller model.

### Minimal demonstration scope

Build the smallest reliable proof:

- Ollama
- One local model
- One readable workflow file
- A small folder of local inputs
- One useful report
- A terminal or plain local page
- A recorded fallback

Keep the Chrome extension as a post-talk project. It is not required to prove the architecture.

### Live sequence

1. Show the structured workflow produced earlier by the high-capability model.
2. Explain which planning step used cloud compute and why it was worth using.
3. Disable network connectivity visibly.
4. Run the local workflow against prepared local inputs.
5. Show the generated report.
6. Run it again against a second input set if rehearsal shows the timing is reliable.

### Accurate punchline

> "The high-capability planning step ran once using cloud compute. These repeated executions ran locally without a per-run cloud inference charge, and the report inputs remained on the laptop during local execution."

Only use the final clause after verifying the demo with networking disabled.

## Honest limits

Placed immediately after the demo. Naming the costs right after showing the win is what makes the rest of the talk credible, and it stops the room over-generalizing from one successful run. The New York Times games speakers did the same thing, which is a reasonable model to follow.

**No abbreviations and no benchmark numbers on this slide.** State four limits in plain consequence language:

1. **Hardware claims.** A laptop sold for AI does not mean the local tools someone downloads will actually use that hardware.
2. **Not a small copy.** A small model is not a shrunk large one. Outside the job it was set up for, it fails.
3. **Speed and heat.** Answers can come slowly, and phones and laptops slow down further as they warm up.
4. **Setup effort.** Getting a small model reliably good at one job takes real work, not just a download.

The underlying reasons, for questions rather than the slide:

- Speed is set by how fast the device can read the model, because it has to read everything the model knows to produce each word, and that path is narrow on consumer hardware.
- The popular local tools default to the ordinary processor or graphics chip rather than the dedicated AI hardware being advertised.
- A published example from Google's edge team moved a small model from clearly inadequate to usable on one task through deliberate tuning, not by choosing a newer model.

**A constraint that forces local rather than merely favouring it:** the New York Times games team described an on-device agent that must decide its next move inside a single animation frame, which no network round trip can meet. If citing them, state that the work is experimental and that their puzzles are human-made with no AI in them. They said so explicitly, and omitting it would misrepresent them.

## Segment 5: When to use what

### On-device or local

Best fit when:

- The workload fits available hardware.
- Inputs should remain close to the user.
- Offline operation matters.
- Interaction latency matters.
- The task repeats frequently.

### Edge or on-premises

Best fit when:

- Multiple users share a workload.
- Organizational data should remain inside a local boundary.
- More capacity is needed than a personal device provides.

### Self-hosted cloud

Best fit when:

- The organization wants model and deployment control.
- The workload needs scalable remote hardware.
- Connectivity and remote execution are acceptable.

### Managed cloud

Best fit when:

- The task requires frontier capability or large context.
- Knowledge must remain current.
- Elastic scale matters.
- Operating inference infrastructure is not the product.

**Landing line:**

> The goal is not to pick a side. It is to match model capability, execution location, and operational control to the workload.

## Segment 6: Where this is going

Keep predictions conservative and tied to visible developments:

- Smaller models continue improving on constrained tasks.
- Local multimodal capability is expanding.
- Operating systems and browsers increasingly expose local model capabilities to applications.
- Hybrid routing becomes more deliberate: routine work close to the user, exceptional work escalated to more capable infrastructure.
- Products increasingly combine multiple models rather than relying on one model for every task.

Avoid "big models think, small models do" as a general claim. For the demo specifically, use:

> A capable model plans this workflow. An efficient model repeats it.

## Segment 7: How to start

- Try a local model through Ollama or LM Studio.
- Identify one constrained, repeated workflow.
- Evaluate output quality before optimizing placement.
- Decide which inputs may remain local and which steps require cloud capability.
- Measure latency, output quality, resource use, and operational cost.

Suggested call to action:

> Pick one repetitive workflow and test whether a smaller model can handle it reliably on hardware you already own.

## Close

Restate the framework:

> AI deployment now has three separate decisions: capability, location, and control. Data centers remain essential for training, frontier models, and scalable computation. What changed is that a growing set of useful LLM workloads can now run closer to the user.

Working final line:

> The opportunity is not to move every workload onto a device. It is to stop sending every workload to the same place.

## Q&A preparation

### Does this reduce the need for data centers?

No. Data centers train models, run frontier systems, and provide scalable compute. Local and edge execution broaden the architecture rather than replacing its largest layer.

### Is a cloud GPU running a small model local AI?

No. It is self-hosted cloud AI. It can provide model control and scalable hardware, but it still requires connectivity and remote execution.

### Is a small local model as capable as a frontier model?

Not generally. It may be sufficient or preferable for a constrained and evaluated task. Use a larger model when the task requires broader capability.

### Is local execution automatically private?

No. It can keep inputs local if the entire operation executes locally and the application transmits nothing. Verify the actual data boundary.

### Is local execution free?

No. It uses hardware, electricity, memory, and engineering effort. It can avoid a per-run cloud inference charge.

### Could this workflow run in the cloud instead?

Yes. The demonstration is about separating a high-capability planning step from repeated execution. Placement should follow the workload requirements.

## Verification checklist before finalizing

- Confirm the breakout slot length.
- Verify every named model, API, and availability statement with a current first-party source.
- Avoid unverified model-size, latency, energy, or cost numbers.
- Test the demo on the presenting laptop with networking disabled.
- Record a successful fallback demonstration.
- Confirm that source inputs remain local during the offline run.
- Export and rehearse the static PDF fallback.
- Capture the event program, photos, and any recording after the talk.
`,ys={title:`Talk Outline`,"questions-we-will-answer":`Questions the session will answer`,"cloud-baseline":`Segment 0`,"how-we-got-here":`Short history`,"three-decisions":`Definitions and taxonomy`,"deployment-map":`Segment 1`,"what-is-local":`Terms to use precisely`,"llm-advancements":`Segment 2`,"smaller-capable-models":`2.1 Capability`,"four-llm-advances":`2.2 Efficiency`,"enabling-layers":`why deployment became practical`,"public-evidence":`why deployment became practical`,"why-it-matters":`Segment 3`,"performance-experience":`3.1 Performance`,"privacy-control":`3.2 Privacy`,"business-possibility":`3.3 Business`,"define-once-execute-locally":`Segment 4`,"once-or-every-run":`Architecture`,limits:`Honest limits`,"demo-punchline":`Accurate punchline`,"when-to-use-what":`Segment 5`,"where-this-is-going":`Segment 6`,"try-it":`Segment 7`,close:`Close`,questions:`Q&A preparation`},bs=e=>e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`),xs=e=>bs(e).replace(/`([^`]+)`/g,`<code>$1</code>`).replace(/\*\*([^*]+)\*\*/g,`<strong>$1</strong>`),Ss=e=>e.trim().replace(/^\|/,``).replace(/\|$/,``).split(`|`).map(e=>e.trim()),Cs=e=>e.every(e=>/^:?-{2,}:?$/.test(e)),ws=e=>{let t=[],n=null,r=null,i=!1,a=()=>{n&&t.push(`</${n}>`),n=null},o=()=>{if(!r)return;let[e,...n]=r;t.push(`<table><thead><tr>`),t.push(e.map(e=>`<th>${xs(e)}</th>`).join(``)),t.push(`</tr></thead><tbody>`);for(let e of n)t.push(`<tr>`+e.map(e=>`<td>${xs(e)}</td>`).join(``)+`</tr>`);t.push(`</tbody></table>`),r=null},s=e=>{a(),o(),i&&t.push(`</section>`),t.push(`<section data-heading="${bs(e)}">`),i=!0};for(let i of e.split(`
`)){let e=i.trimEnd(),c=/^(#{1,3})\s+(.*)$/.exec(e);if(c){let[,e,n]=c;s(n),t.push(`<h${e.length}>${xs(n)}</h${e.length}>`);continue}if(e.startsWith(`|`)){a();let t=Ss(e);Cs(t)||(r??=[]).push(t);continue}if(o(),!e.trim()){a();continue}let l=/^[-*]\s+(.*)$/.exec(e),u=/^\d+\.\s+(.*)$/.exec(e);if(l||u){let e=l?`ul`:`ol`;n!==e&&(a(),t.push(`<${e}>`),n=e),t.push(`<li>${xs((l??u)[1])}</li>`);continue}if(a(),e.startsWith(`>`)){t.push(`<blockquote>${xs(e.replace(/^>\s?/,``))}</blockquote>`);continue}t.push(`<p>${xs(e)}</p>`)}return a(),o(),i&&t.push(`</section>`),t.join(``)},Ts=e=>{let t=new URLSearchParams(window.location.search);if(t.has(`print-pdf`))return;let n=t.get(`notes`),r=n!==null&&n!==`0`,i=document.createElement(`aside`);i.className=`outline-panel`,i.setAttribute(`aria-label`,`Talk outline for review`),i.innerHTML=`
    <header class="outline-panel__head">
      <p class="outline-panel__kicker">Outline review</p>
      <p class="outline-panel__where"></p>
      <p class="outline-panel__hint">Press R to close</p>
    </header>
    <div class="outline-panel__body">${ws(vs)}</div>`,document.body.append(i);let a=i.querySelector(`.outline-panel__body`),o=i.querySelector(`.outline-panel__where`),s=[...a.querySelectorAll(`section[data-heading]`)],c=e=>{if(!e)return;for(let e of s)e.classList.remove(`is-current`);let t=ys[e.id];if(!t){o.textContent=`${e.id}: no outline section mapped`;return}let n=t.toLowerCase(),r=s.find(e=>e.dataset.heading.toLowerCase().includes(n));if(!r){o.textContent=`${e.id}: heading "${t}" not found in the outline`;return}o.textContent=r.dataset.heading,r.classList.add(`is-current`),a.scrollTo({top:Math.max(r.offsetTop-12,0),behavior:`smooth`})},l=()=>{document.documentElement.classList.toggle(`outline-open`,r),i.setAttribute(`aria-hidden`,String(!r)),e.layout(),r&&c(e.getCurrentSlide())};e.on(`slidechanged`,({currentSlide:e})=>{r&&c(e)}),e.on(`ready`,()=>{e.addKeyBinding({keyCode:82,key:`R`,description:`Toggle the outline review panel`},()=>{r=!r,l()}),l()})},Z=(e=``)=>String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`),Es=/\[\[(.*?)\]\]/g,Ds=(e,t=!1)=>e.trim().split(/\s+/).filter(Boolean).map(e=>`<span class="word-clip"><span class="word js-word${t?` accent`:``}">${Z(e)}</span></span>`).join(``),Os=(e=``)=>{let t=``,n=0;for(let r of e.matchAll(Es))t+=Ds(e.slice(n,r.index)),t+=Ds(r[1],!0),n=r.index+r[0].length;return t+=Ds(e.slice(n)),t},ks=(e=``)=>`<aside class="notes">${Z(e).replaceAll(`
`,`<br />`)}</aside>`,As=e=>`
  <div class="draft-slide-meta" aria-hidden="true">
    <span>${Z(e.id)}</span>
    <span>${Z(e.status)}</span>
  </div>`,Q=(e,t,n=``)=>`
  <section
    id="${Z(e.id)}"
    class="deck-slide deck-slide--${Z(e.type)} ${e.theme===`paper`?`deck-slide--paper`:``}"
    data-slide-type="${Z(e.type)}"
    data-motion="${Z(e.motion??`still`)}"
    data-status="${Z(e.status)}"
    ${n}
  >
    <div class="folio-rule" aria-hidden="true"></div>
    <div class="slide-content">${t}</div>
    ${As(e)}
    ${ks(e.notes)}
  </section>`,$=e=>e?`<p class="eyebrow js-eyebrow">${Z(e)}</p>`:``,js=(e,t=`display`)=>`<h2 class="${t} kinetic" aria-label="${Z(e.replaceAll(`[[`,``).replaceAll(`]]`,``))}">${Os(e)}</h2>`,Ms=(e=!1,t=54)=>`
  <g transform="translate(150 ${t})">
    <g class="device js-device" data-id="hero-device">
      <rect class="device__body" width="220" height="390" rx="42" />
      <rect class="device__screen" x="18" y="30" width="184" height="320" rx="26" />
      <line class="device__speaker" x1="88" y1="15" x2="132" y2="15" />
      <g class="device__intelligence ${e?`is-local`:``}" transform="translate(110 188)">
        <circle r="60" />
        <circle r="37" />
        <circle r="15" />
      </g>
    </g>
  </g>`,Ns=`
  <g class="data-center" transform="translate(1030 78)">
    <rect x="0" y="0" width="250" height="330" rx="30" />
    <g class="server-lines">
      <line x1="35" y1="72" x2="215" y2="72" />
      <line x1="35" y1="132" x2="215" y2="132" />
      <line x1="35" y1="192" x2="215" y2="192" />
      <line x1="35" y1="252" x2="215" y2="252" />
      <circle cx="52" cy="48" r="6" />
      <circle cx="52" cy="108" r="6" />
      <circle cx="52" cy="168" r="6" />
      <circle cx="52" cy="228" r="6" />
    </g>
  </g>`,Ps=(e=!1)=>e?`
      <div class="route-stage route-stage--local" role="img" aria-label="AI processing stays on the device">
        <svg viewBox="0 0 1400 500" aria-hidden="true">
          ${Ms(!0)}
          <path id="local-route" class="route-line route-line--local js-draw" d="M 370 245 C 530 64, 720 64, 805 245 C 720 426, 530 426, 370 245" />
          <circle class="route-pulse route-pulse--local" r="10">
            <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
              <mpath href="#local-route" />
            </animateMotion>
          </circle>
          <g class="local-mark" transform="translate(875 173)">
            <circle r="68" />
            <path d="M -28 2 L -6 24 L 34 -28" />
          </g>
        </svg>
      </div>`:`
    <div class="route-stage" role="img" aria-label="An AI request travels from personal devices to a distant data center and back">
      <svg viewBox="0 0 1400 500" aria-hidden="true">
        <image class="route-devices" href="./devices-hero.png" x="60" y="95" width="440" height="302" preserveAspectRatio="xMidYMid meet" />
        ${Ns}
        <path id="cloud-route" class="route-line js-draw" d="M 500 205 C 660 70, 880 60, 1030 190" />
        <path id="cloud-route-return" class="route-line route-line--return js-draw" d="M 1030 296 C 880 430, 660 440, 500 290" />
        <circle class="route-pulse" r="10">
          <animateMotion dur="3.6s" repeatCount="indefinite" rotate="auto" calcMode="linear" keyPoints="0;1;1" keyTimes="0;0.5;1">
            <mpath href="#cloud-route" />
          </animateMotion>
          <animate attributeName="opacity" dur="3.6s" repeatCount="indefinite" calcMode="linear" values="1;1;0;0" keyTimes="0;0.47;0.5;1" />
        </circle>
        <circle class="route-pulse route-pulse--return" r="9">
          <animateMotion dur="3.6s" repeatCount="indefinite" rotate="auto" calcMode="linear" keyPoints="0;0;1" keyTimes="0;0.5;1">
            <mpath href="#cloud-route-return" />
          </animateMotion>
          <animate attributeName="opacity" dur="3.6s" repeatCount="indefinite" calcMode="linear" values="0;0;1;1" keyTimes="0;0.5;0.53;1" />
        </circle>
      </svg>
    </div>`,Fs=e=>{let t={plane:`<path d="M8 22 28 4l5 1-8 19 12 7-2 4-14-4-6 9-4-1 2-11-8-3 3-3Z" />`,field:`<path d="M5 34c9-11 20-16 34-15M7 40c7-8 17-12 30-12M21 7v11M16 12h10" />`,offline:`<path d="M6 14c10-8 22-8 32 0M11 21c7-6 15-6 22 0M17 28c3-3 7-3 10 0M6 6l32 32" />`};return`<svg class="condition-glyph" viewBox="0 0 44 44" aria-hidden="true">${t[e]??t.offline}</svg>`},Is=e=>Q(e,`<div class="title-layout">
    <div class="title-copy">
      ${$(e.eyebrow)}
      <h1 class="hero kinetic" aria-label="${Z(e.title.replaceAll(`[[`,``).replaceAll(`]]`,``))}">${Os(e.title)}</h1>
      <p class="hero-subtitle js-subtitle">${Z(e.subtitle)}</p>
      <div class="title-byline js-byline">
        <img class="title-portrait" src="./headshot.jpg" alt="" width="88" height="88" decoding="async" />
        <span class="byline-name">${Z(e.byline)}</span>
        <span class="byline-role">Sr. SDE, Amazon Devices - Emerging Products</span>
      </div>
    </div>
    <img class="title-devices" src="./devices-hero.png" alt="Line illustration of a tablet, phone, laptop, smartwatch, earbuds and a speaker" decoding="async" />
  </div>`),Ls=e=>Q(e,`<div class="question-layout">
    ${$(e.eyebrow)}
    ${js(e.title,`display display--question`)}
    <div class="question-mark js-question-mark" aria-hidden="true">?</div>
  </div>`),Rs=(e,t=!1)=>Q(e,`<div class="diagram-layout">
    <div class="diagram-copy">
      ${$(e.eyebrow)}
      ${js(e.title,`display display--diagram`)}
      <p class="diagram-caption js-caption">${Z(e.caption)}</p>
    </div>
    ${Ps(t)}
  </div>`,`data-auto-animate data-auto-animate-easing="cubic-bezier(0.22, 1, 0.36, 1)"`),zs=e=>Q(e,`<div class="scale-layout">
    <div class="scale-copy">
      ${$(e.eyebrow)}
      ${js(e.title,`display display--wide`)}
      <p class="detail-line js-detail">${Z(e.detail)}</p>
    </div>
    <div class="scale-visual" aria-hidden="true">
      <div class="model-orbit model-orbit--one js-orbit"></div>
      <div class="model-orbit model-orbit--two js-orbit"></div>
      <div class="model-core js-model-core">AI</div>
      <div class="scale-device js-scale-device"><span></span></div>
    </div>
  </div>`),Bs=(e,t=!1)=>Q(e,`<div class="standard-layout">
    ${$(e.eyebrow)}
    ${js(e.title,`display display--medium`)}
    <div class="card-grid ${t?`card-grid--resources`:``}">
      ${e.items.map((e,t)=>`<article class="editorial-card js-auto-item" data-fragment-index="${t}">
            <p class="card-label">${Z(e.label)}</p>
            <h3>${Z(e.title)}</h3>
            <p>${Z(e.body)}</p>
          </article>`).join(``)}
    </div>
  </div>`),Vs={title:Is,question:Ls,journey:e=>Rs(e,!1),local:e=>Rs(e,!0),scale:zs,cards:Bs,"email-pipeline":e=>Q(e,`<div class="email-pipeline-layout">
    <div class="email-pipeline-heading">
      ${$(e.eyebrow)}
      ${js(e.title,`display display--email-pipeline`)}
    </div>
    <div class="email-pipeline-grid">
      <article class="gmail-mock js-auto-item" aria-label="Synthetic email from ${Z(e.email.sender)}">
        <div class="gmail-toolbar">
          <span class="gmail-back" aria-hidden="true">‹</span>
          <span>Inbox</span>
          <span class="synthetic-badge">Synthetic email</span>
        </div>
        <h3 class="gmail-subject">${Z(e.email.subject)}</h3>
        <div class="gmail-meta">
          <span class="gmail-avatar" aria-hidden="true">${Z(e.email.avatar)}</span>
          <span><strong>${Z(e.email.sender)}</strong><small>&lt;${Z(e.email.senderEmail)}&gt;</small></span>
          <time>${Z(e.email.date)}</time>
        </div>
        <div class="gmail-body">${e.email.paragraphs.map(e=>`<p>${Z(e)}</p>`).join(``)}</div>
      </article>
      <div class="pipeline-connector" aria-hidden="true"><span>→</span><small>local runbook</small></div>
      <div class="pipeline-results">
        <article class="pipeline-card js-auto-item">
          <p class="pipeline-label">01 · Classify and route</p>
          <div class="pipeline-fields">
            ${e.classification.map(e=>`<div class="pipeline-field"><span>${Z(e.label)}</span><strong>${Z(e.value)}</strong></div>`).join(``)}
          </div>
        </article>
        <article class="pipeline-card pipeline-card--privacy js-auto-item">
          <p class="pipeline-label">02 · Remove personal data</p>
          <div class="removal-pills">${e.removals.map(e=>`<span>${Z(e)}</span>`).join(``)}</div>
          <p class="redacted-preview">${Z(e.redactedPreview)}</p>
        </article>
      </div>
    </div>
  </div>`),chart:e=>Q(e,`<div class="chart-layout">
    <div class="chart-header">
      ${$(e.eyebrow)}
      ${js(e.title,`display display--chart`)}
    </div>
    <div class="chart-frame">
      <img class="chart-image js-chart" src="${Z(e.image)}" alt="${Z(e.alt)}" decoding="async" loading="eager" />
    </div>
    <p class="chart-takeaway js-subtitle">${Z(e.takeaway)}</p>
  </div>`),statement:e=>Q(e,`<div class="statement-layout">
    ${$(e.eyebrow)}
    ${js(e.title,`display display--statement`)}
    ${e.subtitle?`<p class="statement-subtitle js-subtitle">${Z(e.subtitle)}</p>`:``}
    <div class="ember-stroke js-underline" aria-hidden="true"></div>
  </div>`),section:e=>Q(e,`<div class="section-layout">
    <div class="section-copy">
      ${$(e.eyebrow)}
      ${js(e.title,`display display--medium`)}
    </div>
    <div class="number-rail">
      ${e.numbers.map((t,n)=>`<div class="number-item js-auto-item" data-fragment-index="${n}">
            <span class="number-item__number">${Z(t)}</span>
            <span class="number-item__label">${Z(e.labels[n])}</span>
          </div>`).join(``)}
    </div>
  </div>`),principle:e=>Q(e,`<div class="principle-layout">
    <div class="principle-number js-principle-number" aria-hidden="true">${Z(e.number)}</div>
    <div class="principle-copy">
      ${$(e.eyebrow)}
      ${js(e.title,`display display--principle`)}
    </div>
  </div>`),rows:e=>Q(e,`<div class="standard-layout standard-layout--rows">
    ${$(e.eyebrow)}
    ${js(e.title,`display display--medium`)}
    <div class="editorial-rows${e.compact?` editorial-rows--compact`:``}">
      ${e.items.map((e,t)=>`<div class="editorial-row js-auto-item" data-fragment-index="${t}">
            <span class="editorial-row__label">${Z(e.label)}</span>
            <span class="editorial-row__body">${Z(e.body)}</span>
          </div>`).join(``)}
    </div>
  </div>`),meter:e=>Q(e,`<div class="meter-layout">
    <div class="meter-copy">
      ${$(e.eyebrow)}
      ${js(e.title,`display display--medium`)}
    </div>
    <div class="meter-visual">
      <div class="meter-count js-counter" data-count-to="${Number(e.countTo)}">0</div>
      <p>${Z(e.counterLabel)}</p>
      <div class="meter-line"><span class="js-meter-fill"></span></div>
      <p class="meter-payoff js-auto-item">${Z(e.payoff)}</p>
    </div>
  </div>`),conditions:e=>Q(e,`<div class="standard-layout">
    ${$(e.eyebrow)}
    ${js(e.title,`display display--medium`)}
    <div class="condition-grid">
      ${e.items.map((e,t)=>`<div class="condition js-auto-item" data-fragment-index="${t}">
            ${Fs(e.glyph)}
            <span>${Z(e.title)}</span>
          </div>`).join(``)}
    </div>
  </div>`),caution:e=>Q(e,`<div class="caution-layout">
    ${$(e.eyebrow)}
    ${js(e.title,`display display--caution`)}
    <p class="caution-subtitle">${Z(e.subtitle)}</p>
  </div>`),comparison:e=>Q(e,`<div class="comparison-layout">
    <div class="comparison-header">
      <div>${$(e.eyebrow)}${js(e.title,`display display--comparison`)}</div>
      <div class="comparison-worlds" aria-hidden="true">
        <span>${Z(e.leftTitle)}</span>
        <span>${Z(e.rightTitle)}</span>
      </div>
    </div>
    <div class="comparison-table">
      <div class="comparison-divider js-divider" aria-hidden="true"></div>
      ${e.rows.map((e,t)=>`<div class="comparison-row js-auto-item" data-fragment-index="${t}">
            <span class="comparison-left">${Z(e.left)}</span>
            <span class="comparison-dimension">${Z(e.dimension)}</span>
            <span class="comparison-right">${Z(e.right)}</span>
          </div>`).join(``)}
    </div>
    <div class="comparison-payoff js-auto-item" data-fragment-index="${e.rows.length}">${Z(e.payoff)}</div>
  </div>`),analogy:e=>Q(e,`<div class="standard-layout">
    ${$(e.eyebrow)}
    ${js(e.title,`display display--medium`)}
    <div class="analogy-grid">
      <div class="analogy-card js-auto-item">
        <span class="analogy-icon" aria-hidden="true">01</span>
        <h3>${Z(e.leftTitle)}</h3>
        <p>${Z(e.leftBody)}</p>
      </div>
      <div class="analogy-card js-auto-item">
        <span class="analogy-icon" aria-hidden="true">100</span>
        <h3>${Z(e.rightTitle)}</h3>
        <p>${Z(e.rightBody)}</p>
      </div>
    </div>
    <p class="analogy-payoff js-auto-item">${Z(e.payoff)}</p>
  </div>`),resources:e=>Bs(e,!0),close:e=>Q(e,`<div class="close-layout">
    ${$(e.eyebrow)}
    ${js(e.title,`hero hero--close`)}
    <p class="hero-subtitle js-subtitle">${Z(e.subtitle)}</p>
  </div>`),meta:e=>Q(e,`<div class="meta-layout">
    <div class="offline-ring js-offline-ring" aria-hidden="true">
      <svg viewBox="0 0 100 100"><path d="M16 35c20-18 48-18 68 0M27 49c14-12 32-12 46 0M39 63c7-6 15-6 22 0M18 18l64 64" /></svg>
    </div>
    <div>
      ${$(e.eyebrow)}
      ${js(e.title,`display display--meta`)}
      <p class="hero-subtitle js-subtitle">${Z(e.subtitle)}</p>
    </div>
  </div>`),qa:e=>Q(e,`<div class="qa-layout">
    ${$(e.eyebrow)}
    ${js(e.title,`hero hero--qa`)}
    <p class="hero-subtitle js-subtitle">${Z(e.subtitle)}</p>
    <div class="qa-orbit" aria-hidden="true"></div>
  </div>`)},Hs=e=>e.map(e=>{let t=Vs[e.type];if(!t)throw Error(`No renderer for slide type: ${e.type}`);return t(e)}).join(``),Us=new URLSearchParams(window.location.search).has(`draft`);document.title=`${sn.title} | ${sn.speaker}`,document.documentElement.classList.toggle(`draft-mode`,Us),document.querySelector(`#draft-ribbon`).textContent=sn.draftLabel,document.querySelector(`#slides`).innerHTML=Hs(cn);var Ws=new L({width:1600,height:900,margin:0,minScale:.2,maxScale:2,controls:!0,controlsTutorial:!1,controlsLayout:`edges`,progress:!0,slideNumber:`c/t`,showSlideNumber:`all`,hash:!0,history:!0,keyboard:!0,touch:!0,overview:!0,center:!1,navigationMode:`linear`,transition:`none`,backgroundTransition:`fade`,viewDistance:3,mobileViewDistance:2,autoAnimate:!0,autoAnimateDuration:.8,autoAnimateEasing:`cubic-bezier(0.22, 1, 0.36, 1)`,pdfSeparateFragments:!1,pdfMaxPagesPerSlide:1,plugins:[on]});_s(Ws),Ts(Ws),await Ws.initialize(),document.documentElement.classList.add(`deck-ready`);
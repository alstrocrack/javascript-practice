"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _createForOfIteratorHelper(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0,t=function(){};return{s:t,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,a=!0,i=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return a=e.done,e},e:function(e){i=!0,n=e},f:function(){try{a||null==r.return||r.return()}finally{if(i)throw n}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}window.addEventListener("load",function(){headerShow(),kvShow(),KVinit()});var siteTitle=document.querySelector(".header-title");function headerShow(){gsap.to(siteTitle,3,{y:0,delay:1,ease:Power4.easeOut,opacity:1})}var header=document.querySelector(".js-header"),headerRect=header.getBoundingClientRect(),headerContent=document.querySelectorAll(".header-list_item > a"),logoImg=document.querySelector(".outview-image"),logoImgInview=document.querySelector(".inview-image"),kv=document.querySelector(".kv"),kvRect=kv.getBoundingClientRect(),scrollBool=!1;function headerBgShow(){gsap.to(header,{duration:1.2,ease:Power4.easeOut,backgroundColor:"#fff",boxShadow:"0px 0px 20px #000"}),gsap.to(headerContent,{duration:1.2,ease:Power4.easeOut,color:"rgb(223, 86, 86)"}),gsap.to(logoImg,{ease:Power4.easeOut,display:"none",onComplete:function(){gsap.to(logoImgInview,{duration:1,ease:Power4.easeOut,display:"block",y:0})}})}function headerBgHide(){gsap.to(header,{duration:1.2,ease:Power4.easeOut,backgroundColor:"transparent",boxShadow:"none"}),gsap.to(headerContent,{duration:1.2,ease:Power4.easeOut,color:"#fff"}),gsap.to(logoImgInview,{display:"none",onComplete:function(){gsap.to(logoImg,{duration:1,ease:Power4.easeOut,display:"block",y:0})}})}gsap.set(logoImg,{display:"block"}),gsap.set(logoImgInview,{display:"none",y:0}),window.addEventListener("scroll",function(){var e=headerRect.bottom+window.pageYOffset,t=kvRect.bottom;console.log(e),console.log(t),t<e&&!scrollBool&&(scrollBool=!0,console.log("outview!"),headerBgShow()),e<t&&scrollBool&&(scrollBool=!1,console.log("inview!"),headerBgHide())});var kvText=document.querySelector(".kv-text_content");function kvShow(){gsap.to(kvText,3,{y:0,delay:2,ease:Power2.easeOut,opacity:1})}function KVinit(){new Swiper(".kv-swiper-container",{direction:"horizontal",loop:!0,speed:1e3,centeredSlides:!0,effect:"fade",allowTouchMove:!1,disableOnInteraction:!1,autoplay:{delay:7e3,stopOnlastSlide:!1,disableOnInteraction:!1}})}function contentshow(e){gsap.to(e,{duration:1,opacity:1,delay:.5,ease:Power1.easeOut,y:-20})}gsap.set(kvText,{y:40,opacity:0});var targets=document.querySelectorAll(".js-scroll"),callback=function(e,t){e.forEach(function(e){e.isIntersecting&&(contentshow(e.target),t.unobserve(e.target))})},options={root:null,rootMargin:"0px",threshold:0},observer=new IntersectionObserver(callback,options);targets.forEach(function(e){return observer.observe(e)});var _step,animatetext=document.querySelector(".js-textAnimation"),str=animatetext.innerHTML.trim(),strContainer=[],_iterator=_createForOfIteratorHelper(str);try{for(_iterator.s();!(_step=_iterator.n()).done;){var el=_step.value;strContainer.push(el)}}catch(e){_iterator.e(e)}finally{_iterator.f()}var btn=document.querySelector(".js-btn");console.log(strContainer);var allSlides=document.querySelector(".all-page-number"),slides=document.querySelectorAll(".js-carousel"),slideBox=[];function setCarousel(){allSlides.textContent=slideBox.length}slides.forEach(function(e){slideBox.push(e)}),setCarousel();var currentPageNumber=0,currentSlides=document.querySelector(".current-page-number");currentSlides.textContent=1;var Carousel=new Swiper(".swiper-container",{direction:"horizontal",loop:!0,speed:600,centeredSlides:!0,slidesPerView:1,spaceBetween:50,breakpoints:{768:{slidesPerView:2}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{slideChange:function(){currentPageNumber!==Carousel.realIndex&&(currentPageNumber=Carousel.realIndex),currentSlides.textContent=currentPageNumber+1}}}),Accordion=function(){function t(e){_classCallCheck(this,t),this.el=e,this.trigger=this.el.querySelector(".js-trigger"),this.draw=this.el.querySelector(".js-draw"),this.icon=this.trigger.querySelector(".accordion-trigger_icon"),this.isOpen=!1}return _createClass(t,[{key:"_init",value:function(){var e=this;gsap.set(this.draw,{height:0,opacity:0}),this.trigger.addEventListener("click",function(){e.isOpen?e._close():e._open()})}},{key:"_open",value:function(){this.isOpen=!0,gsap.to(this.draw,{opacity:1,height:"auto",duration:.6,ease:Power4.easeOut}),this.trigger.classList.add("open"),this.icon.classList.remove("plus"),this.icon.classList.add("minus")}},{key:"_close",value:function(){this.isOpen=!1,gsap.to(this.draw,{opacity:0,height:0,duration:.6,ease:Power4.easeOut}),this.trigger.classList.remove("open"),this.icon.classList.remove("minus"),this.icon.classList.add("plus")}}]),t}();function acoInit(){Array.from(document.querySelectorAll(".js-accordion"),function(e,t){new Accordion(e)._init()})}acoInit();var width=960,height=540,renderer=new THREE.WebGLRenderer({canvas:document.querySelector("#webglCanvas")});renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(width,height);var scene=new THREE.Scene,camera=new THREE.PerspectiveCamera(45,width/height);camera.position.set(0,0,1e3);var geometry=new THREE.BoxGeometry(400,400,400),material=new THREE.MeshBasicMaterial({color:65280}),cube=new THREE.Mesh(geometry,material);scene.add(cube);var animate=function e(){requestAnimationFrame(e),cube.rotation.x+=.01,cube.rotation.y+=.01,renderer.render(scene,camera)};animate();var gui=new dat.GUI,params={color:65280,scale:1};gui.addColor(params,"color").onChange(function(){cube.material.color.set(params.color)}),gui.add(params,"scale",1,4).onChange(function(){cube.scale.set(params.scale,params.scale,params.scale)}),gui.close();
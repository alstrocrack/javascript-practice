"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}window.addEventListener("load",function(){headerShow(),kvShow(),KVinit(),webglinit()});var siteTitle=document.querySelector(".header-title");function headerShow(){gsap.to(siteTitle,3,{y:0,delay:1,ease:Power4.easeOut,opacity:1})}var kvText=document.querySelector(".kv-text_content");function kvShow(){gsap.to(kvText,3,{y:0,delay:2,ease:Power2.easeOut,opacity:1})}function KVinit(){new Swiper(".kv-swiper-container",{direction:"horizontal",loop:!0,speed:1e3,centeredSlides:!0,effect:"fade",allowTouchMove:!1,disableOnInteraction:!1,autoplay:{delay:7e3,stopOnlastSlide:!1,disableOnInteraction:!1}})}function contentshow(e){gsap.to(e,{duration:1,opacity:1,delay:.5,ease:Power1.easeOut,y:-20})}gsap.set(kvText,{y:40,opacity:0});var targets=document.querySelectorAll(".js-scroll"),callback=function(e,t){e.forEach(function(e){e.isIntersecting&&(contentshow(e.target),t.unobserve(e.target))})},options={root:null,rootMargin:"0px",threshold:0},observer=new IntersectionObserver(callback,options);targets.forEach(function(e){return observer.observe(e)});var allSlides=document.querySelector(".all-page-number"),slides=document.querySelectorAll(".js-carousel"),slideBox=[];function setCarousel(){allSlides.textContent=slideBox.length}slides.forEach(function(e){slideBox.push(e)}),setCarousel();var currentPageNumber=0,currentSlides=document.querySelector(".current-page-number");currentSlides.textContent=1;var Carousel=new Swiper(".swiper-container",{direction:"horizontal",loop:!0,speed:600,centeredSlides:!0,slidesPerView:1,spaceBetween:50,breakpoints:{768:{slidesPerView:2}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{slideChange:function(){currentPageNumber!==Carousel.realIndex&&(currentPageNumber=Carousel.realIndex),currentSlides.textContent=currentPageNumber+1}}}),Accordion=function(){function t(e){_classCallCheck(this,t),this.el=e,this.trigger=document.querySelector(".js-trigger"),this.draw=document.querySelector(".js-draw"),this.icon=document.querySelector(".accordion-trigger_icon"),this.isOpen=!1}return _createClass(t,[{key:"_init",value:function(){var e=this;gsap.set(this.draw,{height:0,opacity:0}),trigger.addEventListener("click",function(){isOpen?e._close():e._open()})}},{key:"_open",value:function(){this.isOpen=!0,gsap.to(this.draw,{opacity:1,height:"auto",duration:.6,ease:Power4.easeOut}),this.rigger.classList.add("open"),this.icon.classList.remove("plus"),this.icon.classList.add("minus")}},{key:"_close",value:function(){this.isOpen=!1,gsap.to(this.draw,{opacity:0,height:0,duration:.6,ease:Power4.easeOut}),this.trigger.classList.remove("open"),this.icon.classList.remove("minus"),this.icon.classList.add("plus")}}]),t}(),accordion=new Accordion;function webglinit(){var t=new THREE.WebGLRenderer({canvas:document.querySelector("#webglCanvas")});t.setPixelRatio(window.devicePixelRatio),t.setSize(1080,500);var n=new THREE.Scene,r=new THREE.PerspectiveCamera(45,2.16);r.position.set(0,0,1e3);var e=new THREE.BoxGeometry(400,400,400),i=new THREE.MeshNormalMaterial,o=new THREE.Mesh(e,i);n.add(o),function e(){o.rotation.y+=.01;t.render(n,r);requestAnimationFrame(e)}()}var gui=new dat.GUI,Parameters=function e(){_classCallCheck(this,e),this.message="sample",this.angle=0,this.isVisible=!0},param=new Parameters;gui.add(param,"message");
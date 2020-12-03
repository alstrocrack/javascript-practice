// 読み込んだ時に発火させるもの
window.addEventListener('load', () => {
    //
});

// ヘッダーのロゴ
class headerLogo {
    constructor(){
        this.siteTitle = document.querySelector(".header-title");
    }
    _headerShow(){
        gsap.to(this.siteTitle, 3, {
            y: 0,
            delay: 1,
            ease: Power4.easeOut,
            opacity: 1,
        });
    }
}
const logo = new headerLogo();
logo._headerShow();

// ヘッダーの色切り替え
class headerBgShow {
    constructor(){
        // DOMの取得
        this.header = document.querySelector('.js-header');
        this.headerContent = document.querySelectorAll('.header-list_item > a');
        this.logoImg = document.querySelector('.outview-image');
        this.logoImgInview = document.querySelector('.inview-image');
        this.kv = document.querySelector('.kv');

        // 位置座標の取得
        this.headerRect = this.header.getBoundingClientRect();
        this.kvRect = this.kv.getBoundingClientRect();

        // 処理を1回に限定するための真偽値
        this.scrollBool = false;

        // ロゴイメージの初期化
        gsap.set(this.logoImg, {
            display: 'block',
        });
        gsap.set(this.logoImgInview, {
            display: 'none',
            y: 0,
        });
    }
    _headerBgIn() {
        gsap.to(this.header, {
            duration: 1.2,
            ease: Power4.easeOut,
            backgroundColor: '#fff',
            boxShadow:"0px 0px 20px #000",
        });
        gsap.to(this.headerContent, {
            duration: 1.2,
            ease: Power4.easeOut,
            color: 'rgb(223, 86, 86)',
        });
        gsap.to(this.logoImg, {
            ease: Power4.easeOut,
            display: 'none',
            onComplete: () => {
                gsap.to(this.logoImgInview, {
                    duration: 1,
                    ease: Power4.easeOut,
                    display: 'block',
                    y: 0,
                });
            }
        });
    }
    _headerBgOut() {
        gsap.to(this.header, {
            duration: 1.2,
            ease: Power4.easeOut,
            backgroundColor: 'transparent',
            boxShadow: 'none',
        });
        gsap.to(this.headerContent, {
            duration: 1.2,
            ease: Power4.easeOut,
            color: '#fff',
        });
        gsap.to(this.logoImgInview, {
            display: 'none',
            onComplete: () => {
                gsap.to(this.logoImg, {
                    duration: 1,
                    ease: Power4.easeOut,
                    display: 'block',
                    y: 0,
                });
            }
        });
    }
    _BgStart() {
        window.addEventListener('scroll', ()=> {
            let headerBottom = this.headerRect.bottom + window.pageYOffset;
            let kvBottom = this.kvRect.bottom;
            if(headerBottom > kvBottom && !this.scrollBool) {
                this.scrollBool = true;
                console.log('outview!');
                this._headerBgIn();
            }
            if(headerBottom < kvBottom && this.scrollBool) {
                this.scrollBool = false;
                console.log('inview!');
                this._headerBgOut();
            }
        });
    }
}
const header = new headerBgShow();
header._BgStart();

// KVのフェードイン
class kvShow {
    constructor() {
        this.kvText = document.querySelector(".kv-text_content");
        gsap.set(this.kvText, {
            y: 40,
            opacity: 0,
        });
    }
    _kvFadein(){
        gsap.to(this.kvText, 3, {
            y: 0,
            delay: 2,
            ease: Power2.easeOut,
            opacity: 1,
        });
    }
}
const kvText = new kvShow();
kvText._kvFadein();

// KVのスライドショー
class kvSlide {
    constructor() {
        this.kvSlider = document.querySelector('.kv-swiper-container');
    }
    _KVinit(){
        const kvSwiper = new Swiper(this.kvSlider, {
            direction: 'horizontal',
            loop: true,
            speed: 1000,
            centeredSlides: true,
            effect: 'fade',
            allowTouchMove: false,
            disableOnInteraction: false,
            autoplay:{
                delay: 7000,
                stopOnlastSlide: false,
                disableOnInteraction: false,
            },
        });
    }
}
const kvSlideShow = new kvSlide();
kvSlideShow._KVinit();

///////////////////////////////////////////  IntersectionObserver /////////////////////////////////////////////
function contentshow(e){
    gsap.to(e, {
        duration: 1,
        opacity: 1,
        delay: .5,
        ease: Power1.easeOut,
        y: -20,
    });
}
const cb = function(el, isIntersecting) {
    if(isIntersecting) {
        contentshow(el);
    }
}
class scrollObserver {
    constructor(els, cb, options) {
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
            root: null, 
            rootMargin: "0px", 
            threshold: 0,
            once: true,
        };
        this.cb = cb;
        this.options = Object.assign(defaultOptions, options);
        this.once = this.options.once;
        this._init();
    }
    _init() {
        const callback = function(entries, observer){
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    this.cb(entry.target, true);
                    if(this.once) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target, false);
                }
            });
        };
        this.io = new IntersectionObserver(callback.bind(this), this.options); 

        // @see https://github.com/w3c/IntersectionObserver/tree/master/polyfill
        this.io.POLL_INTERVAL = 100;

        this.els.forEach(el => this.io.observe(el));
    }
    destroy() {
        this.io.disconnect();
    }
}
const so = new scrollObserver('.js-scroll', cb);
///////////////////////////////////////////  IntersectionObserver /////////////////////////////////////////////

/////////////////////////////// 文字アニメーション /////////////////////////////////////////
class textAnimation {
    constructor(el) {
        // 渡って来る要素がDOMかどうか判定する
        this.el = el  instanceof HTMLElement ? el : document.querySelector(el);
        this.str = this.el.innerHTML.trim().split("");
        this._concat();
        this.chars = this.el.querySelectorAll('.char');
    }
    _concat() {
        this.el.innerHTML = this.str.reduce((acc, curr) => {
            curr= curr.replace(/\s+/, '&nbsp;');
            return `${acc}<span class="char">${curr}</span>`;
        }, "");
    }
    _animationStart() {
        this.chars.forEach((c, i) => {
            gsap.to(c, {
                ease: Back.easeOut,
                delay: i * .05,
                startAt: {y: '50%', opacity: 0},
                y:'0%',
                opacity: 1,
            });
        });
    }
}
const cb2 = function(el, isIntersecting) {
    if(isIntersecting) {
        const textAnime = new textAnimation(el);
        textAnime._animationStart();
    }
}
const so2 = new scrollObserver('.js-textAnimation', cb2);
/////////////////////////////// 文字アニメーション /////////////////////////////////////////

// content2のカルーセル
class contentCarousel {
    constructor() {
        // DOMの取得
        this.allSlides = document.querySelector('.all-page-number');
        this.currentSlides = document.querySelector('.current-page-number');
        this.slides = document.querySelectorAll(".js-carousel");
        this.swiper = document.querySelector('.swiper-container');

        // スライドを配列に格納
        this.slideBox = [];
        this.slides.forEach(slide => {
            this.slideBox.push(slide);
        });

        // 現在のスライドの番号表示の初期化処理
        this.allSlides.textContent = this.slideBox.length;
        this.currentPageNumber = 0;
        this.currentSlides.textContent = 1;
    }
    _contentCarousel() {
        const mySwiper = new Swiper(this.swiper, {
            direction: 'horizontal',
            loop: true,
            speed: 600,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 50,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                slideChange: () => {
                    if(this.currentPageNumber !== mySwiper.realIndex){
                        this.currentPageNumber = mySwiper.realIndex;
                    }
                    this.currentSlides.textContent = this.currentPageNumber + 1;
                }
            }
        });
    }
}
const Carousel = new contentCarousel();
Carousel._contentCarousel();

// content3のアコーディオン
class Accordion {
    constructor(el){
    this.el = el;
    this.trigger = this.el.querySelector('.js-trigger');
    this.draw = this.el.querySelector('.js-draw');
    this.icon = this.trigger.querySelector('.accordion-trigger_icon');
    this.isOpen = false;
    }
    _init(){
    gsap.set(this.draw, {
    height: 0,
    opacity: 0,
    });
    this.trigger.addEventListener('click', () => {
    if(this.isOpen){
    this._close();
    } else {
    this._open();
    }
    });
    };
    _open(){
    this.isOpen = true;
    gsap.to(this.draw, {
    opacity: 1,
    height: 'auto',
    duration: 0.6,
    ease: Power4.easeOut,
    });
    this.trigger.classList.add('open');
    this.icon.classList.remove('plus');
    this.icon.classList.add('minus');
    };
    _close(){
    this.isOpen = false;
    gsap.to(this.draw, {
    opacity: 0,
    height: 0,
    duration: 0.6,
    ease: Power4.easeOut,
    });
    this.trigger.classList.remove('open');
    this.icon.classList.remove('minus');
    this.icon.classList.add('plus');
    };
}
function acoInit(){
    Array.from(document.querySelectorAll('.js-accordion'), (e, i) => {
        const item = new Accordion(e);
        item._init();
    });
}
acoInit();
/////////////////////////////////////// WebGL ///////////////////////////////////
// サイズの指定
{
    const width = 960;
    const height = 540;

    // レンダラーを作成
    let renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#webglCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    let scene = new THREE.Scene();

    // カメラを作成
    let camera = new THREE.PerspectiveCamera( 45, width / height );
    camera.position.set(0, 0, +1000);

    // 箱を作成
    let geometry = new THREE.BoxGeometry(400, 400, 400);
    let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    let cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    // 毎フレーム実行されるループイベント
    let animate = function () {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    };
    animate();


let gui = new dat.GUI();
let params = {
    color: 0x00ff00,
    scale: 1,
};
gui.addColor( params, 'color' ).onChange( function() { cube.material.color.set( params.color ); } );
gui.add( params, 'scale' , 1.0, 4.0).onChange( function() { cube.scale.set( params.scale, params.scale, params.scale ); } );
gui.close();

}
/////////////////////////////////////// WebGL ///////////////////////////////////
/////////////////////////////////////// pageTop /////////////////////////////
class ToTop {
    constructor() {
        // DOMの取得
        this.header = document.querySelector('.js-header');
        this.headerContent = document.querySelectorAll('.header-list_item > a');
        this.logoImg = document.querySelector('.outview-image');
        this.logoImgInview = document.querySelector('.inview-image');
        this.kv = document.querySelector('.kv');

        // 位置座標の取得
        this.headerRect = this.header.getBoundingClientRect();
        this.kvRect = this.kv.getBoundingClientRect();

        // 処理を1回に限定するための真偽値
        this.scrollBool = false;

        //操作するDOM
        this.el = document.querySelector('.toTop');
        gsap.set(this.el, {
            x: 100,
        });
    }
    init() {
        this._asideShow();
        this._scrollTop();
        this._floatUp();
    }
    _asideShow() {
        window.addEventListener('scroll', ()=> {
            let headerBottom = this.headerRect.bottom + window.pageYOffset;
            let kvBottom = this.kvRect.bottom;
            if(headerBottom > kvBottom && !this.scrollBool) {
                this.scrollBool = true;
                console.log('outview!');
                this._asideIn();
            }
            if(headerBottom < kvBottom && this.scrollBool) {
                this.scrollBool = false;
                console.log('inview!');
                this._asideOut();
            }
        });
    }
    _scrollTop() {
        this.el.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1,
                ease: Power3.easeOut,
                scrollTo: {y: 0},
            });
        });
    }
    _floatUp() {
        gsap.to(this.el, {
            duration: 1,
            y: -5,
            // ease: Power4.easeInOut,
            onComplete: () => {
                this._floatDown();
            },
        });
    }
    _floatDown() {
        gsap.to(this.el, {
            duration: 1,
            y: 5,
            // ease: Power4.easeInOut,
            onComplete: () => {
                this._floatUp();
            },
        });
    }
    _asideIn() {
        gsap.to(this.el, {
            x: 0,
            ease: Power4.easeOut,
            duration: 0.4,
        });
    }
    _asideOut() {
        gsap.to(this.el, {
            x: 100,
            ease: Power4.easeIn,
            duration: 0.4,
        });
    }
}
const toTop = new ToTop();
toTop.init();






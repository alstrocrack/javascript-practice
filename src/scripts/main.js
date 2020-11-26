window.addEventListener('load', () => {
    headerShow();
    kvShow();
    KVinit();
});

// mouse stalker
// const stalker = document.getElementById("mouse-stalker");
// document.addEventListener('mousemove', function(e){
//     stalker.style.transform= 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
// });

/////////////////////////////// header /////////////////////////////////////
//   ヘッダーのアイコンのフェードイン
const siteTitle = document.querySelector(".header-title");
function headerShow(){
    gsap.to(siteTitle, 3, {
        y: 0,
        delay: 1,
        ease: Power4.easeOut,
        opacity: 1,
    });
}

// ヘッダーがKVを過ぎると背景が付いて、文字色が変化
const header = document.querySelector('.js-header');
const headerRect = header.getBoundingClientRect();
const headerContent = document.querySelectorAll('.header-list_item > a');
const logoImg = document.querySelector('.outview-image');
const logoImgInview = document.querySelector('.inview-image');

const kv = document.querySelector('.kv');
const kvRect = kv.getBoundingClientRect();
// ↑これが上手く取れないときアリ

let scrollBool = false;

gsap.set(logoImg, {
    display: 'block',
});
gsap.set(logoImgInview, {
    display: 'none',
    y: 0,
});

window.addEventListener('scroll', ()=> {
    let headerBottom = headerRect.bottom + window.pageYOffset;
    let kvBottom = kvRect.bottom;
    console.log(headerBottom);
    console.log(kvBottom);
    if(headerBottom > kvBottom && !scrollBool) {
        scrollBool = true;
        console.log('outview!');
        headerBgShow();
    }
    if(headerBottom < kvBottom && scrollBool) {
        scrollBool = false;
        console.log('inview!');
        headerBgHide();
    }
});

function headerBgShow() {
    gsap.to(header, {
        duration: 1.2,
        ease: Power4.easeOut,
        backgroundColor: '#fff',
        boxShadow:"0px 0px 20px #000",
    });
    gsap.to(headerContent, {
        duration: 1.2,
        ease: Power4.easeOut,
        color: 'rgb(223, 86, 86)',
    });
    gsap.to(logoImg, {
        ease: Power4.easeOut,
        display: 'none',
        onComplete: () => {
            gsap.to(logoImgInview, {
                duration: 1,
                ease: Power4.easeOut,
                display: 'block',
                y: 0,
            });
        }
    });
}

function headerBgHide() {
    gsap.to(header, {
        duration: 1.2,
        ease: Power4.easeOut,
        backgroundColor: 'transparent',
        boxShadow: 'none',
    });
    gsap.to(headerContent, {
        duration: 1.2,
        ease: Power4.easeOut,
        color: '#fff',
    });
    gsap.to(logoImgInview, {
        display: 'none',
        onComplete: () => {
            gsap.to(logoImg, {
                duration: 1,
                ease: Power4.easeOut,
                display: 'block',
                y: 0,
            });
        }
    });
}
/////////////////////////////// header /////////////////////////////////////

// KVのフェードイン
const kvText = document.querySelector(".kv-text_content");
gsap.set(kvText, {
    y: 40,
    opacity: 0,
})
function kvShow(){
    gsap.to(kvText, 3, {
        y: 0,
        delay: 2,
        ease: Power2.easeOut,
        opacity: 1,
    });
}

// KVのスライド
function KVinit(){
    const kvSwiper = new Swiper('.kv-swiper-container', {
        // Optional parameters
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

// IntersectionObserver
function contentshow(e){
    gsap.to(e, {
        duration: 1,
        opacity: 1,
        delay: .5,
        ease: Power1.easeOut,
        y: -20,
    })
}
const targets = document.querySelectorAll('.js-scroll')
const callback = function(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            // console.log('inview');
            contentshow(entry.target);
            observer.unobserve(entry.target);
        } else {
            //
        }
    });
}
const options = {
    root: null, // 交差対象の親を指定
    rootMargin: "0px", // 交差点の指定
    threshold: 0, // 交差対象の発火場所
}
const observer = new IntersectionObserver(callback, options); 
targets.forEach((target) => observer.observe(target));


// 全ページ数のセット
const allSlides = document.querySelector('.all-page-number');
const slides = document.querySelectorAll(".js-carousel");
const slideBox = [];
slides.forEach(slide => {
    slideBox.push(slide);
});
function setCarousel(){
    allSlides.textContent = slideBox.length;
};
setCarousel();

let currentPageNumber = 0;
let currentSlides = document.querySelector('.current-page-number');
currentSlides.textContent = 1;
// コンテンツ2 カルーセル
const Carousel = new Swiper('.swiper-container', {
    // Optional parameters
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
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        slideChange: () => {
            if(currentPageNumber !== Carousel.realIndex){
                currentPageNumber = Carousel.realIndex;
            }
            currentSlides.textContent = currentPageNumber + 1;
        }
    }
});



/////////////////////////////////////// Accordion ////////////////////////////////////////////

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
})
}
acoInit();
    
/////////////////////////////////////// Accordion ///////////////////////////////


/////////////////////////////////////// WebGL ///////////////////////////////////
    // サイズの指定
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
/////////////////////////////////////// WebGL ///////////////////////////////////





window.addEventListener('load', () => {
    headerShow();
    kvShow();
    KVinit();
    webglinit();
});

// mouse stalker
// const stalker = document.getElementById("mouse-stalker");
// document.addEventListener('mousemove', function(e){
//     stalker.style.transform= 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
// });

//   ヘッダーのフェードイン
const siteTitle = document.querySelector(".header-title");
function headerShow(){
    gsap.to(siteTitle, 3, {
        y: 0,
        delay: 1,
        ease: Power4.easeOut,
        opacity: 1,
    });
}

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

class Accordion {
    constructor(el){
        this.el = el;
        this.trigger = document.querySelector(".js-trigger");
        this.draw = document.querySelector(".js-draw");
        this.icon = document.querySelector(".accordion-trigger_icon");
        this.isOpen = false;
    }
    _init(){
        gsap.set(this.draw, {
             height: 0,
             opacity: 0,
        });
        trigger.addEventListener('click', () => {
            if(!isOpen){
                this._open();
            } else {
                this._close();
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
        this.rigger.classList.add('open');
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
const accordion = new Accordion();

function webglinit() {

    // サイズを指定
    const width = 1080;
    const height = 500;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#webglCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    // 箱を作成
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      box.rotation.y += 0.01;
      renderer.render(scene, camera); // レンダリング

      requestAnimationFrame(tick);
    }
}

const gui = new dat.GUI();
// const gui = new dat.GUI( { autoPlace: false } );
// gui.domElement.id = 'gui';
// const webGlContainer = document.querySelector('.webgl');
// console.log(webGlContainer);
// webGlContainer.appendChild('gui.domElement');

// パラメーターの設定。初期値を指定
class Parameters {
    constructor() {
        this.message = 'sample';
        this.angle = 0;
        this.isVisible = true;
        this.color = 'red';
        this.width = 0;
        this.height = 0;
    }
};

// パラメーターのインスタンスを作成し、GUIに追加
const param = new Parameters();
gui.add(param, 'message');
gui.add(param, 'angle');
gui.add(param, 'color');
gui.add(param, 'isVisible');
gui.add(param, 'width', 0, 100, 1);
gui.add(param, 'height', 0, 100, 1);





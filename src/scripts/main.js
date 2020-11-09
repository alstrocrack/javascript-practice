window.addEventListener('load', () => {
    headerShow();
    kvShow();
    KVinit();
});

// mouse stalker
// const stalker = document.getElementById("mouse-stalker");
// document.addEventListener('mousemove', function(e){
//     stalker.style.transform= 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
// })

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

// メニューのホバー
const headerMenu = document.querySelectorAll('.js-hover');
headerMenu.forEach(e => {
    e.addEventListener('mouseover', () => {
        gsap.to(e, {
            color: '#87cefa',
            duration: 0.3,
            ease: Power4.easeIn,
            onStart: () => {
                e.innerHTML = "click";
            }
        });
    });
    e.addEventListener('mouseleave', () => {
        gsap.to(e, {
            color: '#df5656',
            duration: 0.3,
            ease: Power4.easeIn,
            onStart: () => {
                e.innerHTML = "reverse";
            }
        });
    });
    console.log(e);
});


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
        effect: 'coverflow',
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


const pageList = [];
pageList.push();
let currentPageNumber = 0;
// コンテンツ2 カルーセル
const Carousel = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 600,
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
        }
    }
});

console.log(Carousel.realIndex);






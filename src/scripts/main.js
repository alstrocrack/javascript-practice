window.addEventListener('load', () => {
    headerShow();
    kvShow();
    KVinit();
  });

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



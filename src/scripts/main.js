window.addEventListener('load', () => {
    headerShow();
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
            duration: 0.5,
            ease: Power4.easeIn,
            onStart: () => {
                e.innerHTML = "click";
            }
        });
    });
    e.addEventListener('mouseleave', () => {
        gsap.to(e, {
            color: '#df5656',
            duration: 0.8,
            ease: Power4.easeIn,
            onStart: () => {
                e.innerHTML = "reverse";
            }
        });
    });
    console.log(e);
});




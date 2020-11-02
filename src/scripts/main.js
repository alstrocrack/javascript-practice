window.addEventListener('load', () => {
    // console.log('ページが完全に読み込まれました');
    headerShow();
  });

const siteTitle = document.querySelector(".header-title");
function headerShow(){
    gsap.to(siteTitle, 3, {
        y: 0,
        ease: Power4.easeOut,
        opacity: 1,
    });
}
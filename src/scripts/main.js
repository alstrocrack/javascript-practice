window.addEventListener('load', () => {
    console.log('ページが完全に読み込まれました');
  });

const btn = document.querySelector(".btn");
btn.addEventListener('click', () => {
    gsap.to(btn, .3, {
        scale: 3,
    })
})
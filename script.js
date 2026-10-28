gsap.registerPlugin(ScrollTrigger);

// 1. حركة دخول النصوص
gsap.from(".hero-top-text", { y: -20, opacity: 0, duration: 1, delay: 0.2 });
gsap.from(".hero-title", { x: 50, opacity: 0, duration: 1, delay: 0.4 });
gsap.from(".hero-subtitle", { x: 50, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".cta-button", { x: 50, opacity: 0, duration: 1, delay: 0.8 });

// 2. حركة الماوس واللمس
const heroVisual = document.querySelector('.hero-visual');
const phoneContainer = document.querySelector('.phone-container');
const glowEffect = document.querySelector('.glow-effect');

function handleMove(x, y) {
    let xAxis = (window.innerWidth / 2 - x) / 30;
    let yAxis = (window.innerHeight / 2 - y) / 30;
    phoneContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    glowEffect.style.transform = `translate(${-xAxis * 2}px, ${-yAxis * 2}px)`;
}

heroVisual.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
heroVisual.addEventListener('mouseleave', () => {
    phoneContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
    phoneContainer.style.transition = "transform 0.5s ease";
});
heroVisual.addEventListener('mouseenter', () => {
    phoneContainer.style.transition = "transform 0.1s ease";
});

heroVisual.addEventListener('touchmove', (e) => {
    let touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
}, { passive: true });

heroVisual.addEventListener('touchend', () => {
    phoneContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
    phoneContainer.style.transition = "transform 0.5s ease";
});

// 3. تسلسل الهواتف الثلاثة عند التمرير (السر هنا)
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom top",
        scrub: 1.5, 
        pin: true, 
    }
});

// يختفي الآيفون ويظهر السامسونج
tl.to(".phone-1", { x: "-100%", opacity: 0, scale: 0.8, rotationY: -20, ease: "power2.inOut" })
  .to(".phone-2", { x: "0%", opacity: 1, scale: 1, rotationY: 0, ease: "power2.inOut" }, "<")

// يختفي السامسونج ويظهر البيكسل
  .to(".phone-2", { x: "-100%", opacity: 0, scale: 0.8, rotationY: -20, ease: "power2.inOut" })
  .to(".phone-3", { x: "0%", opacity: 1, scale: 1, rotationY: 0, ease: "power2.inOut" }, "<");
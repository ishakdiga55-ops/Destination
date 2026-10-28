// تسجيل مكتبة الحركة
gsap.registerPlugin(ScrollTrigger);

// 1. حركة دخول العناصر
gsap.from(".hero-top-text", { y: -20, opacity: 0, duration: 1, delay: 0.2 });
gsap.from(".hero-title", { x: 50, opacity: 0, duration: 1, delay: 0.4 });
gsap.from(".hero-subtitle", { x: 50, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".cta-button", { x: 50, opacity: 0, duration: 1, delay: 0.8 });
gsap.from(".hero-image", { scale: 0.8, opacity: 0, duration: 1.5, delay: 0.5, ease: "power3.out" });

// 2. حركة تفاعلية (تعمل بالماوس على الكمبيوتر، وباللمس على الجوال)
const heroVisual = document.querySelector('.hero-visual');
const imageWrapper = document.querySelector('.image-wrapper');
const glowEffect = document.querySelector('.glow-effect');

function handleMove(x, y) {
    // حساب المسافة
    let xAxis = (window.innerWidth / 2 - x) / 25;
    let yAxis = (window.innerHeight / 2 - y) / 25;

    // تحريك الهاتف
    imageWrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    // تحريك التوهج
    glowEffect.style.transform = `translate(${-xAxis * 2}px, ${-yAxis * 2}px)`;
}

// للكمبيوتر (حركة الماوس)
heroVisual.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
heroVisual.addEventListener('mouseleave', () => {
    imageWrapper.style.transform = `rotateY(0deg) rotateX(0deg)`;
    glowEffect.style.transform = `translate(0px, 0px)`;
    imageWrapper.style.transition = "transform 0.5s ease";
});
heroVisual.addEventListener('mouseenter', () => {
    imageWrapper.style.transition = "transform 0.1s ease";
});

// للهاتف (حركة اللمس)
heroVisual.addEventListener('touchmove', (e) => {
    let touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
}, { passive: true });

heroVisual.addEventListener('touchend', () => {
    imageWrapper.style.transform = `rotateY(0deg) rotateX(0deg)`;
    glowEffect.style.transform = `translate(0px, 0px)`;
    imageWrapper.style.transition = "transform 0.5s ease";
});

// 3. حركة سينمائية عند التمرير (الهاتف يكبر ويتحرك مع النزول)
gsap.to(".hero-image", {
    scale: 1.2,
    y: -50,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});
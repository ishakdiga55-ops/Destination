// تسجيل مكتبة الحركة
gsap.registerPlugin(ScrollTrigger);

// 1. حركة دخول العناصر
gsap.from(".hero-top-text", { y: -20, opacity: 0, duration: 1, delay: 0.2 });
gsap.from(".hero-title", { x: 50, opacity: 0, duration: 1, delay: 0.4 });
gsap.from(".hero-subtitle", { x: 50, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".cta-button", { x: 50, opacity: 0, duration: 1, delay: 0.8 });
gsap.from(".hero-image", { scale: 0.8, opacity: 0, duration: 1.5, delay: 0.5, ease: "power3.out" });

// 2. حركة الماوس التفاعلية (3D Tilt) - تعمل فقط على الكمبيوتر
if(window.innerWidth > 768) {
    const heroVisual = document.querySelector('.hero-visual');
    const imageWrapper = document.querySelector('.image-wrapper');
    const glowEffect = document.querySelector('.glow-effect');

    heroVisual.addEventListener('mousemove', (e) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 20;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 20;

        imageWrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        glowEffect.style.transform = `translate(${-xAxis * 2}px, ${-yAxis * 2}px)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
        imageWrapper.style.transform = `rotateY(0deg) rotateX(0deg)`;
        glowEffect.style.transform = `translate(0px, 0px)`;
        imageWrapper.style.transition = "transform 0.5s ease";
    });

    heroVisual.addEventListener('mouseenter', () => {
        imageWrapper.style.transition = "transform 0.1s ease";
    });
}
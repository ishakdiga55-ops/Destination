gsap.registerPlugin(ScrollTrigger);

// 1. إخفاء جميع الهواتف ما عدا الأول في البداية
gsap.set(".phone", { 
    left: "50%", 
    top: "50%", 
    xPercent: -50, 
    yPercent: -50,
    position: "absolute"
});
gsap.set(".phone-2, .phone-3, .phone-4, .phone-5", { opacity: 0 });

// 2. حركة النصوص
gsap.from(".hero-top-text", { y: -20, opacity: 0, duration: 1, delay: 0.2 });
gsap.from(".hero-title", { x: 50, opacity: 0, duration: 1, delay: 0.4 });
gsap.from(".hero-subtitle", { x: 50, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".cta-button", { x: 50, opacity: 0, duration: 1, delay: 0.8 });

// 3. حركة التبديل بين الهواتف
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, 
        pin: true, 
    }
});

// التبديل: يختفي الأول، يظهر الثاني... وهكذا
tl.to(".phone-1", { opacity: 0, scale: 0.8 })
  .to(".phone-2", { opacity: 1, scale: 1 }, "<")
  
  .to(".phone-2", { opacity: 0, scale: 0.8 })
  .to(".phone-3", { opacity: 1, scale: 1 }, "<")
  
  .to(".phone-3", { opacity: 0, scale: 0.8 })
  .to(".phone-4", { opacity: 1, scale: 1 }, "<")
  
  .to(".phone-4", { opacity: 0, scale: 0.8 })
  .to(".phone-5", { opacity: 1, scale: 1 }, "<");
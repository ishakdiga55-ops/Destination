gsap.registerPlugin(ScrollTrigger);

// 1. حركة دخول النصوص
gsap.from(".hero-top-text", { y: -20, opacity: 0, duration: 1, delay: 0.2 });
gsap.from(".hero-title", { x: 50, opacity: 0, duration: 1, delay: 0.4 });
gsap.from(".hero-subtitle", { x: 50, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".cta-button", { x: 50, opacity: 0, duration: 1, delay: 0.8 });

// 2. فصل الحركات (كمبيوتر vs جوال)
let mm = gsap.matchMedia();

// 🖥️ حركة الكمبيوتر (سينمائية)
mm.add("(min-width: 769px)", () => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom top",
            scrub: 1.5, 
            pin: true, 
        }
    });

    // تسلسل الهواتف الخمسة
    tl.to(".phone-1", { x: "-100%", opacity: 0, scale: 0.8, rotationY: -20 })
      .to(".phone-2", { x: "0%", opacity: 1, scale: 1, rotationY: 0 }, "<")
      .to(".phone-2", { x: "-100%", opacity: 0, scale: 0.8, rotationY: -20ح })
      .to(".phone-3", { x: "0%", opacity: 1, scale: 1, rotationY: 0 }, "<")
      .to(".phone-3", { x: "-100%", opacity: 0, scale: 0.8, rotationY: -20 })
      .to(".phone-4", { x: "0%", opacity: 1, scale: 1, rotationY: 0 }, "<")
      .to(".phone-4", { x: "-100%", opacity: 0, scale: 0.8, rotationY: -20 })
      .to(".phone-5", { x: "0%", opacity: 1, scale: 1, rotationY: 0 }, "<");
});

// 📱 حركة الجوال (بسيطة وآمنة بدون تثبيت)
mm.add("(max-width: 768px)", () => {
    // إظهار الهاتف الأول فقط عند الفتح
    gsap.from(".phone-1", { scale: 0.8, opacity: 0, duration: 1, delay: 0.5 });
    
    // (اختياري) تبديل بسيط للهواتف عند التمرير بدون تثبيت الشاشة
    let mobileTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
    mobileTl.to(".phone-1", { opacity: 0, duration: 1 }, "+=1")
            .to(".phone-2", { opacity: 1, scale: 1, duration: 1 }, "<");
});

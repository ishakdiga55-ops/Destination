gsap.registerPlugin(ScrollTrigger);

// 1. الأمر السحري: إجبار جميع الهواتف على التمركز في المنتصف بالقوة
gsap.set(".phone", { 
    left: "50%", 
    top: "50%", 
    xPercent: -50, 
    yPercent: -50,
    position: "absolute"
});

// 2. حركة دخول النصوص
gsap.from(".hero-top-text", { y: -20, opacity: 0, duration: 1, delay: 0.2 });
gsap.from(".hero-title", { x: 50, opacity: 0, duration: 1, delay: 0.4 });
gsap.from(".hero-subtitle", { x: 50, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".cta-button", { x: 50, opacity: 0, duration: 1, delay: 0.8 });

let mm = gsap.matchMedia();

// 🖥️ حركة الكمبيوتر (ف تخرج من اليسار وتدخل من اليمين)
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

    // إخفاء الهواتف 2 إلى 5 مبدئياً
    gsap.set(".phone-2, .phone-3, .phone-4, .phone-5", { xPercent: 150, opacity: 0, scale: 0.8 });

    tl.to(".phone-1", { xPercent: -150, opacity: 0, scale: 0.8, rotationY: -20 })
      .to(".phone-2", { xPercent: -50, opacity: 1, scale: 1, rotationY: 0 }, "<")
      .to(".phone-2", { xPercent: -150, opacity: 0, scale: 0.8, rotationY: -20 })
      .to(".phone-3", { xPercent: -50, opacity: 1, scale: 1, rotationY: 0 }, "<")
      .to(".phone-3", { xPercent: -150, opacity: 0, scale: 0.8, rotationY: -20 })
      .to(".phone-4", { xPercent: -50, opacity: 1, scale: 1, rotationY: 0 }, "<")
      .to(".phone-4", { xPercent: -150, opacity: 0, scale: 0.8, rotationY: -20 })
      .to(".phone-5", { xPercent: -50, opacity: 1, scale: 1, rotationY: 0 }, "<");
});

// 📱 حركة الجوال (الهواتف تظهر وتختفي في المنتصف بدون أن تتحرك يميناً أو يساراً)
mm.add("(max-width: 768px)", () => {
    
    // إخفاء الهواتف 2 إلى 5 مبدئياً (بدون تحريكهم لليمين)
    gsap.set(".phone-2, .phone-3, .phone-4, .phone-5", { opacity: 0, scale: 0.8 });

    let mobileTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom top",
            scrub: 1.5, 
            pin: true, 
        }
    });

    // التحكم فقط بالشفافية والحجم (الـ xPercent يبقى -50 ليظل في المنتصف)
    mobileTl.to(".phone-1", { opacity: 0, scale: 0.8 })
            .to(".phone-2", { opacity: 1, scale: 1 }, "<")
            .to(".phone-2", { opacity: 0, scale: 0.8 })
            .to(".phone-3", { opacity: 1, scale: 1 }, "<")
            .to(".phone-3", { opacity: 0, scale: 0.8 })
            .to(".phone-4", { opacity: 1, scale: 1 }, "<")
            .to(".phone-4", { opacity: 0, scale: 0.8 })
            .to(".phone-5", { opacity: 1, scale: 1 }, "<");
});
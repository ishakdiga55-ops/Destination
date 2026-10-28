gsap.registerPlugin(ScrollTrigger);

// 1. توسيط جميع الهواتف في المنتصف
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

// 🖥️ حركة الكمبيوتر (تأثير العمق 3D)
mm.add("(min-width: 769px)", () => {
    
    // إعداد الهواتف المخفية (تكون في الخلف وصغيرة)
    gsap.set(".phone-2, .phone-3, .phone-4, .phone-5", { z: -500, opacity: 0, scale: 0.6 });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom top",
            scrub: 1.5, 
            pin: true, 
        }
    });

    // الهاتف الأول يبتعد للخلف، والثاني يقترب للأمام
    tl.to(".phone-1", { z: 300, opacity: 0, scale: 1.2, rotationY: 15 })
      .to(".phone-2", { z: 0, opacity: 1, scale: 1 }, "<")
      .to(".phone-2", { z: 300, opacity: 0, scale: 1.2, rotationY: 15 })
      .to(".phone-3", { z: 0, opacity: 1, scale: 1 }, "<")
      .to(".phone-3", { z: 300, opacity: 0, scale: 1.2, rotationY: 15 })
      .to(".phone-4", { z: 0, opacity: 1, scale: 1 }, "<")
      .to(".phone-4", { z: 300, opacity: 0, scale: 1.2, rotationY: 15 })
      .to(".phone-5", { z: 0, opacity: 1, scale: 1 }, "<");
});

// 📱 حركة الجوال (تأثير الخروج من الهاتف)
mm.add("(max-width: 768px)", () => {
    
    // إعداد الهواتف المخفية (تكون في الخلف وصغيرة جداً)
    gsap.set(".phone-2, .phone-3, .phone-4, .phone-5", { scale: 0.4, opacity: 0, y: 50 });
    gsap.set(".phone-1", { zIndex: 10 }); // الأول في المقدمة

    let mobileTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom top",
            scrub: 1.5, 
            pin: true, 
        }
    });

    // الهاتف الأول ينزل للأسفل ويختفي، والثاني يكبر ويصعد للمنتصف
    mobileTl.to(".phone-1", { y: 150, opacity: 0, scale: 0.8, zIndex: 0 })
            .to(".phone-2", { scale: 1, opacity: 1, y: 0, zIndex: 10 }, "<")
            
            .to(".phone-2", { y: 150, opacity: 0, scale: 0.8, zIndex: 0 })
            .to(".phone-3", { scale: 1, opacity: 1, y: 0, zIndex: 10 }, "<")
            
            .to(".phone-3", { y: 150, opacity: 0, scale: 0.8, zIndex: 0 })
            .to(".phone-4", { scale: 1, opacity: 1, y: 0, zIndex: 10 }, "<")
            
            .to(".phone-4", { y: 150, opacity: 0, scale: 0.8, zIndex: 0 })
            .to(".phone-5", { scale: 1, opacity: 1, y: 0, zIndex: 10 }, "<");
});
gsap.registerPlugin(ScrollTrigger);

gsap.set(".phone", { 
    left: "50%", 
    top: "50%", 
    xPercent: -50, 
    yPercent: -50,
    position: "absolute"
});

gsap.from(".hero-top-text", { y: -20, opacity: 0, duration: 1, delay: 0.2 });
gsap.from(".hero-title", { x: 50, opacity: 0, duration: 1, delay: 0.4 });
gsap.from(".hero-subtitle", { x: 50, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".cta-button", { x: 50, opacity: 0, duration 0.8 });

let mm = gsap.matchMedia();

// 🖥️ حركة الكمبيوتر
mm.add("(min-width: 769px)", () => {
    gsap.set(".phone-2, .phone-3, .phone-4, .phone-5", { z: -500, opacity: 0, scale: 0.6 });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom bottom", /* تنتهي عند نهاية الحاوية */
            scrub: 1.5, 
            pin: true, 
        }
    });

    tl.to(".phone-1", { z: 300, opacity: 0, scale: 1.2, rotationY: 15 })
      .to(".phone-2", { z: 0, opacity: 1, scale: 1 }, "<")
      .to(".phone-2", { z: 300, opacity: 0, scale: 1.2, rotationY: 15 })
      .to(".phone-3", { z: 0, opacity: 1, scale: 1 }, "<")
      .to(".phone-3", { z: 300, opacity: 0, scale: 1.2, rotationY: 15 })
      .to(".phone-4", { z: 0, opacity: 1, scale: 1 }, "<")
      .to(".phone-4", { z: 300, opacity: 0, scale: 1.2, rotationY: 15 })
      .to(".phone-5", { z: 0, opacity: 1, scale: 1 }, "<");
});

// 📱 حركة الجوال
mm.add("(max-width: 768px)", () => {
    gsap.set(".phone-2, .phone-3, .phone-4, .phone-5", { scale: 0.4, opacity: 0, y: 50 });
    gsap.set(".phone-1", { zIndex: 10 });

    let mobileTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom bottom", /* تنتهي عند نهاية الحاوية */
            scrub: 1.5, 
            pin: true, 
        }
    });

    mobileTl.to(".phone-1", { y: 150, opacity: 0, scale: 0.8, zIndex: 0 })
            .to(".phone-2", { scale: 1, opacity: 1, y: 0, zIndex: 10 }, "<")
            
            .to(".phone-2", { y: 150, opacity: 0, scale: 0.8, zIndex: 0 })
            .to(".phone-3", { scale: 1, opacity: 1, y: 0, zIndex: 10 }, "<")
            
            .to(".phone-3", { y: 150, opacity: 0, scale: 0.8, zIndex: 0 })
            .to(".phone-4", { scale: 1, opacity: 1, y: 0, zIndex: 10 }, "<")
            
            .to(".phone-4", { y: 150, opacity: 0, scale: 0.8, zIndex: 0 })
            .to(".phone-5", { scale: 1, opacity: 1, y: 0, zIndex: 10 }, "<");
});
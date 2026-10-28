gsap.registerPlugin(ScrollTrigger);

// 1. إعدادات الحركة الأولية للنصوص عند تحميل الصفحة
gsap.from(".hero-top-text", { y: -20, opacity: 0, duration: 1, delay: 0.2 });
gsap.from(".hero-title", { x: 50, opacity: 0, duration: 1, delay: 0.4 });
gsap.from(".hero-subtitle", { x: 50, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".cta-button", { x: 50, opacity: 0, duration: 1, delay: 0.8 });

// 2. ربط حركة التمرير (Scrollytelling) بمجسم الـ 3D والواجهة
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, 
        pin: true, 
    }
});

// تأثير تفاعلي على عنصر الـ model-viewer أثناء التمرير (تحريك زاوية الرؤية أو الكاميرا للمجسم)
tl.to("model-viewer", {
    // جعل الهاتف يميل أو يتحرك ببطء مع التمرير لإعطاء طابع سينمائي
    cameraOrbit: "45deg 55deg 3m",
    scale: 1.1,
    duration: 2
})
.to("model-viewer", {
    cameraOrbit: "-45deg 75deg 2.5m",
    scale: 1.2,
    duration: 2
})
.to("model-viewer", {
    cameraOrbit: "0deg 90deg 2m",
    scale: 1,
    duration: 2
});

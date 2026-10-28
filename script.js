// التأكد من تحميل مكتبة GSAP والتمرير السلس
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-content", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });
}

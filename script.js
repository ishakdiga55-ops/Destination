// التأكد من تحميل مكتبة GSAP والتمرير السلس
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-content h2", {
        scrollTrigger: {
            trigger: ".hero-content",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
}

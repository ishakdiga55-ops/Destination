// التأكد من تحميل مكتبة GSAP والتمرير السلس
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // تحديد جميع الأقسام
    const sections = gsap.utils.toArray(".hero-section");

    // عمل حركة مستقلة لكل قسم
    sections.forEach(section => {
        const content = section.querySelector(".hero-content");
        
        if (content) {
            gsap.from(content, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", // يبدأ التأثير عندما يظهر القسم بنسبة 80% في الشاشة
                },
                y: 50, // يتحرك من الأسفل للأعلى
                opacity: 0, // يظهر تدريجياً
                duration: 1.2,
                ease: "power3.out"
            });
        }
    });
}

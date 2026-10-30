document.addEventListener('DOMContentLoaded', () => {
    
    // 1. حركات GSAP للنصوص والأزرار
    gsap.from("h1", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.2 });
    gsap.from("p", { opacity: 0, y: 30, duration: 1.5, ease: "power3.out", delay: 0.5 });
    gsap.from(".neon-btn", { opacity: 0, y: 20, duration: 1, ease: "back.out(1.7)", stagger: 0.2, delay: 0.8 });

    // 2. إعداد مشهد Three.js
    const container = document.getElementById('model-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 30);

    // الكاميرا
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);

    // الرندر (المحرك)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // 3. الإضاءة (Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x22ff88, 1.5);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const rimLight = new THREE.PointLight(0x00d9ff, 2, 15);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    // 4. الأرضية (Floor)
    const floorGeometry = new THREE.PlaneGeometry(30, 30);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.5, metalness: 0.8 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    floor.receiveShadow = true;
    scene.add(floor);

    // 5. تحميل مجسم الآيفون
    const loader = new THREE.GLTFLoader();
    let model;

    // ✅ تم تحديث اسم الملف هنا ليطابق مستودعك
    loader.load('./iphone-14-pro.glb', (gltf) => {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        
        // قد تحتاج لتعديل هذا الرقم (1.5) إذا كان الآيفون يظهر كبيراً جداً أو صغيراً جداً
        model.scale.set(1.5, 1.5, 1.5); 
        
        // تفعيل الظلال للمجسم
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        scene.add(model);
    }, undefined, (error) => {
        console.error('حدث خطأ أثناء تحميل المجسم:', error);
    });

    // 6. التحكم بالكاميرا (OrbitControls)
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 4;
    controls.maxDistance = 12;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; 
    
    // تفعيل التدوير التلقائي بسلاسة
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;

    // 7. التعامل مع تغيير حجم الشاشة (للموبايل والكمبيوتر)
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // 8. حلقة الأنيميشن (Animation Loop)
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // تحديث الكاميرا والحركة
        renderer.render(scene, camera);
    }
    animate();
});
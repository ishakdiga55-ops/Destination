gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("iphoneCanvas");

  // =========================
  // 3D MODEL SETUP
  // =========================
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);

  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 10;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;

  // Lights (ألوان بنفسجية ووردية)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x9d00ff, 2.0); // بنفسجي
  rimLight.position.set(-4, 1, -2);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0xff00ff, 1.5); // وردي
  fillLight.position.set(0, -2, 2);
  scene.add(fillLight);

  // Load GLB model
  const loader = new THREE.GLTFLoader();
  let model = null;

  loader.load(
    "./iphone-14-pro.glb",
    (gltf) => {
      model = gltf.scene;
      model.scale.set(0.9, 0.9, 0.9); 
      
      // دالة لجعل الآيفون يتحرك حسب حجم الشاشة
      updateModelPosition();
      
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
    }
  );

  // دالة ضبط مكان الآيفون
  function updateModelPosition() {
    if (!model) return;
    
    if (window.innerWidth > 1024) {
      // شاشة كمبيوتر: الآيفون على اليمين
      model.position.set(2.5, -0.5, 0);
    } else {
      // شاشة هاتف: الآيفون في المنتصف ومُنزل للأسفل ليترك مساحة للنص
      model.position.set(0, -1.5, 0);
    }
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Resize
  window.addEventListener("resize", () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // تحديث مكان الآيفون عند تغيير حجم الشاشة
    updateModelPosition();
  });

  // =========================
  // SCROLL ANIMATIONS
  // =========================
  gsap.utils.toArray(".section-kicker, .section-title, .feature-card, .spec-item, .pricing-card, footer").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Hero entrance
  gsap.from(".hero-copy > *", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out"
  });

  // CTA hover micro-interactions
  const ctas = document.querySelectorAll("a, button");
  ctas.forEach((el) => {
    el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.02, duration: 0.2 }));
    el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1, duration: 0.2 }));
  });

  // Color button active state
  const colorButtons = document.querySelectorAll(".color-btn");
  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      colorButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});
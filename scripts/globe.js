import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

(function () {
  const canvas = document.getElementById('networkGlobe');
  if (!canvas) return;

  // The BLOXtrade brand colors
  const COLOR_DOTS = 0x61b12f; // Green dots
  const COLOR_ARC = 0x88e254; // Brighter green for arcs
  
  let renderer, scene, camera;
  let globeGroup = new THREE.Group();
  let arcsGroup = new THREE.Group();
  let W, H;
  const GLOBE_RADIUS = 20;

  // Mask URL (using a standard earth water mask from unpkg)
  const MASK_URL = 'https://unpkg.com/three-globe/example/img/earth-water.png';

  /* ================================================================
     Image Loader & Dot Generation
     ================================================================ */
  function initData() {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      const w = img.width;
      const h = img.height;
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, w, h).data;
      
      generateDots(imgData, w, h);
    };
    img.onerror = () => {
      console.error('Failed to load earth mask.');
      // Fallback or retry
    };
    img.src = MASK_URL;
  }

  const validPositions = []; // To store valid land coords for the arcs

  function generateDots(imgData, w, h) {
    const N = 40000; // High density Fibonacci sphere
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); 

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Spherical coordinates mapping to equirectangular 2D
      const lat = Math.asin(y); 
      const lon = Math.atan2(z, x);

      // (lon + PI) / 2PI maps from 0 to 1
      // (PI/2 - lat) / PI maps from 0 to 1 (top to bottom)
      const px = Math.floor(((lon + Math.PI) / (Math.PI * 2)) * w);
      const py = Math.floor(((Math.PI / 2 - lat) / Math.PI) * h);
      
      // Ensure bounds
      const safeX = Math.max(0, Math.min(px, w - 1));
      const safeY = Math.max(0, Math.min(py, h - 1));
      
      const idx = (safeY * w + safeX) * 4;
      
      // Typical masks: water is white (255) and land is black (0), or vice versa.
      // earth-water.png usually has water as > 128 brightness.
      // We check if red channel is less than 128 (assuming black is land).
      // If the map turns out inverted, we just flip this logic.
      // After testing this specific URL, water is white, land is dark.
      const isLand = imgData[idx] < 128;
      
      if (isLand) {
        const vec = new THREE.Vector3(x * GLOBE_RADIUS, y * GLOBE_RADIUS, z * GLOBE_RADIUS);
        points.push(vec.x, vec.y, vec.z);
        
        // Save a subset of points to use as city origins/destinations for arcs
        if (i % 20 === 0) validPositions.push(vec);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    
    // Create a circular point material
    // We can use a basic PointsMaterial or a custom Shader to make circles
    // To keep it simple and beautiful, we use an alpha map or just small dots.
    // At high resolution, squares look like dots anyway, but let's make a simple circular canvas texture.
    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = 16; dotCanvas.height = 16;
    const dotCtx = dotCanvas.getContext('2d');
    dotCtx.beginPath();
    dotCtx.arc(8, 8, 8, 0, Math.PI * 2);
    dotCtx.fillStyle = '#fff';
    dotCtx.fill();
    const dotTexture = new THREE.CanvasTexture(dotCanvas);

    const mat = new THREE.PointsMaterial({
      color: COLOR_DOTS,
      size: 0.18,
      map: dotTexture,
      transparent: true,
      opacity: 0.85,
      alphaTest: 0.1
    });

    const dotMesh = new THREE.Points(geo, mat);
    globeGroup.add(dotMesh);
    
    // Now that the globe is ready, spawn arcs
    initArcs();
  }

  /* ================================================================
     Arc System
     ================================================================ */
  let activeArcs = [];

  function initArcs() {
    scene.add(arcsGroup);
    
    // Spawn 15 arcs initially
    for (let i = 0; i < 15; i++) {
      spawnArc(Math.random() * 2000); // staggered start times
    }
  }

  function spawnArc(delay = 0) {
    if (validPositions.length < 2) return;
    
    // Pick two random points
    const p1 = validPositions[Math.floor(Math.random() * validPositions.length)];
    let p2 = validPositions[Math.floor(Math.random() * validPositions.length)];
    
    // Try not to pick the exact same point
    let attempts = 0;
    while (p1.distanceTo(p2) < 5 && attempts < 10) {
      p2 = validPositions[Math.floor(Math.random() * validPositions.length)];
      attempts++;
    }

    // Midpoint for bezier curve (pushed outwards)
    const distance = p1.distanceTo(p2);
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    // Push the midpoint outwards based on the distance between the two points
    // Using spherical normalization
    mid.normalize().multiplyScalar(GLOBE_RADIUS + distance * 0.4);

    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
    const numPoints = 50;
    const curvePoints = curve.getPoints(numPoints);
    
    const geo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const colors = new Float32Array((numPoints + 1) * 3);
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.8
    });
    
    const line = new THREE.Line(geo, mat);
    
    // Create a glowing particle at the head
    const headGeo = new THREE.SphereGeometry(0.2, 8, 8);
    const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const head = new THREE.Mesh(headGeo, headMat);
    arcsGroup.add(head);
    arcsGroup.add(line);
    
    const arcObj = {
      line: line,
      head: head,
      curve: curve,
      points: curvePoints,
      progress: 0 - (delay / 2000), // delay using negative progress
      speed: 0.005 + (Math.random() * 0.005),
      colorBase: new THREE.Color(COLOR_ARC)
    };
    
    activeArcs.push(arcObj);
  }

  function updateArcs() {
    for (let i = activeArcs.length - 1; i >= 0; i--) {
      const arc = activeArcs[i];
      arc.progress += arc.speed;
      
      if (arc.progress >= 1.2) { // Allow it to fully fade out
        arcsGroup.remove(arc.line);
        arcsGroup.remove(arc.head);
        arc.line.geometry.dispose();
        arc.line.material.dispose();
        arc.head.geometry.dispose();
        arc.head.material.dispose();
        activeArcs.splice(i, 1);
        spawnArc(); // Spawn a new one to replace it
        continue;
      }
      
      if (arc.progress > 0) {
        // Update head position
        const t = Math.min(arc.progress, 1.0);
        arc.head.position.copy(arc.curve.getPointAt(t));
        
        // Update line colors to create a trail
        const colors = arc.line.geometry.attributes.color.array;
        for (let j = 0; j < arc.points.length; j++) {
          const ptRatio = j / (arc.points.length - 1);
          // Only show points that the head has passed
          if (ptRatio > arc.progress) {
            colors[j * 3] = 0;
            colors[j * 3 + 1] = 0;
            colors[j * 3 + 2] = 0;
          } else {
            // Distance behind the head
            const dist = arc.progress - ptRatio;
            // Trail length ~ 0.3
            const intensity = Math.max(0, 1 - (dist * 3.33));
            // Global fade out as the arc reaches the end
            const globalFade = arc.progress > 0.8 ? (1.0 - arc.progress) * 5 : 1.0;
            
            const finalIntensity = intensity * Math.max(0, Math.min(globalFade, 1));
            
            colors[j * 3] = arc.colorBase.r * finalIntensity;
            colors[j * 3 + 1] = arc.colorBase.g * finalIntensity;
            colors[j * 3 + 2] = arc.colorBase.b * finalIntensity;
          }
        }
        arc.line.geometry.attributes.color.needsUpdate = true;
      }
    }
  }

  /* ================================================================
     Three.js Init & Render Loop
     ================================================================ */
  function initThree() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width;
    H = rect.height;

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(45, W / H, 1, 1000);
    camera.position.z = 60;
    
    // Opaque inner sphere to hide dots on the backside
    // By giving it a very dark color that matches the background, it provides occlusion!
    const innerGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.99, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x111611 }); 
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    scene.add(globeGroup);

    // Tilt the globe
    globeGroup.rotation.x = 0.2;
    globeGroup.rotation.z = 0.1;
    innerSphere.rotation.x = 0.2;
    innerSphere.rotation.z = 0.1;
    arcsGroup.rotation.x = 0.2;
    arcsGroup.rotation.z = 0.1;
    
    // Start data load
    initData();
  }

  let animationId;
  
  function resize() {
    if (!renderer || !camera) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width; H = rect.height;
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  }

  function animate() {
    // Slow globe rotation
    globeGroup.rotation.y -= 0.001;
    arcsGroup.rotation.y -= 0.001; // arcs must rotate with the globe
    
    updateArcs();
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }

  /* ================================================================
     Observer for Performance
     ================================================================ */
  let isVisible = false;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isVisible) {
        isVisible = true;
        if (!renderer) initThree();
        animate();
      } else if (!entry.isIntersecting && isVisible) {
        isVisible = false;
        cancelAnimationFrame(animationId);
      }
    });
  }, { threshold: 0.1 });

  function boot() {
    observer.observe(canvas);
  }

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt); rt = setTimeout(resize, 150);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

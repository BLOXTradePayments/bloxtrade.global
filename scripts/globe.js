import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

(function () {
  const canvas = document.getElementById('networkGlobe');
  if (!canvas) return;

  const COLOR_DOTS = 0x61b12f; // Green dots
  const COLOR_ARC = 0x88e254; // Brighter green for arcs
  
  let renderer, scene, camera;
  let mapGroup = new THREE.Group();
  let arcsGroup = new THREE.Group();
  let W, H;
  
  // Map dimensions in 3D space
  const MAP_WIDTH = 40;
  const MAP_HEIGHT = 20;

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
      
      generateFlatMap(imgData, w, h);
    };
    img.onerror = () => {
      console.error('Failed to load earth mask.');
    };
    img.src = MASK_URL;
  }

  const validPositions = []; // To store valid land coords for the arcs

  function generateFlatMap(imgData, w, h) {
    const points = [];
    
    // Grid density (sample every N pixels)
    // Adjust GRID_SIZE based on image width to get around 150-180 columns for a nice dot look
    let GRID_SIZE = Math.round(w / 160);
    if (GRID_SIZE < 1) GRID_SIZE = 1;

    for (let py = 0; py < h; py += GRID_SIZE) {
      for (let px = 0; px < w; px += GRID_SIZE) {
        
        const idx = (py * w + px) * 4;
        
        // Handling both transparent maps and white/black maps
        // If image has transparency, use alpha. Otherwise, check brightness (red channel).
        const alpha = imgData[idx + 3];
        const red = imgData[idx];
        
        let isLand = false;
        if (alpha < 10) {
          // It's completely transparent, so it's not land (assuming land is opaque)
          isLand = false;
        } else {
          // If the image is opaque, usually water is white and land is black in earth-water maps
          // Or water is black and land is white.
          // Let's assume darker pixels are land (typical for earth-water).
          // If it turns out inverted, we could flip it, but most earth masks use dark for land or bright for land.
          // In 'earth-water.png', water is white (255) and land is black (0).
          isLand = red < 128;
        }
        
        if (isLand) {
          // Map to 3D plane coordinates (-width/2 to width/2)
          const x = (px / w - 0.5) * MAP_WIDTH;
          const y = -(py / h - 0.5) * MAP_HEIGHT; 
          const z = 0;
          
          const vec = new THREE.Vector3(x, y, z);
          points.push(vec.x, vec.y, vec.z);
          
          // Save a subset for arcs (cities)
          if (Math.random() < 0.05) validPositions.push(vec);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    
    // Circular dot texture
    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = 16; dotCanvas.height = 16;
    const dotCtx = dotCanvas.getContext('2d');
    dotCtx.beginPath();
    dotCtx.arc(8, 8, 8, 0, Math.PI * 2);
    dotCtx.fillStyle = '#fff';
    dotCtx.fill();
    const dotTexture = new THREE.CanvasTexture(dotCanvas);

    // Calculate proper dot size so they don't overlap
    const columns = w / GRID_SIZE;
    const spacing = MAP_WIDTH / columns;
    const dotSize = spacing * 0.65; // 65% of the grid cell

    const mat = new THREE.PointsMaterial({
      color: COLOR_DOTS,
      size: dotSize,
      map: dotTexture,
      transparent: true,
      opacity: 0.85,
      alphaTest: 0.1
    });

    const dotMesh = new THREE.Points(geo, mat);
    mapGroup.add(dotMesh);
    
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
      spawnArc(Math.random() * 2000); 
    }
  }

  function spawnArc(delay = 0) {
    if (validPositions.length < 2) return;
    
    // Pick two random points on the map
    const p1 = validPositions[Math.floor(Math.random() * validPositions.length)];
    let p2 = validPositions[Math.floor(Math.random() * validPositions.length)];
    
    let attempts = 0;
    while (p1.distanceTo(p2) < 5 && attempts < 10) {
      p2 = validPositions[Math.floor(Math.random() * validPositions.length)];
      attempts++;
    }

    const distance = p1.distanceTo(p2);
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    
    // Push the midpoint OUT of the screen (Z axis) based on distance
    mid.z = distance * 0.4; 
    
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
    
    // Glowing particle at the head
    const headGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const head = new THREE.Mesh(headGeo, headMat);
    
    arcsGroup.add(head);
    arcsGroup.add(line);
    
    const arcObj = {
      line: line,
      head: head,
      curve: curve,
      points: curvePoints,
      progress: 0 - (delay / 2000), 
      speed: 0.005 + (Math.random() * 0.005),
      colorBase: new THREE.Color(COLOR_ARC)
    };
    
    activeArcs.push(arcObj);
  }

  function updateArcs() {
    for (let i = activeArcs.length - 1; i >= 0; i--) {
      const arc = activeArcs[i];
      arc.progress += arc.speed;
      
      if (arc.progress >= 1.2) { 
        arcsGroup.remove(arc.line);
        arcsGroup.remove(arc.head);
        arc.line.geometry.dispose();
        arc.line.material.dispose();
        arc.head.geometry.dispose();
        arc.head.material.dispose();
        activeArcs.splice(i, 1);
        spawnArc();
        continue;
      }
      
      if (arc.progress > 0) {
        const t = Math.min(arc.progress, 1.0);
        arc.head.position.copy(arc.curve.getPointAt(t));
        
        const colors = arc.line.geometry.attributes.color.array;
        for (let j = 0; j < arc.points.length; j++) {
          const ptRatio = j / (arc.points.length - 1);
          
          if (ptRatio > arc.progress) {
            colors[j * 3] = 0;
            colors[j * 3 + 1] = 0;
            colors[j * 3 + 2] = 0;
          } else {
            const dist = arc.progress - ptRatio;
            const intensity = Math.max(0, 1 - (dist * 3.33)); // Trail length
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
    
    // Adjust camera to fit the 40x20 map
    camera = new THREE.PerspectiveCamera(35, W / H, 1, 1000);
    camera.position.z = 35;
    
    // Add map and arcs to scene
    scene.add(mapGroup);
    scene.add(arcsGroup);

    // Subtle initial rotation to show it's 3D
    mapGroup.rotation.x = 0.15;
    arcsGroup.rotation.x = 0.15;
    
    initData();
  }

  let animationId;
  let time = 0;
  
  function resize() {
    if (!renderer || !camera) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width; H = rect.height;
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  }

  function animate() {
    time += 0.005;
    
    // Subtle floaty movement for the whole map
    mapGroup.rotation.y = Math.sin(time) * 0.05;
    arcsGroup.rotation.y = Math.sin(time) * 0.05;
    mapGroup.rotation.x = 0.15 + Math.cos(time * 0.8) * 0.02;
    arcsGroup.rotation.x = 0.15 + Math.cos(time * 0.8) * 0.02;
    
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

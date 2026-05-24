/**
 * Dotted Globe Visualization
 * A spinning 3D globe made of discrete dots representing continents, 
 * with dynamic blinking elements.
 */
(function () {
  const canvas = document.getElementById('networkGlobe');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  let W, H, CX, CY, R;
  let animationId;
  let time = 0;

  // Colors
  const ACCENT = { r: 97, g: 177, b: 47 };

  // Globe rotation
  let rotY = -0.3;
  const rotSpeed = 0.001;

  // 64x22 World Map Mask
  const MAP_DATA = [
    "                                                                ",
    "                                                                ",
    "                                                                ",
    "          ...                                                   ",
    "         ......                                       ...       ",
    "        ........                                    .......     ",
    "       ..........             ...                  .........    ",
    "       ..........            .....                 ..........   ",
    "       ..........           .......               ...........  .",
    "        .........           .......               ........... ..",
    "         ........            .....                 .......... ..",
    "          ......                                   ..........   ",
    "           ....                                     .........   ",
    "            ..                                       .......    ",
    "            ..                                        .....     ",
    "             .                                         ...   .. ",
    "                                                        .   ... ",
    "                                                             .. ",
    "                                                                ",
    "                                                                ",
    "                                                                ",
    "                                                                ",
  ];

  function isLand(lat, lon) {
    const x = Math.floor(((lon + 180) / 360) * 64);
    const y = Math.floor(((90 - lat) / 180) * 22);
    if (y < 0 || y >= 22 || x < 0 || x >= 64) return false;
    return MAP_DATA[y][x] !== ' ';
  }

  // Dots array
  let dots = [];
  const TOTAL_SAMPLES = 2500; // Fibonacci sphere samples
  
  // Active blinking elements
  const activeHubs = [];
  const MAX_ACTIVE = 15;

  function initDots() {
    dots = [];
    const offset = 2 / TOTAL_SAMPLES;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < TOTAL_SAMPLES; i++) {
      const y = ((i * offset) - 1) + (offset / 2);
      const r = Math.sqrt(1 - Math.pow(y, 2));
      const phi = ((i + 1) % TOTAL_SAMPLES) * increment;

      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(z, x) * (180 / Math.PI);

      if (isLand(lat, lon)) {
        // Randomly drop a few dots for an organic look
        if (Math.random() > 0.1) {
          dots.push({ x, y, z, lat, lon });
        }
      }
    }
  }

  function assignActiveHubs() {
    activeHubs.length = 0;
    if (dots.length === 0) return;
    
    for (let i = 0; i < MAX_ACTIVE; i++) {
      const dotIdx = Math.floor(Math.random() * dots.length);
      activeHubs.push({
        idx: dotIdx,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        life: 100 + Math.random() * 200 // Frames until it changes
      });
    }
  }

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    CX = W / 2;
    CY = H / 2;
    R = Math.min(W, H) * 0.4;
  }

  // Rotate around Y axis
  function rotateY(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: p.x * cos - p.z * sin,
      y: p.y,
      z: p.x * sin + p.z * cos,
    };
  }

  // Tilt X axis slightly
  function rotateX(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: p.x,
      y: p.y * cos - p.z * sin,
      z: p.y * sin + p.z * cos,
    };
  }

  // Project 3D to 2D
  function project(p) {
    const perspective = 1200;
    const scale = perspective / (perspective + p.z);
    return {
      x: CX + p.x * scale,
      y: CY + p.y * scale,
      scale: scale,
      z: p.z,
    };
  }

  function drawGlobeOutline() {
    // Outer glow
    const gradient = ctx.createRadialGradient(CX, CY, R * 0.95, CX, CY, R * 1.15);
    gradient.addColorStop(0, `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, 0.05)`);
    gradient.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(CX, CY, R * 1.15, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Solid dark base to hide background dots
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(27, 36, 23, 0.95)';
    ctx.fill();
    
    // Very subtle border
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function drawDots() {
    const activeMap = new Map();
    activeHubs.forEach(hub => {
      activeMap.set(hub.idx, hub);
    });

    dots.forEach((dot, i) => {
      // Scale dot to radius
      let p = { x: dot.x * R, y: dot.y * R, z: dot.z * R };
      
      // Apply rotation
      p = rotateY(p, rotY);
      p = rotateX(p, 0.15);
      
      // Skip backside points
      if (p.z > R * 0.1) return;

      const proj = project(p);
      const vis = Math.max(0, 1 - p.z / (R * 0.6)); // Fade at edges
      if (vis <= 0) return;

      const isActive = activeMap.has(i);
      
      if (isActive) {
        const hub = activeMap.get(i);
        const pulse = (Math.sin(hub.phase) + 1) / 2; // 0 to 1
        const size = (1.5 + pulse * 2.5) * proj.scale;
        
        // Glow
        const glow = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, size * 4);
        glow.addColorStop(0, `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${0.8 * vis * pulse})`);
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${0.9 * vis})`;
        ctx.fill();
        
        // Center highlight
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * vis})`;
        ctx.fill();

      } else {
        // Normal dot
        const size = 1.2 * proj.scale;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * vis})`;
        ctx.fill();
      }
    });
  }

  function updateActiveHubs() {
    activeHubs.forEach(hub => {
      hub.phase += hub.speed;
      hub.life -= 1;
      
      if (hub.life <= 0) {
        // Replace this hub
        hub.idx = Math.floor(Math.random() * dots.length);
        hub.phase = 0;
        hub.speed = 0.02 + Math.random() * 0.03;
        hub.life = 100 + Math.random() * 200;
      }
    });
  }

  function animate() {
    time += 16;
    rotY += rotSpeed;

    ctx.clearRect(0, 0, W, H);

    drawGlobeOutline();
    drawDots();
    updateActiveHubs();

    animationId = requestAnimationFrame(animate);
  }

  let isVisible = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isVisible) {
        isVisible = true;
        animate();
      } else if (!entry.isIntersecting && isVisible) {
        isVisible = false;
        cancelAnimationFrame(animationId);
      }
    });
  }, { threshold: 0.1 });

  function init() {
    resize();
    initDots();
    assignActiveHubs();
    observer.observe(canvas);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
    }, 150);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

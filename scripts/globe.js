/**
 * Network Globe Visualization
 * Animated 3D-projected globe with financial hub nodes and flowing connections
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
  const ACCENT_STR = `rgb(${ACCENT.r},${ACCENT.g},${ACCENT.b})`;

  // Financial hubs: [lat, lon, label, importance(0-1)]
  const HUBS = [
    [-23.55, -46.63, 'São Paulo', 1.0],
    [40.71, -74.01, 'New York', 0.95],
    [51.51, -0.13, 'London', 0.9],
    [25.20, 55.27, 'Dubai', 0.7],
    [1.35, 103.82, 'Singapore', 0.8],
    [22.32, 114.17, 'Hong Kong', 0.75],
    [35.68, 139.69, 'Tokyo', 0.85],
    [-33.87, 151.21, 'Sydney', 0.6],
    [6.52, 3.38, 'Lagos', 0.55],
    [19.43, -99.13, 'Mexico City', 0.65],
  ];

  // Connections: [fromIndex, toIndex]
  const CONNECTIONS = [
    [0, 1], [0, 2], [0, 8], [0, 9],
    [1, 2], [1, 9],
    [2, 3], [2, 8],
    [3, 4], [3, 5],
    [4, 5], [4, 7],
    [5, 6],
    [6, 7],
    [1, 6],
    [2, 4],
  ];

  // Globe rotation
  let rotY = -0.3;
  const rotSpeed = 0.0008;

  // Particles traveling along arcs
  const particles = [];
  const PARTICLE_COUNT = 30;

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
    R = Math.min(W, H) * 0.38;
  }

  // Lat/Lon to 3D point on sphere
  function latLonTo3D(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return {
      x: -(radius * Math.sin(phi) * Math.cos(theta)),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta),
    };
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

  // Project 3D to 2D with perspective
  function project(p) {
    const perspective = 800;
    const scale = perspective / (perspective + p.z);
    return {
      x: CX + p.x * scale,
      y: CY + p.y * scale,
      scale: scale,
      z: p.z,
    };
  }

  // Get projected hub position
  function getHubPos(hubIndex) {
    const hub = HUBS[hubIndex];
    let p = latLonTo3D(hub[0], hub[1], R);
    p = rotateY(p, rotY);
    p = rotateX(p, 0.15);
    return project(p);
  }

  // Initialize particles
  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const connIdx = Math.floor(Math.random() * CONNECTIONS.length);
      particles.push({
        connIdx: connIdx,
        t: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
        size: 1.5 + Math.random() * 2,
        reverse: Math.random() > 0.5,
      });
    }
  }

  // Draw wireframe globe lines (latitude / longitude)
  function drawGlobeGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 0.5;

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 5) {
        let p = latLonTo3D(lat, lon, R);
        p = rotateY(p, rotY);
        p = rotateX(p, 0.15);
        const proj = project(p);
        // Only draw front-facing parts
        if (p.z < R * 0.2) {
          if (first) {
            ctx.moveTo(proj.x, proj.y);
            first = false;
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        } else {
          first = true;
        }
      }
      ctx.stroke();
    }

    // Longitude lines
    for (let lon = -180; lon < 180; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 90; lat += 5) {
        let p = latLonTo3D(lat, lon, R);
        p = rotateY(p, rotY);
        p = rotateX(p, 0.15);
        const proj = project(p);
        if (p.z < R * 0.2) {
          if (first) {
            ctx.moveTo(proj.x, proj.y);
            first = false;
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        } else {
          first = true;
        }
      }
      ctx.stroke();
    }
  }

  // Draw the globe outline circle with subtle glow
  function drawGlobeOutline() {
    // Outer glow
    const gradient = ctx.createRadialGradient(CX, CY, R * 0.95, CX, CY, R * 1.15);
    gradient.addColorStop(0, 'rgba(97, 177, 47, 0.06)');
    gradient.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(CX, CY, R * 1.15, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Circle outline
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw curved arc between two hubs
  function drawArc(fromIdx, toIdx, alpha) {
    const from = getHubPos(fromIdx);
    const to = getHubPos(toIdx);

    // Skip if both points are behind the globe
    const fromHub = HUBS[fromIdx];
    const toHub = HUBS[toIdx];
    let fp = latLonTo3D(fromHub[0], fromHub[1], R);
    fp = rotateY(fp, rotY);
    fp = rotateX(fp, 0.15);
    let tp = latLonTo3D(toHub[0], toHub[1], R);
    tp = rotateY(tp, rotY);
    tp = rotateX(tp, 0.15);

    if (fp.z > R * 0.3 && tp.z > R * 0.3) return;

    // Compute visibility factor for fade
    const fVis = Math.max(0, 1 - fp.z / (R * 0.5));
    const tVis = Math.max(0, 1 - tp.z / (R * 0.5));
    const vis = Math.min(fVis, tVis);
    if (vis <= 0) return;

    // Curved arc via quadratic bezier lifted above globe surface
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const lift = dist * 0.25;
    // Perpendicular offset toward center
    const nx = -(to.y - from.y) / dist;
    const ny = (to.x - from.x) / dist;
    // Determine which direction points more toward center
    const toCenter = (midX - CX) * nx + (midY - CY) * ny;
    const sign = toCenter > 0 ? -1 : 1;

    const cpX = midX + nx * lift * sign;
    const cpY = midY + ny * lift * sign;

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.quadraticCurveTo(cpX, cpY, to.x, to.y);
    ctx.strokeStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${0.12 * vis * alpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Get point along arc at parameter t (0-1)
  function getArcPoint(fromIdx, toIdx, t) {
    const from = getHubPos(fromIdx);
    const to = getHubPos(toIdx);

    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const lift = dist * 0.25;
    const nx = -(to.y - from.y) / dist;
    const ny = (to.x - from.x) / dist;
    const toCenter = (midX - CX) * nx + (midY - CY) * ny;
    const sign = toCenter > 0 ? -1 : 1;
    const cpX = midX + nx * lift * sign;
    const cpY = midY + ny * lift * sign;

    // Quadratic bezier formula
    const mt = 1 - t;
    return {
      x: mt * mt * from.x + 2 * mt * t * cpX + t * t * to.x,
      y: mt * mt * from.y + 2 * mt * t * cpY + t * t * to.y,
    };
  }

  // Draw nodes
  function drawNodes() {
    HUBS.forEach((hub, i) => {
      let p = latLonTo3D(hub[0], hub[1], R);
      p = rotateY(p, rotY);
      p = rotateX(p, 0.15);
      const proj = project(p);

      // Skip backside nodes
      if (p.z > R * 0.2) return;

      const vis = Math.max(0, 1 - p.z / (R * 0.5));
      const importance = hub[3];
      const pulse = 1 + 0.15 * Math.sin(time * 0.003 + i * 1.2);
      const baseSize = 3 + importance * 3;
      const size = baseSize * pulse * proj.scale;

      // Outer glow
      const glowGrad = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, size * 4);
      glowGrad.addColorStop(0, `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${0.2 * vis})`);
      glowGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, size * 4, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${0.9 * vis})`;
      ctx.fill();

      // White center
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * vis})`;
      ctx.fill();

      // Label
      if (vis > 0.5 && importance >= 0.7) {
        ctx.font = `${Math.round(10 * proj.scale)}px Inter, sans-serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * vis})`;
        ctx.textAlign = 'left';
        ctx.fillText(hub[2], proj.x + size + 6, proj.y + 3);
      }
    });
  }

  // Draw particles
  function drawParticles() {
    particles.forEach(p => {
      const conn = CONNECTIONS[p.connIdx];
      const fromHub = HUBS[conn[0]];
      const toHub = HUBS[conn[1]];

      // Check visibility
      let fp = latLonTo3D(fromHub[0], fromHub[1], R);
      fp = rotateY(fp, rotY);
      fp = rotateX(fp, 0.15);
      let tp = latLonTo3D(toHub[0], toHub[1], R);
      tp = rotateY(tp, rotY);
      tp = rotateX(tp, 0.15);

      if (fp.z > R * 0.3 && tp.z > R * 0.3) return;

      const fVis = Math.max(0, 1 - fp.z / (R * 0.5));
      const tVis = Math.max(0, 1 - tp.z / (R * 0.5));
      const vis = (fVis + tVis) / 2;
      if (vis <= 0.1) return;

      const t = p.reverse ? 1 - p.t : p.t;
      const pos = getArcPoint(conn[0], conn[1], t);

      // Particle glow
      const glowGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.size * 6);
      glowGrad.addColorStop(0, `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${0.4 * vis})`);
      glowGrad.addColorStop(0.5, `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${0.1 * vis})`);
      glowGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, p.size * 6, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Particle core
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * vis})`;
      ctx.fill();
    });
  }

  // Update particles
  function updateParticles() {
    particles.forEach(p => {
      p.t += p.speed;
      if (p.t >= 1) {
        p.t = 0;
        p.connIdx = Math.floor(Math.random() * CONNECTIONS.length);
        p.reverse = Math.random() > 0.5;
        p.speed = 0.002 + Math.random() * 0.004;
      }
    });
  }

  // Draw ambient floating dots (stars / background texture)
  function drawAmbientDots() {
    const count = 40;
    for (let i = 0; i < count; i++) {
      const seed = i * 137.508;
      const angle = seed + time * 0.0001;
      const dist = R * 1.2 + (i % 7) * 15 + Math.sin(time * 0.001 + i) * 8;
      const x = CX + Math.cos(angle) * dist;
      const y = CY + Math.sin(angle) * dist;
      const alpha = 0.08 + 0.06 * Math.sin(time * 0.002 + i * 0.5);
      const size = 0.5 + (i % 3) * 0.3;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }
  }

  function animate() {
    time += 16;
    rotY += rotSpeed;

    ctx.clearRect(0, 0, W, H);

    drawAmbientDots();
    drawGlobeOutline();
    drawGlobeGrid();

    // Draw connections
    CONNECTIONS.forEach(([from, to]) => {
      drawArc(from, to, 1);
    });

    drawParticles();
    drawNodes();
    updateParticles();

    animationId = requestAnimationFrame(animate);
  }

  // IntersectionObserver: only animate when visible
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
    initParticles();
    observer.observe(canvas);
  }

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
    }, 150);
  });

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

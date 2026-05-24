/**
 * Dotted Globe Visualization
 * Dense dot-matrix world map on a rotating 3D sphere.
 * Continents built from a 120x60 geographic grid with Fibonacci sphere sampling.
 */
(function () {
  const canvas = document.getElementById('networkGlobe');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  let W, H, CX, CY, R;
  let animationId;
  let time = 0;

  const ACCENT = { r: 97, g: 177, b: 47 };

  let rotation = -0.4;
  const ROT_SPEED = 0.0006;

  // ── Land grid: 120 cols × 60 rows (3° resolution) ──────────────────────
  // Col 0 = 180°W, Col 119 = 177°E  |  Row 0 = 90°N, Row 59 = 87°S
  // Each entry: [row, colStart, colEnd]
  const FILLS = [
    // Greenland
    [2,44,49],[3,43,51],[4,42,52],[5,41,52],[6,41,53],[7,42,52],[8,43,51],[9,44,49],[10,45,48],
    // Iceland
    [8,52,55],[9,53,55],
    // Canadian Arctic
    [3,18,22],[4,15,25],[5,14,28],[6,14,33],[7,14,37],[8,15,38],[9,16,38],[10,17,37],
    // Alaska
    [5,2,5],[6,2,6],[7,2,7],[8,2,7],[9,3,7],[10,3,6],
    // North America mainland
    [11,18,36],[12,18,35],[13,19,35],[14,19,34],[15,20,33],[16,21,33],[17,22,32],
    // Mexico + Central America
    [18,22,31],[19,23,30],[20,24,30],[21,25,30],[22,26,29],[23,27,29],[24,27,29],[25,28,29],
    // Caribbean
    [22,31,33],[23,31,33],
    // South America
    [26,30,36],[27,30,39],[28,31,41],[29,31,43],[30,32,45],[31,33,46],[32,33,47],[33,34,47],
    [34,34,47],[35,34,46],[36,35,46],[37,35,45],[38,35,44],[39,36,44],[40,36,43],[41,36,42],
    [42,37,41],[43,37,40],[44,37,40],[45,37,39],[46,37,39],[47,38,38],
    // UK + Ireland
    [10,57,60],[11,57,60],[12,58,60],
    // Scandinavia + Eurasia connected mass
    [5,70,100],[6,63,110],[7,62,115],[8,62,118],[9,62,116],[10,63,114],
    [11,62,112],[12,62,110],[13,62,108],[14,58,108],[15,58,105],[16,58,105],[17,58,107],
    // Africa + Eurasia below 36°N
    [18,55,63],[18,69,107],
    [19,55,106],
    [20,55,105],
    [21,55,78],[21,81,104],
    [22,55,77],[22,85,103],[22,104,105],
    [23,55,72],[23,87,101],[23,104,105],
    [24,55,73],[24,84,89],[24,93,101],
    [25,55,74],[25,85,89],[25,95,100],
    [26,55,75],[26,86,88],[26,96,99],
    [27,56,75],[27,97,99],
    // Africa body + Indonesia
    [28,56,74],[28,95,96],[28,99,106],
    [29,56,74],[29,100,107],
    [30,57,74],[30,101,108],
    [31,57,73],[31,102,110],
    [32,57,72],[32,103,111],
    [33,58,72],[33,104,109],[33,111,113],
    // Africa + Madagascar + Australia
    [34,58,71],[34,75,77],[34,100,111],
    [35,58,70],[35,75,77],[35,99,112],
    [36,59,69],[36,75,77],[36,98,112],
    [37,59,68],[37,98,112],
    [38,60,67],[38,99,111],
    [39,60,66],[39,99,111],
    [40,61,65],[40,100,110],
    [41,62,65],[41,100,110],[41,116,117],
    [42,63,64],[42,101,109],[42,116,118],
    [43,102,108],[43,109,110],[43,116,118],
    [44,104,107],[44,116,117],
    // Japan
    [15,108,110],[16,108,110],[17,108,109],[18,108,109],[19,108,109],
  ];

  const GW = 120, GH = 60;
  const grid = new Uint8Array(GW * GH);

  function buildGrid() {
    for (let i = 0; i < FILLS.length; i++) {
      const r = FILLS[i][0], s = FILLS[i][1], e = FILLS[i][2];
      for (let c = s; c <= e; c++) {
        if (r >= 0 && r < GH && c >= 0 && c < GW) {
          grid[r * GW + c] = 1;
        }
      }
    }
  }

  function isLand(lat, lon) {
    const col = Math.floor(((lon + 180) / 360) * GW);
    const row = Math.floor(((90 - lat) / 180) * GH);
    if (row < 0 || row >= GH || col < 0 || col >= GW) return false;
    return grid[row * GW + col] === 1;
  }

  // ── Generate dots via Fibonacci sphere ──────────────────────────────────
  const dots = [];
  const DOT_COUNT = 6000;

  function initDots() {
    dots.length = 0;
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < DOT_COUNT; i++) {
      const y = 1 - (i / (DOT_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(z, x) * (180 / Math.PI);

      if (isLand(lat, lon)) {
        dots.push({ x, y, z });
      }
    }
  }

  // ── Blinking active hubs ────────────────────────────────────────────────
  const hubs = [];
  const MAX_HUBS = 14;

  function initHubs() {
    hubs.length = 0;
    if (dots.length === 0) return;
    for (let i = 0; i < MAX_HUBS; i++) {
      hubs.push({
        idx: Math.floor(Math.random() * dots.length),
        phase: Math.random() * Math.PI * 2,
        speed: 0.012 + Math.random() * 0.02,
        life: 150 + Math.random() * 300,
      });
    }
  }

  // ── Canvas sizing ───────────────────────────────────────────────────────
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
    R = Math.min(W, H) * 0.42;
  }

  // ── 3D helpers ──────────────────────────────────────────────────────────
  function rY(p, a) {
    const c = Math.cos(a), s = Math.sin(a);
    return { x: p.x * c - p.z * s, y: p.y, z: p.x * s + p.z * c };
  }
  function rX(p, a) {
    const c = Math.cos(a), s = Math.sin(a);
    return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
  }
  function proj(p) {
    const d = 1200;
    const sc = d / (d + p.z);
    return { x: CX + p.x * sc, y: CY + p.y * sc, s: sc, z: p.z };
  }

  // ── Draw globe base ─────────────────────────────────────────────────────
  function drawBase() {
    // Atmosphere
    const atmo = ctx.createRadialGradient(CX, CY, R, CX, CY, R * 1.12);
    atmo.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.06)`);
    atmo.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(CX, CY, R * 1.12, 0, Math.PI * 2);
    ctx.fillStyle = atmo;
    ctx.fill();

    // Solid dark sphere (occludes back-face dots)
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(20, 28, 16, 0.95)';
    ctx.fill();

    // Subtle edge ring
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // ── Draw all dots ───────────────────────────────────────────────────────
  function drawDots() {
    const hubSet = new Set();
    const hubMap = {};
    hubs.forEach(h => { hubSet.add(h.idx); hubMap[h.idx] = h; });

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      let p = { x: dot.x * R, y: dot.y * R, z: dot.z * R };
      p = rY(p, rotation);
      p = rX(p, 0.15);

      // Back-face cull
      if (p.z > 0) continue;

      const pr = proj(p);
      // Smooth edge fade
      const vis = Math.min(1, (-p.z) / (R * 0.4));
      if (vis <= 0.05) continue;

      if (hubSet.has(i)) {
        // ── Active pulsing dot ──
        const h = hubMap[i];
        const pulse = (Math.sin(h.phase) + 1) * 0.5; // 0..1
        const sz = (1.2 + pulse * 2.2) * pr.s;

        // Glow halo
        if (pulse > 0.2) {
          const g = ctx.createRadialGradient(pr.x, pr.y, 0, pr.x, pr.y, sz * 5);
          g.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${0.5 * vis * pulse})`);
          g.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(pr.x, pr.y, sz * 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        // Green core
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${0.9 * vis})`;
        ctx.fill();

        // White highlight center
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, sz * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.85 * vis})`;
        ctx.fill();
      } else {
        // ── Normal continent dot ──
        const sz = 1.1 * pr.s;
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.3 * vis})`;
        ctx.fill();
      }
    }
  }

  // ── Update active hubs ──────────────────────────────────────────────────
  function updateHubs() {
    for (let i = 0; i < hubs.length; i++) {
      const h = hubs[i];
      h.phase += h.speed;
      h.life -= 1;
      if (h.life <= 0) {
        h.idx = Math.floor(Math.random() * dots.length);
        h.phase = 0;
        h.speed = 0.012 + Math.random() * 0.02;
        h.life = 150 + Math.random() * 300;
      }
    }
  }

  // ── Animation loop ──────────────────────────────────────────────────────
  function animate() {
    time += 16;
    rotation += ROT_SPEED;

    ctx.clearRect(0, 0, W, H);
    drawBase();
    drawDots();
    updateHubs();

    animationId = requestAnimationFrame(animate);
  }

  // ── Visibility observer (perf) ──────────────────────────────────────────
  let isVisible = false;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !isVisible) { isVisible = true; animate(); }
      else if (!e.isIntersecting && isVisible) { isVisible = false; cancelAnimationFrame(animationId); }
    });
  }, { threshold: 0.1 });

  function init() {
    resize();
    buildGrid();
    initDots();
    initHubs();
    obs.observe(canvas);
  }

  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

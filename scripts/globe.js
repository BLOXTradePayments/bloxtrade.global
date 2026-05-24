import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

(function () {
  const canvas = document.getElementById('networkGlobe');
  if (!canvas) return;

  const ACCENT = 0x61b12f;

  /* ================================================================
     WORLD MAP — polygon outlines [lat, lon]
     ================================================================ */
  const P = [
    // ── North America ──
    [[72,-168],[62,-163],[60,-147],[58,-137],[55,-132],[51,-130],[48,-127],[45,-124],[42,-124],[38,-122],[35,-120],[32,-117],[29,-115],[25,-110],[20,-105],[17,-100],[15,-96],[13,-92],[10,-84],[9,-80],[9,-77],[10,-75],[14,-83],[18,-88],[21,-87],[25,-90],[28,-97],[30,-90],[28,-84],[25,-80],[27,-80],[30,-82],[34,-78],[37,-76],[40,-74],[43,-70],[45,-67],[47,-60],[48,-53],[50,-56],[53,-57],[56,-60],[59,-64],[61,-70],[63,-75],[66,-78],[70,-82],[72,-86],[73,-95],[73,-115],[72,-130],[71,-141],[71,-157],[70,-165],[72,-168]],
    // ── Greenland ──
    [[84,-34],[82,-20],[79,-18],[76,-20],[73,-24],[70,-30],[67,-37],[64,-44],[62,-48],[63,-53],[66,-54],[70,-51],[74,-47],[78,-42],[81,-38],[84,-34]],
    // ── South America ──
    [[13,-72],[11,-74],[9,-76],[7,-78],[4,-78],[1,-80],[-2,-80],[-5,-81],[-8,-80],[-11,-77],[-15,-76],[-18,-73],[-20,-70],[-23,-68],[-26,-66],[-28,-59],[-30,-53],[-32,-52],[-35,-55],[-38,-58],[-40,-62],[-43,-64],[-46,-66],[-50,-68],[-53,-71],[-55,-69],[-55,-67],[-53,-67],[-50,-66],[-47,-64],[-43,-62],[-40,-59],[-37,-55],[-34,-52],[-31,-50],[-28,-48],[-25,-46],[-22,-43],[-19,-40],[-16,-39],[-13,-38],[-10,-37],[-7,-35],[-5,-35],[-3,-39],[-1,-45],[0,-49],[2,-51],[4,-54],[6,-58],[8,-62],[10,-67],[12,-71],[13,-72]],
    // ── Africa ──
    [[37,-10],[37,-5],[36,-1],[36,2],[37,8],[36,10],[34,10],[33,12],[32,18],[32,25],[31,30],[31,33],[29,33],[27,34],[24,36],[21,37],[18,40],[15,42],[12,44],[10,45],[8,44],[5,42],[3,42],[1,42],[0,42],[-2,41],[-4,40],[-7,39],[-10,40],[-12,44],[-14,43],[-17,38],[-20,36],[-23,35],[-26,33],[-29,31],[-31,29],[-33,27],[-34,25],[-35,20],[-34,18],[-33,17],[-30,17],[-27,16],[-24,15],[-21,14],[-18,12],[-15,12],[-12,13],[-9,13],[-6,11],[-3,10],[0,10],[2,8],[4,5],[5,1],[5,-2],[6,-5],[8,-8],[10,-14],[13,-17],[16,-17],[19,-17],[22,-16],[25,-15],[28,-13],[30,-10],[32,-8],[34,-6],[36,-5],[37,-10]],
    // ── UK + Ireland ──
    [[50,-7],[51,-6],[52,-5],[54,-4],[56,-4],[58,-3],[59,0],[58,2],[56,2],[55,-1],[54,-3],[53,-6],[52,-7],[50,-10],[50,-7]],
    // ── Iceland ──
    [[66,-24],[66,-14],[65,-13],[64,-14],[63,-18],[64,-24],[66,-24]],
    // ── Scandinavia ──
    [[56,5],[57,8],[58,8],[60,5],[62,5],[63,8],[65,12],[67,15],[69,18],[70,22],[71,28],[71,30],[70,28],[68,20],[66,16],[64,14],[62,12],[60,12],[59,14],[58,16],[57,13],[56,10],[56,5]],
    // ── W. Europe ──
    [[36,-10],[37,-8],[38,-5],[38,-2],[40,-1],[41,-5],[42,-8],[43,-9],[44,-5],[44,-2],[44,0],[46,-1],[47,0],[48,-1],[49,-2],[50,-4],[51,-5],[52,-3],[53,0],[54,6],[55,8],[55,14],[54,14],[52,14],[50,10],[48,7],[47,5],[46,4],[45,3],[44,4],[43,6],[42,8],[41,10],[40,12],[39,14],[38,14],[37,12],[36,8],[36,4],[36,0],[36,-5],[36,-10]],
    // ── E. Europe + W. Russia ──
    [[55,14],[55,20],[56,28],[56,36],[55,44],[54,50],[52,50],[50,46],[48,40],[46,34],[44,28],[42,22],[44,18],[48,14],[52,14],[55,14]],
    // ── Italy ──
    [[46,7],[45,10],[44,11],[43,12],[42,13],[41,15],[40,16],[39,16],[38,16],[37,15],[38,13],[39,13],[40,12],[41,14],[43,14],[44,13],[45,12],[46,11],[46,7]],
    // ── Greece + Turkey ──
    [[42,20],[42,24],[42,28],[42,32],[40,36],[38,36],[37,28],[36,26],[37,22],[38,20],[40,20],[42,20]],
    [[42,32],[42,36],[40,40],[40,44],[38,44],[36,36],[37,32],[39,30],[42,32]],
    // ── Russia (Siberia + Far East) ──
    [[55,50],[57,55],[60,56],[64,58],[67,60],[69,65],[70,75],[71,85],[72,100],[73,115],[73,125],[72,135],[70,140],[68,150],[66,160],[63,168],[60,163],[56,155],[53,148],[50,140],[48,135],[48,130],[50,115],[50,100],[52,80],[54,65],[55,50]],
    // ── Iran / Central Asia ──
    [[40,44],[39,50],[38,55],[37,58],[36,60],[35,63],[34,66],[32,68],[30,64],[28,60],[26,56],[25,52],[26,48],[28,44],[32,44],[36,44],[40,44]],
    // ── Arabian Peninsula ──
    [[30,35],[28,37],[25,38],[22,40],[18,42],[15,43],[13,44],[14,48],[16,52],[19,54],[22,55],[25,56],[28,52],[30,48],[30,42],[30,35]],
    // ── India ──
    [[34,68],[32,72],[30,73],[28,73],[25,73],[22,74],[20,73],[18,74],[16,76],[14,76],[12,76],[10,77],[8,77],[8,78],[10,79],[12,80],[14,80],[16,80],[18,82],[20,84],[22,86],[24,87],[26,88],[28,88],[30,86],[32,82],[34,78],[35,74],[34,68]],
    // ── China + Mongolia + Korea ──
    [[54,80],[54,90],[54,100],[52,110],[50,118],[48,122],[46,126],[44,128],[42,130],[40,126],[38,122],[36,120],[33,120],[30,122],[26,120],[22,114],[20,110],[18,108],[16,108],[14,108],[16,100],[20,96],[24,92],[28,88],[32,84],[38,80],[44,78],[50,78],[54,80]],
    // ── SE Asia mainland ──
    [[20,96],[22,100],[21,104],[19,105],[17,106],[15,108],[13,106],[11,105],[10,104],[8,100],[7,98],[10,96],[14,96],[18,95],[20,96]],
    // ── Japan ──
    [[45,140],[44,142],[42,141],[40,140],[38,138],[36,136],[34,132],[35,130],[36,132],[38,135],[40,138],[42,140],[44,142],[45,145],[45,140]],
    // ── Philippines ──
    [[19,118],[17,120],[14,122],[10,124],[8,122],[7,120],[8,118],[10,118],[13,118],[16,118],[19,118]],
    // ── Indonesia (Sumatra + Java + Kalimantan) ──
    [[6,96],[4,98],[2,100],[0,102],[-2,104],[-5,105],[-7,106],[-8,110],[-7,114],[-4,114],[-2,112],[0,108],[2,106],[4,102],[6,100],[6,96]],
    // ── Indonesia (Sulawesi + Papua) ──
    [[-1,119],[-3,120],[-5,122],[-7,124],[-8,128],[-7,132],[-5,136],[-4,140],[-3,142],[-2,140],[-1,136],[-1,130],[-1,124],[-1,119]],
    // ── Australia ──
    [[-12,130],[-13,132],[-14,136],[-16,138],[-18,140],[-20,144],[-22,148],[-24,150],[-26,153],[-28,154],[-30,153],[-33,152],[-35,150],[-37,148],[-38,146],[-37,142],[-36,138],[-35,136],[-34,134],[-32,132],[-30,130],[-28,126],[-26,122],[-24,118],[-22,114],[-20,114],[-18,118],[-16,122],[-14,126],[-12,128],[-12,130]],
    // ── New Zealand ──
    [[-34,172],[-36,174],[-38,176],[-40,176],[-42,174],[-44,172],[-46,168],[-47,167],[-46,167],[-44,168],[-42,170],[-40,173],[-38,175],[-36,174],[-34,172]],
    // ── Madagascar ──
    [[-12,49],[-14,48],[-16,46],[-18,44],[-20,44],[-23,44],[-25,46],[-24,48],[-22,49],[-20,49],[-18,50],[-16,50],[-14,50],[-12,49]],
    // ── Sri Lanka ──
    [[10,80],[9,80],[8,80],[7,80],[6,81],[7,82],[8,82],[9,81],[10,80]],
    // ── Taiwan ──
    [[25,121],[24,120],[23,120],[22,121],[23,122],[24,122],[25,121]],
  ];

  /* ================================================================
     Build look-up map on an off-screen canvas to use as Texture
     ================================================================ */
  function createMapTexture() {
    const w = 2048, h = 1024;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    
    // Transparent background
    ctx.clearRect(0, 0, w, h);
    
    // Draw continents
    ctx.fillStyle = '#61b12f'; // BLOXtrade green
    ctx.shadowColor = '#61b12f';
    ctx.shadowBlur = 15;
    ctx.globalAlpha = 0.85;

    P.forEach(poly => {
      ctx.beginPath();
      poly.forEach(([lat, lon], i) => {
        // Map from lon [-180, 180] to x [0, w]
        // Map from lat [90, -90] to y [0, h]
        const x = ((lon + 180) / 360) * w;
        const y = ((90 - lat) / 180) * h;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
    });

    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  /* ================================================================
     Three.js Setup
     ================================================================ */
  let renderer, scene, camera, globeGroup;
  let W, H;
  const GLOBE_RADIUS = 20;

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
    
    globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Opaque Inner Sphere to hide backfaces
    const innerGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.98, 64, 64);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x070c06 }); // very dark green/black
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 2. Map Surface (Semi-transparent)
    const mapGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const mapMat = new THREE.MeshBasicMaterial({
      map: createMapTexture(),
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide
    });
    const mapSphere = new THREE.Mesh(mapGeo, mapMat);
    globeGroup.add(mapSphere);

    // 3. Wireframe Grid
    const wireGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.01, 32, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: ACCENT,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireSphere);

    // 4. Data Streams (Horizontal trails)
    initStreams();
    
    // Tilt the globe slightly
    globeGroup.rotation.x = 0.15;
    globeGroup.rotation.z = 0.05;
  }

  /* ================================================================
     Data Streams System
     ================================================================ */
  const streams = [];
  const streamGroup = new THREE.Group();

  function initStreams() {
    globeGroup.add(streamGroup);
    
    const count = 25; // Number of data streams
    for(let i = 0; i < count; i++) {
      createStream();
    }
  }

  function createStream() {
    // Random height along the Y axis
    const y = (Math.random() * 2 - 1) * (GLOBE_RADIUS * 0.85);
    const radius = GLOBE_RADIUS + Math.random() * 1.5 + 0.2;
    const rXZ = Math.sqrt(radius*radius - y*y); // radius at this Y level
    
    const length = 0.3 + Math.random() * 1.2; // arc length in radians
    const speed = (Math.random() > 0.5 ? 1 : -1) * (0.01 + Math.random() * 0.02);
    
    const segments = 30;
    const points = [];
    const colors = [];
    const cHead = new THREE.Color(ACCENT);
    const cTail = new THREE.Color(0x051a05);

    // Build line points from Tail to Head
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * length;
      const x = Math.cos(a) * rXZ;
      const z = Math.sin(a) * rXZ;
      points.push(new THREE.Vector3(x, y, z));
      
      const ratio = Math.pow(i / segments, 2); // non-linear fade
      colors.push(
        cTail.r + (cHead.r - cTail.r) * ratio,
        cTail.g + (cHead.g - cTail.g) * ratio,
        cTail.b + (cHead.b - cTail.b) * ratio
      );
    }

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    
    const line = new THREE.Line(geo, mat);
    
    // Glowing dot at the head
    const dotGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(Math.cos(length) * rXZ, y, Math.sin(length) * rXZ);
    line.add(dot);

    // Random initial rotation
    line.rotation.y = Math.random() * Math.PI * 2;

    streamGroup.add(line);
    streams.push({ obj: line, speed });
  }

  function updateStreams() {
    for (let s of streams) {
      s.obj.rotation.y += s.speed;
    }
  }

  /* ================================================================
     Animation Loop & Resize
     ================================================================ */
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
    globeGroup.rotation.y -= 0.001; // slow continuous globe rotation
    updateStreams();               // fast data streams
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

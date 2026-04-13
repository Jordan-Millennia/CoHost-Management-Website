(function () {
  'use strict';
  var c = document.getElementById('heroScene');
  if (!c || typeof THREE === 'undefined') return;

  var W = c.clientWidth, H = c.clientHeight;
  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);
  c.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x03080F, 0.04);

  var camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
  camera.position.set(0, 5, 12);
  camera.lookAt(0, 1, 0);

  /* Lights */
  scene.add(new THREE.AmbientLight(0x1A6FF5, 0.2));
  var pl1 = new THREE.PointLight(0x00D4AA, 1.6, 25);
  pl1.position.set(3, 7, 4);
  scene.add(pl1);
  var pl2 = new THREE.PointLight(0x1A6FF5, 1.2, 25);
  pl2.position.set(-4, 5, -3);
  scene.add(pl2);

  /* Materials */
  var tealLine = new THREE.LineBasicMaterial({ color: 0x00D4AA, transparent: true, opacity: 0.6 });
  var blueLine = new THREE.LineBasicMaterial({ color: 0x1A6FF5, transparent: true, opacity: 0.45 });
  var tealWire = new THREE.MeshBasicMaterial({ color: 0x00D4AA, wireframe: true, transparent: true, opacity: 0.12 });
  var blueWire = new THREE.MeshBasicMaterial({ color: 0x1A6FF5, wireframe: true, transparent: true, opacity: 0.1 });

  /* Buildings */
  var bldg = new THREE.Group();
  var defs = [
    { w:1.3, h:5.0, d:1.3, x:0,    z:0,    t:true  },
    { w:1.0, h:3.4, d:1.0, x:-2.1, z:0.6,  t:false },
    { w:1.5, h:4.0, d:1.0, x:2.1,  z:-0.4, t:false },
    { w:0.9, h:2.6, d:0.9, x:-1.0, z:-2.0, t:true  },
    { w:1.2, h:5.6, d:1.2, x:1.1,  z:-1.6, t:true  },
    { w:0.8, h:2.2, d:0.8, x:-3.0, z:-1.0, t:false },
    { w:0.7, h:1.8, d:0.7, x:3.2,  z:1.2,  t:true  },
    { w:1.0, h:3.6, d:0.9, x:-0.6, z:2.0,  t:false },
    { w:0.6, h:2.0, d:0.6, x:2.8,  z:-2.4, t:true  },
    { w:0.8, h:2.8, d:0.8, x:-2.6, z:1.5,  t:false },
    { w:1.1, h:4.2, d:0.8, x:0.4,  z:2.5,  t:true  },
    { w:0.7, h:1.6, d:0.7, x:-3.5, z:-2.6, t:false },
  ];
  defs.forEach(function(b) {
    var geo = new THREE.BoxGeometry(b.w, b.h, b.d);
    var mat = b.t ? tealWire : blueWire;
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(b.x, b.h / 2, b.z);
    bldg.add(mesh);

    var edges = new THREE.EdgesGeometry(geo);
    var line = new THREE.LineSegments(edges, b.t ? tealLine : blueLine);
    line.position.copy(mesh.position);
    bldg.add(line);
  });
  scene.add(bldg);

  /* Ground circuit grid */
  var ground = new THREE.Group();
  var grid = new THREE.GridHelper(16, 32, 0x00D4AA, 0x00D4AA);
  grid.material.opacity = 0.06;
  grid.material.transparent = true;
  ground.add(grid);

  var trMat = new THREE.LineBasicMaterial({ color: 0x00D4AA, transparent: true, opacity: 0.15 });
  var traces = [
    [[-6,0,-3],[0,0,-3],[0,0,-1],[4,0,-1]],
    [[-5,0,2],[-1,0,2],[-1,0,0],[3,0,0],[3,0,-2],[6,0,-2]],
    [[-4,0,-5],[-4,0,-2],[2,0,-2],[2,0,3],[5,0,3]],
    [[5,0,-4],[2,0,-4],[2,0,1],[-2,0,1],[-2,0,5]],
    [[-3,0,4],[1,0,4],[1,0,1],[4,0,1]],
  ];
  traces.forEach(function(pts) {
    var verts = pts.map(function(p) { return new THREE.Vector3(p[0], p[1], p[2]); });
    var g = new THREE.BufferGeometry().setFromPoints(verts);
    ground.add(new THREE.Line(g, trMat));
  });

  var dotMat = new THREE.MeshBasicMaterial({ color: 0x00D4AA, transparent: true, opacity: 0.45 });
  var dotGeo = new THREE.SphereGeometry(0.07, 8, 8);
  var dotPositions = [
    [0,0.05,-3],[0,0.05,-1],[4,0.05,-1],[-1,0.05,2],[3,0.05,0],
    [3,0.05,-2],[-4,0.05,-2],[2,0.05,-2],[2,0.05,3],[2,0.05,-4],
    [-2,0.05,1],[-2,0.05,5],[1,0.05,4],[4,0.05,1]
  ];
  dotPositions.forEach(function(p) {
    var d = new THREE.Mesh(dotGeo, dotMat);
    d.position.set(p[0], p[1], p[2]);
    ground.add(d);
  });
  scene.add(ground);

  /* Particles */
  var pCount = 80;
  var pGeo = new THREE.BufferGeometry();
  var pos = new Float32Array(pCount * 3);
  var vel = [];
  for (var i = 0; i < pCount; i++) {
    pos[i*3]   = (Math.random()-0.5)*18;
    pos[i*3+1] = Math.random()*12;
    pos[i*3+2] = (Math.random()-0.5)*18;
    vel.push({ x:(Math.random()-0.5)*0.002, y:Math.random()*0.006+0.002, z:(Math.random()-0.5)*0.002 });
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  var pMat = new THREE.PointsMaterial({ color: 0x00D4AA, size: 0.055, transparent: true, opacity: 0.5, sizeAttenuation: true });
  scene.add(new THREE.Points(pGeo, pMat));

  /* Mouse */
  var mx = 0, my = 0;
  document.addEventListener('mousemove', function(e) {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* Animate */
  var clock = new THREE.Clock();
  function loop() {
    requestAnimationFrame(loop);
    var t = clock.getElapsedTime();

    bldg.rotation.y = t * 0.06;

    // Mouse parallax — lerp
    camera.position.x += (mx * 2 - camera.position.x) * 0.015;
    camera.position.y += (-my * 1.2 + 5 - camera.position.y) * 0.015;
    camera.lookAt(0, 1, 0);

    // Particles
    var a = pGeo.attributes.position.array;
    for (var i = 0; i < pCount; i++) {
      a[i*3]   += vel[i].x;
      a[i*3+1] += vel[i].y;
      a[i*3+2] += vel[i].z;
      if (a[i*3+1] > 12) {
        a[i*3]   = (Math.random()-0.5)*18;
        a[i*3+1] = 0;
        a[i*3+2] = (Math.random()-0.5)*18;
      }
    }
    pGeo.attributes.position.needsUpdate = true;

    pl1.intensity = 1.6 + Math.sin(t*1.3)*0.3;
    pl2.intensity = 1.2 + Math.cos(t*1.1)*0.2;

    renderer.render(scene, camera);
  }
  loop();

  window.addEventListener('resize', function() {
    W = c.clientWidth; H = c.clientHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  });
  requestAnimationFrame(function() {
    W = c.clientWidth; H = c.clientHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  });
})();

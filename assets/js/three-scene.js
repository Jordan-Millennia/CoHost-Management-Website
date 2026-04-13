/* ============================================================
   Three.js — Hero 3D Scene
   Animated wireframe building cluster with circuit ground plane,
   particles, fog, and mouse parallax.
   ============================================================ */

(function () {
  'use strict';

  const container = document.getElementById('heroScene');
  if (!container || typeof THREE === 'undefined') return;

  /* --- Renderer --- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  /* --- Scene & Camera --- */
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x060D1A, 0.035);

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 4, 12);
  camera.lookAt(0, 1.5, 0);

  /* --- Lights --- */
  const ambient = new THREE.AmbientLight(0x2E7BEF, 0.3);
  scene.add(ambient);

  const tealLight = new THREE.PointLight(0x00DDB8, 1.5, 20);
  tealLight.position.set(2, 6, 4);
  scene.add(tealLight);

  const blueLight = new THREE.PointLight(0x2E7BEF, 1.2, 20);
  blueLight.position.set(-3, 4, -2);
  scene.add(blueLight);

  /* --- Materials --- */
  const tealWire = new THREE.MeshBasicMaterial({
    color: 0x00DDB8,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });

  const blueWire = new THREE.MeshBasicMaterial({
    color: 0x2E7BEF,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });

  const tealEdge = new THREE.LineBasicMaterial({
    color: 0x00DDB8,
    transparent: true,
    opacity: 0.6
  });

  const blueEdge = new THREE.LineBasicMaterial({
    color: 0x2E7BEF,
    transparent: true,
    opacity: 0.5
  });

  /* --- Building Cluster --- */
  const buildingGroup = new THREE.Group();

  const buildings = [
    { w: 1.2, h: 4.5, d: 1.2, x: 0,    z: 0,    mat: tealWire, edge: tealEdge },
    { w: 1.0, h: 3.2, d: 1.0, x: -2,   z: 0.5,  mat: blueWire, edge: blueEdge },
    { w: 1.4, h: 3.8, d: 1.0, x: 2,    z: -0.3, mat: blueWire, edge: blueEdge },
    { w: 0.8, h: 2.5, d: 0.8, x: -1,   z: -1.8, mat: tealWire, edge: tealEdge },
    { w: 1.1, h: 5.2, d: 1.1, x: 1,    z: -1.5, mat: tealWire, edge: tealEdge },
    { w: 0.9, h: 2.8, d: 0.9, x: -2.8, z: -1.2, mat: blueWire, edge: blueEdge },
    { w: 0.7, h: 2.0, d: 0.7, x: 3,    z: 1,    mat: tealWire, edge: tealEdge },
    { w: 1.0, h: 3.5, d: 0.8, x: -0.5, z: 1.8,  mat: blueWire, edge: blueEdge },
  ];

  buildings.forEach((b) => {
    const geo = new THREE.BoxGeometry(b.w, b.h, b.d);

    // Wireframe mesh
    const mesh = new THREE.Mesh(geo, b.mat);
    mesh.position.set(b.x, b.h / 2, b.z);
    buildingGroup.add(mesh);

    // Glowing edges
    const edges = new THREE.EdgesGeometry(geo);
    const line = new THREE.LineSegments(edges, b.edge);
    line.position.copy(mesh.position);
    buildingGroup.add(line);
  });

  scene.add(buildingGroup);

  /* --- Circuit Board Ground Plane --- */
  const groundGroup = new THREE.Group();

  // Base grid
  const gridSize = 14;
  const gridDiv = 28;
  const gridHelper = new THREE.GridHelper(gridSize, gridDiv, 0x00DDB8, 0x00DDB8);
  gridHelper.material.opacity = 0.08;
  gridHelper.material.transparent = true;
  groundGroup.add(gridHelper);

  // Circuit traces
  const traceMat = new THREE.LineBasicMaterial({
    color: 0x00DDB8,
    transparent: true,
    opacity: 0.2
  });

  const traces = [
    [[-5, 0, -3], [0, 0, -3], [0, 0, -1], [3, 0, -1]],
    [[-4, 0, 2], [-1, 0, 2], [-1, 0, 0], [2, 0, 0], [2, 0, -2], [5, 0, -2]],
    [[-3, 0, -5], [-3, 0, -2], [1, 0, -2], [1, 0, 3], [4, 0, 3]],
    [[4, 0, -4], [2, 0, -4], [2, 0, 1], [-2, 0, 1], [-2, 0, 4]],
  ];

  traces.forEach((pts) => {
    const verts = pts.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    const geo = new THREE.BufferGeometry().setFromPoints(verts);
    const line = new THREE.Line(geo, traceMat);
    groundGroup.add(line);
  });

  // Circuit nodes (small glowing dots at intersections)
  const nodeMat = new THREE.MeshBasicMaterial({
    color: 0x00DDB8,
    transparent: true,
    opacity: 0.5
  });

  const nodePositions = [
    [0, 0.05, -3], [0, 0.05, -1], [3, 0.05, -1],
    [-1, 0.05, 2], [-1, 0.05, 0], [2, 0.05, 0],
    [2, 0.05, -2], [-3, 0.05, -2], [1, 0.05, -2],
    [1, 0.05, 3], [2, 0.05, -4], [2, 0.05, 1],
    [-2, 0.05, 1], [-2, 0.05, 4]
  ];

  const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
  nodePositions.forEach((p) => {
    const dot = new THREE.Mesh(nodeGeo, nodeMat);
    dot.position.set(p[0], p[1], p[2]);
    groundGroup.add(dot);
  });

  scene.add(groundGroup);

  /* --- Floating Particles --- */
  const particleCount = 120;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = Math.random() * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    velocities.push({
      x: (Math.random() - 0.5) * 0.003,
      y: Math.random() * 0.005 + 0.002,
      z: (Math.random() - 0.5) * 0.003
    });
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x00DDB8,
    size: 0.06,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* --- Mouse Parallax --- */
  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = 0;
  let targetRotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* --- Animation Loop --- */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // Slow Y rotation
    buildingGroup.rotation.y = elapsed * 0.08;

    // Mouse parallax (desktop only)
    targetRotY = mouseX * 0.15;
    targetRotX = mouseY * 0.08;
    camera.position.x += (targetRotY * 2 - camera.position.x + 0) * 0.02;
    camera.position.y += (-targetRotX * 1.5 - camera.position.y + 4) * 0.02;
    camera.lookAt(0, 1.5, 0);

    // Animate particles
    const posArray = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] += velocities[i].x;
      posArray[i * 3 + 1] += velocities[i].y;
      posArray[i * 3 + 2] += velocities[i].z;

      // Reset particles that float too high
      if (posArray[i * 3 + 1] > 10) {
        posArray[i * 3] = (Math.random() - 0.5) * 16;
        posArray[i * 3 + 1] = 0;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 16;
      }
    }
    particleGeo.attributes.position.needsUpdate = true;

    // Pulse lights
    tealLight.intensity = 1.5 + Math.sin(elapsed * 1.5) * 0.3;
    blueLight.intensity = 1.2 + Math.cos(elapsed * 1.2) * 0.2;

    renderer.render(scene, camera);
  }

  animate();

  /* --- Resize --- */
  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', onResize);

  // Initial sizing after layout
  requestAnimationFrame(onResize);
})();

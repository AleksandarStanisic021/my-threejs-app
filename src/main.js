import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 1. Sređivanje body elementa i kreiranje canvasa iz JS-a
document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.backgroundColor = "#111";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

// 2. Scena, kamera i renderer koji koristi naš canvas
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 8);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);

// 3. Svetla
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// 4. Učitavanje lokalnog fonta iz public foldera (izbegavamo CORS)
const fontLoader = new FontLoader();

// Pošto je fajl u public folderu, Vite ga vidi na korenskoj ruti "/"
fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("VITE COOl", {
    font: font,
    size: 1.5,
    height: 0.4,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry.center();

  const textMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0055, // Moćna pink/crvena boja
    roughness: 0.2,
    metalness: 0.5,
  });

  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(textMesh);

  // 5. Animacija
  function animate() {
    requestAnimationFrame(animate);

    // Lagana rotacija slova levo-desno
    textMesh.rotation.y = Math.sin(Date.now() * 0.001) * 0.5;

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});

// Responzivnost prozora
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

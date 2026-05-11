import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector("#canvas");

console.log("Hello Three.js!", canvas, THREE);

const scene = new THREE.Scene();

const sizes = {
  width: 800,
  height: 600,
};

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.position.x = -1.1;
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
scene.add(camera);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

function animate() {
  controls.update();
  renderer.render(scene, camera);
  //test
  requestAnimationFrame(animate);
}
animate();

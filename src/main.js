import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "red",
});

const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({
  color: "blue",
});

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({
  color: "green",
});
const cube3 = new THREE.Mesh(geometry2, material2);
scene.add(cube3);
cube3.position.x = 1.5;

const cube2 = new THREE.Mesh(geometry1, material1);
scene.add(cube2);
cube2.position.x = -1.5;

const cube1 = new THREE.Mesh(geometry, material);
camera.position.z = 3;
scene.add(cube1);
scene.add(camera);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
let c = new THREE.Clock();

function animate() {
  let t = c.getElapsedTime();
  console.log(t);

  cube1.rotation.y = t;
  cube2.rotation.z = t;
  cube3.rotation.x = t;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

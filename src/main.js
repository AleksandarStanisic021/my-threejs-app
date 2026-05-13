import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUi from "lil-gui";
import imageSrc from ".//static/textures/door/color.jpg";
console.log(imageSrc);

const image = new Image();
image.onload = () => {
  const texture = new THREE.Texture(image);
  texture.needsUpdate = true;
  material.map = texture;
};
image.src = imageSrc;

const gui = new GUi();
const parameters = {
  color: 0xff0000,
};
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

const canvas = document.querySelector("#canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(1, 2, 3);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

gui.add(cube.position, "x").min(-3).max(3).step(0.01);
gui.add(cube.position, "y").min(-3).max(3).step(0.01);
gui.add(cube.position, "z").min(-3).max(3).step(0.01);
gui.add(cube.scale, "x").min(0).max(5).step(0.01);
gui.add(cube.scale, "y").min(0).max(5).step(0.01);
gui.add(cube.scale, "z").min(0).max(5).step(0.01);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 5;
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

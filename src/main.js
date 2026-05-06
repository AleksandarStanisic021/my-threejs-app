import "./style.css";
import * as THREE from "three";

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
  1000,
);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

box.rotation.y = 0.5;
box.translateX(0.5);
box.translateY(0.5);
box.translateZ(0.5);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);
  box.rotation.y += 0.01;
  boxMaterial.color.setHSL(Math.sin(Date.now() * 0.001) * 0.5 + 0.5, 1, 0.5);
  box.scale.set(
    1 + Math.sin(Date.now() * 0.001) * 0.5,
    1 + Math.sin(Date.now() * 0.001) * 0.5,
    1,
  );
  box.position.y = Math.sin(Date.now() * 0.001) * 0.5;
  box.position.x = Math.cos(Date.now() * 0.001) * 0.5;
  renderer.render(scene, camera);
}
animate();

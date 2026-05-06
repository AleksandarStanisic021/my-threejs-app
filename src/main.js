import "./style.css";
import * as THREE from "three";

const canvas = document.querySelector("#canvas");

const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

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
});
sphere.position.x = 1.1;
sphere.position.y = 2;

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

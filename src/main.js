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

const textureLoader = new THREE.TextureLoader();

const textureDoorColor = textureLoader.load("./textures/door/color.jpg");
const alphaDoorColor = textureLoader.load("./textures/door/alpha.jpg");
const AODoorColor = textureLoader.load("./textures/door/ambientOcclusion.jpg");
const heightDoorColor = textureLoader.load("./textures/door/height.jpg");
const normalDoorColor = textureLoader.load("./textures/door/normal.jpg");
const metalnessDoorColor = textureLoader.load("./textures/door/metalness.jpg");
const roughnessDoorColor = textureLoader.load("./textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("./textures/matcaps/4.png");
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");

textureDoorColor.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  map: textureDoorColor,
});

const matcap = new THREE.MeshMatcapMaterial();
matcap.matcap = matcapTexture;

const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({
  color: "blue",
});
const lambert = new THREE.MeshLambertMaterial();

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({
  color: "green",
});
const cube3 = new THREE.Mesh(geometry2, material);
scene.add(cube3);
cube3.position.x = 1.5;

const cube2 = new THREE.Mesh(geometry1, lambert);
scene.add(cube2);
cube2.position.x = -1.5;

const cube1 = new THREE.Mesh(geometry, matcap);
camera.position.z = 3;
scene.add(cube1);
scene.add(camera);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xff0000, 1);
scene.add(ambient);
const point = new THREE.PointLight("green", 3);
point.position.x = 3;
scene.add(point);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
let c = new THREE.Clock();

function animate() {
  let t = c.getElapsedTime();

  cube1.rotation.y = t;
  cube2.rotation.z = t;
  cube3.rotation.x = t;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/OrbitControls.js';

// Select the container for the scene
const container = document.getElementById('container');

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Load the panoramic image and create a texture
const loader = new THREE.TextureLoader();
const texture = loader.load('assets/anime_art_style_mountaintop_view_across_archipelag.jpeg');

// Create a spherical geometry and map the texture to it
const geometry = new THREE.SphereGeometry(500, 100, 50);

// Flip the geometry inside out
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({
    map: texture
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set up the camera and controls
camera.position.set(0, 0, -1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = false;
controls.minPolarAngle = 1.4
controls.maxPolarAngle = 1.9;
controls.minAzimuthAngle = Math.PI / 1.8
controls.maxAzimuthAngle = Math.PI / 1.8;
controls.enableDamping = true;
controls.dampingFactor = 0.2;

controls.rotateSpeed = 0.1;

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Animation loop
let x = 0;
const speed = 1;

function animate() {
    // console.log("animate:", x, 1.5 * Math.sin(x / 1000) + Math.PI / 3);

    sphere.rotation.y = 1.5 * Math.sin(x / 1000) + Math.PI / 3;

    if (x > Math.PI * 2000) {
        // Reset to zero every cycle
        x = 0;
    } else {
        x = x + speed;
    }

    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}

animate();

if (document.webkitFullscreenElement) {
    document.webkitCancelFullScreen();
  } else {
    const el = document.documentElement;
    el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  }






import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Typewriter } from './typewriter';

// Initialize typewriter
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    new Typewriter(typewriterElement, [
        'bear with me I am vibe coding',
        'giving birth to the website on a cloud soon'
    ]);
}

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Add OrbitControls for easy viewing
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Add grid
const grid = new THREE.GridHelper(100, 100);
grid.position.y = -1;
scene.add(grid);

// Position camera
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Animate the grid
    if (grid) {
        grid.position.z += 0.0009;
        if (grid.position.z > 2) {
            grid.position.z = 0;
        }
    }

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

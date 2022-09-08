import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import * as THREE from "three";
import mappng from "./textures/map.png";


// Texture Loader

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load(mappng);

// Create Scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Sphere Material

const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshStandardMaterial();

material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929);
material.metalness = 0.7;
material.roughness = 0.2;

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const light = new THREE.PointLight( 0xf7f7f7, 1, 100 );
light.position.set(23, 34, 15);
scene.add( light );

const light2 = new THREE.PointLight( 0xf50000, 5, 100 );
light2.position.set(43, -35, -25);
scene.add( light2 )

const light3 = new THREE.PointLight( 0x9803a8, 5, 100);
light3.position.set(-43, 35, -25);
scene.add( light3 )

// Camera Position

camera.position.z = 3;

// Mouse Location Data

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

// When Mouse Moves In Browser Insert Data In To Variables

const onMouseMove = (event) => {
  mouseX = ( event.clientX - windowX );
  mouseY = ( event.clientY - windowY );
}

// Refresh Camera Location While Browser Resizing

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

// Call Functions

document.addEventListener("mousemove", onMouseMove);
window.addEventListener( 'resize', onWindowResize, false );

const clock = new THREE.Clock();

// Animate Sphere

const animate = () => {
  targetX = mouseX * .001;
  targetY = mouseY * .001;

  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.x = .25 * elapsedTime;

  sphere.rotation.y += .5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += .5 * (targetY - sphere.rotation.x);
  sphere.rotation.z = -.5 * (targetY - sphere.rotation.x);
  
  renderer.render(scene, camera);
  
	window.requestAnimationFrame( animate );
}
animate();
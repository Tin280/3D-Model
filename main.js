import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const MODEL_PATH = "./TeamTin'smodel.gltf"

const loader = new GLTFLoader();
let truck = undefined;
let user_active = false;

loader.load(MODEL_PATH, (gltf) => {
    console.log(gltf);
	scene.add(gltf.scene);
    truck = gltf.scenes[0];
}, undefined, (error) => {
	console.error(error);
});

document.onclick = () => user_active = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
const al = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(al);
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.PerspectiveCamera( 60, 600 / 600, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize(600, 600);
// renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );

const animate = () => {
	requestAnimationFrame( animate );
    if (user_active === true) {
        controls.update();
    } else {
        truck.rotation.y += 0.01;
    }
	renderer.render( scene, camera );
}

setTimeout(() => animate(), 500);

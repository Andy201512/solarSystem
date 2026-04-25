import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const sunGeometry = new THREE.SphereGeometry(1, 15, 15);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0);

const earthGeometry = new THREE.SphereGeometry(0.5, 15, 15);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
const earthRevolveWapper = createRevolveWapper(0, 0, 0, earth);
earth.position.set(5, 0, 0);

const moonGeometry = new THREE.SphereGeometry(0.1, 15, 15);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
const moonRevolveWapper = createRevolveWapper(0, 0, 0, moon);
moon.position.set(1, 0, 0)



scene.add(earthRevolveWapper);
scene.add(sun);
earth.add(moonRevolveWapper)


camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

function animate(time) {

    // sun.rotation.x = time / 2000;
    sun.rotation.y = time / 1000;

    // earth.rotation.x = time / 2000;
    earthRevolveWapper.rotation.y = time / 1000;

    moonRevolveWapper.rotation.y = time / 500;

    renderer.render(scene, camera);

}

//通过x,y,z指定旋转中心，obj是要旋转的对象
function createRevolveWapper(x, y, z, obj) {
    let wrapper = new THREE.Object3D();
    wrapper.position.set(x, y, z);
    wrapper.add(obj);
    obj.position.set(-x, -y, -z);
    return wrapper;
}
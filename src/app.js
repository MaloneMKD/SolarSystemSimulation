import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

import starsBG1 from "../assets/starsBackground-1.jpg";
import starsBG2 from "../assets/starsBackground-2.jpg";
import sunTexture from "../assets/sunTexture.jpg";
import mercuryTexture from "../assets/mercuryTexture.jpg";
import saturnTexture from "../assets/saturnTexture.jpg";
import saturnRingTexture from "../assets/saturnRingTexture.png";
import venusTexture from "../assets/venusTexture.jpg";
import earthTexture from "../assets/earthDayMapTexture.jpg";
import moonTexture from "../assets/moonTexture.jpg";
import marsTexture from "../assets/marsTexture.jpg";
import jupiterTexture from "../assets/jupiterTexture.jpg";
import jupiterLoTexture from "../assets/jupiter_lo_Texture.jpg";
import europaTexture from "../assets/europaTexture.jpg";
import ganymedeTexture from "../assets/GanymedeTexture.png";
import callistoTexture from "../assets/callistoTexture.jpg";
import uranusTexture from "../assets/uranusTexture.jpg";
import uranusRingTexture from "../assets/uranusRingTexture.png";
import neptuneTexture from "../assets/neptuneTexture.jpg";
import titanTexture from "../assets/titanTexture.jpg";
import tritonTexture from "../assets/tritonTexture.jpg";

// Setup ______________________________

    // Create scene
const scene = new THREE.Scene();

    // Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-262, 269, -207);

    // Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

    // Orbit constrols object
const controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;

    // Dat.GUI
const gui = new GUI();

// End of setup ______________________________

// Event Listeners ______________________________

    // Make the canvas responsive
window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

// End of event Listeners ______________________________

// Solar system objects______________________________

    // Loaders
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

    // Background
scene.background = cubeTextureLoader.load([
    starsBG1,
    starsBG2,
    starsBG1, 
    starsBG2,
    starsBG1,
    starsBG2
]);

    // Sun
const sunGeometry = new THREE.SphereGeometry(52, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);


// Function to create planets
function createPlanet(radius, texture, xPosition, ring) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(texture)
    });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = xPosition;

    if(ring) {
        const ringGeometry = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide,
            transparent: true
        })
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.rotation.x = ring.ringAngle;
        planet.add(ringMesh);
    }

    const obj = new THREE.Object3D();
    obj.add(planet);

    return {planet: planet, obj: obj};
}

// Function to create moon
function createMoon(radius, texture, distance)
{
    const moonGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const moonMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load(texture)
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.x = distance;
    return moon;
}

function createOrbitLine(radius) 
{
    const orbitCurve = new THREE.EllipseCurve(0, 0, radius, radius);
    const orbitPoints = orbitCurve.getSpacedPoints(200);
    
    const orbitPathGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitPathMat = new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.5});
    const orbitLine = new THREE.Line(orbitPathGeo, orbitPathMat);
    orbitLine.rotateX(-Math.PI / 2);

    return orbitLine;
}

// Mercury
const mercury = createPlanet(3.2, mercuryTexture, 28 * 3);
const mercuryOrbitLine = createOrbitLine(28 * 3);
scene.add(mercury.obj);
scene.add(mercuryOrbitLine);

// Venus
const venus = createPlanet(5.8, venusTexture, 44 * 3);
const venusOrbitLine = createOrbitLine(44 * 3);
scene.add(venus.obj);
scene.add(venusOrbitLine);

// Earth
const earth = createPlanet(6, earthTexture, 62 * 3);
const earthOrbitLine = createOrbitLine(62 * 3);
earth.planet.rotation.x = 0.41;
scene.add(earthOrbitLine);
scene.add(earth.obj);

    // Moon
const moon = createMoon(1.32, moonTexture, 10);
earth.planet.add(moon);

// Mars
const mars = createPlanet(4, marsTexture, 78 * 3);
const marsOrbitLine = createOrbitLine(78 * 3);
scene.add(mars.obj);
scene.add(marsOrbitLine);

// Jupiter
const jupiter = createPlanet(12, jupiterTexture, 100 * 3.2);
const jupiterOrbitLine = createOrbitLine(100 * 3.2);
scene.add(jupiter.obj);
scene.add(jupiterOrbitLine);

    // Moon Ganymede
const ganymede = createMoon(2.5, ganymedeTexture, 16);
jupiter.planet.add(ganymede);

    // Moon Callisto
const callisto = createMoon(2.0, callistoTexture, 22);
jupiter.planet.add(callisto);

    // Moon Lo
const lo = createMoon(1.32, jupiterLoTexture, 28);
jupiter.planet.add(lo);

    // Moon Europa
const europa = createMoon(1.0, europaTexture, 34);
jupiter.planet.add(europa);

// Saturn 
const saturn = createPlanet(10, saturnTexture, 120 * 4, {innerRadius: 12, outerRadius: 21, texture: saturnRingTexture, ringAngle: 0.47});
const saturnOrbitLine = createOrbitLine(120 * 4);
scene.add(saturn.obj);
scene.add(saturnOrbitLine);

    // Moon Titan
const titan = createMoon(1.98, titanTexture, 34);
saturn.planet.add(titan);

// Uranus 
const uranus = createPlanet(7, uranusTexture, 158 * 4, {innerRadius: 9, outerRadius: 18, texture: uranusRingTexture, ringAngle: 3.01});
const uranusOrbitLine = createOrbitLine(158 * 4);
scene.add(uranus.obj);
scene.add(uranusOrbitLine);

// Neptune
const neptune = createPlanet(7, neptuneTexture, 182 * 4);
const neptuneOrbitLine = createOrbitLine(182 * 4);
scene.add(neptune.obj);
scene.add(neptuneOrbitLine);

    // Tritan moon
const triton = createMoon(0.5, tritonTexture, 15);
neptune.planet.add(triton);

// End of solar system objects______________________________

// Animation variables
var settings = {animationSpeed: 0.5, focus: null, orbitPath: true};

// User interface controls
gui.add(settings, "focus", { Mercury: "mercury",
                             Venus: "venus", 
                             Earth: "earth",
                             Mars: "mars",
                             Jupiter: "jupiter",
                             Saturn: "saturn",
                             Uranus: "uranus",
                             Neptune: "neptune",
                             None: null
                            });
gui.add(settings, "animationSpeed", 0, 20, 0.5);
gui.add(controls, "autoRotate", true).onChange(function(e) {
    controls.autoRotate = e;
});
gui.add(settings, "orbitPath", true).onChange(function(showPath) {
    if(showPath) {
        scene.add(mercuryOrbitLine);
        scene.add(venusOrbitLine);
        scene.add(earthOrbitLine);
        scene.add(marsOrbitLine);
        scene.add(jupiterOrbitLine);
        scene.add(saturnOrbitLine);
        scene.add(uranusOrbitLine);
        scene.add(neptuneOrbitLine);
    }
    else {
        scene.remove(mercuryOrbitLine);
        scene.remove(venusOrbitLine);
        scene.remove(earthOrbitLine);
        scene.remove(marsOrbitLine);
        scene.remove(jupiterOrbitLine);
        scene.remove(saturnOrbitLine);
        scene.remove(uranusOrbitLine);
        scene.remove(neptuneOrbitLine);
    }
})

// Function to rotate a planet
function rotatePlanet(planetObject, rotationSpeed, orbitSpeed)
{
    planetObject.obj.rotateY(orbitSpeed  * settings.animationSpeed);
    planetObject.planet.rotateY(rotationSpeed  * settings.animationSpeed);
}

// Function to rotate a moon
function rotateMoon(moon, rotationSpeed, orbitSpeed, orbitRadius)
{
    moon.rotateY(rotationSpeed * settings.animationSpeed);
    if(settings.animationSpeed > 0) {
        moon.position.x = -Math.cos(performance.now() * orbitSpeed) * orbitRadius;
        moon.position.z = Math.sin(performance.now() * orbitSpeed) * orbitRadius;
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Sun rotation
    sun.rotateY(0.004 * settings.animationSpeed);

    // Mercury rotation
    rotatePlanet(mercury, 0.04, 0.004);

    // Venus rortation
    rotatePlanet(venus, 0.002, 0.015);

    // Earth and moon rotation
    rotatePlanet(earth, 0.02, 0.01);
    rotateMoon(moon, 0.0002, 0.00008, 10)

    // Mars rotation
    rotatePlanet(mars, 0.018, 0.008);

    // Jupiter and moons rotation
    rotatePlanet(jupiter, 0.004, 0.0002);
    rotateMoon(ganymede, 0.014, 0.0002, 22);
    rotateMoon(callisto, 0.033, 0.00046, 34);
    rotateMoon(lo, 0.004, 0.000005, 16);
    rotateMoon(europa, 0.007, 0.000009, 28);

    // Saturn rortation
    rotatePlanet(saturn, 0.00038, 0.0009);
    rotateMoon(titan, 0.05, 0.0002, 34);

    // Uranus rortation
    rotatePlanet(uranus, 0.0003, 0.0004);

    // Neptune rortation
    rotatePlanet(neptune, 0.032, 0.0001);
    rotateMoon(triton, 0.0002, 0.0000003, 15);       

    if(settings.focus != null)
    {
        var planetFocusPosition = new THREE.Vector3();
        if(settings.focus == "mercury")
            mercury.planet.getWorldPosition(planetFocusPosition);
        else if(settings.focus == "venus")
            venus.planet.getWorldPosition(planetFocusPosition);
        else if(settings.focus == "earth")
            earth.planet.getWorldPosition(planetFocusPosition);
        else if(settings.focus == "mars")
            mars.planet.getWorldPosition(planetFocusPosition);
        else if(settings.focus == "jupiter")
            jupiter.planet.getWorldPosition(planetFocusPosition);
        else if(settings.focus == "saturn")
            saturn.planet.getWorldPosition(planetFocusPosition);
        else if(settings.focus == "uranus")
            uranus.planet.getWorldPosition(planetFocusPosition);
        else if(settings.focus == "neptune")
            neptune.planet.getWorldPosition(planetFocusPosition);

        controls.target = planetFocusPosition;
        controls.update();
    }
    else
    { 
        controls.target = new THREE.Vector3(0, 0, 0);
        controls.update();
    }

    console.log(camera.position);

    // Render the scene
    renderer.render(scene, camera);
}
animate();

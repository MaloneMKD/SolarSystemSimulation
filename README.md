# Solar System Simulator

A real-time, interactive 3D visualization of our solar system built using **Three.js**. This project was developed as part of a Computer Graphics curriculum to demonstrate key concepts in 3D rendering, hierarchical scene graphing, and texture mapping.

## 🌟 Features

* **Realistic Textures**: High-resolution spherical mapping using planetary surface data.
* **Orbital Mechanics**: Simulated rotation and revolution logic using a hierarchical scene graph.
* **Interactive Controls**: Integrated `OrbitControls` for seamless zooming, panning, and rotation.
* **Dynamic Lighting**: Central `PointLight` (The Sun) providing realistic shading and specular highlights across the system.
* **Immersive Environment**: Custom-built starfield background for a deep-space aesthetic.

## 🛠️ Graphics Concepts Applied

* **Hierarchical Scene Graph**: Planets are parented to invisible pivot objects, allowing for independent axial rotation and orbital velocity.
* **Materials & Shaders**: Implementation of `MeshPhongMaterial` and `MeshStandardMaterial` to handle light reflection and surface detail.
* **Texture Mapping**: Asynchronous loading of diffuse and bump maps using Three.js `TextureLoader`.

### Prerequisites
To run this project locally, you need a modern web browser and a local development server (to bypass CORS restrictions for textures).

## 📂 Project Structure

* **/assets** - Planetary textures and image maps.

* **main.js** - Core Three.js implementation (Scene, Camera, Renderer).

* **index.html** - Application entry point.

* **style.css** - Canvas styling and UI layout.

## 📜 Credits

Textures sourced from `NASA` and `Solar System Scope`.

Built with the `Three.js` library.

import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const GlbLoader = ({ url }) => {
    const canvasRef = useRef(null);
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);
    const [renderer, setRenderer] = useState(null);
    const [controls, setControls] = useState(null);

    useEffect(() => {
        // Initialize scene, camera, renderer, and controls
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        canvasRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = true;
        camera.position.set(0, 1, 5);
        controls.update();

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 2); // Increased intensity
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        const spotLight = new THREE.SpotLight(0xffffff, 1.5);
        spotLight.position.set(10, 20, 10);
        spotLight.castShadow = true;
        const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);

        scene.add(ambientLight);
        scene.add(directionalLight);
        scene.add(spotLight);
        scene.add(hemisphereLight);

        setScene(scene);
        setCamera(camera);
        setRenderer(renderer);
        setControls(controls);

        // Load the model
        if (url) {
            const loader = new GLTFLoader();
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
            loader.setDRACOLoader(dracoLoader);

            loader.load(url, (gltf) => {
                const model = gltf.scene;

                // Center the model
                const bbox = new THREE.Box3().setFromObject(model);
                const center = bbox.getCenter(new THREE.Vector3());
                model.position.sub(center);

                // Adjust the model's rotation pivot
                const pivot = new THREE.Group();
                pivot.add(model);
                scene.add(pivot);

                pivot.scale.set(2, 2, 2);

                // Animation loop
                const animate = () => {
                    requestAnimationFrame(animate);
                    controls.update();
                    renderer.render(scene, camera);
                };
                animate();
            }, undefined, (error) => {
                console.error('An error occurred while loading the model:', error);
                alert('Failed to load the model. Check console for details.');
            });
        }

        // Handle window resize
        const handleResize = () => {
            if (renderer && camera) {
                const width = canvasRef.current.clientWidth;
                const height = canvasRef.current.clientHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);

            if (renderer) {
                renderer.dispose();
            }
            if (controls) {
                controls.dispose();
            }
            if (scene) {
                while (scene.children.length > 0) {
                    scene.remove(scene.children[0]);
                }
            }
            if (canvasRef.current) {
                canvasRef.current.innerHTML = ''; // Clear the canvas element
            }
        };
    }, [url]);

    return (
        <div ref={canvasRef} style={{ width: '100%', height: '65vh', border: "1px solid black" }}></div>
    );
};

export default GlbLoader;

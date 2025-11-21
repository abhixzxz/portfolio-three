"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ThreeScenes from "./three/page";

function LaptopModel() {
  const { scene } = useGLTF("/macbook.glb");
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);

      // Scale to fit viewport - increased scale for zoom
      scene.scale.set(8, 8, 8);

      // Set initial rotation for consistent view
      scene.rotation.set(0, 0.3, 0);
    }
  }, [scene]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return <primitive object={scene} ref={meshRef} />;
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
      <directionalLight position={[-5, 3, -3]} intensity={1.5} />
      <pointLight position={[0, 5, 0]} intensity={1} />
      <spotLight position={[0, 10, 10]} intensity={1.5} angle={0.3} />
      <LaptopModel />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate={false}
        maxDistance={6}
        minDistance={3}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen righteous-regular bg-black text-white">
      <div className="container mx-auto px-6 py-12 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Section - Portfolio Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl play-regular md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Abhi raj.k
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            <p className="text-2xl md:text-3xl text-gray-300 font-light">
              Creative Developer & Designer
            </p>

            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
              Crafting immersive digital experiences through the intersection of
              code, design, and innovation. Specializing in 3D web experiences,
              interactive applications, and modern web technologies.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                View Work
              </button>
              <button className="px-8 py-3 border-2 border-purple-400 rounded-lg font-semibold hover:bg-purple-400/10 transition-all duration-300">
                Get in Touch
              </button>
            </div>

            {/* <div className="flex gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">5+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="w-px bg-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">50+</div>
                <div className="text-sm text-gray-400">Projects Done</div>
              </div>
              <div className="w-px bg-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">30+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
            </div> */}
          </div>

          <div className="relative h-[500px] lg:h-[600px]">
            <div className="relative h-full rounded-2xl overflow-hidden">
              {/* <Scene /> */}
              <ThreeScenes />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

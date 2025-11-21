"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three';

function LaptopModel() {
  const { scene, error } = useGLTF("/laptop.glb"); // Load from public directory
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (error) {
      console.error("Error loading GLB model:", error);
    }
    if (scene) {
      console.log("GLB model loaded successfully:", scene);
    }
  }, [scene, error]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Slow rotation for better visibility
    }
  });

  if (error) {
    return (
      <mesh>
        <boxGeometry args={[2, 1.5, 0.2]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  if (!scene) {
    return (
      <mesh>
        <boxGeometry args={[2, 1.5, 0.2]} />
        <meshStandardMaterial color="blue" wireframe />
      </mesh>
    );
  }

  return <primitive object={scene} scale={1} ref={meshRef} />;
}

export default function Laptop() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <LaptopModel />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}
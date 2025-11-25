"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default function ParticleMorph() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const particlesRef = useRef<THREE.BufferGeometry | null>(null);
  const textsRef = useRef<any[]>([]);
  const animationVarsRef = useRef({
    speed: 0.01,
    color: "#FFFFFF",
    rotation: -45,
  });
  const animationFrameRef = useRef<number | null>(null);

  const particleCount = 6000;
  const particleSize = 0.3;
  const defaultAnimationSpeed = 1;
  const morphAnimationSpeed = 18;
  const normalSpeed = defaultAnimationSpeed / 100;
  const fullSpeed = morphAnimationSpeed / 100;

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.y = -45;
    camera.position.z = 45;
    cameraRef.current = camera;

    // Lighting
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Particles geometry
    const particles = new THREE.BufferGeometry();
    const vertices: number[] = [];
    for (let p = 0; p < particleCount; p++) {
      vertices.push(0, 0, 0);
    }
    particles.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(vertices), 3)
    );
    particlesRef.current = particles;

    // Material
    const pMaterial = new THREE.PointsMaterial({
      size: particleSize,
      color: "#FFFFFF",
    });

    // Particle system
    const particleSystem = new THREE.Points(particles, pMaterial);
    particleSystemRef.current = particleSystem;
    scene.add(particleSystem);

    // Load font
    const fontLoader = new FontLoader();
    fontLoader.load(
      "https://cdn.jsdelivr.net/npm/three@r180/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        const triggerTexts = ["CLICK", "TO", "SWITCH"];
        const triggerColors = ["#3D8CD0", "#D32A7B", "#2AD37A"];

        triggerTexts.forEach((text, idx) => {
          textsRef.current[idx] = {};

          const textGeometry = new TextGeometry(text, {
            font: font,
            size: window.innerWidth * 0.02,
            height: 4,
            curveSegments: 10,
          });

          textGeometry.center();

          const textParticles = new THREE.BufferGeometry();
          const textVertices: number[] = [];

          // Generate random points in text geometry
          const randomPoints = getRandomPointsInGeometry(
            textGeometry,
            particleCount
          );
          randomPoints.forEach((point: THREE.Vector3) => {
            textVertices.push(point.x, point.y, point.z);
          });

          textParticles.setAttribute(
            "position",
            new THREE.BufferAttribute(new Float32Array(textVertices), 3)
          );

          textsRef.current[idx].particles = textParticles;
          textsRef.current[idx].color = triggerColors[idx];

          if (idx === 0) {
            morphTo(idx);
          }
        });
      }
    );

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (particleSystem) {
        particleSystem.rotation.y += animationVarsRef.current.speed;
      }

      const posAttr = particles.getAttribute("position");
      if (posAttr) {
        posAttr.needsUpdate = true;
      }

      camera.position.z = animationVarsRef.current.rotation;
      camera.position.y = animationVarsRef.current.rotation;
      camera.lookAt(scene.position);

      pMaterial.color = new THREE.Color(animationVarsRef.current.color);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
      if (
        mountRef.current &&
        renderer.domElement.parentNode === mountRef.current
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const getRandomPointsInGeometry = (
    geometry: THREE.BufferGeometry,
    count: number
  ): THREE.Vector3[] => {
    const points: THREE.Vector3[] = [];
    const positionAttr = geometry.getAttribute("position");

    if (!positionAttr) return points;

    for (let i = 0; i < count; i++) {
      const randomIdx = Math.floor(Math.random() * positionAttr.count);
      points.push(
        new THREE.Vector3(
          positionAttr.getX(randomIdx),
          positionAttr.getY(randomIdx),
          positionAttr.getZ(randomIdx)
        )
      );
    }
    return points;
  };

  const morphTo = (idx: number) => {
    const targetParticles = textsRef.current[idx]?.particles;
    const targetColor = textsRef.current[idx]?.color;

    if (!targetParticles || !particlesRef.current) return;

    // Animate speed
    animationVarsRef.current.speed = fullSpeed;

    // Animate color
    animationVarsRef.current.color = targetColor || "#FFFFFF";

    // Animate particle positions
    const posAttr = particlesRef.current.getAttribute("position");
    const targetPosAttr = targetParticles.getAttribute("position");

    if (!posAttr || !targetPosAttr) return;

    for (let i = 0; i < particleCount; i++) {
      const srcX = posAttr.getX(i);
      const srcY = posAttr.getY(i);
      const srcZ = posAttr.getZ(i);

      const tgtX = targetPosAttr.getX(i);
      const tgtY = targetPosAttr.getY(i);
      const tgtZ = targetPosAttr.getZ(i);

      animateVertex(srcX, srcY, srcZ, tgtX, tgtY, tgtZ, i);
    }

    // Animate rotation
    animationVarsRef.current.rotation =
      animationVarsRef.current.rotation === 45 ? -45 : 45;

    // Slow down after animation
    setTimeout(() => {
      animationVarsRef.current.speed = normalSpeed;
    }, 2300);
  };

  const animateVertex = (
    sx: number,
    sy: number,
    sz: number,
    tx: number,
    ty: number,
    tz: number,
    idx: number
  ) => {
    const startTime = Date.now();
    const duration = 2000;

    const updateVertex = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Elastic easing
      const easeProgress = easeOutElastic(progress);

      const x = sx + (tx - sx) * easeProgress;
      const y = sy + (ty - sy) * easeProgress;
      const z = sz + (tz - sz) * easeProgress;

      const posAttr = particlesRef.current?.getAttribute("position");
      if (posAttr) {
        posAttr.setXYZ(idx, x, y, z);
        posAttr.needsUpdate = true;
      }

      if (progress < 1) {
        requestAnimationFrame(updateVertex);
      }
    };

    updateVertex();
  };

  const easeOutElastic = (t: number): number => {
    const c5 = (2 * Math.PI) / 4.5;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c5) + 1;
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-10 flex gap-5">
        {["CLICK", "TO", "SWITCH"].map((text, idx) => (
          <button
            key={idx}
            onClick={() => morphTo(idx)}
            className="px-1 py-0.5 text-sm text-white cursor-pointer transition-all duration-500 hover:text-red-500"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

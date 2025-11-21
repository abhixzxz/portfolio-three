"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface PlaneData {
  mesh: THREE.Mesh;
  uniforms: Record<string, { value: number | THREE.Texture }>;
  isHovering: boolean;
  imgSrc: string;
  targetStrength: number;
  individualOffset: number;
}

export default function ProjectAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planesRef = useRef<PlaneData[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const animationRef = useRef<number | null>(null);

  const layoutRef = useRef({
    columns: 3,
    spacingX: 1.8,
    spacingY: 1.8,
    planeSize: 1.5,
  });

  const images = [
    "https://images.unsplash.com/photo-1576506542790-51244b486a6b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1749916884078-e8359b2adcdd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1751554827598-c96cb294c0e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1750117839548-0500942b9dfe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1752643719885-d3a7408ec711?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / (window.innerHeight - 80),
      0.1,
      100
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight - 80);
    renderer.setPixelRatio(window.devicePixelRatio);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Load textures and create planes
    const loader = new THREE.TextureLoader();

    images.forEach((img, i) => {
      const texture = loader.load(img);
      const planeUniforms = {
        uTime: { value: 0 },
        uTexture: { value: texture },
        uStrength: { value: 0 },
        uHoverTime: { value: 0 },
      };

      const material = new THREE.ShaderMaterial({
        uniforms: planeUniforms,
        vertexShader: `
          precision mediump float;
          uniform float uTime;
          uniform float uStrength;
          uniform float uHoverTime;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float individualTime = uTime + float(${i}) * 0.5;
            pos.z += uStrength * 0.15 * sin(individualTime * 3.0 + pos.x * 8.0) * cos(individualTime * 3.0 + pos.y * 8.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          precision mediump float;
          uniform float uTime;
          uniform float uStrength;
          uniform float uHoverTime;
          uniform sampler2D uTexture;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv;
            float individualTime = uTime + float(${i}) * 0.5;

            vec2 aspect = vec2(1.0, 1.0);
            vec2 imageUv = (uv - 0.5) / aspect + 0.5;
            imageUv = clamp(imageUv, 0.0, 1.0);

            imageUv.y += uStrength * 0.02 * sin(imageUv.x * 15.0 + individualTime * 4.0);
            imageUv.x += uStrength * 0.02 * cos(imageUv.y * 15.0 + individualTime * 4.0);

            gl_FragColor = texture2D(uTexture, imageUv);
          }
        `,
        transparent: true,
      });

      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(
          layoutRef.current.planeSize,
          layoutRef.current.planeSize,
          30,
          30
        ),
        material
      );

      const col = i % layoutRef.current.columns;
      const row = Math.floor(i / layoutRef.current.columns);

      plane.position.x = (col - 1) * layoutRef.current.spacingX;
      plane.position.y = (1 - row) * layoutRef.current.spacingY;

      scene.add(plane);
      planesRef.current.push({
        mesh: plane,
        uniforms: planeUniforms,
        isHovering: false,
        imgSrc: img,
        targetStrength: 0,
        individualOffset: i * 0.3,
      });
    });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(
        planesRef.current.map((p) => p.mesh)
      );

      renderer.domElement.style.cursor =
        intersects.length > 0 ? "pointer" : "default";

      planesRef.current.forEach((planeData) => {
        if (intersects.find((hit) => hit.object === planeData.mesh)) {
          if (!planeData.isHovering) {
            planeData.isHovering = true;
            planeData.targetStrength = 1.0;
          }
        } else {
          if (planeData.isHovering) {
            planeData.isHovering = false;
            planeData.targetStrength = 0;
          }
        }
      });
    };

    // Click handler
    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(
        planesRef.current.map((p) => p.mesh)
      );
      if (intersects.length > 0) {
        const clickedPlane = planesRef.current.find(
          (p) => p.mesh === intersects[0].object
        );
        if (clickedPlane) {
          Fancybox.show([{ src: clickedPlane.imgSrc, type: "image" }]);
        }
      }
    };

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight - 80;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (width < 600) {
        layoutRef.current.columns = 1;
        layoutRef.current.spacingX = 0;
        layoutRef.current.spacingY = 1.6;
        layoutRef.current.planeSize = 2.5;
      } else {
        layoutRef.current.columns = 3;
        layoutRef.current.spacingX = 1.8;
        layoutRef.current.spacingY = 1.8;
        layoutRef.current.planeSize = 1.5;
      }

      updatePlanesLayout();
    };

    const updatePlanesLayout = () => {
      planesRef.current.forEach((p, i) => {
        const col = i % layoutRef.current.columns;
        const row = Math.floor(i / layoutRef.current.columns);
        p.mesh.geometry.dispose();
        p.mesh.geometry = new THREE.PlaneGeometry(
          layoutRef.current.planeSize,
          layoutRef.current.planeSize,
          30,
          30
        );
        p.mesh.position.x =
          (col - (layoutRef.current.columns - 1) / 2) *
          layoutRef.current.spacingX;
        p.mesh.position.y =
          (Math.floor(i / layoutRef.current.columns) - 0.5) *
          -layoutRef.current.spacingY;

        p.individualOffset = i * 0.3;
        p.targetStrength = 0;
        p.uniforms.uStrength.value = 0;
      });
    };

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      planesRef.current.forEach(({ uniforms, targetStrength }) => {
        uniforms.uTime.value += 0.012;
        uniforms.uHoverTime.value += 0.015;

        const strengthDiff =
          targetStrength - (uniforms.uStrength.value as number);
        uniforms.uStrength.value =
          (uniforms.uStrength.value as number) + strengthDiff * 0.08;

        if (Math.abs(uniforms.uStrength.value as number) < 0.01) {
          uniforms.uStrength.value = 0;
        }
      });
      renderer.render(scene, camera);
    };

    // Event listeners
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);

    // Initialize layout and start animation
    handleResize();
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      planesRef.current.forEach((p) => {
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.ShaderMaterial).dispose();
      });
    };
  }, []);

  return (
    <div
      style={{
        margin: 0,
        overflow: "hidden",
        background: "#111",
        minHeight: "100vh",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100vh",
        }}
      />
    </div>
  );
}

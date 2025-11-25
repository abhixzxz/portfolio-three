"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  currentImageIndex: number;
  slideImages: Array<{ url: string; alt: string }>;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  currentImageIndex,
  slideImages,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    camera.position.z = 1;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0.1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    const displacementTexture = textureLoader.load(
      "https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=512&h=512&fit=crop"
    );

    const vertexShader = `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.z += sin(position.x * 0.01 + uTime * 0.5) * 0.5;
        pos.z += cos(position.y * 0.01 + uTime * 0.5) * 0.5;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D texture1;
      uniform sampler2D disp;
      uniform float effectFactor;
      uniform float uTime;
      uniform vec2 mouse;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        vec4 disp = texture2D(disp, uv + uTime * 0.05);
        
        float wave = sin(uv.y * 10.0 + uTime) * 0.02;
        uv.x += wave;
        
        vec2 distortedPosition = vec2(uv.x, uv.y);
        float distance = length(uv - mouse);
        float maxDistance = 0.3;
        
        if (distance < maxDistance) {
          float power = 1.0 - (distance / maxDistance);
          distortedPosition += (uv - mouse) * power * effectFactor * disp.r;
        }
        
        vec2 offset = effectFactor * 0.02 * disp.rg;
        offset += wave * 0.5;
        
        float r = texture2D(texture1, distortedPosition + offset).r;
        float g = texture2D(texture1, distortedPosition).g;
        float b = texture2D(texture1, distortedPosition - offset).b;
        
        float shimmer = sin(uv.y * 5.0 + uTime) * 0.05 + 0.95;
        gl_FragColor = vec4(r * shimmer, g * shimmer, b * shimmer, 0.15);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        effectFactor: { value: 0.0 },
        uTime: { value: 0.0 },
        texture1: { value: null },
        disp: { value: displacementTexture },
        mouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(width, height, 50, 50);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const updateImage = (index: number) => {
      textureLoader.load(
        slideImages[index].url,
        (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          if (materialRef.current) {
            materialRef.current.uniforms.texture1.value = texture;
          }
        },
        undefined,
        (error) => {
          console.error("Failed to load texture:", error);
        }
      );
    };

    updateImage(currentImageIndex);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetMouseRef.current.x = (e.clientX - rect.left) / width;
      targetMouseRef.current.y = 1.0 - (e.clientY - rect.top) / height;
    };

    let time = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.1;

      if (materialRef.current) {
        materialRef.current.uniforms.mouse.value.set(
          mouseRef.current.x,
          mouseRef.current.y
        );
        materialRef.current.uniforms.effectFactor.value = 0.5;
        materialRef.current.uniforms.uTime.value = time;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;

      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      cameraRef.current.left = newWidth / -2;
      cameraRef.current.right = newWidth / 2;
      cameraRef.current.top = newHeight / 2;
      cameraRef.current.bottom = newHeight / -2;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(newWidth, newHeight);

      if (mesh.geometry) {
        mesh.geometry.dispose();
        mesh.geometry = new THREE.PlaneGeometry(newWidth, newHeight, 50, 50);
      }
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current && containerRef.current) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          // Element already removed
        }
      }
      geometry.dispose();
      material.dispose();
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [currentImageIndex, slideImages]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
};

export default ThreeBackground;

"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { X, ExternalLink } from "lucide-react";

interface PlaneData {
  mesh: THREE.Mesh;
  uniforms: Record<string, { value: number | THREE.Texture }>;
  isHovering: boolean;
  imgSrc: string;
  targetStrength: number;
  individualOffset: number;
  projectData: (typeof projectsData)[0];
}

const projectsData = [
  {
    title: "Viacar",
    description: "Book cars & Publish ride",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajk-viacar.webp",
    link: "https://viacar.vercel.app/",
  },
  {
    title: "Fast Legend",
    description: "A brief description of Project 2.",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajk-fastlegend.webp",
    link: "https://fastlegend.vercel.app/",
  },
  {
    title: "Kareflow.ai",
    description:
      "A collection of the work I’ve built with React, Node.js, and modern web technologies—ranging from full-stack applications to real-world problem-solving tools. Each project reflects my focus on clean architecture, performance, and delightful user experiences.",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajkviacar.webp",
    link: "https://www.kareflowai.com/",
  },
  {
    title: "Mydear pa",
    description:
      "MyDearPa is a platform that connects patients with healthcare providers.",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajk-mydearpa.webp",
    link: "https://mydearpa.com/",
  },
  {
    title: "Mykare app",
    description:
      "MyKare — A fintech-healthcare app by JustKare Technologies that helps users save daily via UPI into digital gold, mutual funds, or recurring deposits to build a “health fund.",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajk-mykare%20appp.webp",
    link: "https://mykareapp.com",
  },
  {
    title: "Karetrip.com",
    description:
      "Karetrip — A medical-travel platform (run by JustKare Technologies) that helps international patients access healthcare in India. It offers end-to-end support: doctor & hospital recommendations, treatment quotes, second opinions, and priority admissions",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/karetrip-abhirajk.webp",
    link: "https://karetrip.com",
  },
];

export default function ProjectAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planesRef = useRef<PlaneData[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const animationRef = useRef<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);

  const layoutRef = useRef({
    columns: 3,
    spacingX: 1.8,
    spacingY: 1.8,
    planeSize: 1.5,
  });

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

    projectsData.forEach((project, i) => {
      const texture = loader.load(project.image);
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
        imgSrc: project.image,
        targetStrength: 0,
        individualOffset: i * 0.3,
        projectData: project,
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
          setSelectedProject(clickedPlane.projectData);
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
      } else if (width < 1024) {
        layoutRef.current.columns = 2;
        layoutRef.current.spacingX = 1.5;
        layoutRef.current.spacingY = 1.5;
        layoutRef.current.planeSize = 1.8;
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
        (uniforms.uTime.value as number) += 0.012;
        (uniforms.uHoverTime.value as number) += 0.015;

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

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg overflow-hidden max-w-2xl w-full animate-in fade-in zoom-in duration-300">
            {/* Image Container */}
            <div className="relative w-full h-auto">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-auto max-h-96 object-cover"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              >
                <X size={24} />
              </button>

              {/* Project Info - Bottom Right */}
              <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black to-transparent p-6 sm:p-8">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Live Demo Button */}
                  <button
                    onClick={() => window.open(selectedProject.link, "_blank")}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

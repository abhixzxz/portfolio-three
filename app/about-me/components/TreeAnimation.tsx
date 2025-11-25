"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import {
  ArrowRight,
  Code2,
  Cpu,
  Globe,
  Sparkles,
  Briefcase,
  Calendar,
  Database,
  Server,
  Smartphone,
  Terminal,
  Layers,
  Home,
} from "lucide-react";
import Link from "next/link";

// =========================================
// DATA: PROFESSIONAL JOURNEY & SKILLS
// =========================================

const EXPERIENCE = [
  {
    company: "MyKare Health",
    role: "Sr.Software Developer",
    period: "2024 - Present",
    tagline: "Revolutionizing Healthtech Solutions",
    points: [
      "Developed scalable healthtech solutions using Next.js for improved performance",
      "Implemented secure and HIPAA-compliant APIs for healthcare data integration",
      "Optimized appointment scheduling and patient management systems",
      "Built real-time dashboards to deliver actionable healthcare insights",
      "Built a React Native app for healthcare savings and expense tracking",
    ],
  },
  {
    company: "Amiyon Solutions Pvt Ltd",
    role: "Node.js Developer",
    period: "Nov 2023",
    tagline: "Communication & Integration Solutions",
    points: [
      "Developed comprehensive WhatsApp integration modules",
      "Optimized communication processes across multiple projects",
      "Implemented robust API authentication mechanisms",
      "Enhanced real-time messaging systems to improve performance and scalability",
    ],
  },
  {
    company: "Safe Software and Integrated Solution",
    role: "Software Engineer",
    period: "Jul 2023",
    tagline: "Fintech Innovation",
    points: [
      "Engineered innovative solutions in the fintech sector",
      "Designed and implemented scalable software architectures",
      "Managed complex database systems and API development",
      "Conducted performance tuning and system optimization for enterprise-grade software",
    ],
  },
  {
    company: "Promoz soft Pvt Ltd",
    role: "JR.Software Developer",
    period: "Jun 2021",
    tagline: "Accounting Solutions",
    points: [
      "Developed innovative mobile applications and websites tailored for accounting solutions",
      "Designed and implemented scalable software architectures for financial data management",
      "Integrated advanced database systems and APIs to streamline accounting workflows",
    ],
  },
];

const SKILLS = [
  {
    category: "Web Development",
    icon: <Globe size={20} />,
    items: [
      "React.js",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "SCSS",
      "Styled Components",
    ],
  },
  {
    category: "Backend Technologies",
    icon: <Server size={20} />,
    items: [
      "Node.js",
      "Express.js",
      "Nest.js",
      "GraphQL",
      "REST APIs",
      "WebSockets",
      "Microservices",
      "Python Django",
    ],
  },
  {
    category: "Mobile Development",
    icon: <Smartphone size={20} />,
    items: ["React Native", "Flutter", "Progressive Web Apps (PWA)"],
  },
  {
    category: "Database & Storage",
    icon: <Database size={20} />,
    items: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Firebase",
      "ORM (Mongoose, Sequelize)",
      "Database Design",
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: <Layers size={20} />,
    items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD"],
  },
];

// =========================================
// 3D COMPONENT (UNTOUCHED LOGIC)
// =========================================
const BlackHoleScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);
  const diskMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const CONSTANTS = {
    BLACK_HOLE_EVENT_HORIZON_RADIUS: 1.0,
    DISK_INNER_RADIUS: 1.15,
    DISK_OUTER_RADIUS: 5.5,
    LENSING_SPHERE_RADIUS: 1.07,
    GLOW_RADIUS_FACTOR: 1.07,
    PHOTON_SPHERE_RADIUS: 1.5,
    RIPPLE_COOLDOWN: 0.5,
    DISK_ECHO_DURATION: 2.8,
  };

  const themes = {
    inferno: {
      diskHot: new THREE.Color(0xffffff),
      diskMid: new THREE.Color(0xffaa33),
      diskEdge: new THREE.Color(0xcc331a),
      diskDeep: new THREE.Color(0x661a00),
      lensing: new THREE.Color(0xffcc66),
      glow: new THREE.Color(0xff8833),
      photonSphere: new THREE.Color(0xffbb44),
      primaryWave: new THREE.Color(0xffaa33),
      secondaryWave: new THREE.Color(0xff5500),
      tertiaryWave: new THREE.Color(0xffdd22),
    },
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000004, 0.085);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.7,
      0.7,
      0.75
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.04;
    controls.rotateSpeed = 0.6;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.12;
    controls.target.set(0, 0, 0);
    controls.minDistance = 2.5;
    controls.maxDistance = 100;
    controls.enablePan = false;
    controlsRef.current = controls;

    const clock = new THREE.Clock();
    clockRef.current = clock;

    // Stars Logic
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 45000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starAlphas = new Float32Array(starCount);
    const starFieldRadius = 1200;

    const baseColor = new THREE.Color(0xffffff);
    const blueColor = new THREE.Color(0xaaddff);
    const yellowColor = new THREE.Color(0xffffaa);
    const redColor = new THREE.Color(0xffcccc);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / starCount);
      const radius = Math.cbrt(Math.random()) * starFieldRadius;

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);

      const starColor = baseColor.clone();
      const colorType = Math.random();
      let colorIntensity = Math.random() * 0.4 + 0.6;

      if (colorType < 0.5) {
        starColor.lerp(blueColor, Math.random() * 0.3);
      } else if (colorType < 0.85) {
        starColor.lerp(yellowColor, Math.random() * 0.2);
        colorIntensity *= 0.9;
      } else {
        starColor.lerp(redColor, Math.random() * 0.15);
        colorIntensity *= 0.8;
      }

      starColor.multiplyScalar(colorIntensity);
      starColors[i3] = starColor.r;
      starColors[i3 + 1] = starColor.g;
      starColors[i3 + 2] = starColor.b;

      const sizeVariation = Math.random();
      if (sizeVariation > 0.997) {
        starSizes[i] = THREE.MathUtils.randFloat(1.5, 2.2);
      } else if (sizeVariation > 0.98) {
        starSizes[i] = THREE.MathUtils.randFloat(0.8, 1.5);
      } else {
        starSizes[i] = THREE.MathUtils.randFloat(0.3, 0.8);
      }

      const distFactor = Math.min(1.0, radius / starFieldRadius);
      starSizes[i] *= 1.0 - distFactor * 0.3;
      starAlphas[i] = Math.random() * 0.5 + 0.5;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );
    starGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(starColors, 3)
    );
    starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute(
      "alpha",
      new THREE.BufferAttribute(starAlphas, 1)
    );

    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uDiskEchoActive: { value: 0.0 },
        uDiskEchoIntensity: { value: 0.0 },
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uDiskEchoActive;
        uniform float uDiskEchoIntensity;
        void main() {
            vColor = color;
            vAlpha = alpha;
            vec3 adjustedPosition = position;
            if (uDiskEchoActive > 0.0) {
                float distFromCenter = length(position);
                float pushFactor = uDiskEchoIntensity * 0.025 * smoothstep(50.0, 300.0, distFromCenter);
                adjustedPosition = position * (1.0 + pushFactor);
            }
            vec4 mvPosition = modelViewMatrix * vec4(adjustedPosition, 1.0);
            gl_PointSize = size * (350.0 / -mvPosition.z) * (1.0 + uDiskEchoIntensity * 0.35);
            gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uDiskEchoIntensity;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
            float r = length(gl_PointCoord - vec2(0.5, 0.5));
            float baseAlpha = 1.0 - smoothstep(0.45, 0.5, r);
            if (baseAlpha < 0.01) discard;
            float twinkleSpeed = vAlpha * 1.5 + 0.5 + uDiskEchoIntensity * 4.0;
            float twinkleRange = 0.15 + uDiskEchoIntensity * 0.4;
            float twinkle = sin(uTime * twinkleSpeed + vAlpha * 10.0) * twinkleRange + 0.9;
            vec3 finalColor = vColor * twinkle * (1.0 + uDiskEchoIntensity * 0.9);
            gl_FragColor = vec4(finalColor, baseAlpha * vAlpha * (1.0 + uDiskEchoIntensity * 0.45));
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Black hole & Disk
    const blackHoleGeometry = new THREE.SphereGeometry(
      CONSTANTS.BLACK_HOLE_EVENT_HORIZON_RADIUS,
      64,
      32
    );
    const blackHoleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
    blackHole.renderOrder = 0;
    scene.add(blackHole);

    const diskGeometry = new THREE.RingGeometry(
      CONSTANTS.DISK_INNER_RADIUS,
      CONSTANTS.DISK_OUTER_RADIUS,
      128,
      64
    );
    const diskMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorHot: { value: themes.inferno.diskHot.clone() },
        uColorMid: { value: themes.inferno.diskMid.clone() },
        uColorEdge: { value: themes.inferno.diskEdge.clone() },
        uColorDeep: { value: themes.inferno.diskDeep.clone() },
        uCameraPosition: { value: camera.position },
        uRippleActive: { value: 0.0 },
        uRippleStartTime: { value: 0.0 },
        uRippleDuration: { value: CONSTANTS.DISK_ECHO_DURATION },
        uPrimaryWaveColor: { value: themes.inferno.primaryWave.clone() },
        uSecondaryWaveColor: { value: themes.inferno.secondaryWave.clone() },
        uTertiaryWaveColor: { value: themes.inferno.tertiaryWave.clone() },
        uRippleMaxRadius: { value: CONSTANTS.DISK_OUTER_RADIUS },
        uRippleThickness: { value: CONSTANTS.DISK_OUTER_RADIUS * 0.12 },
        uRippleIntensity: { value: 0.0 },
        uRippleDistortionStrength: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying float vRadius;
        uniform float uRippleDistortionStrength;
        uniform float uTime;
        void main() {
            vUv = uv;
            vPosition = position;
            vRadius = length(position.xy);
            vec3 adjustedPosition = position;
            if (uRippleDistortionStrength > 0.0) {
                float angle = atan(position.y, position.x);
                float distortionAmount = sin(angle * 10.0 + uTime * 7.0 + vRadius * 2.0) * 0.08 * uRippleDistortionStrength;
                adjustedPosition.z += distortionAmount;
            }
            gl_Position = projectionMatrix * modelViewMatrix * vec4(adjustedPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorHot;
        uniform vec3 uColorMid;
        uniform vec3 uColorEdge;
        uniform vec3 uColorDeep;
        uniform vec3 uCameraPosition;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying float vRadius;
        uniform float uRippleActive;
        uniform float uRippleStartTime;
        uniform float uRippleDuration;
        uniform vec3 uPrimaryWaveColor;
        uniform vec3 uSecondaryWaveColor;
        uniform vec3 uTertiaryWaveColor;
        uniform float uRippleMaxRadius;
        uniform float uRippleThickness;
        uniform float uRippleIntensity;
        float rand(vec2 n){return fract(sin(dot(n,vec2(12.9898,4.1414)))*43758.5453);}
        float noise(vec2 p){
            vec2 ip=floor(p);
            vec2 u=fract(p);
            u=u*u*(3.0-2.0*u);
            float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
            return res*res;
        }
        void main(){
            float dist = vRadius;
            float innerEdge = 1.15;
            float outerEdge = 5.5;
            float normalizedPos = clamp((dist - innerEdge) / (outerEdge - innerEdge), 0.0, 1.0);
            float angle = atan(vPosition.y, vPosition.x);
            float orbitalVelocity = 1.0 / sqrt(max(dist, 0.1));
            float rotationSpeedFactor = 4.8/(pow(dist,1.6)+1.1);
            float rotatedAngle = angle-uTime*rotationSpeedFactor*0.52;
            vec3 color = mix(uColorHot, uColorMid, smoothstep(0.0, 0.40, normalizedPos));
            color = mix(color, uColorEdge, smoothstep(0.40, 0.80, normalizedPos));
            color = mix(color, uColorDeep, smoothstep(0.80, 1.0, normalizedPos));
            float patternBrightness = 1.15;
            float radialBrightness = pow(1.0-smoothstep(0.0,0.8,normalizedPos),1.9)*3.0+0.25;
            float finalBrightness = patternBrightness*radialBrightness;
            color *= finalBrightness;
            float innerAlpha = smoothstep(0.0, 0.06, normalizedPos);
            float outerAlpha = 1.0 - smoothstep(0.85, 1.0, normalizedPos);
            float alpha = innerAlpha * outerAlpha * 0.85;
            gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    diskMaterialRef.current = diskMaterial;

    const accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);
    accretionDisk.rotation.x = Math.PI / 2.6;
    accretionDisk.renderOrder = 1;
    scene.add(accretionDisk);

    const glowGeometry = new THREE.SphereGeometry(
      CONSTANTS.BLACK_HOLE_EVENT_HORIZON_RADIUS,
      64,
      32
    );
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: themes.inferno.glow,
      transparent: true,
      opacity: 0.3,
    });
    const glowEffect = new THREE.Mesh(glowGeometry, glowMaterial);
    glowEffect.scale.multiplyScalar(CONSTANTS.GLOW_RADIUS_FACTOR * 1.16);
    glowEffect.renderOrder = 3;
    scene.add(glowEffect);

    // Initial Camera Anim
    const startPosition = new THREE.Vector3(0, 15, 18);
    const endPosition = new THREE.Vector3(0, 5, 8);
    const duration = 4500;
    const startTime = Date.now();
    camera.position.copy(startPosition);
    controls.enabled = false;

    const updateCamera = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const t = 1 - Math.pow(1 - progress, 5);
        camera.position.lerpVectors(startPosition, endPosition, t);
        controls.target.set(0, 0, 0);
        requestAnimationFrame(updateCamera);
      } else {
        camera.position.copy(endPosition);
        controls.target.set(0, 0, 0);
        controls.enabled = true;
      }
    };
    updateCamera();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = clock.getDelta();

      diskMaterial.uniforms.uTime.value = elapsedTime;
      diskMaterial.uniforms.uCameraPosition.value.copy(camera.position);
      starMaterial.uniforms.uTime.value = elapsedTime;

      controls.update();
      stars.rotation.y += deltaTime * 0.004;
      stars.rotation.x += deltaTime * 0.0015;
      composer.render(deltaTime);
    };
    animate();

    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
      bloomPass.resolution.set(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-b from-slate-950 to-black"
    />
  );
};

// =========================================
// UI COMPONENTS
// =========================================

// Reusable Glass Card
const GlassCard = ({
  children,
  className = "",
  addAccent = false,
}: {
  children: React.ReactNode;
  className?: string;
  addAccent?: boolean;
}) => (
  <div
    className={`
    relative overflow-hidden rounded-xl 
    border border-[rgba(255,185,50,0.2)] bg-black/60 backdrop-blur-xl 
    shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] 
    transition-all duration-300 
    hover:border-[rgba(255,185,50,0.5)] hover:bg-black/70 hover:shadow-[0_8px_32px_0_rgba(255,200,87,0.15)]
    ${addAccent ? "border-l-[rgb(255,200,87)] border-l-4" : ""}
    ${className}
  `}
  >
    <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgb(255,200,87)_0%,transparent_60%)] pointer-events-none" />
    {children}
  </div>
);

// Section Header
const SectionTitle = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-3 mb-8 group">
    <div className="p-2 rounded-lg bg-[rgba(255,185,50,0.1)] text-[rgb(255,200,87)] ring-1 ring-[rgba(255,185,50,0.3)] group-hover:ring-[rgb(255,200,87)] transition-all">
      <Icon size={20} />
    </div>
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[rgb(255,220,130)] transition-colors">
      {title}
    </h2>
  </div>
);

export default function AboutPage() {
  return (
    <div className="relative w-full h-screen bg-black text-slate-200 font-sans selection:bg-[rgba(255,185,50,0.5)] selection:text-white">
      {/* 1. Fixed Background Layers */}
      <div className="fixed inset-0 z-0">
        <BlackHoleScene />
      </div>
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Globe
            size={1000}
            strokeWidth={0.5}
            className="text-[rgb(255,200,87)] animate-[spin_120s_linear_infinite]"
          />
        </div>
      </div>
      <div className="fixed inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* 2. Scrollable Content Overlay */}
      <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar">
        <div className="w-full max-w-6xl mx-auto px-6 py-20 md:py-32 flex flex-col gap-20">
          {/* --- HERO / PHILOSOPHY --- */}
          <section className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-2/3 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,185,50,0.1)] border border-[rgba(255,185,50,0.3)] text-[rgb(255,200,87)] text-xs font-bold tracking-widest uppercase">
                <Sparkles size={12} />
                <span>Full Stack Developer</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[rgb(255,250,220)] via-[rgb(255,200,87)] to-[rgb(180,120,0)] pb-2">
                Bridging Design <br /> & Technology.
              </h1>

              <GlassCard className="p-8 backdrop-blur-2xl bg-black/40">
                <p className="text-lg text-slate-300 leading-relaxed font-light mb-4">
                  As a versatile{" "}
                  <strong className="text-[rgb(255,200,87)]">
                    Full Stack Developer
                  </strong>
                  , I am passionate about bridging the gap between innovative
                  design and robust technical implementation. With a deep
                  understanding of both frontend and backend technologies, I
                  work to create seamless digital experiences that are not only
                  functional but also aesthetically pleasing.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  My approach integrates cutting-edge technologies with
                  strategic problem-solving techniques, ensuring that the
                  solutions I deliver are scalable, maintainable, and
                  user-centric.
                </p>
              </GlassCard>

              <div className="flex gap-4">
                <Link href="/contact-me">
                  <button className="cursor-pointer group flex items-center gap-2 px-6 py-3 bg-[rgb(255,200,87)] text-black rounded-lg font-bold transition-all hover:scale-105 hover:bg-[rgb(255,220,130)] shadow-[0_0_20px_rgba(255,200,87,0.3)]">
                    Contact Me
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>

                <Link href="/">
                  <button className="cursor-pointer  flex  items-center justify-center px-6 py-3 rounded-lg font-bold text-[rgb(255,200,87)] border border-[rgba(255,185,50,0.5)] hover:bg-[rgba(255,185,50,0.1)] transition-colors">
                    Go to Home
                    <Home className="w-4 h-4 ml-2" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Quick Stats Sidebar */}
            <div className="w-full md:w-1/3 flex flex-col gap-4 sticky top-10">
              <GlassCard className="p-6 flex items-center justify-between group">
                <div>
                  <div className="text-4xl font-bold text-white">4+</div>
                  <div className="text-xs text-[rgb(255,200,87)] uppercase tracking-wider font-semibold">
                    Years Experience
                  </div>
                </div>
                <Briefcase className="text-[rgb(255,200,87)] opacity-50 group-hover:scale-110 transition-transform" />
              </GlassCard>
              <GlassCard className="p-6 flex items-center justify-between group">
                <div>
                  <div className="text-4xl font-bold text-white">20+</div>
                  <div className="text-xs text-[rgb(255,200,87)] uppercase tracking-wider font-semibold">
                    Projects Shipped
                  </div>
                </div>
                <Code2 className="text-[rgb(255,200,87)] opacity-50 group-hover:scale-110 transition-transform" />
              </GlassCard>
            </div>
          </section>

          {/* --- EXPERIENCE SECTION --- */}
          <section>
            <SectionTitle icon={Briefcase} title="Professional Journey" />
            <div className="relative pl-8 border-l border-[rgba(255,185,50,0.2)] space-y-12">
              {EXPERIENCE.map((job, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[37px] top-6 w-4 h-4 rounded-full bg-black border-2 border-[rgb(255,200,87)] shadow-[0_0_10px_rgba(255,200,87,0.5)] group-hover:scale-125 transition-transform" />

                  <GlassCard className="p-8" addAccent={true}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[rgb(255,200,87)] transition-colors">
                          {job.role}
                        </h3>
                        <p className="text-lg text-[rgb(255,220,130)]">
                          {job.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-mono text-slate-400 bg-black/40 px-3 py-1 rounded border border-white/10">
                        <Calendar size={14} />
                        {job.period}
                      </div>
                    </div>

                    <p className="text-sm font-medium text-[rgb(255,185,50)] uppercase tracking-wide mb-4 opacity-80">
                      {job.tagline}
                    </p>

                    <ul className="space-y-2">
                      {job.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-slate-300 text-sm md:text-base leading-relaxed"
                        >
                          <span className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-[rgb(255,200,87)] opacity-60" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              ))}
            </div>
          </section>

          {/* --- TECHNICAL SKILLS --- */}
          <section>
            <SectionTitle icon={Cpu} title="Technical Expertise" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS.map((skillGroup, index) => (
                <GlassCard key={index} className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <div className="text-[rgb(255,200,87)]">
                      {skillGroup.icon}
                    </div>
                    <h4 className="font-bold text-white">
                      {skillGroup.category}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-xs font-mono rounded bg-white/5 border border-white/10 text-slate-300 hover:text-[rgb(255,200,87)] hover:border-[rgba(255,185,50,0.5)] transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

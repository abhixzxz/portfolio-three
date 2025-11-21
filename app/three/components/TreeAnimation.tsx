"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

declare global {
  interface Window {
    SimplexNoise: any;
    TweenMax: any;
    Power1: any;
    Elastic: any;
    chroma: any;
  }
}

export default function PlanetScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    cameraCtrl?: OrbitControls;
    planet?: THREE.Object3D;
    objects?: THREE.Object3D[];
    width?: number;
    height?: number;
  }>({});

  useEffect(() => {
    // Load external libraries
    const loadLibraries = async () => {
      // Load SimplexNoise
      if (!window.SimplexNoise) {
        const script1 = document.createElement("script");
        script1.src =
          "https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js";
        document.head.appendChild(script1);
      }

      // Load GSAP (TweenMax)
      if (!window.TweenMax) {
        const script2 = document.createElement("script");
        script2.src =
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        document.head.appendChild(script2);
      }

      // Load Chroma
      if (!window.chroma) {
        const script3 = document.createElement("script");
        script3.src =
          "https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js";
        document.head.appendChild(script3);
      }

      // Wait for libraries to load
      await new Promise((resolve) => setTimeout(resolve, 1500));
    };

    loadLibraries().then(() => {
      if (containerRef.current) {
        initScene();
      }
    });

    return () => {
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
        window.removeEventListener("resize", updateSize);
      }
    };
  }, []);

  const initScene = () => {
    const conf = {
      fov: 50,
      cameraZ: 400,
    };

    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneRef.current.width = width;
    sceneRef.current.height = height;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
    sceneRef.current.renderer = renderer;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      conf.fov,
      width / height,
      0.1,
      10000
    );
    camera.position.z = conf.cameraZ;
    sceneRef.current.camera = camera;

    // Controls
    const cameraCtrl = new OrbitControls(camera, renderer.domElement);
    cameraCtrl.enableDamping = true;
    cameraCtrl.dampingFactor = 0.1;
    cameraCtrl.rotateSpeed = 0.1;
    cameraCtrl.autoRotate = true;
    cameraCtrl.autoRotateSpeed = 0.1;
    sceneRef.current.cameraCtrl = cameraCtrl;

    // Scene
    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xcccccc));

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(200, 0, 100);
    scene.add(light);

    sceneRef.current.scene = scene;

    // Create planet
    createPlanet(scene);

    // Handle resize
    const updateSize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      sceneRef.current.width = newWidth;
      sceneRef.current.height = newHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", updateSize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (cameraCtrl) cameraCtrl.update();
      renderer.render(scene, camera);
    };

    animate();
  };

  const createPlanet = (scene: THREE.Scene) => {
    const simplex = new window.SimplexNoise();
    const planet = new THREE.Object3D();
    scene.add(planet);
    sceneRef.current.planet = planet;

    const noises: number[] = [];
    const noiseF = 0.015;
    const noiseD = 15;
    const noiseWaterTreshold = 0.4;
    const noiseWaterLevel = 0.2;

    const vNoise = (v: THREE.Vector3, f: number, i?: number) => {
      const nv = new THREE.Vector3(v.x, v.y, v.z).multiplyScalar(f);
      let noise = (simplex.noise3D(nv.x, nv.y, nv.z) + 1) / 2;
      noise = noise > noiseWaterTreshold ? noise : noiseWaterLevel;
      if (Number.isInteger(i)) noises[i as number] = noise;
      return noise;
    };

    const dispV = (v: THREE.Vector3, i?: number) => {
      const dv = new THREE.Vector3(v.x, v.y, v.z);
      dv.add(
        dv
          .clone()
          .normalize()
          .multiplyScalar(vNoise(dv, noiseF, i) * noiseD)
      );
      v.x = dv.x;
      v.y = dv.y;
      v.z = dv.z;
    };

    // Planet geometry
    const geometry = new THREE.IcosahedronGeometry(100, 4);
    for (let i = 0; i < geometry.attributes.position.array.length / 3; i++) {
      const vertex = new THREE.Vector3(
        geometry.attributes.position.getX(i),
        geometry.attributes.position.getY(i),
        geometry.attributes.position.getZ(i)
      );
      dispV(vertex, i);
      geometry.attributes.position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geometry.computeVertexNormals();

    const material = new THREE.MeshLambertMaterial({
      flatShading: true,
      color: 0x417b2b,
    });

    const mesh = new THREE.Mesh(geometry, material);
    planet.add(mesh);

    // Animation
    planet.scale.set(0.3, 0.3, 0.3);
    window.TweenMax.to(planet.scale, Math.random() * 3 + 2, {
      x: 1,
      y: 1,
      z: 1,
      ease: window.Power1.easeOut,
    });

    // Add trees & rocks
    sceneRef.current.objects = [];
    const cscale = window.chroma.scale([
      "#509A36",
      "#FF5A36",
      "#509A36",
      "#FFC236",
      "#509A36",
    ]);
    const points = getFibonacciSpherePoints(800, 100);

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      dispV(p);

      if (vNoise(p, noiseF) === noiseWaterLevel) continue;

      let obj: THREE.Object3D;

      if (Math.random() > 0.3) {
        const tsize = Math.random() * 10 + 5;
        const bsize = tsize * (Math.random() * 0.2 + 0.5);
        const vn2 = vNoise(p, 0.01);
        const color = window.chroma(cscale(vn2).hex()).hex();
        obj = createTree(tsize, bsize, 0x764114, color);
        obj.position.set(p.x, p.y, p.z);
        obj.lookAt(0, 0, 0);
      } else {
        obj = createRock(Math.random() * 2 + 2);
        obj.position.set(p.x, p.y, p.z);
      }

      sceneRef.current.objects!.push(obj);
      obj.scale.set(0.01, 0.01, 0.01);
      window.TweenMax.to(obj.scale, Math.random() * 7 + 3, {
        x: 1,
        y: 1,
        z: 1,
        ease: window.Elastic.easeOut.config(1, 0.2),
        delay: Math.random() * 4,
      });
      planet.add(obj);
    }

    // Interactivity
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const onMouseMove = (e: MouseEvent) => {
      const width = sceneRef.current.width || window.innerWidth;
      const height = sceneRef.current.height || window.innerHeight;

      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;

      raycaster.setFromCamera(mouse, sceneRef.current.camera!);
      const intersects = raycaster.intersectObjects(
        sceneRef.current.objects || [],
        true
      );

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        // @ts-ignore
        obj = (obj as any).tween ? obj : (obj.parent as THREE.Object3D);
        // @ts-ignore
        if (!(obj as any).tween || !(obj as any).tween.isActive?.()) {
          obj.scale.set(0.5, 0.5, 0.5);
          // @ts-ignore
          (obj as any).tween = window.TweenMax.to(obj.scale, 1.5, {
            x: 1,
            y: 1,
            z: 1,
            ease: window.Elastic.easeOut.config(1, 0.2),
          });
        }
      }
    };

    if (sceneRef.current.renderer) {
      sceneRef.current.renderer.domElement.addEventListener(
        "mousemove",
        onMouseMove
      );
    }
  };

  const createTree = (
    tsize: number,
    bsize: number,
    tcolor: number,
    bcolor: number
  ): THREE.Object3D => {
    const tradius = tsize * 0.1;
    const t1size = tsize / 2;
    const t1radius = tradius * 0.7;

    const tmaterial = new THREE.MeshLambertMaterial({
      color: tcolor,
      flatShading: true,
    });
    const bmaterial = new THREE.MeshLambertMaterial({
      color: bcolor,
      flatShading: true,
    });

    const tree = new THREE.Object3D();

    // Trunk
    const tgeometry = new THREE.CylinderGeometry(
      tradius * 0.7,
      tradius,
      tsize,
      5,
      3,
      true
    );
    tgeometry.translate(0, tsize / 2, 0);
    tgeometry.rotateX(-Math.PI / 2);
    randomizeGeometry(tgeometry, tradius * 0.2);
    const tmesh = new THREE.Mesh(tgeometry, tmaterial);
    tree.add(tmesh);

    // Body
    const bgeometry = new THREE.SphereGeometry(bsize, 4, 4);
    bgeometry.translate(0, tsize + bsize * 0.7, 0);
    bgeometry.rotateX(-Math.PI / 2);
    randomizeGeometry(bgeometry, bsize * 0.2);
    const bmesh = new THREE.Mesh(bgeometry, bmaterial);
    tree.add(bmesh);

    return tree;
  };

  const createRock = (size: number): THREE.Object3D => {
    const material = new THREE.MeshLambertMaterial({
      color: 0x808080,
      flatShading: true,
    });
    const geometry = new THREE.SphereGeometry(size, 5, 4);
    randomizeGeometry(geometry, size * 0.2);
    return new THREE.Mesh(geometry, material);
  };

  const randomizeGeometry = (geo: THREE.BufferGeometry, d: number) => {
    const posAttr = geo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i) + (Math.random() - 0.5) * 2 * d;
      const y = posAttr.getY(i) + (Math.random() - 0.5) * 2 * d;
      const z = posAttr.getZ(i) + (Math.random() - 0.5) * 2 * d;
      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
    geo.computeVertexNormals();
  };

  const getFibonacciSpherePoints = (
    samples: number,
    radius: number
  ): Array<{ x: number; y: number; z: number }> => {
    const points = [];
    const offset = 2 / samples;
    const increment = Math.PI * (3 - Math.sqrt(5));
    const random = Math.random() * samples;

    for (let i = 0; i < samples; i++) {
      const y = (i * offset - 1) * radius + (offset / 2) * radius;
      const distance = Math.sqrt(1 - Math.pow(y / radius, 2));
      const phi = ((i + random) % samples) * increment;
      const x = Math.cos(phi) * distance * radius;
      const z = Math.sin(phi) * distance * radius;
      points.push({ x, y, z });
    }

    return points;
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        background: "radial-gradient(circle, #73aad6, #003962, #000)",
        overflow: "hidden",
      }}
    />
  );
}

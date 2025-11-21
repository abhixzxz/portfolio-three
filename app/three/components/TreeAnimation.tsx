"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface SimplexNoise {
  noise2D: (x: number, y: number) => number;
  noise3D: (x: number, y: number, z: number) => number;
}

interface TweenAnimation {
  isActive?: () => boolean;
  kill?: () => void;
}

interface SceneState {
  renderer?: THREE.WebGLRenderer;
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  cameraCtrl?: OrbitControls;
  planet?: THREE.Object3D;
  objects?: THREE.Object3D[];
  width?: number;
  height?: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ObjectWithTween extends THREE.Object3D {
  tween?: TweenAnimation;
}

declare global {
  interface Window {
    SimplexNoise: new () => SimplexNoise;
    TweenMax: {
      to: (
        target: unknown,
        duration: number,
        props: Record<string, unknown>
      ) => TweenAnimation;
      kill: (target?: unknown) => void;
    };
    Power1: {
      easeInOut: (t: number) => number;
      easeOut: (t: number) => number;
    };
    Elastic: {
      easeInOut: (t: number) => number;
      easeOut: {
        (t: number): number;
        config: (a: number, b: number) => (t: number) => number;
      };
    };
    chroma: {
      scale: (colors: string[]) => (value: number) => { hex: () => string };
      (color: string): { hex: () => string };
    };
  }
}

export default function PlanetScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initSceneRef = useRef<(() => () => void) | null>(null);
  const sceneRef = useRef<SceneState>({});
  const animationFrameRef = useRef<number | null>(null);
  const updateSizeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const loadLibraries = async () => {
      const scripts: HTMLScriptElement[] = [];

      if (!window.SimplexNoise) {
        const script1 = document.createElement("script");
        script1.src =
          "https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js";
        document.head.appendChild(script1);
        scripts.push(script1);
      }

      if (!window.TweenMax) {
        const script2 = document.createElement("script");
        script2.src =
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        document.head.appendChild(script2);
        scripts.push(script2);
      }

      if (!window.chroma) {
        const script3 = document.createElement("script");
        script3.src =
          "https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js";
        document.head.appendChild(script3);
        scripts.push(script3);
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
    };

    loadLibraries()
      .then(() => {
        if (containerRef.current && initSceneRef.current) {
          updateSizeRef.current = initSceneRef.current();
        }
      })
      .catch((error) => console.error("Failed to load libraries:", error));

    return () => {
      const currentSceneRef = sceneRef.current;
      if (currentSceneRef.renderer) {
        currentSceneRef.renderer.dispose();
        currentSceneRef.renderer.domElement.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      }
      if (updateSizeRef.current) {
        window.removeEventListener("resize", updateSizeRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const width = sceneRef.current.width || window.innerWidth;
    const height = sceneRef.current.height || window.innerHeight;
    const mouse = new THREE.Vector2();

    mouse.x = (e.clientX / width) * 2 - 1;
    mouse.y = -(e.clientY / height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, sceneRef.current.camera!);

    const intersects = raycaster.intersectObjects(
      sceneRef.current.objects || [],
      true
    );

    if (intersects.length > 0) {
      let obj = intersects[0].object;
      const objWithTween = obj.parent as ObjectWithTween;
      obj = objWithTween.tween ? objWithTween : obj;

      const tween = (obj as ObjectWithTween).tween;
      if (!tween || !tween.isActive?.()) {
        obj.scale.set(0.5, 0.5, 0.5);
        (obj as ObjectWithTween).tween = window.TweenMax.to(obj.scale, 1.5, {
          x: 1,
          y: 1,
          z: 1,
          ease: window.Elastic.easeOut.config(1, 0.2),
        });
      }
    }
  }, []);

  const createTree = useCallback(
    (tsize: number, bsize: number, tcolor: number, bcolor: number) => {
      const tradius = tsize * 0.1;

      const tmaterial = new THREE.MeshLambertMaterial({
        color: tcolor,
        flatShading: true,
      });
      const bmaterial = new THREE.MeshLambertMaterial({
        color: bcolor,
        flatShading: true,
      });

      const tree = new THREE.Object3D();

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

      const bgeometry = new THREE.SphereGeometry(bsize, 4, 4);
      bgeometry.translate(0, tsize + bsize * 0.7, 0);
      bgeometry.rotateX(-Math.PI / 2);
      randomizeGeometry(bgeometry, bsize * 0.2);
      const bmesh = new THREE.Mesh(bgeometry, bmaterial);
      tree.add(bmesh);

      return tree;
    },
    []
  );

  const createRock = useCallback((size: number) => {
    const material = new THREE.MeshLambertMaterial({
      color: 0x808080,
      flatShading: true,
    });
    const geometry = new THREE.SphereGeometry(size, 5, 4);
    randomizeGeometry(geometry, size * 0.2);
    return new THREE.Mesh(geometry, material);
  }, []);

  const randomizeGeometry = (geo: THREE.BufferGeometry, d: number) => {
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
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
  ): Point3D[] => {
    const points: Point3D[] = [];
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

  const createPlanet = useCallback(
    (scene: THREE.Scene) => {
      const simplex = new window.SimplexNoise();
      const planet = new THREE.Object3D();
      scene.add(planet);
      sceneRef.current.planet = planet;

      const noises: number[] = [];
      const noiseF = 0.015;
      const noiseD = 15;
      const noiseWaterTreshold = 0.4;
      const noiseWaterLevel = 0.2;

      const vNoise = (v: THREE.Vector3, f: number, i?: number): number => {
        const nv = new THREE.Vector3(v.x, v.y, v.z).multiplyScalar(f);
        let noise = (simplex.noise3D(nv.x, nv.y, nv.z) + 1) / 2;
        noise = noise > noiseWaterTreshold ? noise : noiseWaterLevel;
        if (typeof i === "number") noises[i] = noise;
        return noise;
      };

      const dispV = (v: THREE.Vector3, i?: number): void => {
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

      const geometry = new THREE.IcosahedronGeometry(100, 4);
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < posAttr.count; i++) {
        const vertex = new THREE.Vector3(
          posAttr.getX(i),
          posAttr.getY(i),
          posAttr.getZ(i)
        );
        dispV(vertex, i);
        posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      geometry.computeVertexNormals();

      const material = new THREE.MeshLambertMaterial({
        flatShading: true,
        color: 0x417b2b,
      });

      const mesh = new THREE.Mesh(geometry, material);
      planet.add(mesh);

      planet.scale.set(0.3, 0.3, 0.3);
      window.TweenMax.to(planet.scale, Math.random() * 3 + 2, {
        x: 1,
        y: 1,
        z: 1,
        ease: window.Power1.easeOut,
      });

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
        const p = new THREE.Vector3(points[i].x, points[i].y, points[i].z);
        dispV(p);

        if (vNoise(p, noiseF) === noiseWaterLevel) continue;

        let obj: THREE.Object3D;

        if (Math.random() > 0.3) {
          const tsize = Math.random() * 10 + 5;
          const bsize = tsize * (Math.random() * 0.2 + 0.5);
          const vn2 = vNoise(p, 0.01);
          const color = parseInt(cscale(vn2).hex().replace("#", ""), 16);
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

      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.domElement.addEventListener(
          "mousemove",
          handleMouseMove
        );
      }
    },
    [createTree, createRock, handleMouseMove]
  );

  const initScene = useCallback(() => {
    const conf = {
      fov: 50,
      cameraZ: 400,
    };

    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneRef.current.width = width;
    sceneRef.current.height = height;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
    sceneRef.current.renderer = renderer;

    const camera = new THREE.PerspectiveCamera(
      conf.fov,
      width / height,
      0.1,
      10000
    );
    camera.position.z = conf.cameraZ;
    sceneRef.current.camera = camera;

    const cameraCtrl = new OrbitControls(camera, renderer.domElement);
    cameraCtrl.enableDamping = true;
    cameraCtrl.dampingFactor = 0.1;
    cameraCtrl.rotateSpeed = 0.1;
    cameraCtrl.autoRotate = true;
    cameraCtrl.autoRotateSpeed = 0.1;
    sceneRef.current.cameraCtrl = cameraCtrl;

    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xcccccc));

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(200, 0, 100);
    scene.add(light);

    sceneRef.current.scene = scene;

    createPlanet(scene);

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

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (cameraCtrl) cameraCtrl.update();
      renderer.render(scene, camera);
    };

    animate();

    return updateSize;
  }, [createPlanet]);

  initSceneRef.current = initScene;

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

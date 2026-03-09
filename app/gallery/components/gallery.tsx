"use client";
import React, { useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/app/components/navbar/Navbar";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export const Gallery = ({ images }: { images: GalleryImage[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smoothing the scroll movement for that "weighty" fantasy feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-[#020202]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <section ref={containerRef} className="relative h-[400vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden perspective-2000">
          <motion.div className="relative w-full h-full preserve-3d">
            {images.map((img, i) => (
              <FloatingCard
                key={img.id}
                image={img}
                index={i}
                progress={smoothProgress}
                total={images.length}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hero Overlay */}
      <div className="fixed bottom-10 left-10 z-50 pointer-events-none">
        <h2 className="text-white/20 text-8xl font-black tracking-tighter">ARCHIVE</h2>
        <p className="text-indigo-400 font-mono tracking-widest text-xs ml-2">SCROLL TO NAVIGATE DIMENSIONS</p>
      </div>
    </div>
  );
};

const FloatingCard = ({ image, index, progress, total }: any) => {
  // Distribute items in 3D space
  const randomX = useMemo(() => (Math.random() - 0.5) * 80, []); // -40% to 40%
  const randomY = useMemo(() => (Math.random() - 0.5) * 80, []); // -40% to 40%

  // Create a "Tunnel" effect. Each image starts deep in Z and comes forward.
  const startZ = -2000 + (index * -500);
  const endZ = 1000;

  const z = useTransform(progress, [0, 1], [startZ, endZ]);
  const opacity = useTransform(progress,
    [index / total, (index + 1) / total, (index + 2) / total],
    [0, 1, 0]
  );
  const scale = useTransform(progress, [index / total, (index + 1) / total], [0.5, 1.2]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${50 + randomX}%`,
        top: `${50 + randomY}%`,
        z,
        opacity,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="group w-[300px] md:w-[450px] aspect-[4/5]"
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 bg-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:border-indigo-500/50 group-hover:scale-105">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          sizes="(max-width: 768px) 300px, 450px"
        />
        {/* Fantasy Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-indigo-500/20 to-transparent" />

        {/* Floating ID Tag */}
        <div className="absolute bottom-6 left-6 translate-z-10">
          <span className="text-white/40 font-mono text-[10px] block mb-1">DATA_REF // 0{index + 1}</span>
          <div className="h-px w-8 bg-indigo-500 mb-2" />
        </div>
      </div>
    </motion.div>
  );
};
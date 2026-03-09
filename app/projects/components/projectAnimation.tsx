"use client";
import React from "react";
import { motion } from "framer-motion";

const projectsData = [
  {
    title: "Viacar",
    description: "Book cars & Publish ride",
    image: "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajk-viacar.webp",
    link: "https://viacar.vercel.app/",
    color: "from-blue-500",
  },
  {
    title: "Fast Legend",
    description: "High-performance racing game platform",
    image: "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajk-fastlegend.webp",
    link: "https://fastlegend.vercel.app/",
    color: "from-red-500",
  },
  {
    title: "Kareflow.ai",
    description: "Full-stack problem solving with AI depth.",
    image: "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajkviacar.webp",
    link: "https://www.kareflowai.com/",
    color: "from-emerald-500",
  },
  {
    title: "Mydear pa",
    description: "Healthcare accessibility platform.",
    image: "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajk-mydearpa.webp",
    link: "https://mydearpa.com/",
    color: "from-purple-500",
  },
];

export const ProjectCard = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#030303] py-24 px-4">
      {/* Fantasy Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter opacity-20 absolute -top-10 left-0 right-0">PROJECTS</h2>
          <h3 className="relative text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Digital Artifacts
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 perspective-2000">
          {projectsData.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: -20, z: -100 }}
              whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{
                scale: 1.02,
                rotateX: 5,
                rotateY: -5,
                transition: { duration: 0.3 }
              }}
              className="group relative h-[500px] w-full preserve-3d cursor-none"
            >
              {/* Floating Image Layer */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-500 group-hover:border-white/40">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
              </div>

              {/* Fantasy Aura Glow */}
              <div className={`absolute -inset-1 rounded-[2.2rem] bg-gradient-to-r ${project.color} to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

              {/* Content Layer (Floating closer to viewer) */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-z-20">
                <motion.div
                  style={{ transform: "translateZ(50px)" }}
                  className="space-y-3"
                >
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-indigo-400">0{i + 1} / Project</span>
                  <h4 className="text-4xl font-bold text-white drop-shadow-md">{project.title}</h4>
                  <p className="text-gray-400 text-sm max-w-[80%] leading-relaxed font-light">
                    {project.description}
                  </p>

                  <div className="pt-4 overflow-hidden">
                    <motion.a
                      href={project.link}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-colors"
                    >
                      Enter Realm
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
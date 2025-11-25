"use client";

import React, { useEffect, useRef, useState } from "react";
import { Webhook } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

const projectsData: Project[] = [
  {
    title: "Viacar",
    description: "Book cars & Publish ride",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajk-viacar.webp",
    link: "https://viacar.vercel.app/",
  },
  {
    title: "Fast Legend",
    description: "High-performance racing game platform",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajk-fastlegend.webp",
    link: "https://fastlegend.vercel.app/",
  },
  {
    title: "Kareflow.ai",
    description:
      "Full-stack applications built with React, Node.js, and modern web technologies for real-world problem-solving.",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajkviacar.webp",
    link: "https://www.kareflowai.com/",
  },
  {
    title: "Mydear pa",
    description:
      "Healthcare platform connecting patients with providers for better medical accessibility.",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajk-mydearpa.webp",
    link: "https://mydearpa.com/",
  },
  {
    title: "Mykare app",
    description:
      "Fintech-healthcare application enabling users to save daily via UPI into digital gold, mutual funds, or recurring deposits.",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/abhirajk-mykare%20appp.webp",
    link: "https://mykareapp.com",
  },
  {
    title: "Karetrip.com",
    description:
      "Medical travel platform providing international patients with end-to-end healthcare support in India.",
    image:
      "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763712140/karetrip-abhirajk.webp",
    link: "https://karetrip.com",
  },
];

export default function ProjectAnimation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const TRANSITION_DURATION = 2.5;
  const AUTO_SLIDE_SPEED = 5000;

  const handleSlideChange = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, TRANSITION_DURATION * 1000);
  };

  const handleNext = () => {
    const nextSlide = (currentSlide + 1) % projectsData.length;
    handleSlideChange(nextSlide);
  };

  const handlePrev = () => {
    const prevSlide =
      (currentSlide - 1 + projectsData.length) % projectsData.length;
    handleSlideChange(prevSlide);
  };

  useEffect(() => {
    if (autoSlideTimerRef.current) clearTimeout(autoSlideTimerRef.current);
    autoSlideTimerRef.current = setTimeout(() => {
      handleNext();
    }, AUTO_SLIDE_SPEED);

    return () => {
      if (autoSlideTimerRef.current) clearTimeout(autoSlideTimerRef.current);
    };
  }, [currentSlide, isTransitioning]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowRight" || e.code === "Space") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isTransitioning]);

  const touchStartRef = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  const project = projectsData[currentSlide];

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-gray-950 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center justify-center relative flex-shrink-0">
        <h1 className="jim-nightshade-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase font-bold text-yellow-400">
          Projects Playground
        </h1>
      </div>

      <div className="flex flex-col flex-1">
        <div
          className="relative w-full bg-black overflow-hidden flex-1 flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleNext}
        >
          <div className="relative w-full h-full flex-1">
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: isTransitioning ? 0.5 : 1,
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${project.image}')`,
                  backgroundPosition: "center",
                }}
              />

              {/* Content overlay - Visit Project button */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8">
                <div />

                <div
                  style={{
                    zIndex: 1000,
                  }}
                  className="flex justify-end items-end"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex font-semibold items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-blue-400 text-black rounded-lg hover:bg-yellow-300 text-xs sm:text-sm md:text-base whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit Project{" "}
                    <Webhook
                      size={16}
                      className="sm:w-4 sm:h-4 md:w-5 md:h-5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Navigation Dots - Outside Carousel */}
        <div className="sticky bottom-0 w-full bg-black/80 backdrop-blur-sm py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-8 z-20">
          <div className="flex gap-2 sm:gap-2.5 md:gap-3">
            {projectsData.map((proj, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSlideChange(index);
                }}
                className="flex-1 flex flex-col gap-1.5 sm:gap-2 cursor-pointer group"
                aria-label={`Navigate to ${proj.title} project`}
              >
                <div className="w-full h-0.5 sm:h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-yellow-400 transition-all duration-100 ${
                      index === currentSlide ? "w-full" : "w-0"
                    }`}
                  />
                </div>
                <span className="text-xs sm:text-xs md:text-sm font-mono uppercase text-white/60 group-hover:text-white transition-colors truncate">
                  {proj.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

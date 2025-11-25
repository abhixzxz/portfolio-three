"use client";

import Image from "next/image";
import { AnimatedFooter } from "./components/footer";
import Link from "next/link";
import HeroSection from "./components/HeroSection/herosection";

export default function Home() {
  return (
    <main className="min-h-screen righteous-regular bg-black text-white">
      <div className="flex flex-col lg:flex-row">
        <section className="w-full lg:w-1/2 flex items-center px-6 md:px-12 py-16 lg:py-0 overflow-hidden">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <p className="text-sm uppercase tracking-widest text-yellow-400 mb-2">
              Abhi Raj K — Crafting the Web, One Pixel at a Time
            </p>

            <h1 className="text-4xl uppercase aubrey-regular md:text-6xl font-extrabold leading-tight">
              I turn ideas into
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                immersive digital experiences
              </span>
            </h1>

            <p className="text-yellow-100 text-lg md:text-xl mt-4 max-w-lg glass-antiqua-regular">
              Full-stack engineer from Kerala, obsessed with React, performance,
              smooth animations, and building web apps that feel <i>alive</i>.
              Whether it’s stunning UI, complex logic, or 3D visuals, I love
              making technology look effortless and fast.
            </p>

            <div className="flex flex-wrap gap-4 aubrey-regular uppercase mt-8">
              <Link href={"/projects"}>
                <button className="button-40 cursor-pointer">
                  <span className="text uppercase">See my work</span>
                </button>
              </Link>
              <Link href={"/about-me"}>
                <button className="button-40 cursor-pointer">
                  <span className="text uppercase">Who I am</span>
                </button>
              </Link>
              <Link href={"/gallery"}>
                <button className="button-40 cursor-pointer">
                  <span className="text uppercase">Gallery</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative">
          <Image
            src="/abhirajk.jpg"
            alt="Abhi raj.k"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>
      </div>
      {/* <HeroSection /> */}

      <AnimatedFooter />
    </main>
  );
}

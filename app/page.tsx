"use client";

import Image from "next/image";
import { AnimatedFooter } from "./components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Abhiraj K Portfolio",
            url: "https://www.abhirajk.online",
            description: "Full Stack Developer specializing in React.js, Next.js, Node.js - Best Software Engineer in Kochi, Kerala",
            author: {
              "@type": "Person",
              name: "Abhiraj K",
              url: "https://www.abhirajk.online",
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance"
              }
            },
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.abhirajk.online/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <main className="min-h-screen righteous-regular bg-black text-white">
        <div className="flex flex-col lg:flex-row">
          <section className="w-full lg:w-1/2 flex items-center px-6 md:px-12 py-16 lg:py-0 overflow-hidden" itemScope itemType="https://schema.org/Person">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <p className="text-sm uppercase tracking-widest text-yellow-400 mb-2">
                <span itemProp="name">Abhi Raj K</span> — Crafting the Web, One Pixel at a Time
              </p>

              <h1 className="text-4xl uppercase aubrey-regular md:text-6xl font-extrabold leading-tight" itemProp="description">
                I turn ideas into
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                  immersive digital experiences
                </span>
              </h1>

              <p className="text-yellow-100 text-lg md:text-xl mt-4 max-w-lg glass-antiqua-regular">
                <span itemProp="jobTitle">Full-stack engineer</span> from <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress"><span itemProp="addressRegion">Kerala</span></span>, obsessed with <span itemProp="knowsAbout">React</span>, performance,
                smooth animations, and building web apps that feel <i>alive</i>.
                Whether it's stunning UI, complex logic, or 3D visuals, I love
                making technology look effortless and fast.
              </p>

              <nav className="flex flex-wrap gap-4 aubrey-regular uppercase mt-8" aria-label="Quick navigation to portfolio sections">
                <Link href={"/projects"} aria-label="View Abhiraj K's full stack development projects">
                  <button className="button-40 cursor-pointer">
                    <span className="text uppercase">See my work</span>
                  </button>
                </Link>
                <Link href={"/about-me"} aria-label="Learn about Abhiraj K - Full Stack Developer">
                  <button className="button-40 cursor-pointer">
                    <span className="text uppercase">Who I am</span>
                  </button>
                </Link>
                <Link href={"/gallery"} aria-label="View Abhiraj K's professional photo gallery">
                  <button className="button-40 cursor-pointer">
                    <span className="text uppercase">Gallery</span>
                  </button>
                </Link>
              </nav>
            </div>
          </section>

          <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative">
            <Image
              src="/abhirajk.jpg"
              alt="Abhiraj K - Best Software Engineer in Kochi, Kerala - Professional Profile Photo"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
        </div>

        <AnimatedFooter />
      </main>
    </>
  );
}

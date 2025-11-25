import React from "react";
import PlanetScene from "./components/TreeAnimation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abhirajk.online"),
  title: "About Abhiraj K | Full Stack Developer Journey & Skills",
  description:
    "Learn about Abhiraj K, a passionate Full Stack Developer specializing in React.js, Next.js, Node.js, PostgreSQL. Discover my journey, skills, and expertise in modern web development.",
  keywords: [
    "About Abhiraj",
    "best software engineer biography Kerala",
    "top full stack developer profile Kochi",
    "React developer journey Kerala",
    "Node.js developer biography Kochi",
    "Indian web developer Kerala",
    "software engineer skills Kochi",
    "web development expertise Kerala",
    "professional developer profile Kochi",
    "MERN stack developer biography Kerala",
    "About Abhiraj K",
    "Abhiraj K Biography",
  ],
  alternates: {
    canonical: "https://www.abhirajk.online/about-me",
  },
  openGraph: {
    title: "About Abhiraj K | Full Stack Developer Journey & Skills",
    description:
      "Discover the journey and expertise of Abhiraj K, a passionate Full Stack Developer specializing in React.js, Next.js, Node.js and modern web technologies.",
    url: "https://www.abhirajk.online/about-me",
    siteName: "Abhiraj K Portfolio",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "About Abhiraj K - Full Stack Developer",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Abhiraj K | Full Stack Developer",
    description:
      "Discover the journey and expertise of Abhiraj K, a passionate Full Stack Developer.",
    images: ["/og-about.png"],
    creator: "@abhirajk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const AboutMe = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-full">
        <PlanetScene />
      </div>
    </div>
  );
};

export default AboutMe;

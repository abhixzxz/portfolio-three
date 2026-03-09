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
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abhiraj K",
    url: "https://www.abhirajk.online",
    image: "https://www.abhirajk.online/abhirajk.jpg",
    jobTitle: "Full Stack Developer",
    description: "Best software engineer in Kochi, Kerala specializing in React.js, Next.js, Node.js, PostgreSQL, and modern web applications",
    sameAs: [
      "https://github.com/abhixzxz",
      "https://www.linkedin.com/in/abhiraj-k-0661a1235",
      "https://www.instagram.com/abhirajk84/"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kochi",
      addressRegion: "Kerala",
      addressCountry: "IN"
    },
    knowsAbout: [
      "React.js",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "JavaScript",
      "TypeScript",
      "Full Stack Development",
      "MERN Stack",
      "Web Development",
      "Three.js",
      "Framer Motion"
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Software Engineering"
    }
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.abhirajk.online"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Me",
        item: "https://www.abhirajk.online/about-me"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="w-full flex items-center justify-between">
        <div className="w-full">
          <PlanetScene />
        </div>
      </div>
    </>
  );
};

export default AboutMe;

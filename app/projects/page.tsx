import React from "react";
import ProjectAnimation from "./components/projectAnimation";

export const metadata = {
  metadataBase: new URL("https://www.abhirajk.online"),
  title: "Full Stack Development Projects | Abhiraj K Portfolio",
  description:
    "Explore innovative full-stack development projects by Abhiraj K. React.js, Next.js, Node.js, PostgreSQL applications with modern web technologies and best practices.",
  keywords: [
    "Abhiraj",
    "three js projects",
    "top threejs websites",
    "threejs websites",
    "React developer projects Kerala",
    "Node.js developer projects Kochi",
    "MERN stack projects Kerala",
    "web development projects Kochi",
    "software engineer portfolio Kerala",
    "best developer projects Kochi",
  ],
  alternates: {
    canonical: "https://www.abhirajk.online/projects",
  },
  openGraph: {
    title: "Full Stack Development Projects | Abhiraj K",
    description:
      "Explore innovative full-stack development projects by Abhiraj K featuring React.js, Next.js, Node.js, PostgreSQL and modern web technologies.",
    url: "https://www.abhirajk.online/projects",
    siteName: "Abhiraj K Portfolio",
    images: [
      {
        url: "/og-projects.png",
        width: 1200,
        height: 630,
        alt: "Abhiraj K Full Stack Development Projects Showcase",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Stack Development Projects | Abhiraj K",
    description:
      "Explore innovative full-stack development projects by Abhiraj K featuring React.js, Next.js, Node.js and modern web technologies.",
    images: ["/og-projects.png"],
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

export default function FooterSection() {
  return (
    <div className="h-screen bg-black">
      <ProjectAnimation />
    </div>
  );
}

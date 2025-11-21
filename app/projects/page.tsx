import React from "react";
import ProjectAnimation from "./components/projectAnimation";

export const metadata = {
  metadataBase: new URL("https://www.abhirajk.online"),
  title: "Projects | Abhiraj K",
  description: "A showcase of my full-stack development projects.",
  alternates: {
    canonical: "https://www.abhirajk.online/projects",
  },
  openGraph: {
    title: "Projects | Abhiraj K",
    description:
      "Explore the projects created by full-stack developer Abhiraj K using React, Next.js, Node.js and more.",
    url: "https://www.abhirajk.online/projects",
    images: [
      {
        url: "/og-projects.png",
        width: 1200,
        height: 630,
        alt: "Projects Page Preview",
      },
    ],
    type: "website",
  },
};

export default function Projects() {
  return (
    <div>
      <ProjectAnimation />
    </div>
  );
}

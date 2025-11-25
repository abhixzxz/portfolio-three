import type { Metadata } from "next";
import Gallery from "./components/gallery";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abhirajk.online"),
  title: "Interactive Gallery | Abhiraj K Portfolio",
  description:
    "Explore the interactive gallery showcasing Abhiraj K's work, projects, and creative endeavors. Modern web gallery with smooth animations and responsive design.",
  keywords: [
    "Abhiraj K Gallery",
    "Portfolio Gallery",
    "Interactive Gallery",
    "Web Developer Gallery",
    "Creative Gallery",
    "Modern Web Gallery",
    "Responsive Gallery",
    "Parallax Gallery",
    "Developer Portfolio Gallery",
    "Abhiraj Gallery",
  ],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Interactive Gallery | Abhiraj K Portfolio",
    description:
      "Explore the interactive gallery showcasing Abhiraj K's work, projects, and creative endeavors with smooth animations and responsive design.",
    url: "https://www.abhirajk.online/gallery",
    siteName: "Abhiraj K Portfolio",
    images: [
      {
        url: "/og-gallery.png",
        width: 1200,
        height: 630,
        alt: "Abhiraj K Interactive Gallery Showcase",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Gallery | Abhiraj K",
    description:
      "Explore the interactive gallery showcasing Abhiraj K's work with smooth animations and responsive design.",
    images: ["/og-gallery.png"],
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
  alternates: {
    canonical: "https://www.abhirajk.online/gallery",
  },
};

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "1",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722152/AbhirajK/Abhirajk13.webp",
    alt: "Beautiful llama in natural setting - image 1",
  },
  {
    id: "2",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722060/AbhirajK/abhi.webp",
    alt: "Adorable llama portrait - image 2",
  },
  {
    id: "3",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722145/AbhirajK/abhirajklulumall2.webp",
    alt: "Majestic llama with scenic backdrop - image 3",
  },
  {
    id: "4",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722146/AbhirajK/abhirajkkinfra.webp",
    alt: "Beautiful llama in natural setting - image 4",
  },
  {
    id: "5",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722146/AbhirajK/abhirajkbacksideview.webp",
    alt: "Adorable llama portrait - image 5",
  },
  {
    id: "6",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722146/AbhirajK/abhirajkdark.webp",
    alt: "Majestic llama with scenic backdrop - image 6",
  },
  {
    id: "7",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722156/AbhirajK/Abhirajk10.webp",
    alt: "Beautiful llama in natural setting - image 7",
  },
  {
    id: "8",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722156/AbhirajK/Abhirajk11.webp",
    alt: "Adorable llama portrait - image 8",
  },
  {
    id: "9",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722154/AbhirajK/Abhirajk12.webp",
    alt: "Majestic llama with scenic backdrop - image 9",
  },
  {
    id: "10",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722157/AbhirajK/Abhirajkfootball.webp",
    alt: "Beautiful llama in natural setting - image 10",
  },
  {
    id: "11",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722159/AbhirajK/Abhirajk7.webp",
    alt: "Adorable llama portrait - image 11",
  },
  {
    id: "12",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722160/AbhirajK/Abhirajk4.webp",
    alt: "Majestic llama with scenic backdrop - image 12",
  },
  {
    id: "13",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722159/AbhirajK/Abhirajk5.webp",
    alt: "Majestic llama with scenic backdrop - image 13",
  },
  {
    id: "14",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722163/AbhirajK/Abhirajk%20mykare.webp",
    alt: "Beautiful llama in natural setting - image 14",
  },
  {
    id: "15",
    src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp",
    alt: "Adorable llama portrait - image 15",
  },
];

export default function Home() {
  return (
    <main>
      <Gallery images={GALLERY_IMAGES} columns={5} />
    </main>
  );
}

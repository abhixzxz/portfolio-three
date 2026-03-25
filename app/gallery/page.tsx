// import type { Metadata, Viewport } from "next";
// import { Gallery } from "./components/gallery";


// export const viewport: Viewport = {
//   width: "device-width",
//   initialScale: 1,
// };

// export const metadata: Metadata = {
//   metadataBase: new URL("https://www.abhirajk.online"),
//   title: "Interactive Gallery | Abhiraj K Portfolio",
//   description:
//     "Explore the interactive gallery showcasing Abhiraj K's work, projects, and creative endeavors. Modern web gallery with smooth animations and responsive design.",
//   keywords: [
//     "Abhiraj K Gallery",
//     "Portfolio Gallery",
//     "Interactive Gallery",
//     "Web Developer Gallery",
//     "Creative Gallery",
//     "Modern Web Gallery",
//     "Responsive Gallery",
//     "Parallax Gallery",
//     "Developer Portfolio Gallery",
//     "Abhiraj Gallery",
//   ],
//   openGraph: {
//     title: "Interactive Gallery | Abhiraj K Portfolio",
//     description:
//       "Explore the interactive gallery showcasing Abhiraj K's work, projects, and creative endeavors with smooth animations and responsive design.",
//     url: "https://www.abhirajk.online/gallery",
//     siteName: "Abhiraj K Portfolio",
//     images: [
//       {
//         url: "/og-gallery.png",
//         width: 1200,
//         height: 630,
//         alt: "Abhiraj K Interactive Gallery Showcase",
//       },
//     ],
//     type: "website",
//     locale: "en_IN",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Interactive Gallery | Abhiraj K",
//     description:
//       "Explore the interactive gallery showcasing Abhiraj K's work with smooth animations and responsive design.",
//     images: ["/og-gallery.png"],
//     creator: "@abhirajk",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   alternates: {
//     canonical: "https://www.abhirajk.online/gallery",
//   },
// };

// interface GalleryImage {
//   id: string;
//   src: string;
//   alt: string;
// }

// const GALLERY_IMAGES: GalleryImage[] = [
//   {
//     id: "1",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722152/AbhirajK/Abhirajk13.webp",
//     alt: "Abhiraj K - Full Stack Developer from Kochi, Kerala - Professional Photo 1",
//   },
//   {
//     id: "2",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722060/AbhirajK/abhi.webp",
//     alt: "Abhiraj K - Software Engineer Portrait - Professional Photo 2",
//   },
//   {
//     id: "3",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722145/AbhirajK/abhirajklulumall2.webp",
//     alt: "Abhiraj K at Lulu Mall - Full Stack Developer Kerala - Photo 3",
//   },
//   {
//     id: "4",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722146/AbhirajK/abhirajkkinfra.webp",
//     alt: "Abhiraj K - Best Software Engineer in Kochi - Professional Photo 4",
//   },
//   {
//     id: "5",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722146/AbhirajK/abhirajkbacksideview.webp",
//     alt: "Abhiraj K - React Developer from Kerala - Professional Photo 5",
//   },
//   {
//     id: "6",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722146/AbhirajK/abhirajkdark.webp",
//     alt: "Abhiraj K - MERN Stack Developer Portrait - Professional Photo 6",
//   },
//   {
//     id: "7",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722156/AbhirajK/Abhirajk10.webp",
//     alt: "Abhiraj K - Node.js Developer from Kochi - Professional Photo 7",
//   },
//   {
//     id: "8",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722156/AbhirajK/Abhirajk11.webp",
//     alt: "Abhiraj K - Top Software Engineer Kerala - Professional Photo 8",
//   },
//   {
//     id: "9",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722154/AbhirajK/Abhirajk12.webp",
//     alt: "Abhiraj K - Web Developer Portfolio Photo - Professional Photo 9",
//   },
//   {
//     id: "10",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722157/AbhirajK/Abhirajkfootball.webp",
//     alt: "Abhiraj K Playing Football - Software Engineer from Kochi - Photo 10",
//   },
//   {
//     id: "11",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722159/AbhirajK/Abhirajk7.webp",
//     alt: "Abhiraj K - Freelance Developer Kerala - Professional Photo 11",
//   },
//   {
//     id: "12",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722160/AbhirajK/Abhirajk4.webp",
//     alt: "Abhiraj K - Next.js Developer from Kochi - Professional Photo 12",
//   },
//   {
//     id: "13",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722159/AbhirajK/Abhirajk5.webp",
//     alt: "Abhiraj K - JavaScript Developer Portrait - Professional Photo 13",
//   },
//   {
//     id: "14",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722163/AbhirajK/Abhirajk%20mykare.webp",
//     alt: "Abhiraj K at Mykare - Full Stack Developer Kerala - Photo 14",
//   },
//   {
//     id: "15",
//     src: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp",
//     alt: "Abhiraj K - TypeScript Developer from Kochi - Professional Photo 15",
//   },
// ];

// export default function Home() {
//   const imageListStructuredData = {
//     "@context": "https://schema.org",
//     "@type": "ImageGallery",
//     name: "Abhiraj K Professional Gallery",
//     description: "Professional photo gallery of Abhiraj K - Full Stack Developer from Kochi, Kerala",
//     author: {
//       "@type": "Person",
//       name: "Abhiraj K",
//       url: "https://www.abhirajk.online",
//       jobTitle: "Full Stack Developer"
//     },
//     image: GALLERY_IMAGES.map((img, index) => ({
//       "@type": "ImageObject",
//       contentUrl: img.src,
//       name: `Abhiraj K - Professional Photo ${index + 1}`,
//       description: `Professional photograph of Abhiraj K, Full Stack Developer from Kochi, Kerala - Image ${index + 1}`,
//       author: "Abhiraj K",
//       creator: "Abhiraj K",
//       copyrightHolder: {
//         "@type": "Person",
//         name: "Abhiraj K"
//       },
//       creditText: "Abhiraj K",
//       acquireLicensePage: "https://www.abhirajk.online/contact-me"
//     }))
//   };

//   return (
//     <main>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(imageListStructuredData) }}
//       />
//       <h1 className="sr-only">
//         Abhiraj K - Professional Portfolio Gallery | Best Software Engineer in
//         Kochi, Kerala
//       </h1>
//       <Gallery images={GALLERY_IMAGES} />
//     </main>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>not avilable</div>
  )
}

export default page

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abhirajk.online"),
  title: {
    default: "Abhiraj K | Full Stack Developer Portfolio",
    template: "%s | Abhiraj K Portfolio",
  },
  description:
    "Abhiraj K - Full Stack Developer specializing in React.js, Next.js, Node.js, PostgreSQL, and modern web applications. Explore my portfolio showcasing innovative web solutions.",
  keywords: [
    "Abhiraj K",
    "Abhiraj",
    "Abhi Raj K",
    "best software engineer in Kochi",
    "best software engineer in Kerala",
    "top software engineers in Kochi",
    "top software engineers in Kerala",
    "top 10 software engineers in Kerala",
    "top 10 software engineers in Kochi",
    "freelance software engineer Kochi",
    "full stack developer in Kochi",
    "full stack developer in Kerala",
    "React developer in Kochi",
    "React developer in Kerala",
    "Node.js developer in Kochi",
    "Node.js developer in Kerala",
    "best full stack developer in Kochi",
    "best full stack developer in Kerala",
    "top MERN stack developers in Kochi",
    "expert software developer Kochi",
    "professional software engineer Kerala",
    "best web developer in Kochi",
    "Next.js developer Kochi",
    "JavaScript developer Kerala",
    "TypeScript developer Kochi",
    "Three.js developer Kerala",
    "web development services Kochi",
    "hire full stack developer Kerala",
    "freelance web developer Kochi",
    "software engineer portfolio Kerala",
    "Kochi software developer",
    "Kerala web developer",
    "Indian software engineer",
    "React.js expert Kochi",
    "Node.js expert Kerala",
  ],
  authors: [{ name: "Abhiraj K", url: "https://www.abhirajk.online" }],
  creator: "Abhiraj K",
  publisher: "Abhiraj K Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.abhirajk.online",
    languages: {
      "en-US": "https://www.abhirajk.online",
    },
  },
  openGraph: {
    title: "Abhiraj K | Full Stack Developer Portfolio",
    description:
      "Showcasing the work, skills, and experience of Full Stack Developer Abhiraj K. Specializing in React.js, Next.js, Node.js and modern web technologies.",
    url: "https://www.abhirajk.online",
    siteName: "Abhiraj K Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhiraj K Portfolio Preview - Full Stack Developer",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhiraj K | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React.js, Next.js, Node.js. Explore my portfolio of innovative web solutions.",
    images: ["/og-image.png"],
    creator: "@abhirajk",
    site: "@abhirajk",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  category: "portfolio",
  classification: "Portfolio Website",
  other: {
    "revisit-after": "1 day",
    distribution: "global",
    rating: "general",
    robots:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    googlebot:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    bingbot:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.abhirajk.online/#person",
        name: "Abhiraj K",
        url: "https://www.abhirajk.online",
        image: {
          "@type": "ImageObject",
          url: "https://www.abhirajk.online/abhirajk.jpg",
          width: 1200,
          height: 630
        },
        jobTitle: "Full Stack Developer",
        description:
          "Best software engineer in Kochi, Kerala specializing in React.js, Next.js, Node.js, PostgreSQL, and modern web applications",
        sameAs: [
          "https://www.abhirajk.online",
          "https://github.com/abhixzxz",
          "https://www.linkedin.com/in/abhiraj-k-0661a1235",
          "https://www.instagram.com/abhirajk84/",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kochi",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 9.9312,
          longitude: 76.2673,
        },
        knowsAbout: [
          "Software Development",
          "Full Stack Development",
          "React.js",
          "Next.js",
          "Node.js",
          "MERN Stack",
          "Web Development",
          "JavaScript",
          "TypeScript",
          "PostgreSQL",
          "Three.js",
          "Framer Motion",
          "Best software engineer in Kochi",
          "Top full stack developer in Kerala",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Freelance Software Engineer",
          description: "Best software engineer in Kochi, Kerala",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.abhirajk.online/#website",
        url: "https://www.abhirajk.online",
        name: "Abhiraj K Portfolio",
        description: "Full Stack Developer Portfolio - Best Software Engineer in Kochi, Kerala",
        publisher: {
          "@id": "https://www.abhirajk.online/#person"
        },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.abhirajk.online/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.abhirajk.online/#service",
        name: "Abhiraj K - Full Stack Development Services",
        description: "Professional full-stack web development services in Kochi, Kerala",
        provider: {
          "@id": "https://www.abhirajk.online/#person"
        },
        areaServed: {
          "@type": "Place",
          name: "Kerala, India"
        },
        serviceType: [
          "Full Stack Development",
          "React.js Development",
          "Next.js Development",
          "Node.js Development",
          "Web Application Development",
          "MERN Stack Development"
        ]
      }
    ]
  };

  return (
    <html lang="en-IN">
      <head>
        <meta name="author" content="Abhiraj K" />
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Kochi" />
        <meta name="geo.position" content="9.9312;76.2673" />
        <meta name="ICBM" content="9.9312, 76.2673" />
        <link rel="canonical" href="https://www.abhirajk.online" />
        <link rel="author" href="/humans.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

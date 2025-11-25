import type { Metadata } from "next";
import "./globals.css";

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
    "Full Stack Developer",
    "React.js Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Web Developer",
    "Portfolio",
    "JavaScript Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Indian Developer",
    "Web Applications",
    "Modern Web Development",
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
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
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
    "@type": "Person",
    name: "Abhiraj K",
    url: "https://www.abhirajk.online",
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer specializing in React.js, Next.js, Node.js, PostgreSQL, and modern web applications",
    sameAs: [
      "https://www.abhirajk.online",
      "https://github.com/abhixzxz",
      "https://www.linkedin.com/in/abhiraj-k-0661a1235",
      "https://www.instagram.com/abhirajk84/",
      "https://x.com/bhiraj_k39869?t=vdXPv1FcU1o6UZ7dVem6CQ&s=09",
      "https://www.facebook.com/abhi.rajk.12?mibextid=ZbWKwL",
      "https://abhirajk.vercel.app/",
      "https://tailwindflex.com/@abhirajk",
    ],
    knowsAbout: [
      "React.js",
      "Next.js",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "PostgreSQL",
      "Web Development",
      "Full Stack Development",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Your University/College",
    },
    worksFor: {
      "@type": "Organization",
      name: "Available for Hire",
      description: "Freelance Full Stack Developer",
    },
    address: {
      "@type": "Kalambukattu Muvattupuzha",
      addressCountry: "IN",
      addressRegion: "Kerala",
      addressLocality: "Muvattupuzha",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

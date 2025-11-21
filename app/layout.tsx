import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abhirajk.online"),
  title: "Abhiraj K | Portfolio",
  description:
    "Full Stack Developer specializing in React.js, Next.js, Node.js, PostgreSQL, and modern web applications.",
  alternates: {
    canonical: "https://www.abhirajk.online",
  },
  openGraph: {
    title: "Abhiraj K | Portfolio",
    description:
      "Showcasing the work, skills, and experience of Full Stack Developer Abhiraj K.",
    url: "https://www.abhirajk.online",
    siteName: "Abhiraj K Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhiraj K | Portfolio",
    description:
      "Full Stack Developer specializing in React.js, Next.js, Node.js.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

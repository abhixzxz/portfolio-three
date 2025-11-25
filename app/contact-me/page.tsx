import React from "react";
import ContactUsGraphics from "./components/ContactUsGraphics";

export const metadata = {
  metadataBase: new URL("https://www.abhirajk.online"),
  title: "Contact Abhiraj K | Full Stack Developer for Hire",
  description:
    "Get in touch with Abhiraj K, Full Stack Developer specializing in React.js, Next.js, Node.js. Available for web development projects, collaborations, and technical consultations.",
  keywords: [
    "Contact Abhiraj K Kochi",
    "Hire best software engineer Kerala",
    "top full stack developer Kochi contact",
    "React developer Kochi hire",
    "Node.js developer Kerala contact",
    "freelance software engineer Kochi",
    "web development services Kerala",
    "hire MERN stack developer Kochi",
    "professional software engineer Kerala",
    "best web developer Kochi contact",
    "Contact Abhiraj K",
    "Hire Full Stack Developer kochi",
    "React.js Developer Contact",
    "Next.js Developer Hire",
    "Node.js Developer Contact",
    "Indian Developer Contact",
    "Full Stack Development Services",
    "Web Development Consultation",
  ],
  alternates: {
    canonical: "https://www.abhirajk.online/contact-me",
  },
  openGraph: {
    title: "Contact Abhiraj K | Full Stack Developer for Hire",
    description:
      "Get in touch with Abhiraj K, Full Stack Developer specializing in React.js, Next.js, Node.js. Available for web development projects and collaborations.",
    url: "https://www.abhirajk.online/contact-me",
    siteName: "Abhiraj K Portfolio",
    images: [
      {
        url: "/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact Abhiraj K - Full Stack Developer",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Abhiraj K | Full Stack Developer",
    description:
      "Get in touch with Abhiraj K for web development projects, collaborations, and technical consultations.",
    images: ["/og-contact.png"],
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

const ContactUs = () => {
  return (
    <div>
      <ContactUsGraphics />
    </div>
  );
};

export default ContactUs;

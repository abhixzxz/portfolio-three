"use client";

import React, { useEffect, useState } from "react";
import { FooterLink, SlideImage } from "./types";
import {
  footerStyles,
  footerContainerStyle,
  contentOverlayStyle,
  mainGridStyle,
  footerBottomStyle,
} from "./styles";
import ThreeBackground from "./ThreeBackground";
import BrandSection from "./BrandSection";
import FooterSection from "./FooterSection";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";

const AnimatedFooter: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slideImages: SlideImage[] = [
    {
      url: "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763752777/reactlogo-abhirajk.jpg",
      alt: "React.js logo - Abhiraj K, Best software engineer in Kochi, Kerala",
    },
    {
      url: "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763752777/abhirajk-pythonlogo.jpg",
      alt: "Python logo - Abhiraj K, Top full stack developer in Kerala",
    },
    {
      url: "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763752777/abhiraj-nodejs.jpg",
      alt: "Node.js logo - Abhiraj K, Expert MERN stack developer in Kochi",
    },
    {
      url: "https://res.cloudinary.com/dm6t9pdbe/image/upload/v1763752777/abhiraj-nextjs.jpg",
      alt: "Next.js logo - Abhiraj K, Professional web developer in Kerala",
    },
  ];

  const footerLinks = {
    company: [
      { label: "About me", href: "/about-me" },
      { label: "Projects", href: "/projects" },
      { label: "Gallery", href: "/gallery" },
    ] as FooterLink[],
    resources: [{ label: "Contact Me", href: "/contact-me" }] as FooterLink[],
  };

  useEffect(() => {
    const timer = setTimeout(() => { }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slideImages.length]);

  return (
    <>
      <style>{footerStyles}</style>

      <footer
        className="relative w-full text-yellow-100 overflow-hidden"
        style={footerContainerStyle}
        role="contentinfo"
        aria-label="Site footer - Abhiraj K, Best Software Engineer in Kochi, Kerala"
      >
        {/* Three.js Canvas Background */}
        <ThreeBackground
          currentImageIndex={currentImageIndex}
          slideImages={slideImages}
        />

        {/* Content Overlay */}
        <div style={contentOverlayStyle}>
          {/* Main Footer Grid */}
          <div
            className="footer-section aubrey-regular"
            style={mainGridStyle}
            role="navigation"
            aria-label="Footer navigation"
          >
            {/* Brand Section */}
            <BrandSection
              name="Abhiraj K"
              title="Full-Stack Developer & Creative Designer"
              description="Crafting digital experiences with precision and creativity. Next.js specialist building modern web solutions."
            />

            {/* Company Links */}
            <FooterSection title="Company" links={footerLinks.company} />

            {/* Resources Links */}
            <FooterSection title="Resources" links={footerLinks.resources} />

            {/* Contact Info */}
            <ContactInfo email="abhirajk0123@gmail.com" location="Kerala,India" />

            <SocialLinks />
          </div>

          {/* Footer Bottom */}
          <div
            className="footer-bottom w-full text-center"
            style={footerBottomStyle}
            role="contentinfo"
            aria-label="Copyright information"
          >
            <div>
              © {new Date().getFullYear()} Abhiraj K - Best Software Engineer in
              Kochi, Kerala. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AnimatedFooter;

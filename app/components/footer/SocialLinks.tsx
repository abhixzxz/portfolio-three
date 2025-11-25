"use client";

import React, { ReactNode } from "react";
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  Codepen,
} from "lucide-react";

export interface SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
  color: string;
  
}

export const socialLinks: SocialLink[] = [
  {
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/abhixzxz",
    label: "Github",
    color: "hover:text-white",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/abhiraj-k-0661a1235",
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: "https://x.com/bhiraj_k39869?t=vdXPv1FcU1o6UZ7dVem6CQ&s=09",
    label: "Twitter",
    color: "hover:text-sky-400",
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    href: "https://www.instagram.com/abhirajk84/",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    icon: <Facebook className="w-5 h-5" />,
    href: "https://www.facebook.com/abhi.rajk.12?mibextid=ZbWKwL",
    label: "Facebook",
    color: "hover:text-blue-500",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    href: "https://abhirajk.vercel.app/",
    label: "Website",
    color: "hover:text-green-400",
  },
  {
    icon: <Codepen className="w-5 h-5" />,
    href: "https://tailwindflex.com/@abhirajk",
    label: "Tailwind Flex",
    color: "hover:text-gray-100",
  },
];

const SocialLinks = () => {
  return (
    <section style={{ minWidth: 0 }}>
      <h3
        style={{
          fontSize: "clamp(14px, 3.5vw, 18px)",
          fontWeight: "600",
          marginBottom: "24px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Follow
      </h3>
      <nav
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label + " Profile"}
            style={{
              transition: "color 0.3s",
            }}
            className={`${link.color} text-yellow-100`}
          >
            {link.icon}
          </a>
        ))}
      </nav>
    </section>
  );
};

export default SocialLinks;

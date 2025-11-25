import React from "react";
import Link from "next/link";
import { FooterSectionProps } from "./types";
import SvgIcon from "./SvgIcon";

const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => {
  return (
    <section style={{ minWidth: 0 }} aria-labelledby={`footer-section-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <h3
        id={`footer-section-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-yellow-100"
        style={{
          fontSize: "clamp(14px, 3.5vw, 18px)",
          fontWeight: "600",
          marginBottom: "24px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {title}
      </h3>
      <nav
        role="navigation"
        aria-label={`${title} navigation`}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="footer-link text-yellow-100"
                style={{
                  textDecoration: "none",
                  fontSize: "clamp(12px, 2.5vw, 14px)",
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                }}
                aria-label={`Navigate to ${link.label}`}
                title={link.label}
              >
                <span
                  className="footer-icon"
                  style={{ opacity: 0, marginRight: "8px", flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <SvgIcon name="arrow" size={16} />
                </span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default FooterSection;

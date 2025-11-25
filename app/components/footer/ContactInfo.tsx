import React from "react";
import { ContactInfoProps } from "./types";
import SvgIcon from "./SvgIcon";

const ContactInfo: React.FC<ContactInfoProps> = ({ email, location }) => {
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
        Contact
      </h3>
      <address
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          fontStyle: "normal",
        }}
      >
        <a
          className="text-yellow-100"
          href={`mailto:${email}`}
          style={{
            textDecoration: "none",
            fontSize: "clamp(12px, 2.5vw, 14px)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <SvgIcon name="mail" size={16} />
          <span>{email}</span>
        </a>

        <div
          className="text-yellow-100"
          style={{
            fontSize: "clamp(12px, 2.5vw, 14px)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <SvgIcon name="location" size={16} />
          <span>{location}</span>
        </div>
      </address>
    </section>
  );
};

export default ContactInfo;

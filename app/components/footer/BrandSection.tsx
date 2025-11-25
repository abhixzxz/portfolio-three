import React from "react";

interface BrandSectionProps {
  name: string;
  title: string;
  description: string;
}

const BrandSection: React.FC<BrandSectionProps> = ({
  name,
  title,
  description,
}) => {
  return (
    <section className="aubrey-regular" style={{ minWidth: 0 }}>
      <h2
        className="aubrey-regular"
        style={{
          fontSize: "clamp(24px, 6vw, 28px)",
          fontWeight: "bold",
          marginBottom: "8px",
          wordBreak: "break-word",
        }}
      >
        {name}
      </h2>
      <p
        className="text-yellow-100"
        style={{
          fontSize: "clamp(12px, 3vw, 14px)",
          marginBottom: "24px",
          lineHeight: "1.5",
        }}
      >
        {title}
      </p>
      <p
        className="text-yellow-100"
        style={{
          fontSize: "clamp(11px, 2.5vw, 12px)",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>
    </section>
  );
};

export default BrandSection;

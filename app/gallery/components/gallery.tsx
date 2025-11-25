// components/Gallery.tsx
"use client";

import Navbar from "@/app/components/navbar/Navbar";
import Image from "next/image";
import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  columns?: number;
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
      gap: "1.5rem",
      padding: "2rem 1rem",
    }),
    []
  );

  // Mouse parallax effect - only on non-touch devices
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isTouchDevice) return;

      mouseRef.current = { x: e.clientX, y: e.clientY };

      if (gridRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (e.clientX - centerX) / centerX;
        const moveY = (e.clientY - centerY) / centerY;

        const offsetX = moveX * 30;
        const offsetY = moveY * 30;

        gridRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.02)`;
      }
    },
    [isTouchDevice]
  );

  // Reset cursor & transform on mouse leave
  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    if (gridRef.current) {
      gridRef.current.style.transform = "translate(0px, 0px) scale(1)";
      document.body.style.cursor = "default";
    }
  }, [isTouchDevice]);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice) {
      document.body.style.cursor = "grab";
    }
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "default";
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, isTouchDevice]);

  return (
    <div className="bg-black">
      <Navbar />
      <section
        ref={containerRef}
        className="gallery-container bg-black"
        role="region"
        aria-label="Image gallery"
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <div
          ref={gridRef}
          className="gallery-grid"
          style={gridStyle}
          role="grid"
        >
          {images.map((image) => (
            <article key={image.id} className="gallery-item" role="gridcell">
              <figure className="gallery-figure">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  className="gallery-image"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhZPQAJOwP5c4A5ZQAAAABJRU5ErkJggg=="
                />
                <figcaption className="sr-only">{image.alt}</figcaption>
              </figure>
            </article>
          ))}
        </div>
      </section>

      <style jsx>{`
        .gallery-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background-color: #000;
        }

        .gallery-grid {
          display: grid;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
          transform: translateZ(0);
          max-width: 1920px;
          margin: 0 auto;
        }

        .gallery-item {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 0.75rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          background-color: #111;
        }

        .gallery-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
          z-index: 10;
        }

        .gallery-figure {
          position: relative;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          border-radius: 0.75rem;
        }

        .gallery-image {
          object-fit: cover;
          object-position: center;
          width: 100%;
          height: 100%;
          transition: transform 0.6s ease;
          transform: scale(1.5);
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.6);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1025px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Disable hover effects on touch */
        @media (hover: none) and (pointer: coarse) {
          .gallery-item:hover {
            transform: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          .gallery-item:hover .gallery-image {
            transform: scale(1);
          }
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-grid,
          .gallery-item,
          .gallery-image {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;

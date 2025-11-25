// components/ContactUsGraphics.tsx
"use client";
import { useRef, useEffect, useState } from "react";
import Contactform from "./contact-form";
import { ThreeSceneCanvas } from "./ThreeScene";

export default function ContactUsGraphics() {
  const [rotation, setRotation] = useState(0);
  const [, setScrollVelocity] = useState(0);
  const velocityRef = useRef(0);
  const contactRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Wheel event - only on desktop
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY > 0 ? 1 : -1;
      velocityRef.current = delta * 0.05;
      setScrollVelocity(velocityRef.current);

      setRotation((prev) => prev + velocityRef.current);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isMobile]);

  // Velocity decay
  useEffect(() => {
    const interval = setInterval(() => {
      velocityRef.current *= 0.95;
      setRotation((prev) => prev + velocityRef.current);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 animate-slideInLeft relative z-10">
          <div
            ref={contactRef}
            className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20"
          >
            <div className="w-full">
              <Contactform />
            </div>
          </div>
        </div>

        {/* 3D Scene Section */}
        <div className="w-full lg:w-1/2 h-72 sm:h-96 lg:h-screen order-1 lg:order-2 animate-slideInRight lg:relative">
          {/* Mobile: Show 3D behind form */}
          {isMobile && (
            <div className="fixed inset-0 w-full h-72 sm:h-96 z-0">
              <ThreeSceneCanvas rotation={0} />
            </div>
          )}

          {/* Desktop: Show 3D normally with scroll interaction */}
          {!isMobile && (
            <div className="w-full h-full">
              <ThreeSceneCanvas rotation={rotation} />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        @media (max-width: 1023px) {
          .min-h-screen {
            min-height: auto;
            background: linear-gradient(
              135deg,
              rgba(6, 182, 212, 0.1),
              rgba(147, 51, 234, 0.1)
            );
          }
        }
      `}</style>
    </div>
  );
}

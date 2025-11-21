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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY > 0 ? 1 : -1;
      velocityRef.current = delta * 0.05;
      setScrollVelocity(velocityRef.current);

      setRotation((prev) => prev + velocityRef.current);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

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
        <div className="w-full lg:w-6/12 order-2 lg:order-1">
          <div
            ref={contactRef}
            className="min-h-screen bg-black flex items-center justify-center px-6 py-20"
          >
            <div className="w-full lg:w-5xl">
              <Contactform />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-6/12 h-96 lg:max-h-screen lg:h-screen order-1 lg:order-2">
          <ThreeSceneCanvas rotation={rotation} />
        </div>
      </div>
    </div>
  );
}

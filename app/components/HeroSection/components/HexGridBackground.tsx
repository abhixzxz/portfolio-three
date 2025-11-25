// components/HexGridBackground.js
"use client"; // This must be a client component

import { useEffect, useRef, useState } from "react";

export default function HexGridBackground() {
  const canvasRef = useRef(null);
  const gridInstanceRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadBackground = async () => {
      // Dynamically import the library to avoid SSR issues
      // We are using the ESM CDN link compatible with modern bundlers
      const { default: Grid1Background } = await import(
        /* webpackIgnore: true */ "https://cdn.jsdelivr.net/npm/threejs-components@0.0.16/build/backgrounds/grid1.cdn.min.js"
      );

      if (canvasRef.current) {
        const bg = Grid1Background(canvasRef.current);
        gridInstanceRef.current = bg;
        setIsLoaded(true);
      }
    };

    loadBackground();

    // Cleanup function usually not needed for this specific light wrapper,
    // but good practice if the library offered a .dispose() method.
  }, []);

  const randomizeColors = () => {
    if (!gridInstanceRef.current) return;

    const bg = gridInstanceRef.current;

    // Using standard Hex Math
    bg.grid.setColors([
      0xffffff * Math.random(),
      0xffffff * Math.random(),
      0xffffff * Math.random(),
    ]);

    bg.grid.light1.color.set(0xffffff * Math.random());
    bg.grid.light1.intensity = 500 + Math.random() * 1000;

    bg.grid.light2.color.set(0xffffff * Math.random());
    bg.grid.light2.intensity = 250 + Math.random() * 250;
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10" // -z-10 puts it behind everything
      />

      {/* Floating Control Button */}
      {isLoaded && (
        <div className="fixed bottom-4 w-full flex justify-center z-20">
          <button
            onClick={randomizeColors}
            className="backdrop-blur-sm bg-white/50 border border-gray-400 rounded px-4 py-2 font-medium hover:bg-white/70 transition-colors"
          >
            Random Colors
          </button>
        </div>
      )}
    </>
  );
}

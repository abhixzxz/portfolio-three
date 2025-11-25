"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <style jsx>{`
        .nav-container {
          position: sticky;
          top: 0;
          display: grid;
          grid-template-columns: 3.5rem 1fr;
          place-items: center;
          background: black;
          overflow: hidden;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .button {
          position: relative;
          display: grid;
          place-items: center;
          width: 3.5rem;
          height: 3.25rem;
          padding-block: 0.5rem;
          margin: auto;
          background: #000c2a;
          z-index: 1;
          cursor: pointer;
        }

        .bar {
          width: 2rem;
          height: 0.25rem;
          background-color: ivory;
          border-radius: 0.5rem;
          transition: all 0.3s ease-in-out;
        }

        .bar1 {
          transform: ${isOpen
            ? "translate(0, 0.75rem) rotate(270deg) scaleX(0.35) scaleY(1.75)"
            : "none"};
          transform-origin: bottom right;
        }

        .bar2 {
          transform: ${isOpen
            ? "translate(0, 0) rotate(-270deg) scaleX(0.35) scaleY(1.75)"
            : "none"};
          transform-origin: 50% 50%;
        }

        .bar3 {
          transform: ${isOpen
            ? "translate(0, -0.75rem) rotate(270deg) scaleX(0.35) scaleY(1.75)"
            : "none"};
          transform-origin: top left;
        }

        .menu-list {
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 3.5rem;
          list-style-type: none;
          width: ${isOpen ? "100%" : "8%"};
          transform: ${isOpen ? "translateX(0)" : "translateX(-80vw)"};
          transform-origin: top left;
          transition: transform 0.2s ease-out, width 0.4s ease;
        }

        .menu-list li {
          margin: 0;
        }

        .nav-link {
          padding: 0 3px 3px 3px;
          border-bottom: 2px solid transparent;
          font-family: system-ui, sans-serif;
          font-size: max(1rem, 2cqi);
          color: white;
          text-decoration: none;
          transition: border 0.3s ease-in-out;
        }

        .nav-link:hover {
          border-bottom: 2px solid white;
        }
      `}</style>

      <nav className="nav-container" aria-label="Main Navigation">
        <div
          className="button"
          onClick={toggleMenu}
          role="button"
          aria-label="Toggle menu"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
        >
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
        </div>
        <ul className="menu-list">
          <li>
            <Link href="/" className="nav-link glass-antiqua-regular ">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="nav-link glass-antiqua-regular">
              About-me
            </Link>
          </li>
          <li>
            <Link href="/contact" className="nav-link glass-antiqua-regular ">
              Contact-me
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

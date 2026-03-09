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

      <header className="nav-container" role="banner">
        <nav
          className="w-full"
          aria-label="Main Navigation - Abhiraj K, Best Software Engineer in Kochi, Kerala"
        >
          <button
            className="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="main-navigation-menu"
            type="button"
          >
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar3"></span>
          </button>
          <ul className="menu-list" id="main-navigation-menu" role="menubar">
            <li role="none">
              <Link
                href="/"
                className="nav-link glass-antiqua-regular"
                role="menuitem"
                aria-label="Home - Abhiraj K Portfolio"
              >
                Home
              </Link>
            </li>
            <li role="none">
              <Link
                href="/about-me"
                className="nav-link glass-antiqua-regular"
                role="menuitem"
                aria-label="About Abhiraj K - Full Stack Developer in Kerala"
              >
                About-me
              </Link>
            </li>
            <li role="none">
              <Link
                href="/projects"
                className="nav-link glass-antiqua-regular"
                role="menuitem"
                aria-label="Projects - View Abhiraj K's Full Stack Development Work"
              >
                Projects
              </Link>
            </li>
            <li role="none">
              <Link
                href="/gallery"
                className="nav-link glass-antiqua-regular"
                role="menuitem"
                aria-label="Gallery - Professional Photos of Abhiraj K"
              >
                Gallery
              </Link>
            </li>
            <li role="none">
              <Link
                href="/contact-me"
                className="nav-link glass-antiqua-regular"
                role="menuitem"
                aria-label="Contact Abhiraj K - Software Engineer in Kochi"
              >
                Contact-me
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

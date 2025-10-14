/* eslint-disable prettier/prettier */
"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="border-brand-gold/20 border-t relative">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="absolute -top-6 right-4 sm:right-8 bg-brand-gold hover:bg-yellow-500 text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
        <div className="text-foreground/80 flex flex-col items-center gap-1 text-center text-sm">
          <span>For more info contact</span>
          <a
            href="mailto:ramakanth.reddy@thegalleriamall.in"
            className="hover:text-foreground underline"
          >
            ramakanth.reddy@thegalleriamall.in
          </a>
        </div>
        <div className="mt-4 flex flex-col items-center gap-4">
          <p className="text-foreground/60 text-sm">
            © {new Date().getFullYear()} PSRInfinity Mall
          </p>
          <div className="flex items-center gap-4">
            <a
              aria-label="Instagram"
              className="text-foreground/60 hover:text-foreground"
              href="https://www.instagram.com/psrinfinity?igsh=MTF3cGJyc2hnbjQ1Yg%3D%3D&utm_source=qr"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              aria-label="Facebook"
              className="text-foreground/60 hover:text-foreground"
              href="https://www.facebook.com/share/19f8RC5Knq/"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 9h3V6h-3a3 3 0 00-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9a1 1 0 011-1z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              aria-label="X"
              className="text-foreground/60 hover:text-foreground"
              href="https://x.com/psrinfinity?s=21"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3l8.5 10.5L3 21h3.5l6-6.7L18.5 21H21l-8.5-10.5L21 3h-3.5L12 9.7 7.5 3H3z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

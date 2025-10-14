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
              className="text-foreground/60 hover:text-foreground transition-colors"
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
              className="text-foreground/60 hover:text-foreground transition-colors"
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
              aria-label="YouTube"
              className="text-foreground/60 hover:text-red-500 transition-colors"
              href="https://youtube.com/@psrinfinity?si=5KCQZLyo7HKjzWNC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23 12s0-3.85-.46-5.58c-.25-.95-.98-1.69-1.94-1.94C18.88 4 12 4 12 4s-6.88 0-8.6.48c-.96.25-1.69.99-1.94 1.94C1 8.15 1 12 1 12s0 3.85.46 5.58c.25.95.98 1.69 1.94 1.94C5.12 20 12 20 12 20s6.88 0 8.6-.48c.96-.25 1.69-.99 1.94-1.94C23 15.85 23 12 23 12z"
                  fill="currentColor"
                />
                <path
                  d="M10 15.27L16 12L10 8.73v6.54z"
                  fill="#0a0a0a"
                />
              </svg>
            </a>
            <a
              aria-label="WhatsApp"
              className="text-foreground/60 hover:text-green-500 transition-colors"
              href="https://wa.me/918524060606"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              aria-label="X"
              className="text-foreground/60 hover:text-foreground transition-colors"
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

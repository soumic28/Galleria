/* eslint-disable prettier/prettier */
"use client";
import { useState } from "react";

import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-brand-gold/20 bg-brand-white/70 supports-[backdrop-filter]:bg-brand-white/60 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:h-20">
        {/* Logo */}
        <div className="flex items-baseline gap-2">
          <span className="inline-flex items-center gap-2 font-serif text-2xl tracking-tight">
            <Image
              className="h-14 w-auto"
              src="/PSRInfinity-LOGO.png"
              alt="PsrInfinity Mall logo"
              width={40}
              height={40}
            />
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 sm:gap-6">
          <NavLinks />
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden focus:outline-none"
          style={{ color: '#3C127A' }}
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col gap-4">
            <NavLinks />
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLinks() {
  return (
    <>
      <a
        className="font-sans text-xs tracking-[0.2em] uppercase hover:opacity-70"
        style={{ color: '#3C127A' }}
        href="#hero-interactive-area"
      >
        Home
      </a>
      <a
        className="font-sans text-xs tracking-[0.2em] uppercase hover:opacity-70"
        style={{ color: '#3C127A' }}
        href="#highlights"
      >
        Highlights
      </a>
      <a
        className="font-sans text-xs tracking-[0.2em] uppercase hover:opacity-70"
        style={{ color: '#3C127A' }}
        href="#gallery"
      >
        Gallery
      </a>
      <a
        className="font-sans text-xs tracking-[0.2em] uppercase hover:opacity-70"
        style={{ color: '#3C127A' }}
        href="#contact"
      >
        Contact
      </a>
      <a
        href="/PSR INFINITY DC.pdf"
        download="PSR INFINITY DC.pdf"
        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-3 py-1.5 rounded-md text-xs font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:shadow-md"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Digital Card
      </a>
    </>
  );
}

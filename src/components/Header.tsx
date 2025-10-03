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
              className="h-10 w-auto"
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
          className="md:hidden text-foreground focus:outline-none"
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
        className="text-foreground/70 hover:text-foreground font-sans text-xs tracking-[0.2em] uppercase"
        href="#hero-interactive-area"
      >
        Home
      </a>
      <a
        className="text-foreground/70 hover:text-foreground font-sans text-xs tracking-[0.2em] uppercase"
        href="#highlights"
      >
        Highlights
      </a>
      <a
        className="text-foreground/70 hover:text-foreground font-sans text-xs tracking-[0.2em] uppercase"
        href="#gallery"
      >
        Gallery
      </a>
      <a
        className="text-foreground/70 hover:text-foreground font-sans text-xs tracking-[0.2em] uppercase"
        href="#contact"
      >
        Contact
      </a>
    </>
  );
}

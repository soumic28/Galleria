/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type React from "react";

type ImgSpec = {
  src: string;
  alt: string;
  /** Anchor position around the center area */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
  /** Hide this item on small screens */
  hideOnMobile?: boolean;
  /** Outward offset from the anchor. Accepts css units (px, vw, vh, %). */
  tx: string;
  ty: string;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

/**
 * Returns a 0..1 progress value as the user scrolls through the section.
 * Optimized with throttling and better performance
 */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight || 1;
    const total = rect.height - viewH;
    // When section top hits viewport top => 0, when bottom hits => 1
    const scrolled = Math.min(total, Math.max(0, -rect.top));
    const next = total > 0 ? scrolled / total : 0;

    // Use requestAnimationFrame for smooth updates
    const smoothProgress = clamp01(next);
    setP(smoothProgress);

    const inView = rect.top < viewH && rect.bottom > 0;
    setActive(inView);
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(update);
    };

    // Initial update
    update();

    // Use passive listeners for better performance
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [ref, update]);

  return { p, active };
}

export default function ScrollPullGallery() {
  const hostRef = useRef<HTMLDivElement>(null);
  const { p: progress, active } = useScrollProgress(hostRef);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized image specifications with all images starting from outside the screen
  const images: ImgSpec[] = [
    {
      src: "./pic-1.png",
      alt: "People at a mall 1",
      top: "8%",
      left: "12%",
      width: "clamp(96px, 30vw, 220px)",
      tx: isMobile ? "-100vw" : "-120vw", // Even further for mobile
      ty: isMobile ? "10vh" : "-40vh",
    },
    {
      src: "./pic-2.png",
      alt: "Cafe",
      top: "4%",
      left: "50%",
      width: "clamp(92px, 30vw, 210px)",
      tx: isMobile ? "-105vw" : "-100vw",
      ty: isMobile ? "-35vh" : "-45vh",
    },
    {
      src: "./pic-3.png",
      alt: "Makeup",
      top: "14%",
      right: "8%",
      width: "clamp(96px, 30vw, 240px)",
      tx: isMobile ? "80vw" : "120vw",
      ty: isMobile ? "-35vh" : "-35vh",
    },
    {
      src: "./pic-4.png",
      alt: "Friends",
      top: "38%",
      right: "6%",
      width: "clamp(96px, 30vw, 240px)",
      tx: isMobile ? "100vw" : "110vw",
      ty: isMobile ? "60vh" : "-10vh",
    },
    {
      src: "./pic-5.png",
      alt: "Kids play",
      bottom: "28%",
      left: "10%",
      width: "clamp(96px, 30vw, 240px)",
      hideOnMobile: false, // Show on mobile too for better effect
      tx: isMobile ? "-85vw" : "-110vw",
      ty: isMobile ? "50vh" : "15vh",
    },
    {
      src: "./pic-6.png",
      alt: "Store",
      bottom: "10%",
      left: "40%",
      width: "clamp(92px, 32vw, 220px)",
      tx: isMobile ? "-0vw" : "-90vw",
      ty: isMobile ? "85vh" : "35vh",
    },
  ];

  // Allow CSS custom properties on style objects without using `any`.
  type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

  return (
    <section
      ref={hostRef}
      aria-label="Location advantages"
      className="pull-stage relative isolate my-28 h-[150vh] overflow-hidden sm:h-[140vh]" // Increased mobile height
      data-active={active ? "true" : "false"}
      style={{
        "--p": String(progress),
        // CSS custom properties for smooth transitions
        "--transition-duration": isMobile ? "0.3s" : "0.1s", // Slower on mobile
        "--ease": "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      } as CSSVars}
    >
      {/* Sticky center content with GPU acceleration */}
      <div className="pointer-events-none sticky top-1/2 z-10 -translate-y-1/2 will-change-transform">
        <h2 className="pull-heading bg-gradient-to-b from-brand-gold to-white bg-clip-text text-transparent mx-auto max-w-4xl text-center font-serif text-4xl leading-[1.05] font-extrabold tracking-tight uppercase sm:text-5xl md:text-7xl lg:text-8xl">
          Location Advantage,
          <br /> 8 mins Hanamkonda,
          <br /> 10 mins Warangal,
          <br /> 25 mins Kazipet
        </h2>
      </div>

      {/* Floating images pulled towards the center as you scroll - optimized */}
      <div className="pointer-events-none absolute inset-0 md:z-20 z-0 ">
        {images.map((img, i) => {
          // Different easing for mobile vs desktop
          const easedProgress = isMobile
            ? progress // Linear for mobile - smoother
            : progress * progress * (3 - 2 * progress); // Smoothstep for desktop

          // Reduced pull strength for mobile
          const pullStrength = isMobile ? 0.7 : 0.85;

          return (
            <div
              key={i}
              data-pull
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: img.width ?? "clamp(110px, 26vw, 240px)",
                // Optimized transform with GPU acceleration
                transform: `translate3d(calc(-50% + ${img.tx} * ${1 - easedProgress * pullStrength}), calc(-50% + ${img.ty} * ${1 - easedProgress * pullStrength}), 0)`,
                // Different transition timing for mobile
                transition: active
                  ? isMobile
                    ? "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    : "transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  : "none",
                // GPU acceleration hints
                willChange: active ? "transform" : "auto",
                backfaceVisibility: "hidden",
                perspective: "1000px",
              } as React.CSSProperties}
              className={
                (img.hideOnMobile && isMobile ? "hidden " : "") +
                "overflow-hidden rounded-md shadow-xl transform-gpu" // Added transform-gpu class
              }
            >
              {/* Optimized image with better loading */}
              <img
                src={img.src}
                alt={img.alt}
                className="block h-auto w-full select-none object-cover"
                draggable={true}
                loading="lazy"
                decoding="async" // Async decoding for better performance
                style={{
                  // Prevent layout shift
                  aspectRatio: "1",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Add CSS for additional optimization */}
      <style jsx>{`
        .pull-stage {
          /* Enable hardware acceleration */
          transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          /* Better mobile scroll performance */
          -webkit-overflow-scrolling: touch;
        }
        
        /* Optimize for different device types */
        @media (prefers-reduced-motion: reduce) {
          .pull-stage * {
            transition: none !important;
            animation: none !important;
          }
        }
        
        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .pull-stage {
            height: 150vh !important;
          }
          
          [data-pull] {
            transition-duration: 0.4s !important;
            transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1) !important;
          }
          
          /* Prevent iOS bounce effect interference */
          .pull-stage {
            position: relative;
            z-index: 1;
          }
          
          /* Enhanced mobile shadows for depth */
          [data-pull] {
            filter: drop-shadow(0 10px 25px rgba(0,0,0,0.15));
          }
        }
        
        /* Tablet optimizations */
        @media (min-width: 769px) and (max-width: 1024px) {
          [data-pull] {
            transition-duration: 0.25s !important;
            filter: drop-shadow(0 15px 35px rgba(0,0,0,0.2));
          }
        }
        
        /* Desktop enhancements */
        @media (min-width: 1025px) {
          [data-pull] {
            filter: drop-shadow(0 20px 40px rgba(0,0,0,0.25));
          }
          
          [data-pull]:hover {
            transform: scale(1.02) !important;
            transition-duration: 0.2s !important;
          }
        }
        
        /* High refresh rate displays */
        @media (min-resolution: 120dpi) and (min-width: 769px) {
          [data-pull] {
            transition-duration: 0.08s;
          }
        }
        
        /* Touch device optimizations */
        @media (pointer: coarse) {
          [data-pull] {
            transition-duration: 0.5s !important;
            transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1) !important;
          }
        }
        
        /* Enhanced visual depth */
        [data-pull] {
          transform-style: preserve-3d;
        }
        
        /* Staggered animation delays */
        [data-pull]:nth-child(1) { animation-delay: 0s; }
        [data-pull]:nth-child(2) { animation-delay: 0.05s; }
        [data-pull]:nth-child(3) { animation-delay: 0.1s; }
        [data-pull]:nth-child(4) { animation-delay: 0.15s; }
        [data-pull]:nth-child(5) { animation-delay: 0.2s; }
        [data-pull]:nth-child(6) { animation-delay: 0.25s; }
      `}</style>
    </section>
  );
}
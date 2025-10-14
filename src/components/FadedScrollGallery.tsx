/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";

type Item = {
  src: string;
  alt: string;
  x: number; // -1 .. 1 initial horizontal offset (as viewport width)
  y: number; // -1 .. 1 initial vertical offset (as viewport height)
  size: string; // css width
  rotate?: number; // degrees
};

function useSectionProgress(ref: React.RefObject<HTMLElement>) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height - vh;
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return p; // 0..1
}

type Props = {
  /** 0..1 – smaller is slower. Default 0.035 */
  speed?: number;
};

export default function FadedScrollGallery({ speed = 0.030 }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const p = useSectionProgress(hostRef as React.RefObject<HTMLElement>);

  // Slow, time-smoothed animation independent of scroll speed
  const [animP, setAnimP] = useState(0);
  // Even slower smoothing for heading/description
  const [descAnimP, setDescAnimP] = useState(0);
  useEffect(() => {
    let raf: number;
    const SPEED = Math.max(0.001, Math.min(1, speed)); // clamp
    const tick = () => {
      setAnimP((prev) => {
        const next = prev + (p - prev) * SPEED;
        return Math.abs(next - prev) < 0.0005 ? p : next;
      });
      // Description progresses much slower for better readability
      const descSpeed = Math.max(0.001, Math.min(1, SPEED * 0.15)); // Reduced from 0.35 to 0.15
      setDescAnimP((prev) => {
        const next = prev + (p - prev) * descSpeed;
        return Math.abs(next - prev) < 0.0005 ? p : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [p, speed]);

  const items: Item[] = [
    { src: "/images/gallery_5.png", alt: "Gallery 1", x: -1.1, y: -0.6, size: "clamp(180px, 36vw, 450px)", rotate: -2 },
    { src: "/images/about.png", alt: "Gallery 2", x: 1.2, y: -0.4, size: "clamp(165px, 33vw, 420px)", rotate: 3 },
    { src: "/images/gallery_7.png", alt: "Gallery 3", x: -0.9, y: 0.4, size: "clamp(180px, 36vw, 450px)", rotate: 2 },
    { src: "/images/gallery_1.png", alt: "Gallery 4", x: 0.9, y: 0.6, size: "clamp(180px, 36vw, 450px)", rotate: -3 },
    // { src: "/cinema-5.png", alt: "Gallery 5", x: -0.2, y: -1.1, size: "clamp(165px, 33vw, 420px)", rotate: -1 },
    // { src: "/cinema-6.png", alt: "Gallery 6", x: 0.2, y: 1.1, size: "clamp(165px, 33vw, 420px)", rotate: 1 },
  ];

  type CSSVars = React.CSSProperties & Record<`--${string}` , string | number>;
  // Heading/description: shrink over a much longer window for better readability
  const descStart = 0.05;
  const descEnd = 0.65; // Increased from 0.40 to 0.65 for slower progression
  const descLocal = Math.min(1, Math.max(0, (descAnimP - descStart) / (descEnd - descStart)));
  const descEase = 1 - Math.pow(1 - descLocal, 2); // Changed from cubic to quadratic for gentler easing
  const descMinScale = 0.22; // very small final size
  const descScale = 1 - descEase * (1 - descMinScale);
  // Keep heading/description fully visible (no fading)
  const descOpacity = 1;
  const descTranslateY = descEase * -12; // Reduced from -16 to -12 for gentler movement
  // No blur for a crisp, positive look
  const descBlur = 0;

  // When all images have reached full opacity, fade the heading out
  // This happens when p passes the last image's fadeEnd
  // Gradually dim images after all have fully appeared

  return (
    <section
      ref={hostRef}
      className="relative isolate mt-4 sm:mt-6 h-[140vh] sm:h-[160vh] overflow-hidden"
      style={{ "--p": animP } as CSSVars}
      aria-label="Faded scrolling gallery"
    >
      {/* Heading */}
      <div
        className="pointer-events-none sticky top-1/2 -z-10 -translate-y-1/2 text-center will-change-transform"
        style={{
          transform: `translateY(${descTranslateY}px) scale(${descScale})`,
          opacity: descOpacity,
          filter: `blur(${descBlur}px)`,
          transition: "transform 80ms linear, opacity 120ms linear, filter 120ms linear",
        }}
      >
        <h2 className="mx-auto max-w-3xl bg-gradient-to-b from-brand-gold to-foreground bg-clip-text font-serif text-2xl leading-tight tracking-tight text-transparent sm:text-4xl">
          WARANGAL'S FIRST & ONLY MALL
        </h2>
        
        {/* Description */}
        <div className="mx-auto mt-4 max-w-2xl space-y-3">
          <p className="text-sm text-white/90 leading-relaxed sm:text-base">
            Introducing <span className="text-yellow-400 font-semibold">PSR Infinity</span> - Warangal's premier and exclusive shopping destination. 
            Spanning across <span className="text-yellow-400 font-semibold">2 Lakh sq ft</span> of built-up area, this magnificent 9-floor marvel 
            redefines retail, entertainment, and lifestyle experiences in the city.
          </p>
          <p className="text-xs text-white/80 leading-relaxed sm:text-sm">
            With a massive <span className="text-yellow-400">4,500 sq ft atrium</span>, state-of-the-art multiplex with 5 screens, 
            and parking for 300+ cars, PSR Infinity stands as a landmark of modern architecture and convenience, 
            bringing world-class amenities to Warangal for the very first time.
          </p>
        </div>
        
        {/* Statistics Grid */}
       
      </div>

      {/* Images */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 top-16 sm:top-28 gallery-stage">
        {items.map((it, i) => {
          const baseStart = descEnd + 0.03; // start images after slower shrink
          const fadeStart = baseStart + i * 0.08;
          const fadeEnd = fadeStart + 0.50; // give images longer to develop
          const local = Math.min(1, Math.max(0, (animP - fadeStart) / (fadeEnd - fadeStart)));
          const opacity = 1; // Always fully opaque (no fade-in)
          // Push images further off-screen initially so they slide in from edges
          const translateX = `calc(${it.x} * (1 - var(--p)) * var(--reach-vw))`;
          const translateY = `calc(${it.y} * (1 - var(--p)) * var(--reach-vh))`;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{
                width: it.size,
                transform: `translate(-50%, -50%) translate3d(${translateX}, ${translateY}, 0) scale(calc(${0.98 + local * 0.06} * var(--img-scale, 1))) rotate(${(it.rotate || 0) * (1 - animP)}deg)`,
                opacity,
                transition: "transform 60ms linear, opacity 200ms ease-out",
                // Remove shadows entirely on images to avoid any overlay look
                filter: "none",
              } as React.CSSProperties}
            >
              <img
                src={it.src}
                alt={it.alt}
                className="block h-auto w-full select-none rounded-md object-cover"
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{ aspectRatio: "1", backfaceVisibility: "hidden" }}
              />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        /* Hide stray edges at the very top/bottom so nothing peeks into the hero */
        .gallery-stage {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 80px, black calc(100% - 72px), transparent 100%);
                  mask-image: linear-gradient(to bottom, transparent 0, black 80px, black calc(100% - 72px), transparent 100%);
        }
        /* Control how far off-screen images begin */
        section { --reach-vw: 65vw; --reach-vh: 65vh; --img-scale: 1; }
        @media (min-width: 1024px) {
          section { --reach-vw: 95vw; --reach-vh: 95vh; }
        }
        /* Mobile-only tuning: keep images more inside the viewport */
        @media (max-width: 640px) {
          section { --reach-vw: 100vw; --reach-vh: 100vh; --img-scale: 1.1; height: 120vh; }
          /* On phones, disable the vertical mask entirely to prevent edge banding */
          .gallery-stage { -webkit-mask-image: none; mask-image: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          section * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
}

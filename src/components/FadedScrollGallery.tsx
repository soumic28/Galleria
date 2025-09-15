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
      // Description progresses slower for a relaxed feel
      const descSpeed = Math.max(0.001, Math.min(1, SPEED * 0.35));
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
    // Slightly smaller sizes overall for a cleaner desktop layout
    { src: "./mall_pic_1.png", alt: "Gallery 1", x: -1.1, y: -0.6, size: "clamp(150px, 28vw, 380px)", rotate: -2 },
    { src: "./mall_pic_2.png", alt: "Gallery 2", x: 1.2, y: -0.4, size: "clamp(140px, 26vw, 350px)", rotate: 3 },
    { src: "./mall_pic_3.png", alt: "Gallery 3", x: -0.9, y: 0.4, size: "clamp(150px, 28vw, 380px)", rotate: 2 },
    { src: "./mall_pic_4.png", alt: "Gallery 4", x: 0.9, y: 0.6, size: "clamp(150px, 28vw, 380px)", rotate: -3 },
    { src: "./pic-5.png", alt: "Gallery 5", x: -0.2, y: -1.1, size: "clamp(140px, 26vw, 350px)", rotate: -1 },
    { src: "./pic-6.png", alt: "Gallery 6", x: 0.2, y: 1.1, size: "clamp(140px, 26vw, 350px)", rotate: 1 },
  ];

  type CSSVars = React.CSSProperties & Record<`--${string}` , string | number>;
  // Heading/description: shrink over a longer window, with easing, then pin
  const descStart = 0.05;
  const descEnd = 0.40; // slower, completes later
  const descLocal = Math.min(1, Math.max(0, (descAnimP - descStart) / (descEnd - descStart)));
  const descEase = 1 - Math.pow(1 - descLocal, 3); // ease-out
  const descMinScale = 0.22; // very small final size
  const descScale = 1 - descEase * (1 - descMinScale);
  const descOpacity = 1 - descEase * 0.10; // keep ~90% visible at rest
  const descTranslateY = descEase * -16; // gentle upward shift
  const descBlur = descEase * 0.15; // subtle blur only

  return (
    <section
      ref={hostRef}
      className="relative isolate -mt-24 h-[160vh] overflow-hidden"
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
        <h2 className="mx-auto max-w-4xl bg-gradient-to-b from-brand-gold to-foreground bg-clip-text font-serif text-4xl leading-tight tracking-tight text-transparent sm:text-6xl">
        ABOUT GALLERIA
        </h2>
        
        {/* Statistics Grid */}
        <div className="mx-auto mt-8 max-w-5xl grid grid-cols-3 gap-8 text-center">
          {/* Row 1 */}
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">71280</div>
            <div className="text-sm text-yellow-400">SQ FT SITE AREA</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">2 LAKH</div>
            <div className="text-sm text-yellow-400">SQ FT BUA</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">9</div>
            <div className="text-sm text-yellow-400">FLOORS</div>
          </div>
          
          {/* Row 2 */}
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">4500</div>
            <div className="text-sm text-yellow-400">SQ FT ATRIUM</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">50%</div>
            <div className="text-sm text-yellow-400">OPEN SPACE</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">15000</div>
            <div className="text-sm text-yellow-400">SQ FT CINI SPACE</div>
          </div>
          
          {/* Row 3 */}
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">20%</div>
            <div className="text-sm text-yellow-400">LANDSCAPING</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">300+</div>
            <div className="text-sm text-yellow-400">CARS PARKING</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">3</div>
            <div className="text-sm text-yellow-400">BASEMENTS</div>
          </div>
          
          {/* Row 4 */}
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">5</div>
            <div className="text-sm text-yellow-400">SCREENS</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">6</div>
            <div className="text-sm text-yellow-400">LIFTS</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">UNLTD</div>
            <div className="text-sm text-yellow-400">JOY</div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="pointer-events-none absolute inset-0">
        {items.map((it, i) => {
          const depth = 0.35 + (i % 3) * 0.2; // different parallax depths
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
                transform: `translate(-50%, -50%) translate3d(${translateX}, ${translateY}, 0) scale(${0.98 + local * 0.06}) rotate(${(it.rotate || 0) * (1 - animP)}deg)`,
                opacity,
                transition: "transform 60ms linear, opacity 200ms ease-out",
                // Softer, late-arriving shadow to avoid visible overlay on hero band
                filter: `drop-shadow(0 10px 20px rgba(0,0,0,${(0.05 + depth * 0.08) * local}))`,
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
        /* Control how far off-screen images begin */
        section { --reach-vw: 65vw; --reach-vh: 65vh; }
        @media (min-width: 1024px) {
          section { --reach-vw: 95vw; --reach-vh: 95vh; }
        }
        @media (max-width: 640px) {
          section { height: 170vh; }
        }
        @media (prefers-reduced-motion: reduce) {
          section * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
}

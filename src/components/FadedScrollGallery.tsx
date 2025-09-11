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

export default function FadedScrollGallery() {
  const hostRef = useRef<HTMLDivElement>(null);
  const p = useSectionProgress(hostRef as React.RefObject<HTMLElement>);

  const items: Item[] = [
    { src: "./mall_pic_1.png", alt: "Gallery 1", x: -1.1, y: -0.6, size: "clamp(120px, 24vw, 300px)", rotate: -2 },
    { src: "./mall_pic_2.png", alt: "Gallery 2", x: 1.2, y: -0.4, size: "clamp(110px, 22vw, 280px)", rotate: 3 },
    { src: "./mall_pic_3.png", alt: "Gallery 3", x: -0.9, y: 0.4, size: "clamp(120px, 24vw, 300px)", rotate: 2 },
    { src: "./mall_pic_4.png", alt: "Gallery 4", x: 0.9, y: 0.6, size: "clamp(120px, 24vw, 300px)", rotate: -3 },
    { src: "./pic-5.png", alt: "Gallery 5", x: -0.2, y: -1.1, size: "clamp(110px, 22vw, 280px)", rotate: -1 },
    { src: "./pic-6.png", alt: "Gallery 6", x: 0.2, y: 1.1, size: "clamp(110px, 22vw, 280px)", rotate: 1 },
  ];

  type CSSVars = React.CSSProperties & Record<`--${string}` , string | number>;

  return (
    <section
      ref={hostRef}
      className="relative isolate my-24 h-[160vh] overflow-hidden"
      style={{ "--p": p } as CSSVars}
      aria-label="Faded scrolling gallery"
    >
      {/* Heading */}
      <div className="pointer-events-none sticky top-1/2 -z-10 -translate-y-1/2 text-center">
        <h2 className="mx-auto max-w-4xl bg-gradient-to-b from-brand-gold to-foreground bg-clip-text font-serif text-4xl leading-tight tracking-tight text-transparent sm:text-6xl">
        Location Advantage,
        </h2>
        <p className="text-foreground/70 mx-auto mt-2 max-w-xl font-sans text-sm sm:text-base">
        8 mins Hanamkonda,<br />
        10 mins Warangal,<br />
           25 mins Kazipet
        </p>
      </div>

      {/* Images */}
      <div className="pointer-events-none absolute inset-0">
        {items.map((it, i) => {
          const depth = 0.35 + (i % 3) * 0.2; // different parallax depths
          const fadeStart = 0.05 + i * 0.06;
          const fadeEnd = 0.55 + i * 0.06;
          const local = Math.min(1, Math.max(0, (p - fadeStart) / (fadeEnd - fadeStart)));
          const opacity = Math.pow(local, 1.2);
          const translateX = `calc(${it.x} * (1 - var(--p)) * 55vw)`;
          const translateY = `calc(${it.y} * (1 - var(--p)) * 55vh)`;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{
                width: it.size,
                transform: `translate(-50%, -50%) translate3d(${translateX}, ${translateY}, 0) scale(${0.98 + local * 0.06}) rotate(${(it.rotate || 0) * (1 - p)}deg)`,
                opacity,
                transition: "transform 60ms linear, opacity 200ms ease-out",
                filter: `drop-shadow(0 20px 40px rgba(0,0,0,${0.15 + depth * 0.25}))`,
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



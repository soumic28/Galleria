/* eslint-disable @next/next/no-img-element */
/* eslint-disable prettier/prettier */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type React from "react";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState<number>(0);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight || 1;
    const total = rect.height - viewH;
    const scrolled = Math.min(total, Math.max(0, -rect.top));
    const next = total > 0 ? scrolled / total : 0;
    setP(clamp01(next));
  }, [ref]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return p;
}

export default function ScrollStackFeatures() {
  const hostRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(hostRef);

  const images = useMemo(
    () => [
      { src: "./pic-1.png", alt: "Feature 1" },
      { src: "./pic-2.png", alt: "Feature 2" },
      { src: "./pic-3.png", alt: "Feature 3" },
      { src: "./pic-4.png", alt: "Feature 4" },
      { src: "./pic-5.png", alt: "Feature 5" },
      { src: "./pic-6.png", alt: "Feature 6" },
    ],
    []
  );

  const total = images.length;
  const stackGapVH = 6; // vertical offset between stacked cards after they pass (in vh)

  return (
    <section
      id="features"
      ref={hostRef}
      aria-label="Features of the Galleria Mall"
      className="relative isolate my-28"
      style={{ height: `calc(${total + 2} * 100vh)` }}
    >
      <div className="pointer-events-none sticky top-0 z-10 flex h-screen items-start justify-center">
        <div className="pt-16 text-center">
          <h2 className="bg-gradient-to-b from-brand-gold to-white bg-clip-text text-transparent font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight">
            Features of the Galleria Mall
          </h2>
          <div className="via-brand-gold mx-auto my-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
          <p className="text-foreground/70 font-sans text-sm sm:text-base">
            Scroll to explore our highlights
          </p>
        </div>
      </div>

      <div className="pointer-events-none sticky top-0 z-20 h-screen">
        <div className="relative mx-auto h-full w-full max-w-5xl">
          {images.map((img, i) => {
            const segProgress = progress * total; // 0..total across section
            const rel = segProgress - i; // progress relative to this card's turn

            // Before entering view: slide up from below and fade in
            const entering = rel < 0;
            const enteringAmt = clamp01(1 + rel); // 0..1 as it approaches center

            // Stacking: earlier cards should keep moving up as more cards arrive
            // Use a discrete step so each pass adds exactly one stack unit.
            const passedAmount = Math.max(0, rel); // 0..N (continuous)
            const cardsPassed = Math.floor(segProgress); // 0..total (discrete)
            // Anchor the top of the stack: first card (i=0) never moves up.
            const offsetSteps = Math.min(Math.max(cardsPassed - i, 0), i); // 0..i
            const anchoredStackOffset = -stackGapVH * offsetSteps;

            // Compose transforms (vh units for consistency)
            const translateY = entering
              ? 40 * (1 - enteringAmt) // 40vh -> 0
              : anchoredStackOffset; // anchored stack that grows without drifting up

            const scale = entering
              ? 0.985 + 0.015 * enteringAmt
              : 1 - 0.06 * clamp01(Math.min(passedAmount, 1)); // step shrink once past center
            const opacity = entering ? enteringAmt : 1;

            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 w-[86vw] max-w-[820px] -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-none bg-transparent"
                style={{
                  zIndex: 1000 + i, // later cards appear above earlier ones
                  transform: `translate(-50%, -50%) translateY(${translateY}vh) scale(${scale})`,
                  transition: "transform 0.12s ease, opacity 0.2s ease",
                  opacity,
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="block h-auto w-full select-none object-contain"
                  loading="lazy"
                  decoding="async"
                  style={{ maxHeight: "72vh" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          :global(section[aria-label="Features of the Galleria Mall"]) {
            height: calc(${total} * 110vh);
          }
        }
      `}</style>
    </section>
  );
}

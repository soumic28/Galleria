/* eslint-disable @next/next/no-img-element */
/* eslint-disable prettier/prettier */
"use client";

import React, { useEffect, useRef, useState } from "react";

type Item = { src: string; label?: string };

type Props = {
  items?: [Item, Item, Item]; // left, center, right
  sectionVh?: number; // total scroll height; default 380
  bg1?: string; // gradient start
  bg2?: string; // gradient end
};

function useSectionProgress(ref: { current: HTMLElement | null }) {
  const [p, setP] = useState(0);
  const [sp, setSp] = useState(0); // smoothed
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
    let raf = 0;
    const tick = () => {
      setSp(prev => {
        const next = prev + (p - prev) * 0.12;
        return Math.abs(next - prev) < 0.0005 ? p : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, p]);
  return sp; // 0..1
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const invLerp = (a: number, b: number, v: number) => (v - a) / (b - a || 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => 1 - Math.pow(1 - clamp(t), 3);

export default function TriFocusScroll({
  items = [
    { src: "/cinema-2.png", label: "FRUIT" },
    { src: "/cinema-3.png", label: "OREO" },
    { src: "/cinema-4.png", label: "BUBBLY" },
  ],
  sectionVh = 380,
  bg1 = "#289AF3",
  bg2 = "#2691F6",
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const p = useSectionProgress(hostRef);

  // Segments
  const segA = clamp(invLerp(0.0, 0.33, p));
  const segB = clamp(invLerp(0.33, 0.66, p));
  const segC = clamp(invLerp(0.66, 1.0, p));

  // Pan
  const panLeft = 18; // vw (clamped to avoid overflow)
  const panRight = -18;
  let groupX = segA > 0 && segA < 1 ? lerp(0, 0, ease(segA)) : segB > 0 && segB <= 1 ? lerp(0, panLeft, ease(segB)) : lerp(panLeft, panRight, ease(segC));
  groupX = Math.max(panRight, Math.min(panLeft, groupX));

  // Per-item transforms
  const scaleFor = (idx: number) => {
    const sA = [0.84, 1.10, 0.82][idx];
    const sB = [1.22, 0.78, 0.68][idx];
    const sC = [0.68, 0.80, 1.16][idx];
    const a = segA, b = segB, c = segC;
    const valA = sA;
    const valB = lerp(sA, sB, ease(b));
    const valC = lerp(sB, sC, ease(c));
    return a < 1e-6 ? (b < 1e-6 ? sC : valB) : (b < 1e-6 ? valA : valC);
  };
  const blurFor = (idx: number) => {
    const bA = [2, 0, 2][idx];
    const bB = [0.5, 2, 4][idx];
    const bC = [4, 2, 0.5][idx];
    const b = segB > 0 ? lerp(bA, bB, ease(segB)) : bA;
    const c = segC > 0 ? lerp(bB, bC, ease(segC)) : bB;
    return segC > 0 ? c : b;
  };
  const zFor = (idx: number) => (scaleFor(idx) > 1 ? 3 : idx === 1 ? 2 : 1);
  const opacityFor = (idx: number) => clamp((scaleFor(idx) - 0.6) / 0.6, 0.45, 1);
  const rotateFor = (idx: number) => (idx === 0 ? -2 : idx === 2 ? 2 : 0);

  const labels = [items[0].label, items[1].label, items[2].label];

  return (
    <section
      ref={hostRef}
      className="relative isolate w-full overflow-visible"
      style={{ height: `${sectionVh}vh`, background: `linear-gradient(135deg, ${bg1}, ${bg2})` }}
      aria-label="Tri product focus scroll"
    >
      <div className="pointer-events-none sticky top-0 z-10 mx-auto flex h-[100vh] max-w-6xl items-center justify-center px-4 sm:px-6">
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0.0), rgba(0,0,0,0.45))" }} />

        <div className="relative w-full max-w-[1100px] overflow-hidden rounded-2xl" style={{ transform: `translateX(${groupX}vw)`, transition: "transform 70ms linear" }}>
          {/* Left */}
          <figure className="absolute left-[6%] top-1/2 -translate-y-1/2" style={{ width: "22vmin", zIndex: zFor(0), opacity: opacityFor(0), filter: `blur(${blurFor(0)}px)`, transform: `rotate(${rotateFor(0)}deg) scale(${scaleFor(0)})`, transition: "transform 70ms linear, filter 70ms linear, opacity 70ms linear" }}>
            <img src={items[0].src} alt={labels[0] || "Left"} className="w-full h-auto select-none object-contain" draggable={false} />
            {labels[0] && (
              <figcaption className="absolute -left-8 top-1/2 -translate-y-1/2 rotate-90 text-white drop-shadow-md tracking-widest font-extrabold">{labels[0]}</figcaption>
            )}
          </figure>

          {/* Center */}
          <figure className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: "36vmin", zIndex: zFor(1), opacity: opacityFor(1), filter: `blur(${blurFor(1)}px)`, transform: `scale(${scaleFor(1)})`, transition: "transform 70ms linear, filter 70ms linear, opacity 70ms linear" }}>
            <img src={items[1].src} alt={labels[1] || "Center"} className="w-full h-auto select-none object-contain" draggable={false} />
            {labels[1] && (
              <figcaption className="absolute right-[-3rem] top-1/2 -translate-y-1/2 text-white drop-shadow-md font-extrabold">{labels[1]}</figcaption>
            )}
          </figure>

          {/* Right */}
          <figure className="absolute right-[6%] top-1/2 -translate-y-1/2" style={{ width: "22vmin", zIndex: zFor(2), opacity: opacityFor(2), filter: `blur(${blurFor(2)}px)`, transform: `rotate(${rotateFor(2)}deg) scale(${scaleFor(2)})`, transition: "transform 70ms linear, filter 70ms linear, opacity 70ms linear" }}>
            <img src={items[2].src} alt={labels[2] || "Right"} className="w-full h-auto select-none object-contain" draggable={false} />
            {labels[2] && (
              <figcaption className="absolute left-[-3.5rem] top-1/2 -translate-y-1/2 -rotate-90 text-white drop-shadow-md tracking-widest font-extrabold">{labels[2]}</figcaption>
            )}
          </figure>

          {/* Decorative splash placeholder */}
          <div className="pointer-events-none absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 opacity-70" style={{ width: "42vmin", height: "22vmin", background: "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.85), rgba(255,255,255,0))", filter: "blur(6px)" }} />
        </div>
      </div>
    </section>
  );
}

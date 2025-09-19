/* eslint-disable @next/next/no-img-element */
/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  images?: { src: string; alt?: string }[];
  /** 0..1 — smaller is slower smoothing */
  speed?: number;
  /** Section height in viewport heights (free mode) */
  heightVh?: number;
  /** If true, consume scroll to step through items (center -> left -> right). */
  stepped?: boolean;
};

// Simple section progress from 0..1 while the sticky viewport is scrolled through
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

export default function ScrollFocusShift({
  images = [
    { src: "/mall_pic_1.png", alt: "Left" },
    { src: "/mall_pic_2.png", alt: "Center" },
    { src: "/mall_pic_3.png", alt: "Right" },
  ],
  speed = 0.06,
  heightVh = 200,
  stepped = false,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const p = useSectionProgress(hostRef as React.RefObject<HTMLElement>);

  // Smooth progress independent of scroll velocity
  const [animP, setAnimP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const s = Math.max(0.002, Math.min(1, speed));
    const tick = () => {
      setAnimP((prev) => {
        const next = prev + (p - prev) * s;
        return Math.abs(next - prev) < 0.0005 ? p : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [p, speed]);

  // Map overall progress (0..1) to a focus value f in [-1, 1]
  // Sequence: start centered -> slide focus to left -> pass through center -> slide to right
  function mapProgressToFocus(x: number) {
    // hold center for a brief moment
    if (x < 0.10) return 0;
    // 0.10..0.45: 0 -> -1
    if (x < 0.45) return -((x - 0.10) / (0.45 - 0.10));
    // 0.45..0.55: -1 -> 0 (cross back through center)
    if (x < 0.55) return -1 + ((x - 0.45) / (0.10));
    // 0.55..0.90: 0 -> +1
    if (x < 0.90) return (x - 0.55) / (0.90 - 0.55);
    // settle on right
    return 1;
  }

  // Stepped interaction: lock viewport and advance on wheel/touch
  // Stepped sequence now: -1 neutral (all equal) -> 0 left -> 1 center -> 2 right
  const [step, setStep] = useState(-1);
  const targetF = step === 0 ? -1 : step === 1 ? 0 : step === 2 ? 1 : 0;
  const [animF, setAnimF] = useState(targetF);
  useEffect(() => {
    let raf = 0;
    const s = Math.max(0.05, Math.min(1, speed));
    const tick = () => {
      setAnimF((prev) => {
        const next = prev + (targetF - prev) * s;
        return Math.abs(next - prev) < 0.0005 ? targetF : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetF, speed]);

  // Whether section is occupying the viewport
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = hostRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const visible = Math.max(0, Math.min(vh, r.bottom) - Math.max(0, r.top));
      const ratio = visible / vh;
      setInView(ratio >= 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Wheel stepping
  const wheelRef = useRef<HTMLDivElement>(null);
  const wheelAccumRef = useRef(0);
  useEffect(() => {
    if (!stepped) return;
    const node = wheelRef.current;
    if (!node) return;
    const onWheel = (e: WheelEvent) => {
      if (!inView) return; // allow normal scroll
      wheelAccumRef.current += e.deltaY;
      const threshold = 40;
      if (wheelAccumRef.current > threshold && step < 2) {
        e.preventDefault();
        wheelAccumRef.current = 0;
        setStep((s) => Math.min(2, s + 1));
      } else if (wheelAccumRef.current < -threshold && step > -1) {
        e.preventDefault();
        wheelAccumRef.current = 0;
        setStep((s) => Math.max(-1, s - 1));
      }
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel as any);
  }, [stepped, inView, step]);

  // Touch stepping
  useEffect(() => {
    if (!stepped) return;
    const node = wheelRef.current;
    if (!node) return;
    let startY = 0;
    let moved = false;
    const onStart = (e: TouchEvent) => {
      if (!inView) return;
      startY = e.touches[0].clientY;
      moved = false;
    };
    const onMove = (e: TouchEvent) => {
      if (!inView) return;
      const dy = e.touches[0].clientY - startY;
      if (Math.abs(dy) > 12) moved = true;
    };
    const onEnd = (e: TouchEvent) => {
      if (!inView) return;
      const endY = (e.changedTouches[0] || e.touches[0]).clientY;
      const dy = endY - startY;
      if (!moved) return;
      if (dy < -12 && step < 2) {
        e.preventDefault();
        setStep((s) => Math.min(2, s + 1));
      } else if (dy > 12 && step > -1) {
        e.preventDefault();
        setStep((s) => Math.max(-1, s - 1));
      }
    };
    node.addEventListener("touchstart", onStart, { passive: true });
    node.addEventListener("touchmove", onMove, { passive: true });
    node.addEventListener("touchend", onEnd, { passive: false });
    return () => {
      node.removeEventListener("touchstart", onStart as any);
      node.removeEventListener("touchmove", onMove as any);
      node.removeEventListener("touchend", onEnd as any);
    };
  }, [stepped, inView, step]);

  const f = stepped ? animF : mapProgressToFocus(animP);
  const isNeutral = stepped && step === -1;

  // Utility: cubic ease-out for subtle scale changes
  const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

  // Layout params
  const slotVW = 38; // how far apart the slots are (viewport width units)
  const baseScale = 0.82; // scale for side images
  const focusBoost = 0.45; // additional scale when focused

  return (
    <section
      ref={hostRef}
      className="relative isolate w-full overflow-visible"
      style={{ height: stepped ? "100vh" : `${heightVh}vh` }}
      aria-label="Scroll focus shift"
    >
      {/* Sticky viewport */}
      <div ref={wheelRef} className="sticky top-0 z-10 mx-auto flex h-[100vh] max-w-6xl items-center justify-center px-4 sm:px-6">
        {/* Background */}
        {/* <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-sky-500 to-blue-500" /> */}

        {/* Optional title pinned at top */}
        <div className="absolute left-0 right-0 top-4 text-center">
          <h3 className="mx-auto max-w-3xl bg-gradient-to-b from-brand-gold to-white/90 bg-clip-text font-serif text-2xl tracking-tight text-transparent sm:text-4xl">
            Spotlight Scroll
          </h3>
        </div>

        {/* Stage with three items */}
        <div className="relative h-[64vmin] w-[92vmin] max-w-[980px] min-w-[280px]">
          {[-1, 0, 1].map((idx, i) => {
            const item = images[i] || images[1];
            // Horizontal position: image index relative to focus value
            const localF = isNeutral ? 0 : f;
            const dist = isNeutral ? 1 : Math.abs(idx - localF); // distance from focus image
            const x = (idx - localF) * slotVW; // vw units
            const scale = baseScale + (1 - easeOut(Math.min(1, dist))) * focusBoost;
            const zIndex = 100 - Math.round(dist * 10);
            const opacity = isNeutral ? 0.85 : 0.65 + (1 - Math.min(1, dist)) * 0.35;

            return (
              <div
                key={idx}
                className="absolute left-1/2 top-1/2 will-change-transform"
                style={{
                  width: "clamp(180px, 26vmax, 480px)",
                  transform: `translate(-50%, -50%) translateX(${x}vw) scale(${scale})`,
                  transition: "transform 60ms linear, opacity 120ms linear",
                  zIndex,
                  opacity,
                  filter: `drop-shadow(0 18px 40px rgba(0,0,0,0.30)) drop-shadow(0 6px 12px rgba(0,0,0,0.20))`,
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt || "Gallery"}
                  className="block h-auto w-full select-none rounded-lg object-contain"
                  draggable={false}
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

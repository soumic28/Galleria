"use client";

import { useEffect, useRef, useState } from "react";

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
 */
function useScrollProgress(ref: React.RefObject<HTMLElement>) {
  const [p, setP] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const total = rect.height - viewH;
      // When section top hits viewport top => 0, when bottom hits => 1
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      const next = total > 0 ? scrolled / total : 0;
      setP(clamp01(next));
      const inView = rect.top < viewH && rect.bottom > 0;
      setActive(inView);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { p, active };
}

export default function ScrollPullGallery() {
  const hostRef = useRef<HTMLDivElement>(null);
  const { p: progress, active } = useScrollProgress(hostRef);

  // A small set of photos (use any URLs or replace with local assets)
  const images: ImgSpec[] = [
    {
      src: "https://images.unsplash.com/photo-1543357480-c60d40007a4e?q=80&w=800&auto=format&fit=crop",
      alt: "People at a mall 1",
      top: "8%",
      left: "12%",
      width: "clamp(96px, 32vw, 220px)",
      tx: "-30vw",
      ty: "-25vh",
    },
    {
      src: "https://images.unsplash.com/photo-1520975693416-35a3cb9a2c33?q=80&w=900&auto=format&fit=crop",
      alt: "Cafe",
      top: "4%",
      left: "50%",
      width: "clamp(92px, 30vw, 210px)",
      tx: "-10vw",
      ty: "-30vh",
    },
    {
      src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=900&auto=format&fit=crop",
      alt: "Makeup",
      top: "14%",
      right: "8%",
      width: "clamp(96px, 34vw, 240px)",
      tx: "30vw",
      ty: "-20vh",
    },
    {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=900&auto=format&fit=crop",
      alt: "Friends",
      top: "38%",
      right: "6%",
      width: "clamp(96px, 34vw, 240px)",
      tx: "28vw",
      ty: "0vh",
    },
    {
      src: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=900&auto=format&fit=crop",
      alt: "Kids play",
      bottom: "28%",
      left: "10%",
      width: "clamp(96px, 34vw, 240px)",
      hideOnMobile: true,
      tx: "-28vw",
      ty: "5vh",
    },
    {
      src: "https://images.unsplash.com/photo-1533139502658-0198f920d8ae?q=80&w=900&auto=format&fit=crop",
      alt: "Store",
      bottom: "10%",
      left: "40%",
      width: "clamp(92px, 32vw, 220px)",
      tx: "-8vw",
      ty: "22vh",
    },
    {
      src: "https://images.unsplash.com/photo-1514512364185-4c2b3b65d98e?q=80&w=900&auto=format&fit=crop",
      alt: "Skate",
      bottom: "12%",
      right: "18%",
      width: "clamp(96px, 34vw, 240px)",
      hideOnMobile: true,
      tx: "22vw",
      ty: "20vh",
    },
    {
      src: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=900&auto=format&fit=crop",
      alt: "Coffee",
      top: "52%",
      left: "0%",
      width: "clamp(92px, 28vw, 200px)",
      tx: "-28vw",
      ty: "2vh",
    },
  ];

  return (
    <section
      ref={hostRef}
      aria-label="Global experience"
      className="pull-stage relative isolate my-28 h-[220vh] overflow-visible sm:h-[260vh]"
      data-active={active ? "true" : "false"}
      style={{ ["--p" as any]: String(progress) }}
    >
      {/* Sticky center content */}
      <div className="pointer-events-none sticky top-1/2 z-10 -translate-y-1/2">
        <h2 className="pull-heading text-brand-gold mx-auto max-w-4xl text-center font-serif text-5xl leading-[1.05] font-extrabold tracking-tight uppercase sm:text-7xl md:text-8xl">
          900M Visitors,
          <br /> 71 Shopping Centres,
          <br /> 11 Countries,
          <br /> 1 Unforgettable Experience
        </h2>
      </div>

      {/* Floating images pulled towards the center as you scroll */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {images.map((img, i) => (
          <div
            key={i}
            data-pull
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: img.width ?? "clamp(110px, 26vw, 240px)",
              ["--tx" as any]: img.tx,
              ["--ty" as any]: img.ty,
            }}
            className={
              (img.hideOnMobile ? "hidden sm:block " : "") + "overflow-hidden rounded-md shadow-xl"
            }
          >
            {/* Use img tag to avoid next/image domain config */}
            <img
              src={img.src}
              alt={img.alt}
              className="block h-auto w-full select-none"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

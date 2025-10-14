/* eslint-disable @next/next/no-img-element */
/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";

type Props = {
  /** Rotation intensity multiplier (0.2–1). Higher = faster. */
  speed?: number;
};

export default function Scroll3DShowcase({ speed = 0.6 }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rotateY = useMotionValue(0);
  const didAnimate = useRef(false); // Prevent double animation

  const [radius, setRadius] = useState(360);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth || 600;
      setRadius(Math.max(220, Math.min(520, Math.floor(w * 0.45))));
    };
    update();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => ro.disconnect();
    } else {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
  }, []);

  useEffect(() => {
    if (didAnimate.current) return;
    didAnimate.current = true;

    rotateY.set(0);

    const durationPerSpin = 18 / Math.max(0.2, speed);
    const controls = animate(rotateY, 360, {
      duration: durationPerSpin,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controls.stop();
  }, [rotateY, speed]);

  const faces = [
    { src: "/fp/fp_1.png", alt: "Showcase 1" },
    { src: "/fp/fp_2.png", alt: "Showcase 2" },
    { src: "/fp/fp_3.png", alt: "Showcase 3" },
    { src: "/fp/fp_4.png", alt: "Showcase 4" },
  ];

  return (
    <section
      ref={hostRef}
      className="relative isolate h-[140vh] sm:h-[170vh] overflow-visible"
      aria-label="Auto rotating 3D showcase"
    >
      {/* Sticky container */}
      <div className="pointer-events-none sticky top-0 z-10 mx-auto flex h-[100vh] max-w-6xl items-center justify-center px-4 sm:px-6">
        <div className="absolute inset-0 bg-background" />
        <div className="pointer-events-none absolute inset-x-0 top-4 sm:top-6 text-center px-4">
          <h2 className="mx-auto max-w-4xl bg-gradient-to-b from-brand-gold to-foreground bg-clip-text font-serif text-2xl sm:text-3xl lg:text-5xl tracking-tight text-transparent leading-tight">
            Immersive 3D Preview
          </h2>
          <p className="text-foreground/70 mx-auto mt-2 max-w-lg font-sans text-xs sm:text-sm md:text-base px-2">
            The gallery rotates through highlights automatically.
          </p>
        </div>

        <div
          ref={stageRef}
          className="relative aspect-square w-[80vmin] sm:w-[70vmin] max-w-[640px] min-w-[220px]"
          style={{ perspective: "800px" }}
        >
          <motion.div
            className="absolute inset-0 will-change-transform fallback-rotation"
            style={{
              transformStyle: "preserve-3d",
              rotateX: 8,
              rotateY,
            }}
          >
            {faces.map((f, i) => {
              const step = 360 / faces.length;
              const rot = i * step;
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-[55%] w-[55%] sm:h-[58%] sm:w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-lg sm:rounded-xl bg-black/5 shadow-xl sm:shadow-2xl"
                  style={{
                    transform: `rotateY(${rot}deg) translateZ(${radius}px)`,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.15)",
                  }}
                >
                  <img
                    src={f.src}
                    alt={f.alt}
                    className="block h-full w-full select-none object-cover"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    style={{ backfaceVisibility: "hidden" }}
                  />
                </div>
              );
            })}
          </motion.div>

          {/* Soft shadow underneath */}
          <div
            className="absolute left-1/2 top-[75%] h-16 sm:h-24 w-[50%] sm:w-[60%] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 50%, rgba(0,0,0,0.35), rgba(0,0,0,0) 70%)",
              filter: "blur(8px) sm:blur(12px)",
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) { section { height: 120vh; } }
        @media (max-width: 480px) { section { height: 110vh; } }

        @media (prefers-reduced-motion: reduce) {
          section * {
            transition: none !important;
            animation: none !important;
          }
        }

        .fallback-rotation {
          animation: rotate3d 30s linear infinite;
        }

        @keyframes rotate3d {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        @media (max-width: 768px) {
          .fallback-rotation {
            animation-duration: 35s;
          }
        }
      `}</style>
    </section>
  );
}

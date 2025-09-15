/* eslint-disable prettier/prettier */
"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type Props = {
  /** Parallax intensity in px for the larger glow (default 140). */
  big?: number;
  /** Parallax intensity in px for the smaller glow (default 60). */
  small?: number;
};

export default function ScrollGlowHero({ big = 140, small = 60 }: Props) {
  const ref = useRef<HTMLElement>(null);
  // 0..1 progress through this section
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.6 });

  // Map progress to XY offsets for a gentle diagonal parallax
  const xBig = useTransform(smooth, [0, 1], [-big, big]);
  const yBig = useTransform(smooth, [0, 1], [big * 0.6, -big * 0.6]);
  const xSmall = useTransform(smooth, [0, 1], [small, -small]);
  const ySmall = useTransform(smooth, [0, 1], [-small * 0.8, small * 0.8]);

  return (
    <section ref={ref} className="relative grid min-h-[80svh] place-items-center overflow-hidden bg-neutral-950">
      {/* back glow (scroll parallax) */}
      <motion.div
        className="absolute -z-10 h-[60vmin] w-[60vmin] rounded-full bg-fuchsia-500/30 blur-3xl"
        style={{ x: xBig, y: yBig }}
        aria-hidden
      />
      {/* foreground glow (scroll parallax) */}
      <motion.div
        className="absolute -z-10 h-[40vmin] w-[40vmin] rounded-full bg-cyan-400/30 blur-3xl"
        style={{ x: xSmall, y: ySmall }}
        aria-hidden
      />

      <div className="px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Fluid Motion, Zero Noise
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-white/70"
        >
          Scroll-reactive parallax glows with spring smoothing.
        </motion.p>
      </div>
    </section>
  );
}


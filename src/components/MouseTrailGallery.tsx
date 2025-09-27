/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TRAIL_IMAGES = ["/mall_pic_1.png", "/mall_pic_2.png", "/mall_pic_3.png", "/mall_pic_4.png"];

interface TrailItem {
  id: number;
  x: number;
  y: number;
  image: string;
}

interface HeroImageTrailProps {
  containerId?: string;
  maxItems?: number;
  distanceThreshold?: number;
}

export default function MouseTrailGallery({
  containerId = "hero-interactive-area",
  maxItems = 5,
  distanceThreshold = 56
}: HeroImageTrailProps) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const containerRectRef = useRef<DOMRect | null>(null);
  const imageIndexRef = useRef(0);
  const idRef = useRef(0);
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null);
  const lastTimestampRef = useRef<number>(0);
  const thresholdSq = distanceThreshold * distanceThreshold;

  // Detect mobile viewport (<= 640px)
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    // Skip setting up mouse trail on mobile
    if (isMobile) return;

    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    const updateRect = () => {
      containerRectRef.current = container.getBoundingClientRect();
    };

    updateRect();

    const handlePointerMove = (event: PointerEvent) => {
      if (!containerRectRef.current) {
        updateRect();
      }

      const rect = containerRectRef.current;
      if (!rect) {
        return;
      }

      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;
      const pointerTime = event.timeStamp;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = window.requestAnimationFrame(() => {
        const last = lastPositionRef.current;
        const timeSinceLast = pointerTime - lastTimestampRef.current;

        if (last) {
          const dx = pointerX - last.x;
          const dy = pointerY - last.y;
          if (dx * dx + dy * dy < thresholdSq && timeSinceLast < 140) {
            return;
          }
        }

        lastPositionRef.current = { x: pointerX, y: pointerY };
        lastTimestampRef.current = pointerTime;

        setTrail((prev) => {
          const nextImage = TRAIL_IMAGES[imageIndexRef.current % TRAIL_IMAGES.length];
          imageIndexRef.current += 1;

          const nextItem: TrailItem = {
            id: idRef.current++,
            x: pointerX,
            y: pointerY,
            image: nextImage
          };

          const nextTrail = [...prev, nextItem];
          if (nextTrail.length > maxItems) {
            return nextTrail.slice(-maxItems);
          }

          return nextTrail;
        });
      });
    };

    const handlePointerEnter = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      lastPositionRef.current = null;
      lastTimestampRef.current = 0;
      setIsActive(true);
      updateRect();
    };

    const handlePointerLeave = () => {
      setIsActive(false);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setTrail([]);
        lastPositionRef.current = null;
        lastTimestampRef.current = 0;
      }, 520);
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", updateRect);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", updateRect);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [containerId, maxItems, thresholdSq, isMobile]);

  // Disable animation on mobile entirely
  if (isMobile) {
    return null;
  }

  if (!isActive && trail.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {trail.map((item, index) => {
        const depth = trail.length - index;
        const scale = Math.max(0.75, 1 - depth * 0.03);
        const baseOpacity = Math.max(0.85, 1 - depth * 0.02);
        const opacity = isActive ? baseOpacity : 0;
        const blur = Math.max(0, (depth - 1) * 0.8);

        return (
          <div
            key={item.id}
            className="absolute h-44 w-44 overflow-hidden rounded-[2.75rem] border border-white/10 bg-black/10 shadow-xl shadow-black/25"
            style={{
              left: item.x,
              top: item.y,
              opacity,
              transform: `translate(-50%, -50%) scale(${scale})`,
              filter: `blur(${blur}px)`,
              transition: "transform 1s ease, opacity 0.6s ease"
            }}
          >
            <Image
              src={item.image}
              alt="Gallery preview"
              width={176}
              height={176}
              className="h-full w-full object-cover"
              priority={false}
            />
          </div>
        );
      })}
    </div>
  );
}

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
function useSectionProgress(ref: { current: HTMLElement | null }) {
  const [p, setP] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const currentScrollY = window.scrollY;
      
      // Store scroll position for when we lock
      lastScrollY.current = currentScrollY;
      
      // Calculate how much of the section has been scrolled through
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // More responsive progress calculation
      const scrollableDistance = Math.max(vh, sectionHeight - vh);
      
      if (scrollableDistance <= 0) {
        setP(0);
        return;
      }
      
      // Enhanced progress calculation
      let progress = 0;
      
      if (sectionTop <= 0) {
        // We're scrolling through the section
        const scrolled = Math.abs(sectionTop);
        progress = Math.min(1, scrolled / scrollableDistance);
      } else if (sectionTop <= vh) {
        // Section is entering viewport
        progress = Math.max(0, (vh - sectionTop) / vh * 0.1);
      }
      
      setP(progress);
      setIsLocked(progress > 0.05 && progress < 0.95);
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  
  return { progress: p, shouldLock: isLocked };
}

export default function ScrollFocusShift({
  images = [
    { src: "/mall_pic_1.png", alt: "Left" },
    { src: "/mall_pic_2.png", alt: "Center" },
    { src: "/mall_pic_3.png", alt: "Right" },
  ],
  speed = 0.06,
  heightVh = 160,
  stepped = false,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { progress: p, shouldLock } = useSectionProgress(hostRef);

  // Track animation states
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [autoAnimationProgress, setAutoAnimationProgress] = useState(0);
  const animationStartTime = useRef<number>(0);
  
  // Auto-advance animation when scroll is locked
  useEffect(() => {
    if (!isScrollLocked || animationComplete) return;
    
    const duration = 4000; // 4 second auto-animation
    let raf: number;
    
    const tick = () => {
      const elapsed = Date.now() - animationStartTime.current;
      const progress = Math.min(1, elapsed / duration);
      
      setAutoAnimationProgress(progress);
      
      if (progress >= 1) {
        // Animation complete - unlock everything
        setAnimationComplete(true);
        setAutoAnimationProgress(0);
        document.body.style.overflow = '';
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isScrollLocked, animationComplete]);
  
  // Use auto animation progress when locked, scroll progress when not
  const effectiveProgress = isScrollLocked ? autoAnimationProgress : p;
  
  // Smooth progress independent of scroll velocity
  const [animP, setAnimP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const s = stepped ? 0.15 : Math.max(0.15, Math.min(0.4, speed * 8));
    const tick = () => {
      setAnimP((prev) => {
        const diff = effectiveProgress - prev;
        const next = prev + diff * s;
        const isComplete = Math.abs(diff) < 0.005;
        
        if (isComplete) {
          return effectiveProgress;
        }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [effectiveProgress, speed, stepped]);

  // Simple scroll prevention without position changes
  useEffect(() => {
    if (stepped) return;
    
    const shouldLockNow = shouldLock && !animationComplete && p > 0.02;
    
    if (shouldLockNow !== isScrollLocked) {
      setIsScrollLocked(shouldLockNow);
      
      if (shouldLockNow) {
        // Start animation timer
        animationStartTime.current = Date.now();
        
        // Prevent scroll without changing position
        document.body.style.overflow = 'hidden';
      } else {
        // Restore scroll ability
        document.body.style.overflow = '';
        
        // Reset states
        setAutoAnimationProgress(0);
        animationStartTime.current = 0;
      }
    }
    
    return () => {
      if (isScrollLocked) {
        document.body.style.overflow = '';
      }
    };
  }, [shouldLock, animationComplete, p, isScrollLocked, stepped]);
  
  // Emergency escape: Click anywhere to unlock (during development)
  useEffect(() => {
    const handleClick = () => {
      if (isScrollLocked) {
        setAnimationComplete(true);
        setIsScrollLocked(false);
        document.body.style.overflow = '';
      }
    };
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isScrollLocked) {
        setAnimationComplete(true);
        setIsScrollLocked(false);
        document.body.style.overflow = '';
      }
    };
    
    if (isScrollLocked) {
      document.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleKeyPress);
    }
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isScrollLocked]);

  // Watch for animation completion and unlock scroll
  useEffect(() => {
    if (animationComplete && isScrollLocked) {
      setIsScrollLocked(false);
      document.body.style.overflow = '';
    }
  }, [animationComplete, isScrollLocked]);

  // Map overall progress (0..1) to a focus value f in [-1, 1]
  // Sequence: start centered -> slide focus to left -> pass through center -> slide to right
  function mapProgressToFocus(x: number) {
    // Clamp input to 0-1
    x = Math.max(0, Math.min(1, x));
    
    // Phase 1: Hold center briefly (0-0.1)
    if (x <= 0.1) return 0;
    
    // Phase 2: Move to left focus (0.1-0.4)
    if (x <= 0.4) {
      const localProgress = (x - 0.1) / 0.3;
      return -localProgress; // 0 to -1
    }
    
    // Phase 3: Return to center (0.4-0.6)
    if (x <= 0.6) {
      const localProgress = (x - 0.4) / 0.2;
      return -1 + localProgress; // -1 to 0
    }
    
    // Phase 4: Move to right focus (0.6-0.9)
    if (x <= 0.9) {
      const localProgress = (x - 0.6) / 0.3;
      return localProgress; // 0 to 1
    }
    
    // Phase 5: Hold right focus (0.9-1.0)
    return 1;
  }

  // Stepped interaction: lock viewport and advance on wheel/touch
  // Stepped sequence now: -1 neutral (all equal) -> 0 left -> 1 center -> 2 right
  const [step, setStep] = useState(-1);
  const targetF = step === 0 ? -1 : step === 1 ? 0 : step === 2 ? 1 : 0;
  const [animF, setAnimF] = useState(targetF);
  useEffect(() => {
    let raf = 0;
    const s = Math.max(0.12, Math.min(0.4, speed * 4)); // Improved stepped animation speed
    const tick = () => {
      setAnimF((prev) => {
        const next = prev + (targetF - prev) * s;
        return Math.abs(next - prev) < 0.002 ? targetF : next;
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
    const onWheel: EventListener = (evt) => {
      const e = evt as WheelEvent;
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
    return () => node.removeEventListener("wheel", onWheel);
  }, [stepped, inView, step]);

  // Touch stepping
  useEffect(() => {
    if (!stepped) return;
    const node = wheelRef.current;
    if (!node) return;
    let startY = 0;
    let moved = false;
    const onStart: EventListener = (evt) => {
      const e = evt as TouchEvent;
      if (!inView) return;
      startY = e.touches[0].clientY;
      moved = false;
    };
    const onMove: EventListener = (evt) => {
      const e = evt as TouchEvent;
      if (!inView) return;
      const dy = e.touches[0].clientY - startY;
      if (Math.abs(dy) > 12) moved = true;
    };
    const onEnd: EventListener = (evt) => {
      const e = evt as TouchEvent;
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
      node.removeEventListener("touchstart", onStart);
      node.removeEventListener("touchmove", onMove);
      node.removeEventListener("touchend", onEnd);
    };
  }, [stepped, inView, step]);

  const f = stepped ? animF : mapProgressToFocus(animP);
  const isNeutral = stepped && step === -1;

  // Enhanced layout params for more dramatic effects
  const slotVW = 45; // Increased spacing for more dramatic movement
  const baseScale = 0.6; // Smaller base scale for more contrast
  const focusBoost = 0.7; // Larger boost for focused image
  const maxOpacity = 1.0;
  const minOpacity = 0.3; // Lower minimum opacity for more contrast

  // Debug info (remove in production)
  console.log('Animation values:', { p, animP, f, isNeutral, shouldLock });

  return (
    <section
      ref={hostRef}
      className="relative isolate w-full overflow-visible sfs-section"
      style={{ height: stepped ? "100vh" : `${heightVh}vh` }}
      aria-label="Scroll focus shift"
    >
      {/* Sticky viewport */}
      <div ref={wheelRef} className="sticky top-0 z-10 mx-auto flex h-[100vh] max-w-6xl items-center justify-center px-4 sm:px-6">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        {/* Optional title pinned at top */}
        <div className="absolute left-0 right-0 top-8 text-center">
          <h3 className="mx-auto max-w-3xl bg-gradient-to-b from-yellow-400 to-amber-600 bg-clip-text font-serif text-3xl tracking-tight text-transparent sm:text-5xl font-bold">
            Spotlight Scroll
          </h3>
          <div className="mt-2 text-white/60 text-sm">
            Progress: {Math.round(p * 100)}% | Focus: {f.toFixed(2)} | Locked: {shouldLock ? 'Yes' : 'No'}
          </div>
        </div>

        {/* Stage with three items */}
        <div className="relative h-[70vh] w-[95vw] max-w-[1200px] min-w-[320px]">
          {[-1, 0, 1].map((idx, i) => {
            // Ensure we have a valid image with proper fallback
            const imageIndex = Math.min(i, images.length - 1);
            const item = images[imageIndex] || { src: "/mall_pic_2.png", alt: "Gallery" };
            
            // Much more dramatic positioning and scaling
            const localF = isNeutral ? 0 : f;
            const dist = Math.abs(idx - localF);
            const x = (idx - localF) * slotVW; // More spread out
            
            // Dramatic focus effects
            const focusAmount = Math.max(0, 1 - dist);
            const scale = baseScale + focusAmount * focusBoost;
            const zIndex = 100 - Math.round(dist * 20);
            
            // High contrast opacity
            const opacity = isNeutral 
              ? 0.8 
              : minOpacity + focusAmount * (maxOpacity - minOpacity);
            
            // Enhanced blur effect for non-focused images
            const blurAmount = isNeutral ? 0 : (1 - focusAmount) * 8;
            const brightness = isNeutral ? 1 : 0.7 + focusAmount * 0.3;

            return (
              <div
                key={`${idx}-${i}`}
                className="absolute left-1/2 top-1/2 will-change-transform"
                style={{
                  width: "clamp(200px, 35vmax, 600px)",
                  height: "clamp(300px, 50vmax, 800px)",
                  transform: `translate(-50%, -50%) translateX(${x}vw) scale(${scale}) rotateY(${(idx - localF) * 5}deg)`,
                  transition: stepped 
                    ? "all 400ms cubic-bezier(0.4, 0, 0.2, 1)"
                    : "all 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  zIndex,
                  opacity,
                  filter: `
                    drop-shadow(0 ${20 + focusAmount * 30}px ${60 + focusAmount * 40}px rgba(0,0,0,${0.4 + focusAmount * 0.2}))
                    blur(${blurAmount}px)
                    brightness(${brightness})
                    saturate(${0.8 + focusAmount * 0.4})
                  `,
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt || `Gallery image ${i + 1}`}
                  className="block h-full w-full select-none rounded-xl object-cover border-2 border-white/20"
                  draggable={false}
                  decoding="async"
                  loading="lazy"
                />
                
                {/* Focus indicator */}
                {focusAmount > 0.8 && (
                  <div className="absolute inset-0 rounded-xl border-4 border-yellow-400/60 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .sfs-section { height: 120vh !important; }
        }
      `}</style>
    </section>
  );
}

/* eslint-disable prettier/prettier */
'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoSectionProps {
  videoSrc: string;
  title?: string;
  description?: string;
}

export default function VideoSection({ 
  videoSrc, 
  title = "Experience Our Mall", 
  description = "Discover the beauty and elegance of PSR Infinity Mall" 
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting) {
          // Start playing video when in view
          if (videoRef.current) {
            videoRef.current.play().catch(console.error);
          }
          
          // Trigger fullscreen effect after a short delay
          setTimeout(() => {
            setIsFullscreen(true);
          }, 500);
        } else {
          // Reset when out of view
          setIsFullscreen(false);
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative h-screen overflow-hidden transition-all duration-1000 ease-out ${
        isFullscreen ? 'scale-105' : 'scale-100'
      }`}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-all duration-1000 ease-out ${
            isFullscreen ? 'scale-110' : 'scale-100'
          }`}
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className={`text-center text-white transition-all duration-1000 delay-500 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold mb-4">
            {title}
          </h2>
          <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          <p className="text-lg sm:text-xl max-w-2xl mx-auto px-4">
            {description}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex flex-col items-center text-white/80">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
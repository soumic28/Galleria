/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
'use client';

import { useEffect, useRef, useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  description?: string;
}

export default function YouTubeEmbed({ 
  videoId, 
  title = "Experience Our Mall", 
  description = "Discover the beauty and elegance of PSR Infinity Mall" 
}: YouTubeEmbedProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* YouTube Embed Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          className="h-full w-full object-cover scale-150"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&hd=2`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className={`text-center text-white transition-all duration-1000 delay-500 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold bg-clip-text text-transparent">
            {title}
            </h2>
          <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          <div className="mx-auto mt-4 max-w-2xl space-y-3">
            <p className="text-sm text-white/90 leading-relaxed sm:text-base">
              Introducing <span className="text-brand-gold font-semibold">PSR Infinity</span> - Warangal's premier and exclusive shopping destination. 
              Spanning across <span className="text-brand-gold font-semibold">2 Lakh sq ft</span> of built-up area, this magnificent 9-floor marvel 
              redefines retail, entertainment, and lifestyle experiences in the city.
            </p>
            <p className="text-xs text-white/80 leading-relaxed sm:text-sm">
              With a massive <span className="text-brand-gold">4,500 sq ft atrium</span>, state-of-the-art multiplex with 5 screens, 
              and parking for 300+ cars, PSR Infinity stands as a landmark of modern architecture and convenience, 
              bringing world-class amenities to Warangal for the very first time.
            </p>
          </div>
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
/* eslint-disable prettier/prettier */
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface VideoSectionProps {
  videoSrc: string;
  title?: string;
  description?: string;
}

// Helper function to convert Google Drive share link to direct video link
function getGoogleDriveDirectLink(url: string): string {
  if (url.includes('drive.google.com')) {
    // Extract file ID from various Google Drive URL formats
    let fileId = '';
    
    if (url.includes('/file/d/')) {
      fileId = url.split('/file/d/')[1].split('/')[0];
    } else if (url.includes('id=')) {
      fileId = url.split('id=')[1].split('&')[0];
    }
    
    if (fileId) {
      // Use the proper Google Drive streaming format
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }
  
  return url; // Return original if not a Google Drive link
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Convert Google Drive link to direct link
  const directVideoSrc = getGoogleDriveDirectLink(videoSrc);

  // Helper function to safely play video
  const safePlay = useCallback(async () => {
    if (!videoRef.current || isPlaying) return;
    
    try {
      // Wait for any pending play promise to resolve
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }
      
      playPromiseRef.current = videoRef.current.play();
      await playPromiseRef.current;
      setIsPlaying(true);
    } catch (error: unknown) {
      // Ignore AbortError as it's expected when play is interrupted
      if (error instanceof DOMException && error.name !== 'AbortError') {
        console.error('Video play error:', error);
      }
    } finally {
      playPromiseRef.current = null;
    }
  }, [isPlaying]);

  // Helper function to safely pause video
  const safePause = useCallback(async () => {
    if (!videoRef.current || !isPlaying) return;
    
    try {
      // Wait for any pending play promise to resolve before pausing
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }
      
      videoRef.current.pause();
      setIsPlaying(false);
    } catch (error: unknown) {
      console.error('Video pause error:', error);
    }
  }, [isPlaying]);

  useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting) {
          // Start playing video when in view
          safePlay();
          
          // Trigger fullscreen effect after a short delay
          setTimeout(() => {
            setIsFullscreen(true);
          }, 500);
        } else {
          // Reset when out of view
          setIsFullscreen(false);
          safePause();
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
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
      // Clean up any pending promises
      playPromiseRef.current = null;
    };
  }, [safePlay, safePause]);

  // Handle video load errors (useful for Google Drive links)
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video failed to load:', e.currentTarget.error);
    setVideoError(true);
    // You could set a fallback image or show an error message here
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative h-screen overflow-hidden transition-all duration-1000 ease-out ${
        isFullscreen ? 'scale-105' : 'scale-100'
      }`}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            ref={videoRef}
            className={`h-full w-full object-cover transition-all duration-1000 ease-out ${
              isFullscreen ? 'scale-110' : 'scale-100'
            }`}
            muted
            loop
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            onError={handleVideoError}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can start playing')}
          >
            <source src={directVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback background when video fails to load
          <div className="h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
            <div className="text-center text-white opacity-50">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-lg">Video temporarily unavailable</p>
              <p className="text-sm opacity-70 mt-2">Please check back later</p>
            </div>
          </div>
        )}
        
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
"use client";
/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect } from 'react';
import { mallData } from './mall/data';
import SectionHeader from './mall/SectionHeader';
import MallCard from './mall/MallCard';
import ProgressIndicator from './mall/ProgressIndicator';

const MallSection: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isTransitioning] = useState(false);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Auto-advance carousel
  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % mallData.length);
      }, 4000); // Change slide every 4 seconds
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swiped left - next slide
        nextCard();
      } else {
        // Swiped right - previous slide
        prevCard();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Handle manual navigation
  const goToCard = (index: number) => {
    if (isTransitioning) return;
    
    setCurrentCard(index);
    
    // Reset auto-play timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % mallData.length);
      }, 4000);
    }, 1000);
  };

  const nextCard = () => {
    goToCard((currentCard + 1) % mallData.length);
  };

  const prevCard = () => {
    goToCard((currentCard - 1 + mallData.length) % mallData.length);
  };

  return (
    <div 
      className="relative h-screen w-full overflow-hidden bg-gray-900"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ 
          transform: `translateX(-${currentCard * 100}vw)`
        }}
      >
        {mallData.map((mall, index) => (
          <div 
            key={mall.id} 
            className="h-full w-screen flex-shrink-0 relative"
          >
            <MallCard
              mall={mall}
              index={index}
              cardRef={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls - Touch optimized */}
      <div className="absolute inset-y-0 left-1 sm:left-4 flex items-center z-20">
        <button 
          onClick={prevCard}
          className="bg-black/60 hover:bg-black/80 active:bg-black/90 text-white p-3 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-1 sm:right-4 flex items-center z-20">
        <button 
          onClick={nextCard}
          className="bg-black/60 hover:bg-black/80 active:bg-black/90 text-white p-3 sm:p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot Navigation - Touch optimized */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 sm:space-x-3 z-20">
        {mallData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToCard(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
              index === currentCard 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75 active:bg-white/90'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* UI Components */}
      <SectionHeader />
      <ProgressIndicator currentCard={currentCard} totalCards={mallData.length} />

      {/* Auto-play indicator - Mobile optimized */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-lg">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-[9px] sm:text-xs font-medium">Auto</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallSection;

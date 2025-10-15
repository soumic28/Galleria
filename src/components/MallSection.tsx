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
    <div className="relative h-screen overflow-hidden bg-gray-900">
      {/* Carousel Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ 
          transform: `translateX(-${currentCard * 100}vw)`,
          width: `${mallData.length * 100}vw`
        }}
      >
        {mallData.map((mall, index) => (
          <div 
            key={mall.id} 
            className="h-full flex-shrink-0 relative"
            style={{ width: '100vw' }}
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

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 flex items-center z-20">
        <button 
          onClick={prevCard}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 flex items-center z-20">
        <button 
          onClick={nextCard}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {mallData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToCard(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentCard 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* UI Components */}
      <SectionHeader />
      <ProgressIndicator currentCard={currentCard} totalCards={mallData.length} />

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-xs font-medium">Auto</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallSection;

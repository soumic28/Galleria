"use client";
/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import { mallData } from './mall/data';
import { useScrollAnimation } from './mall/useScrollAnimation';
import SectionHeader from './mall/SectionHeader';
import MallCard from './mall/MallCard';
import ProgressIndicator from './mall/ProgressIndicator';
import ScrollIndicator from './mall/ScrollIndicator';

const MallSection: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { currentCard, isSticky, containerRef, sectionRef } = useScrollAnimation(cardsRef);

  return (
    <div ref={containerRef} style={{ height: `${mallData.length * 100}vh` }} className="relative">
      <div
        ref={sectionRef}
        className={`${isSticky ? 'fixed top-0 left-0 w-full' : 'relative'
          } h-screen  transition-all duration-300 ease-out`}
        style={{
          zIndex: isSticky ? 10 : 1,
          willChange: isSticky ? 'transform' : 'auto'
        }}
      >
        {/* Mall Cards */}
        {mallData.map((mall, index) => (
          <MallCard
            key={mall.id}
            mall={mall}
            index={index}
            cardRef={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
          />
        ))}

        {/* UI Components */}
        <SectionHeader />
        <ProgressIndicator currentCard={currentCard} totalCards={mallData.length} />
        {isSticky && <ScrollIndicator currentCard={currentCard} totalCards={mallData.length} />}
      </div>
    </div>
  );
};

export default MallSection;

/* eslint-disable prettier/prettier */
import React from 'react';

interface ScrollIndicatorProps {
  currentCard: number;
  totalCards: number;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ currentCard, totalCards }) => {
  return (
    <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex items-center space-x-4 text-white">
        <span className="text-sm">{String(currentCard + 1).padStart(2, '0')}</span>
        <div className="w-16 h-0.5 bg-gray-600 rounded-full">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${((currentCard + 1) / totalCards) * 100}%` }}
          />
        </div>
        <span className="text-sm">{String(totalCards).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default ScrollIndicator;

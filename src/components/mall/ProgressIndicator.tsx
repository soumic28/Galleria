/* eslint-disable prettier/prettier */
import React from 'react';

interface ProgressIndicatorProps {
  currentCard: number;
  totalCards: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentCard, totalCards }) => {
  return (
    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
      <div className="flex flex-col space-y-2">
        {Array.from({ length: totalCards }).map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-all duration-300 ${
              index === currentCard ? 'bg-white' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;

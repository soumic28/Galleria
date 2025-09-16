/* eslint-disable prettier/prettier */
import React from 'react';
import Image from 'next/image';
import { MallData } from './data';

interface MallCardProps {
  mall: MallData;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}

const MallCard: React.FC<MallCardProps> = ({ mall, index, cardRef }) => {
  return (
    <div
      ref={cardRef}
      className="absolute inset-0 flex items-center justify-center"
      style={{
        opacity: 1,
        transform: `translateZ(${index * -100}px)`,
        zIndex: 1000 - index
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src={mall.image}
          alt={mall.title}
          fill
          sizes="100vw"
          priority={false}
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Level indicator */}
        {mall.level && (
          <div className="absolute top-8 left-8 bg-blue-600 px-4 py-2 rounded-lg">
            <span className="text-white font-semibold text-sm">{mall.level}</span>
          </div>
        )}
        
        {/* Zone indicator */}
        {mall.zone && (
          <div className="absolute top-8 right-8 bg-teal-600 px-4 py-2 rounded-lg">
            <span className="text-white font-medium text-sm">{mall.zone}</span>
          </div>
        )}
        
        <div className="absolute bottom-16 left-8 right-8 text-white">
          <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">{mall.title}</h3>
          <p className="text-lg mb-6 text-gray-200 max-w-2xl">{mall.description}</p>
          
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            {mall.features.map((feature, idx) => (
              <div key={idx} className="flex items-center bg-black bg-opacity-30 rounded-lg p-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallCard;

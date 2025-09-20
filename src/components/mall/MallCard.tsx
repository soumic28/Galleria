/* eslint-disable prettier/prettier */
import React from 'react';
import Image from 'next/image';
import { MallData } from './data';

interface MallCardProps {
  mall: MallData;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}

// Tiny transparent pixel to avoid heavy placeholder cost on mobile
const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHWgKy2JxVJwAAAABJRU5ErkJggg==';

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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          priority={index === 0}
          loading={index === 0 ? 'eager' : 'lazy'}
          quality={60}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-contain sm:object-cover"
          style={{ objectPosition: 'center 35%' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Level indicator */}
        {mall.level && (
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 bg-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
            <span className="text-white font-semibold text-xs sm:text-sm">{mall.level}</span>
          </div>
        )}
        
        {/* Zone indicator */}
        {mall.zone && (
          <div className="absolute top-4 sm:top-8 right-4 sm:right-8 bg-teal-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
            <span className="text-white font-medium text-xs sm:text-sm">{mall.zone}</span>
          </div>
        )}
        
        <div className="absolute bottom-24 sm:bottom-16 left-4 right-4 sm:left-8 sm:right-8 text-white px-1 sm:px-0">
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-wide">{mall.title}</h3>
          <p className="hidden sm:block text-sm sm:text-base mb-4 sm:mb-6 text-gray-200 max-w-2xl">{mall.description}</p>
          
          {/* Compact features on mobile */}
          <div className="sm:hidden grid grid-cols-1 gap-2 max-w-lg">
            {mall.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} className="flex items-center bg-black/40 rounded-lg p-2">
                <div className="w-2.5 h-2.5 bg-blue-400 rounded-full mr-2.5 flex-shrink-0" />
                <span className="text-xs font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Full features on larger screens */}
          <div className="hidden sm:grid grid-cols-2 gap-3 sm:gap-4 max-w-lg">
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

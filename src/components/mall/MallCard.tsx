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
      className="relative w-full h-full overflow-hidden bg-gray-900"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={mall.image}
          alt={mall.title}
          fill
          sizes="100vw"
          priority={index === 0}
          loading={index === 0 ? 'eager' : 'lazy'}
          quality={85}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-contain"
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Level indicator */}
        {mall.level && (
          <div className="absolute top-2 sm:top-4 md:top-6 left-2 sm:left-4 md:left-6 bg-blue-600 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg shadow-lg z-10">
            <span className="text-white font-semibold text-[9px] sm:text-xs md:text-sm whitespace-nowrap">{mall.level}</span>
          </div>
        )}
        
        {/* Zone indicator */}
        {mall.zone && (
          <div className="absolute top-2 sm:top-4 md:top-6 right-2 sm:right-4 md:right-6 bg-teal-600 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg shadow-lg z-10">
            <span className="text-white font-medium text-[9px] sm:text-xs md:text-sm whitespace-nowrap">{mall.zone}</span>
          </div>
        )}
        
        <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 left-2 right-2 sm:left-4 sm:right-4 md:left-6 md:right-6 text-white px-1 sm:px-2 z-10">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1.5 sm:mb-2 md:mb-3 tracking-wide leading-tight">
            {mall.title}
          </h3>
          <p className="hidden sm:block text-xs md:text-sm lg:text-base mb-2 sm:mb-3 md:mb-4 text-gray-200 max-w-xl lg:max-w-2xl leading-relaxed line-clamp-2">
            {mall.description}
          </p>
          
          {/* Compact features on mobile - optimized */}
          <div className="sm:hidden flex flex-col gap-1.5 max-w-full">
            {mall.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} className="flex items-center bg-black/50 backdrop-blur-sm rounded-md p-1.5 shadow-md">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1.5 flex-shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-medium leading-tight truncate">{feature}</span>
              </div>
            ))}
          </div>

          {/* Full features on larger screens */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 lg:gap-4 max-w-2xl lg:max-w-3xl">
            {mall.features.map((feature, idx) => (
              <div key={idx} className="flex items-center bg-black/40 backdrop-blur-sm rounded-lg p-2 sm:p-2.5 md:p-3 shadow-md">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-400 rounded-full mr-2 sm:mr-2.5 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs md:text-sm font-medium leading-tight">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallCard;

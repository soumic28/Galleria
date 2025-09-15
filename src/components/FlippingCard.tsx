/* eslint-disable prettier/prettier */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function FlippingCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 3000); // Flip every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto w-80 h-48 perspective-1000">
      <div className={`relative w-full h-full transition-all duration-1000 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front Side - Mall Image */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="gradient-border h-full opacity-0 animate-fade-in">
            <div className="inner rounded-xl overflow-hidden h-full relative">
              <Image
                src="/pic-1.png"
                alt="The Galleria Mall Exterior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-lg text-white font-semibold mb-1">
                  The Galleria Mall
                </h3>
                {/* <p className="font-sans text-sm text-white/90">
                  Warangal's Premier Destination
                </p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="gradient-border h-full opacity-0 animate-fade-in">
            <div className="inner rounded-xl p-6 h-full flex flex-col justify-center items-center bg-gradient-to-br from-brand-gold/10 to-brand-gold/30">
              <div className="bg-brand-gold/20 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-center mb-3 bg-gradient-to-r from-brand-gold to-foreground bg-clip-text text-transparent">
                Coming Soon
              </h3>
              <p className="font-sans text-sm text-foreground/80 text-center">
                Stay tuned for updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

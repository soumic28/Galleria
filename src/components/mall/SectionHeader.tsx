/* eslint-disable prettier/prettier */
import React from 'react';

const SectionHeader: React.FC = () => {
  return (
    <div className="absolute top-2 sm:top-4 md:top-6 lg:top-8 left-1/2 transform -translate-x-1/2 z-20 text-center px-2 sm:px-3 max-w-full">
      <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-0.5 sm:mb-1 md:mb-2 tracking-wide sm:tracking-wider">
        MULTIPLEX
        <span className="block text-sm sm:text-lg md:text-2xl lg:text-3xl font-light text-blue-300 tracking-wider sm:tracking-widest mt-0.5 sm:mt-1">
          FLOORS
        </span>
      </h2>
      <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-blue-400 mx-auto mt-1.5 sm:mt-2 md:mt-3"></div>
    </div>
  );
};

export default SectionHeader;

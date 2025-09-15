/* eslint-disable prettier/prettier */
import React from 'react';

const SectionHeader: React.FC = () => {
  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 text-center">
      <h2 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-wider">
        MULTIPLEX
        <span className="block text-2xl md:text-3xl font-light text-blue-300 tracking-widest">
          FLOORS
        </span>
      </h2>
      <div className="w-24 h-1 bg-blue-400 mx-auto mt-4"></div>
    </div>
  );
};

export default SectionHeader;

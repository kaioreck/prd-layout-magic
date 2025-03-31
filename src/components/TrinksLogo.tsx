
import React from 'react';

const TrinksLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="w-6 h-6 mr-2 bg-trinks-orange rounded">
        <div className="w-1 h-1 bg-white rounded-full absolute transform translate-x-1 translate-y-1"></div>
        <div className="w-1 h-1 bg-white rounded-full absolute transform translate-x-4 translate-y-1"></div>
        <div className="w-1 h-1 bg-white rounded-full absolute transform translate-x-1 translate-y-4"></div>
        <div className="w-1 h-1 bg-white rounded-full absolute transform translate-x-4 translate-y-4"></div>
      </div>
      <span className="text-2xl font-bold text-trinks-darkBlue">trinks</span>
    </div>
  );
};

export default TrinksLogo;

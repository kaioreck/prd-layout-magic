
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const BarberLogo: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center">
      <div className="relative">
        <img 
          src="/lovable-uploads/6ec9cdc1-4010-4119-a41d-f676ef727658.png" 
          alt="Barber.IA Logo" 
          className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} object-contain`}
        />
      </div>
      <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white ml-2`}>Barber.IA</span>
    </div>
  );
};

export default BarberLogo;

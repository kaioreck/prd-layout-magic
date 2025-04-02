
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEstablishment } from '@/contexts/EstablishmentContext';

const BarberLogo: React.FC = () => {
  const isMobile = useIsMobile();
  const { establishmentImage, establishmentName } = useEstablishment();

  return (
    <div className="flex items-center">
      <div className="relative">
        <img 
          src={establishmentImage || "/lovable-uploads/6ec9cdc1-4010-4119-a41d-f676ef727658.png"} 
          alt={`${establishmentName} Logo`} 
          className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} object-contain rounded-full`}
        />
      </div>
      <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white ml-2`}>{establishmentName}</span>
    </div>
  );
};

export default BarberLogo;

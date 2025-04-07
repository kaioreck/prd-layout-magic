
import React from 'react';
import BarberLogo from './BarberLogo';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-sidebar border-b border-sidebar-border py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <BarberLogo />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

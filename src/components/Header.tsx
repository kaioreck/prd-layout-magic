
import React from 'react';
import BarberLogo from './BarberLogo';

const Header: React.FC = () => {
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

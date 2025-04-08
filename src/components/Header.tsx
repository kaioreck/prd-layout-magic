
import React from 'react';
import BarberLogo from './BarberLogo';
import { SidebarTrigger, useSidebar } from './ui/sidebar';

const Header: React.FC = () => {
  const { state, isMobile } = useSidebar();

  return (
    <header className="bg-sidebar border-b border-sidebar-border py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isMobile && <SidebarTrigger />}
          {(isMobile || state === "collapsed") && (
            <BarberLogo />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

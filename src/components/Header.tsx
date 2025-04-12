
import React from 'react';
import BarberLogo from './BarberLogo';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const { state, isMobile } = useSidebar();

  return (
    <header className="bg-sidebar border-b border-sidebar-border py-2 px-3 md:py-3 md:px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          {isMobile && (
            <SidebarTrigger>
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          )}
          {(isMobile || state === "collapsed") && (
            <BarberLogo />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { MessageSquare, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const MainLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {showSidebar && (
        <Sidebar onClose={isMobile ? toggleSidebar : undefined} />
      )}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        {isMobile && !showSidebar && (
          <button 
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 p-2 bg-sidebar text-white rounded-full shadow-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
      <div className="fixed bottom-8 right-8">
        <button className="bg-green-500 text-white rounded-full p-3 md:p-4 shadow-lg hover:bg-green-600 transition-colors">
          <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};

export default MainLayout;

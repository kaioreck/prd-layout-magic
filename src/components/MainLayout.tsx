
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { MessageSquare } from 'lucide-react';

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
      <div className="fixed bottom-8 right-8">
        <button className="bg-trinks-orange text-white rounded-full p-4 shadow-lg hover:bg-trinks-orange/90 transition-colors">
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MainLayout;

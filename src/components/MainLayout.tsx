
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import AppSidebar from './AppSidebar';
import { SidebarProvider, SidebarInset } from './ui/sidebar';

const MainLayout: React.FC = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;

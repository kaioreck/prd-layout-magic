
import React from 'react';
import { Bell, HelpCircle, Menu, Settings, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BarberLogo from './BarberLogo';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="bg-sidebar border-b border-sidebar-border py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <BarberLogo />
          </div>
          
          {!isMobile && (
            <>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar páginas no Barber.IA"
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-trinks-blue focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="ml-4">
                <input
                  type="text"
                  value="BarberShop123"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trinks-blue focus:border-transparent"
                  readOnly
                />
              </div>
            </>
          )}
        </div>
        
        {isMobile && showMobileSearch && (
          <div className="absolute top-16 left-0 w-full px-4 py-2 bg-sidebar z-20">
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Buscar páginas"
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-trinks-blue focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <X 
                  className="h-5 w-5 text-gray-400 cursor-pointer" 
                  onClick={() => setShowMobileSearch(false)}
                />
              </div>
            </div>
            <input
              type="text"
              value="BarberShop123"
              className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-trinks-blue focus:border-transparent"
              readOnly
            />
          </div>
        )}
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {isMobile && (
            <button 
              className="p-2 text-white hover:text-primary-foreground rounded-full"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}
          
          <Button className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-full px-3 md:px-4 py-1 md:py-2 flex items-center text-xs md:text-sm">
            {isMobile ? 'Assine' : 'Assine agora'} <span className="ml-1">🌱</span>
          </Button>
          
          {!isMobile && (
            <>
              <button className="p-2 text-white hover:text-primary-foreground rounded-full">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-white hover:text-primary-foreground rounded-full">
                <HelpCircle className="w-5 h-5" />
              </button>
            </>
          )}
          
          <button className="p-2 text-white hover:text-primary-foreground rounded-full">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-200 text-gray-700 rounded-full">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

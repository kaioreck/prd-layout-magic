
import React from 'react';
import { Bell, HelpCircle, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrinksLogo from './TrinksLogo';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <TrinksLogo />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar páginas no Trinks"
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
              value="Teste12341234"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trinks-blue focus:border-transparent"
              readOnly
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-full px-4 py-2 flex items-center">
            Assine agora <span className="ml-1">🌱</span>
          </Button>
          <button className="p-2 text-gray-500 hover:text-trinks-blue rounded-full">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-trinks-blue rounded-full">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-trinks-blue rounded-full">
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

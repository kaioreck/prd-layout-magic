
import React, { useState } from 'react';
import { Calendar, Clock, List, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('day');

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 1);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Agenda</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            Hoje
          </Button>
          <div className="flex">
            <Button 
              variant="outline"
              className="rounded-r-none border-r-0" 
              onClick={() => navigateDate('prev')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              className="rounded-l-none"
              onClick={() => navigateDate('next')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800 capitalize">
            {formatDate(currentDate)}
          </h2>
          <div className="flex space-x-2">
            <Tabs defaultValue="day" className="w-auto">
              <TabsList>
                <TabsTrigger value="day" onClick={() => setCurrentView('day')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Dia
                </TabsTrigger>
                <TabsTrigger value="week" onClick={() => setCurrentView('week')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Semana
                </TabsTrigger>
                <TabsTrigger value="month" onClick={() => setCurrentView('month')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Mês
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="grid grid-cols-1 divide-y">
          {Array.from({ length: 10 }, (_, i) => {
            const hour = 8 + i;
            return (
              <div key={hour} className="flex p-4">
                <div className="w-24 text-gray-500 font-medium">
                  {hour}:00
                </div>
                <div className="flex-1 min-h-16">
                  {/* Slots para agendamentos */}
                  {hour === 10 && (
                    <div className="bg-trinks-orange/10 border-l-4 border-trinks-orange p-2 rounded-r-md">
                      <p className="font-medium">Corte de cabelo</p>
                      <p className="text-sm text-gray-500">Cliente: João Silva</p>
                      <p className="text-sm text-gray-500">10:00 - 11:00</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Schedule;

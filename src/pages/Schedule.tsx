import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, List, ChevronLeft, ChevronRight, Plus, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format, addDays, subDays, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, getDay, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSettings } from '@/contexts/SettingsContext';

interface Cliente {
  id_cliente?: number;
  nome: string;
  telefone: string;
  email?: string;
}

interface Agendamento {
  id_agendamento?: number;
  id_cliente?: number;
  cliente?: Cliente;
  id_servico: number;
  id_profissional: string;
  data_hora: Date;
  status: 'Confirmado' | 'Cancelado' | 'Concluído' | 'Não Compareceu';
  origem: 'WhatsApp' | 'Balcão' | 'App' | 'Telefone';
}

const availableTimes = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

const initialAppointments: Agendamento[] = [
  { 
    id_agendamento: 1, 
    cliente: { nome: 'João Silva', telefone: '(11) 98765-4321' },
    id_servico: 1, 
    id_profissional: 'prof_1', 
    data_hora: new Date(), 
    status: 'Confirmado', 
    origem: 'WhatsApp'
  },
  { 
    id_agendamento: 2, 
    cliente: { nome: 'Maria Oliveira', telefone: '(11) 97654-3210' },
    id_servico: 3, 
    id_profissional: 'prof_1', 
    data_hora: new Date(), 
    status: 'Confirmado', 
    origem: 'App'
  },
  { 
    id_agendamento: 3, 
    cliente: { nome: 'Carlos Santos', telefone: '(11) 96543-2109' },
    id_servico: 2, 
    id_profissional: 'prof_2', 
    data_hora: addDays(new Date(), 1), 
    status: 'Confirmado', 
    origem: 'Balcão'
  },
];

interface AppointmentFormData {
  clientName: string;
  clientPhone: string;
  serviceId: number;
  professionalId: string;
  date: Date;
  time: string;
  origin: 'WhatsApp' | 'Balcão' | 'App' | 'Telefone';
}

const Schedule: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { servicos, profissionais } = useSettings();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('day');
  const [appointments, setAppointments] = useState<Agendamento[]>(initialAppointments);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState<AppointmentFormData>({
    clientName: '',
    clientPhone: '',
    serviceId: servicos[0]?.id_servico || 1,
    professionalId: profissionais[0]?.id_profissional || '',
    date: new Date(),
    time: '09:00',
    origin: 'App'
  });
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    setNewAppointment(prev => ({
      ...prev,
      serviceId: servicos[0]?.id_servico || prev.serviceId,
      professionalId: profissionais[0]?.id_profissional || prev.professionalId
    }));
  }, [servicos, profissionais]);

  const scheduleNow = () => {
    setNewAppointment({
      clientName: '',
      clientPhone: '',
      serviceId: servicos[0]?.id_servico || 1,
      professionalId: profissionais[0]?.id_profissional || '',
      date: new Date(),
      time: '09:00',
      origin: 'App'
    });
    setIsAddDialogOpen(true);
  };

  const formatDate = (date: Date): string => {
    return format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    if (currentView === 'day') {
      if (direction === 'next') {
        newDate.setDate(newDate.getDate() + 1);
      } else {
        newDate.setDate(newDate.getDate() - 1);
      }
    } else if (currentView === 'week') {
      if (direction === 'next') {
        newDate.setDate(newDate.getDate() + 7);
      } else {
        newDate.setDate(newDate.getDate() - 7);
      }
    } else if (currentView === 'month') {
      if (direction === 'next') {
        newDate.setMonth(newDate.getMonth() + 1);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
    }
    
    setCurrentDate(newDate);
  };

  const isTimeAvailable = (time: string, date: Date, professionalId: string): boolean => {
    const [hours, minutes] = time.split(':').map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);
    
    return !appointments.some(app => 
      isSameDay(app.data_hora, date) && 
      format(app.data_hora, 'HH:mm') === time && 
      app.id_profissional === professionalId
    );
  };

  const getTodayAppointments = () => {
    return appointments.filter(app => isSameDay(app.data_hora, currentDate));
  };

  const addAppointment = () => {
    if (!newAppointment.clientName || !newAppointment.clientPhone || !newAppointment.time) {
      toast({
        title: "Erro ao agendar",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (!isTimeAvailable(newAppointment.time, newAppointment.date, newAppointment.professionalId)) {
      setIsConfirmDialogOpen(true);
      return;
    }

    processAppointment();
  };

  const processAppointment = () => {
    const selectedService = servicos.find(s => s.id_servico === newAppointment.serviceId);
    
    const [hours, minutes] = newAppointment.time.split(':').map(Number);
    const appointmentDate = new Date(newAppointment.date);
    appointmentDate.setHours(hours, minutes, 0, 0);
    
    const newAppointmentComplete: Agendamento = {
      id_agendamento: Date.now(),
      cliente: {
        nome: newAppointment.clientName,
        telefone: newAppointment.clientPhone
      },
      id_servico: newAppointment.serviceId,
      id_profissional: newAppointment.professionalId,
      data_hora: appointmentDate,
      status: 'Confirmado',
      origem: newAppointment.origin
    };

    setAppointments([...appointments, newAppointmentComplete]);
    setIsAddDialogOpen(false);
    setIsConfirmDialogOpen(false);
    
    toast({
      title: "Agendamento realizado com sucesso!",
      description: `${newAppointment.clientName} está agendado para ${format(newAppointment.date, 'dd/MM/yyyy')} às ${newAppointment.time}.`,
    });

    setNewAppointment({
      clientName: '',
      clientPhone: '',
      serviceId: servicos[0]?.id_servico || 1,
      professionalId: profissionais[0]?.id_profissional || '',
      date: new Date(),
      time: '09:00',
      origin: 'App'
    });
  };

  const getCurrentWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });
    const end = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  };

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(app => isSameDay(app.data_hora, date));
  };

  const formatWeekHeader = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    const startMonth = format(weekStart, 'MMMM', { locale: ptBR });
    const endMonth = format(weekEnd, 'MMMM', { locale: ptBR });
    
    if (startMonth === endMonth) {
      return `${format(weekStart, "dd", { locale: ptBR })} - ${format(weekEnd, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`;
    } else {
      return `${format(weekStart, "dd 'de' MMMM", { locale: ptBR })} - ${format(weekEnd, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`;
    }
  };

  const formatMonthHeader = () => {
    return format(currentDate, "MMMM 'de' yyyy", { locale: ptBR });
  };

  const populateTimeSlots = () => {
    const todayAppointments = getTodayAppointments();
    
    return availableTimes.map(time => {
      const appsAtThisTime = todayAppointments.filter(app => 
        format(app.data_hora, 'HH:mm') === time
      );
      
      return { 
        time, 
        appointments: appsAtThisTime
      };
    });
  };

  const getMonthDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    
    const firstDayOfMonth = getDay(start);
    
    const daysFromPrevMonth = Array.from({ length: firstDayOfMonth }, (_, i) => {
      return subDays(start, firstDayOfMonth - i);
    });
    
    const daysInMonth = eachDayOfInterval({ start, end });
    
    const totalDaysToShow = 42;
    const daysFromNextMonth = Array.from(
      { length: totalDaysToShow - daysFromPrevMonth.length - daysInMonth.length },
      (_, i) => addDays(end, i + 1)
    );
    
    return [...daysFromPrevMonth, ...daysInMonth, ...daysFromNextMonth];
  };

  interface TimeSlotProps {
    time: string;
    appointments: Agendamento[];
  }

  const TimeSlot: React.FC<TimeSlotProps> = ({ time, appointments }) => {
    return (
      <div className="flex p-4 border-b border-gray-100">
        <div className="w-20 text-gray-500 font-medium flex items-center">
          {time}
        </div>
        <div className="flex-1 min-h-16 pl-2">
          {appointments.length > 0 ? (
            <div className="space-y-2">
              {appointments.map((appointment, index) => {
                const serviceName = servicos.find(s => s.id_servico === appointment.id_servico)?.descricao || 'Serviço';
                const professional = profissionais.find(p => p.id_profissional === appointment.id_profissional);
                
                return (
                  <div key={index} className="bg-trinks-blue/10 border-l-4 border-trinks-blue p-3 rounded-r-md">
                    <p className="font-medium">{serviceName}</p>
                    <p className="text-sm text-gray-500">Cliente: {appointment.cliente?.nome || 'Cliente'}</p>
                    <p className="text-sm text-gray-500">Telefone: {appointment.cliente?.telefone || 'N/A'}</p>
                    {professional && (
                      <p className="text-sm text-gray-500">Profissional: {professional.nome}</p>
                    )}
                    <div className="flex mt-2">
                      <Button size="sm" variant="outline" className="mr-2">
                        <Check className="w-4 h-4 mr-1" /> Confirmar
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                        <X className="w-4 h-4 mr-1" /> Cancelar
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="border-dashed border-gray-300 text-gray-400 hover:text-trinks-blue hover:border-trinks-blue"
              onClick={() => {
                setNewAppointment({
                  ...newAppointment,
                  date: currentDate,
                  time: time
                });
                setIsAddDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Agendar
            </Button>
          )}
        </div>
      </div>
    );
  };

  interface DayCellProps {
    date: Date;
    isCurrentMonth: boolean;
    appointments: Agendamento[];
    onClick: () => void;
  }

  const DayCell: React.FC<DayCellProps> = ({ date, isCurrentMonth, appointments, onClick }) => {
    const isToday = isSameDay(date, new Date());
    
    return (
      <div 
        className={`border p-1 min-h-24 ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'} 
                   ${isToday ? 'border-trinks-blue' : 'border-gray-200'} 
                   cursor-pointer hover:bg-gray-50`}
        onClick={onClick}
      >
        <div className={`text-right mb-1 ${isCurrentMonth ? 'font-medium' : 'text-gray-400'}`}>
          {format(date, 'd')}
        </div>
        <div className="overflow-y-auto max-h-20">
          {appointments.map((app, idx) => (
            <div 
              key={idx} 
              className="text-xs p-1 mb-1 bg-trinks-blue/10 border-l-2 border-trinks-blue rounded truncate"
              title={`${app.time} - ${servicos.find(s => s.id_servico === app.id_servico)?.descricao} - ${app.cliente?.nome}`}
            >
              {app.time} - {app.cliente?.nome.split(' ')[0]}
            </div>
          ))}
          {appointments.length === 0 && isCurrentMonth && (
            <Button 
              variant="ghost" 
              className="w-full h-6 p-0 text-xs text-gray-400 justify-start hover:text-trinks-blue"
              onClick={(e) => {
                e.stopPropagation();
                setNewAppointment({
                  ...newAppointment,
                  date: date,
                  time: '09:00'
                });
                setIsAddDialogOpen(true);
              }}
            >
              <Plus className="w-3 h-3 mr-1" /> Agendar
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Agenda</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-medium text-gray-800 capitalize">
            {currentView === 'day' && formatDate(currentDate)}
            {currentView === 'week' && formatWeekHeader()}
            {currentView === 'month' && formatMonthHeader()}
          </h2>
          
          <div className="flex items-center space-x-2">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-center text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Calendário
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={currentDate}
                  onSelect={(date) => {
                    if (date) {
                      setCurrentDate(date);
                      setCalendarOpen(false);
                    }
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            <Tabs defaultValue={currentView} className="w-auto" onValueChange={(value) => setCurrentView(value as 'day' | 'week' | 'month')}>
              <TabsList>
                <TabsTrigger 
                  value="day" 
                  className={isMobile ? "px-2" : ""}
                >
                  <CalendarIcon className="w-4 h-4 mr-1 md:mr-2" />
                  {!isMobile && "Dia"}
                </TabsTrigger>
                <TabsTrigger 
                  value="week" 
                  className={isMobile ? "px-2" : ""}
                >
                  <CalendarIcon className="w-4 h-4 mr-1 md:mr-2" />
                  {!isMobile && "Semana"}
                </TabsTrigger>
                <TabsTrigger 
                  value="month" 
                  className={isMobile ? "px-2" : ""}
                >
                  <CalendarIcon className="w-4 h-4 mr-1 md:mr-2" />
                  {!isMobile && "Mês"}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button onClick={scheduleNow} className="bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-1 md:mr-2" />
              {!isMobile ? "Novo Agendamento" : "Agendar"}
            </Button>
          </div>
        </div>
      </div>

      {currentView === 'day' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 divide-y">
            {populateTimeSlots().map((slot, index) => (
              <TimeSlot 
                key={index} 
                time={slot.time} 
                appointments={slot.appointments} 
              />
            ))}
          </div>
        </div>
      )}

      {currentView === 'week' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 border-b">
            {getCurrentWeekDays().map((day, index) => (
              <div 
                key={index} 
                className={`text-center p-2 ${isSameDay(day, new Date()) ? 'bg-trinks-blue/10 font-medium' : ''}`}
              >
                <p className="text-sm text-gray-500">{format(day, 'EEEEEE', { locale: ptBR })}</p>
                <p className={`text-lg ${isSameDay(day, currentDate) ? 'font-bold text-trinks-blue' : ''}`}>
                  {format(day, 'd')}
                </p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 divide-x">
            {getCurrentWeekDays().map((day, dayIndex) => (
              <div key={dayIndex} className="min-h-[500px]">
                <div 
                  className={`text-center p-2 cursor-pointer hover:bg-gray-50 ${isSameDay(day, currentDate) ? 'bg-gray-50' : ''}`}
                  onClick={() => setCurrentDate(day)}
                >
                  {format(day, 'dd/MM')}
                </div>
                <div className="max-h-[468px] overflow-y-auto">
                  {getAppointmentsForDay(day).length > 0 ? (
                    <div className="p-2 space-y-2">
                      {getAppointmentsForDay(day).map((app, appIndex) => {
                        const serviceName = servicos.find(s => s.id_servico === app.id_servico)?.descricao || '';
                        return (
                          <div 
                            key={appIndex}
                            className="bg-trinks-blue/10 border-l-4 border-trinks-blue p-2 rounded-r-md text-xs"
                          >
                            <p className="font-medium">{app.time} - {serviceName}</p>
                            <p>{app.cliente?.nome}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-2 text-center">
                      <Button 
                        variant="ghost" 
                        className="text-xs text-gray-400 hover:text-trinks-blue"
                        onClick={() => {
                          setNewAppointment({
                            ...newAppointment,
                            date: day,
                            time: '09:00'
                          });
                          setIsAddDialogOpen(true);
                        }}
                      >
                        <Plus className="w-3 h-3 mr-1" /> Agendar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'month' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 border-b">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
              <div key={index} className="text-center p-2 font-medium text-gray-700">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7">
            {getMonthDays().map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const dayAppointments = getAppointmentsForDay(date);
              
              return (
                <DayCell 
                  key={index}
                  date={date}
                  isCurrentMonth={isCurrentMonth}
                  appointments={dayAppointments}
                  onClick={() => {
                    setCurrentDate(date);
                    setCurrentView('day');
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para criar um novo agendamento.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome do cliente
              </label>
              <input
                id="name"
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newAppointment.clientName}
                onChange={(e) => setNewAppointment({...newAppointment, clientName: e.target.value})}
                placeholder="Digite o nome do cliente"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Telefone
              </label>
              <input
                id="phone"
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newAppointment.clientPhone}
                onChange={(e) => setNewAppointment({...newAppointment, clientPhone: e.target.value})}
                placeholder="(00) 00000-0000"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="service" className="text-sm font-medium">
                Serviço
              </label>
              <select
                id="service"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newAppointment.serviceId}
                onChange={(e) => setNewAppointment({...newAppointment, serviceId: parseInt(e.target.value, 10)})}
              >
                {servicos.map((servico) => (
                  <option key={servico.id_servico} value={servico.id_servico}>
                    {servico.descricao} - R${servico.preco.toFixed(2)} ({servico.duracao_minutos}min)
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="professional" className="text-sm font-medium">
                Profissional
              </label>
              <select
                id="professional"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newAppointment.professionalId}
                onChange={(e) => setNewAppointment({...newAppointment, professionalId: e.target.value})}
              >
                {profissionais.map((prof) => (
                  <option key={prof.id_profissional} value={prof.id_profissional}>
                    {prof.nome} - {prof.especialidade || 'Barbeiro'}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="origin" className="text-sm font-medium">
                Origem
              </label>
              <select
                id="origin"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newAppointment.origin}
                onChange={(e) => setNewAppointment({...newAppointment, origin: e.target.value as 'WhatsApp' | 'Balcão' | 'App' | 'Telefone'})}
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Balcão">Balcão</option>
                <option value="App">App</option>
                <option value="Telefone">Telefone</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Data
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(newAppointment.date, 'dd/MM/yyyy')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newAppointment.date}
                      onSelect={(date) => date && setNewAppointment({...newAppointment, date})}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="time" className="text-sm font-medium">
                  Horário
                </label>
                <select
                  id="time"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                >
                  {availableTimes.map((time) => (
                    <option 
                      key={time} 
                      value={time}
                      disabled={!isTimeAvailable(time, newAppointment.date, newAppointment.professionalId) && isSameDay(newAppointment.date, currentDate)}
                    >
                      {time} {!isTimeAvailable(time, newAppointment.date, newAppointment.professionalId) && isSameDay(newAppointment.date, currentDate) ? '(Ocupado)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
              className="mr-2"
            >
              Cancelar
            </Button>
            <Button onClick={addAppointment} className="bg-green-500 hover:bg-green-600">
              Agendar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmação de sobreposição</DialogTitle>
            <DialogDescription>
              O horário selecionado já está ocupado. Deseja sobrescrever este agendamento?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsConfirmDialogOpen(false)}
              className="mr-2"
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={processAppointment}
            >
              Sobrescrever agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;

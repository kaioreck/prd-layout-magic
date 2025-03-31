
import React from 'react';
import { Calendar, DollarSign, CreditCard, Users } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import ComparisonChart from '@/components/dashboard/ComparisonChart';
import AppointmentStats from '@/components/dashboard/AppointmentStats';
import { DateRange } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-4">
          <div className="bg-white rounded-md border border-gray-200 px-4 py-2">
            <span className="text-sm text-gray-500">01/09/2024 - 28/02/2025</span>
          </div>
          <div className="bg-white rounded-md border border-gray-200 px-4 py-2">
            <span className="text-sm text-gray-500">Teste12341234</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="Resultado"
          value="R$ 0,00"
          tooltipText="Diferença entre receitas e despesas no período"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Receita"
          value="R$ 0,00"
          tooltipText="Total de receitas no período"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Despesa"
          value="R$ 0,00"
          tooltipText="Total de despesas no período"
          icon={<CreditCard className="w-5 h-5" />}
        />
        <StatCard
          title="Agendamentos"
          value="0"
          tooltipText="Número de agendamentos no período"
          icon={<Calendar className="w-5 h-5" />}
        />
        <StatCard
          title="Agendamentos Online"
          value="0"
          tooltipText="Número de agendamentos online no período"
          icon={<Calendar className="w-5 h-5" />}
        />
        <StatCard
          title="Atendimentos"
          value="0"
          tooltipText="Número de atendimentos realizados no período"
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      <div className="mb-6">
        <RevenueChart title="Resultado" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ComparisonChart title="Receita e Despesa" />
        <AppointmentStats title="Quantidade de Atendimentos" />
      </div>
    </div>
  );
};

export default Dashboard;

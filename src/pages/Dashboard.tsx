
import React from 'react';
import { Calendar, DollarSign, CreditCard, Users } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import ComparisonChart from '@/components/dashboard/ComparisonChart';
import AppointmentStats from '@/components/dashboard/AppointmentStats';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex flex-wrap w-full sm:w-auto gap-2 sm:gap-4">
          <div className="bg-white rounded-md border border-gray-200 px-3 py-2 text-xs sm:text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
            01/09/2024 - 28/02/2025
          </div>
          <div className="bg-white rounded-md border border-gray-200 px-3 py-2 text-xs sm:text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
            Teste12341234
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <StatCard
          title="Resultado"
          value="R$ 0,00"
          tooltipText="Diferença entre receitas e despesas no período"
          icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
        />
        <StatCard
          title="Receita"
          value="R$ 0,00"
          tooltipText="Total de receitas no período"
          icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
        />
        <StatCard
          title="Despesa"
          value="R$ 0,00"
          tooltipText="Total de despesas no período"
          icon={<CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />}
        />
        <StatCard
          title="Agendamentos"
          value="0"
          tooltipText="Número de agendamentos no período"
          icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
        />
        <StatCard
          title="Agendamentos Online"
          value="0"
          tooltipText="Número de agendamentos online no período"
          icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
        />
        <StatCard
          title="Atendimentos"
          value="0"
          tooltipText="Número de atendimentos realizados no período"
          icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />}
        />
      </div>

      <div className="mb-4 sm:mb-6 overflow-x-auto">
        <div className="min-w-[600px]">
          <RevenueChart title="Resultado" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="overflow-x-auto">
          <div className="min-w-[400px]">
            <ComparisonChart title="Receita e Despesa" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[400px]">
            <AppointmentStats title="Quantidade de Atendimentos" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

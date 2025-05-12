
import React from 'react';
import { Calendar, DollarSign, CreditCard, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

// Dados de exemplo para os gráficos
const revenueData = [
  { name: 'Set/24', valor: 3500 },
  { name: 'Out/24', valor: 4200 },
  { name: 'Nov/24', valor: 3800 },
  { name: 'Dez/24', valor: 5100 },
  { name: 'Jan/25', valor: 4700 },
  { name: 'Fev/25', valor: 6200 },
];

const expenseData = [
  { name: 'Set/24', valor: 1800 },
  { name: 'Out/24', valor: 2100 },
  { name: 'Nov/24', valor: 2300 },
  { name: 'Dez/24', valor: 2200 },
  { name: 'Jan/25', valor: 2500 },
  { name: 'Fev/25', valor: 2700 },
];

const onlineAppointmentsData = [
  { name: 'Set/24', valor: 12 },
  { name: 'Out/24', valor: 18 },
  { name: 'Nov/24', valor: 22 },
  { name: 'Dez/24', valor: 15 },
  { name: 'Jan/25', valor: 24 },
  { name: 'Fev/25', valor: 30 },
];

const appointmentsData = [
  { name: 'Set/24', valor: 45 },
  { name: 'Out/24', valor: 52 },
  { name: 'Nov/24', valor: 58 },
  { name: 'Dez/24', valor: 63 },
  { name: 'Jan/25', valor: 70 },
  { name: 'Fev/25', valor: 75 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          <div className="bg-white rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-500">
            01/09/2024 - 28/02/2025
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seção de Faturamento */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span>Faturamento</span>
              </div>
            </CardTitle>
            <span className="text-xl font-bold">R$ 27.500,00</span>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(1)}k`} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Valor']}/>} />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="#4CAF50"
                  fill="#4CAF50"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Seção de Despesas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-red-500" />
                <span>Despesas</span>
              </div>
            </CardTitle>
            <span className="text-xl font-bold">R$ 13.600,00</span>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={expenseData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(1)}k`} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Valor']}/>} />
                <Bar dataKey="valor" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Seção de Agendamentos Online */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>Agendamentos Online</span>
              </div>
            </CardTitle>
            <span className="text-xl font-bold">121</span>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={onlineAppointmentsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => [value, 'Agendamentos']}/>} />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="#2196F3"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Seção de Atendimentos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <span>Atendimentos</span>
              </div>
            </CardTitle>
            <span className="text-xl font-bold">363</span>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={appointmentsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => [value, 'Atendimentos']}/>} />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="#9C27B0"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

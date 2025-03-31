
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Calendar, DollarSign, Users } from 'lucide-react';

const DashboardReports: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Visualize os indicadores principais do seu negócio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-trinks-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231,89</div>
            <p className="text-xs text-muted-foreground">+20,1% do último mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
            <Users className="h-4 w-4 text-trinks-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+124</div>
            <p className="text-xs text-muted-foreground">+14% do último mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-trinks-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">351</div>
            <p className="text-xs text-muted-foreground">+5% do último mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <BarChart className="h-4 w-4 text-trinks-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24%</div>
            <p className="text-xs text-muted-foreground">+1,2% do último mês</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Receita dos últimos 6 meses</h2>
          <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Gráfico de receita será exibido aqui</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Agendamentos por Serviço</h2>
          <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Gráfico de serviços será exibido aqui</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardReports;

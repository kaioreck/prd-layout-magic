
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, FileText, PieChart } from 'lucide-react';

const MainReports: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Relatórios Principais</h1>
        <p className="text-sm text-gray-500 mt-1">
          Visualize os principais indicadores do seu negócio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Vendas do Mês</CardTitle>
            <BarChart className="h-5 w-5 text-trinks-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 15.890,00</div>
            <p className="text-xs text-muted-foreground mt-1">
              +23% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Clientes Atendidos</CardTitle>
            <FileText className="h-5 w-5 text-trinks-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Taxa de Retorno</CardTitle>
            <PieChart className="h-5 w-5 text-trinks-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Desempenho de Vendas</h2>
        <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">Gráfico de desempenho de vendas será exibido aqui</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h2>
          <div className="space-y-4">
            {['Corte de Cabelo', 'Manicure', 'Pedicure', 'Coloração'].map((item, index) => (
              <div key={index} className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span>{item}</span>
                <span className="font-medium">{Math.floor(Math.random() * 100)} unid.</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Horários Mais Procurados</h2>
          <div className="space-y-4">
            {['14:00 - 16:00', '10:00 - 12:00', '16:00 - 18:00', '08:00 - 10:00'].map((item, index) => (
              <div key={index} className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span>{item}</span>
                <span className="font-medium">{Math.floor(Math.random() * 30)} agendamentos</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainReports;

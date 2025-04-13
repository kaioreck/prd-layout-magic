
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, FileText, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const reportLinks = [
  { name: "Dashboard", path: "/relatorios/dashboard", icon: <BarChart className="w-4 h-4" /> },
  { name: "Demonstrativo de Resultados", path: "/relatorios/demonstrativo", icon: <FileText className="w-4 h-4" /> },
  { name: "Rankings", path: "/relatorios/rankings", icon: <BarChart className="w-4 h-4" /> },
  { name: "Pesquisa de Satisfação", path: "/relatorios/pesquisa", icon: <FileText className="w-4 h-4" /> },
  { name: "Mapa de Calor", path: "/relatorios/mapa-calor", icon: <PieChart className="w-4 h-4" /> },
  { name: "Relatório de Retorno", path: "/relatorios/retorno", icon: <FileText className="w-4 h-4" /> },
];

const MainReports: React.FC = () => {
  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mb-3 md:mb-6">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">Relatórios Principais</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          Visualize os principais indicadores do seu negócio
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-3 md:mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 md:px-4">
            <CardTitle className="text-sm md:text-md font-medium">Vendas do Mês</CardTitle>
            <BarChart className="h-4 w-4 md:h-5 md:w-5 text-trinks-blue" />
          </CardHeader>
          <CardContent className="px-3 md:px-4 pt-0">
            <div className="text-lg md:text-xl font-bold">R$ 15.890,00</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              +23% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 md:px-4">
            <CardTitle className="text-sm md:text-md font-medium">Clientes Atendidos</CardTitle>
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-trinks-blue" />
          </CardHeader>
          <CardContent className="px-3 md:px-4 pt-0">
            <div className="text-lg md:text-xl font-bold">87</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 md:px-4">
            <CardTitle className="text-sm md:text-md font-medium">Taxa de Retorno</CardTitle>
            <PieChart className="h-4 w-4 md:h-5 md:w-5 text-trinks-blue" />
          </CardHeader>
          <CardContent className="px-3 md:px-4 pt-0">
            <div className="text-lg md:text-xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              +5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-8 mb-3 md:mb-6 overflow-hidden">
        <h2 className="text-base md:text-xl font-semibold mb-2 md:mb-4">Desempenho de Vendas</h2>
        <div className="h-36 md:h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg overflow-auto">
          <p className="text-gray-500 text-sm md:text-base">Gráfico de desempenho de vendas será exibido aqui</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6">
          <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Produtos Mais Vendidos</h2>
          <div className="space-y-2 md:space-y-4">
            {['Corte de Cabelo', 'Manicure', 'Pedicure', 'Coloração'].map((item, index) => (
              <div key={index} className="flex items-center justify-between pb-1 md:pb-2 border-b border-gray-100">
                <span className="text-sm md:text-base truncate flex-1 mr-2">{item}</span>
                <span className="font-medium text-sm md:text-base whitespace-nowrap">{Math.floor(Math.random() * 100)} unid.</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6">
          <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Horários Mais Procurados</h2>
          <div className="space-y-2 md:space-y-4">
            {['14:00 - 16:00', '10:00 - 12:00', '16:00 - 18:00', '08:00 - 10:00'].map((item, index) => (
              <div key={index} className="flex items-center justify-between pb-1 md:pb-2 border-b border-gray-100">
                <span className="text-sm md:text-base flex-1 mr-2">{item}</span>
                <span className="font-medium text-sm md:text-base whitespace-nowrap">{Math.floor(Math.random() * 30)} agendamentos</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold mb-4">Acessar Relatórios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {reportLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path} 
              className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <span className="bg-trinks-blue/10 p-2 rounded-full mr-3">
                {link.icon}
              </span>
              <span className="text-sm font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainReports;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const ResultsReport: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Demonstrativo de Resultado</h1>
        <p className="text-sm text-gray-500 mt-1">
          Visualize os resultados financeiros do seu negócio
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded-md text-sm">
          <span>Período: 01/03/2025 a 31/03/2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium text-green-800">Receita Total</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">R$ 38.450,75</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-xs text-green-600">+14,5% em relação ao mês anterior</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium text-red-800">Despesas</CardTitle>
            <DollarSign className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">R$ 20.120,35</div>
            <div className="flex items-center mt-1">
              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              <p className="text-xs text-red-600">-3,2% em relação ao mês anterior</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium text-blue-800">Lucro Líquido</CardTitle>
            <DollarSign className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">R$ 18.330,40</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
              <p className="text-xs text-blue-600">+17,8% em relação ao mês anterior</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Detalhamento de Receitas</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border-b">Categoria</th>
                <th className="text-right p-3 border-b">Valor</th>
                <th className="text-right p-3 border-b">% do Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Serviços de Cabelo</td>
                <td className="text-right p-3">R$ 18.230,50</td>
                <td className="text-right p-3">47,4%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Serviços de Estética</td>
                <td className="text-right p-3">R$ 12.845,75</td>
                <td className="text-right p-3">33,4%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Vendas de Produtos</td>
                <td className="text-right p-3">R$ 5.890,20</td>
                <td className="text-right p-3">15,3%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Outros</td>
                <td className="text-right p-3">R$ 1.484,30</td>
                <td className="text-right p-3">3,9%</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-medium">
                <td className="p-3">Total</td>
                <td className="text-right p-3">R$ 38.450,75</td>
                <td className="text-right p-3">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Detalhamento de Despesas</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border-b">Categoria</th>
                <th className="text-right p-3 border-b">Valor</th>
                <th className="text-right p-3 border-b">% do Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Folha de Pagamento</td>
                <td className="text-right p-3">R$ 12.540,80</td>
                <td className="text-right p-3">62,3%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Aluguel</td>
                <td className="text-right p-3">R$ 3.500,00</td>
                <td className="text-right p-3">17,4%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Compra de Produtos</td>
                <td className="text-right p-3">R$ 2.850,25</td>
                <td className="text-right p-3">14,2%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Outros</td>
                <td className="text-right p-3">R$ 1.229,30</td>
                <td className="text-right p-3">6,1%</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-medium">
                <td className="p-3">Total</td>
                <td className="text-right p-3">R$ 20.120,35</td>
                <td className="text-right p-3">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsReport;

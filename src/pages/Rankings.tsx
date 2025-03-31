
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Rankings: React.FC = () => {
  const [rankingType, setRankingType] = useState('products');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Rankings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Confira os rankings de desempenho
        </p>
      </div>

      <Tabs defaultValue="products" className="mb-6" onValueChange={setRankingType}>
        <div className="mb-4">
          <TabsList>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="professionals">Profissionais</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="products">
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded-md text-sm">
              <span>Vendas entre 01/03/2025 e 31/03/2025</span>
            </div>

            <div className="bg-white border border-gray-200 px-3 py-2 rounded-md text-sm">
              <span>Categorias: Todas</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Top 10 Produtos</h2>
            <div className="space-y-4">
              {[
                { name: 'Shampoo Profissional 500ml', sales: 87, revenue: 3480 },
                { name: 'Condicionador Hidratante 500ml', sales: 72, revenue: 2880 },
                { name: 'Máscara Capilar 300g', sales: 63, revenue: 3150 },
                { name: 'Óleo Capilar 100ml', sales: 58, revenue: 2320 },
                { name: 'Spray de Volume 200ml', sales: 45, revenue: 1800 },
                { name: 'Modelador de Cachos 250ml', sales: 42, revenue: 1680 },
                { name: 'Finalizador Anti-Frizz 150ml', sales: 38, revenue: 1520 },
                { name: 'Leave-in 200ml', sales: 35, revenue: 1400 },
                { name: 'Tintura Permanente', sales: 30, revenue: 2400 },
                { name: 'Kit Manutenção de Cor', sales: 27, revenue: 2700 }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="h-8 w-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} unidades vendidas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {product.revenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">em vendas</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="services">
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded-md text-sm">
              <span>Agendamentos entre 01/03/2025 e 31/03/2025</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Top 10 Serviços</h2>
            <div className="space-y-4">
              {[
                { name: 'Corte Feminino', count: 145, revenue: 7250 },
                { name: 'Coloração', count: 98, revenue: 9800 },
                { name: 'Manicure', count: 92, revenue: 3680 },
                { name: 'Pedicure', count: 87, revenue: 3480 },
                { name: 'Hidratação Capilar', count: 78, revenue: 3900 },
                { name: 'Corte Masculino', count: 75, revenue: 3000 },
                { name: 'Escova', count: 68, revenue: 2720 },
                { name: 'Design de Sobrancelhas', count: 62, revenue: 1860 },
                { name: 'Limpeza de Pele', count: 51, revenue: 3060 },
                { name: 'Depilação', count: 43, revenue: 3440 }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="h-8 w-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.count} agendamentos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {service.revenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">em receita</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="professionals">
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded-md text-sm">
              <span>Atendimentos entre 01/03/2025 e 31/03/2025</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Top 10 Profissionais</h2>
            <div className="space-y-4">
              {[
                { name: 'Ana Silva', role: 'Cabeleireira', clients: 68, revenue: 6800 },
                { name: 'Carlos Santos', role: 'Barbeiro', clients: 64, revenue: 3840 },
                { name: 'Mariana Oliveira', role: 'Manicure', clients: 60, revenue: 2400 },
                { name: 'Ricardo Alves', role: 'Cabeleireiro', clients: 55, revenue: 5500 },
                { name: 'Patrícia Lima', role: 'Esteticista', clients: 48, revenue: 4800 },
                { name: 'Bruno Costa', role: 'Barbeiro', clients: 45, revenue: 2700 },
                { name: 'Juliana Martins', role: 'Cabeleireira', clients: 42, revenue: 4200 },
                { name: 'Fábio Nunes', role: 'Cabeleireiro', clients: 38, revenue: 3800 },
                { name: 'Carla Souza', role: 'Manicure', clients: 35, revenue: 1750 },
                { name: 'Rodrigo Pereira', role: 'Barbeiro', clients: 32, revenue: 1920 }
              ].map((professional, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="h-8 w-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{professional.name}</p>
                      <p className="text-sm text-gray-500">{professional.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{professional.clients} clientes</p>
                    <p className="text-sm text-gray-500">R$ {professional.revenue.toFixed(2)} em receita</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded-md text-sm">
              <span>Gastos entre 01/03/2025 e 31/03/2025</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Top 10 Clientes</h2>
            <div className="space-y-4">
              {[
                { name: 'Fernanda Gomes', visits: 7, revenue: 1450 },
                { name: 'Alexandre Ribeiro', visits: 6, revenue: 1280 },
                { name: 'Luiza Mendes', visits: 5, revenue: 980 },
                { name: 'Rafael Castro', visits: 5, revenue: 950 },
                { name: 'Camila Ferreira', visits: 4, revenue: 840 },
                { name: 'Diego Almeida', visits: 4, revenue: 780 },
                { name: 'Isabela Santos', visits: 4, revenue: 740 },
                { name: 'Marcelo Lima', visits: 3, revenue: 650 },
                { name: 'Bianca Costa', visits: 3, revenue: 580 },
                { name: 'Thiago Oliveira', visits: 3, revenue: 520 }
              ].map((client, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="h-8 w-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.visits} visitas no período</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {client.revenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">em gastos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Rankings;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductRanking: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ranking de Produtos</h1>
        <div className="bg-gray-100 inline-block rounded-full px-2 py-1 text-xs text-gray-500 mt-1">
          <span>?</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded-md text-sm">
          <span>Vendas entre 01/02/2025 e 28/02/2025</span>
        </div>
        
        <div className="bg-white border border-gray-200 px-3 py-2 rounded-md text-sm">
          <span>Venda para: Cliente</span>
        </div>
        
        <div className="bg-white border border-gray-200 px-3 py-2 rounded-md text-sm">
          <span>Categorias: Todas</span>
        </div>
        
        <div className="bg-white border border-gray-200 px-3 py-2 rounded-md text-sm">
          <span>Produtos: Todos</span>
        </div>
        
        <div className="bg-white border border-gray-200 px-3 py-2 rounded-md text-sm">
          <span>Visualizar por: Produto</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6 text-center">
        <p className="text-gray-600 mb-1">Nenhum resultado encontrado. Você não possui dados para o ranking.</p>
      </div>

      <div className="text-gray-500 text-sm">
        <p>Dados atualizados em: 28/03/2025 às 00:30</p>
      </div>
    </div>
  );
};

export default ProductRanking;

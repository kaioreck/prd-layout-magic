
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductRanking: React.FC = () => {
  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mb-3 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <Link to="/relatorios/rankings" className="flex items-center text-gray-600 hover:text-gray-800 mb-2 sm:mb-0 mr-3">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="text-sm">Voltar</span>
        </Link>
        
        <div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">Ranking de Produtos</h1>
          <div className="bg-gray-100 inline-block rounded-full px-2 py-1 text-xs text-gray-500 mt-1">
            <span>?</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3 md:mb-6">
        <div className="bg-orange-50 border border-orange-200 text-orange-800 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm">
          <span>Vendas entre 01/02/2025 e 28/02/2025</span>
        </div>
        
        <div className="bg-white border border-gray-200 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm">
          <span>Venda para: Cliente</span>
        </div>
        
        <div className="bg-white border border-gray-200 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm">
          <span>Categorias: Todas</span>
        </div>
        
        <div className="bg-white border border-gray-200 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm">
          <span>Produtos: Todos</span>
        </div>
        
        <div className="bg-white border border-gray-200 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm">
          <span>Visualizar por: Produto</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-8 mb-3 md:mb-6 text-center">
        <p className="text-sm md:text-base text-gray-600 mb-1">Nenhum resultado encontrado. Você não possui dados para o ranking.</p>
      </div>

      <div className="text-gray-500 text-xs md:text-sm">
        <p>Dados atualizados em: 28/03/2025 às 00:30</p>
      </div>
    </div>
  );
};

export default ProductRanking;

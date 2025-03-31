
import React from 'react';
import { ArrowUp, ArrowDown, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const FinancialControl: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Controle de entrada e saída</h1>
      </div>

      <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-md mb-6">
        <span className="font-medium">Período: 01/03/2025 - 31/03/2025</span>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Resultado</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="ml-2 text-gray-400 hover:text-gray-500">
                  <Info className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Diferença entre receitas e despesas no período</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-4xl font-bold mb-6 text-gray-900">R$ 0,00</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600">Receita</h3>
              <ArrowUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-semibold mb-4">R$ 0,00</p>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Lançar receita 
              <ArrowUp className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600">Despesa</h3>
              <ArrowDown className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-semibold mb-4">R$ 0,00</p>
            <Button className="w-full bg-red-500 hover:bg-red-600">
              Lançar despesa
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Lançamentos</h2>
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">Nenhum lançamento foi encontrado no período selecionado.</p>
          <p>Selecione "Lançar despesa" ou "Lançar receita" para adicionar um novo registro.</p>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-trinks-blue">Meu site</a>
          <a href="#" className="hover:text-trinks-blue">Trinks Ajuda</a>
          <a href="#" className="hover:text-trinks-blue">Blog</a>
          <a href="#" className="hover:text-trinks-blue">Fale Conosco</a>
          <a href="#" className="hover:text-trinks-blue">Contato</a>
        </div>
      </div>
    </div>
  );
};

export default FinancialControl;

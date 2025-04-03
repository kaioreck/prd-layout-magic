
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Info, Plus, FileText, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Interface alinhada com a tabela Pagamento do banco de dados
interface Pagamento {
  id_pagamento: number;
  id_agendamento: number;
  valor_pago: number;
  forma_pagamento: 'Dinheiro' | 'Cartão Crédito' | 'Cartão Débito' | 'Pix';
  data_pagamento: string; // formato ISO
  descricao?: string; // para identificação do serviço
}

const FinancialControl: React.FC = () => {
  const [periodoAtual] = useState<{ inicio: Date; fim: Date }>({
    inicio: new Date(2025, 2, 1), // 1º de março de 2025
    fim: new Date(2025, 2, 31)    // 31 de março de 2025
  });
  
  // Dados de exemplo que seriam carregados do banco
  const [pagamentos] = useState<Pagamento[]>([]);
  
  // Cálculo de totais
  const calcularReceitas = () => {
    return pagamentos.reduce((total, pag) => total + pag.valor_pago, 0);
  };
  
  // Não temos despesas na estrutura do banco ainda, então usamos um valor fixo de exemplo
  const calcularDespesas = () => {
    return 0; // Futuramente, isso virá da tabela de despesas
  };
  
  const calcularResultado = () => {
    return calcularReceitas() - calcularDespesas();
  };
  
  // Formatação de valores monetários
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  // Formatação de data para exibição
  const formatarPeriodo = () => {
    return `${format(periodoAtual.inicio, "dd 'de' MMMM", { locale: ptBR })} - ${format(periodoAtual.fim, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Controle financeiro</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-md">
            <span className="font-medium">Período: {formatarPeriodo()}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
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
        <p className="text-4xl font-bold mb-6 text-gray-900">{formatarMoeda(calcularResultado())}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600">Receita</h3>
              <ArrowUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-semibold mb-4">{formatarMoeda(calcularReceitas())}</p>
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
            <p className="text-2xl font-semibold mb-4">{formatarMoeda(calcularDespesas())}</p>
            <Button className="w-full bg-red-500 hover:bg-red-600">
              Lançar despesa
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Lançamentos</h2>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo lançamento
          </Button>
        </div>
        
        {pagamentos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-2">Data</th>
                  <th className="text-left p-2">Descrição</th>
                  <th className="text-left p-2">Forma de pagamento</th>
                  <th className="text-right p-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                {pagamentos.map((pagamento) => (
                  <tr key={pagamento.id_pagamento} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-2">{format(new Date(pagamento.data_pagamento), 'dd/MM/yyyy')}</td>
                    <td className="p-2">{pagamento.descricao || `Agendamento #${pagamento.id_agendamento}`}</td>
                    <td className="p-2">{pagamento.forma_pagamento}</td>
                    <td className="p-2 text-right">{formatarMoeda(pagamento.valor_pago)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-2">Nenhum lançamento foi encontrado no período selecionado.</p>
            <p>Selecione "Lançar despesa" ou "Lançar receita" para adicionar um novo registro.</p>
          </div>
        )}
      </div>

      <div className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
        <div className="flex flex-wrap gap-4">
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

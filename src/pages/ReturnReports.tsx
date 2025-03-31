
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Info, FileDown, Sparkles } from 'lucide-react';

const ReturnReports: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Relatórios de retorno</h1>

      <Tabs defaultValue="clients-not-returned">
        <TabsList className="mb-6 border-b border-gray-200 w-full justify-start">
          <TabsTrigger 
            value="clients-not-returned" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-trinks-blue data-[state=active]:text-trinks-darkBlue rounded-none px-6 py-3"
          >
            Clientes que não retornaram
          </TabsTrigger>
          <TabsTrigger 
            value="client-return" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-trinks-blue data-[state=active]:text-trinks-darkBlue rounded-none px-6 py-3"
          >
            Retorno de clientes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="clients-not-returned">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium mb-4">Buscar por:</h2>
              
              <div className="space-y-4">
                <div className="bg-orange-100 text-orange-800 rounded-md p-3 flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span>Todos os clientes</span>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center cursor-pointer">
                  <div className="flex-shrink-0 mr-3 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Serviço</span>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center cursor-pointer">
                  <div className="flex-shrink-0 mr-3 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Categoria</span>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <h3 className="text-gray-500 mr-2">Total de clientes</h3>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-3xl font-semibold">0</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 text-sm">
                    <span className="mr-2">Data do atendimento:</span>
                    <span className="font-medium">Últimos 6 meses</span>
                  </div>
                  
                  <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 text-sm">
                    <span className="mr-2">Profissional</span>
                  </div>
                </div>
                
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-2">Parece que não há resultados para o filtro utilizado</p>
                  <p className="text-gray-500 text-sm">Altere os filtros utilizados ou período de tempo para tentar uma nova busca</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Sobre o relatório
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileDown className="w-4 h-4" />
                    Exportar
                  </Button>
                  
                  <Button className="bg-trinks-orange hover:bg-trinks-orange/90 text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Conheça o envio automático
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="client-return">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center py-12">
            <p className="text-gray-500 mb-2">Selecione a aba "Clientes que não retornaram" para visualizar os relatórios</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReturnReports;

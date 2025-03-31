
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const WhatsAppInvitation: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <Button className="bg-green-500 hover:bg-green-600 rounded-full px-5 py-2 text-white font-medium flex items-center">
          <Zap className="w-4 h-4 mr-2" />
          Solução adicional
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Convite de Retorno<br />por WhatsApp
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Fidelize seus clientes enviando mensagem em um dos canais de comunicação mais famosos do Brasil
          </p>
          <div>
            <Button className="bg-trinks-orange hover:bg-trinks-orange/90 text-white px-6 py-2 rounded-md">
              Saiba mais
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <img 
            src="/lovable-uploads/109979ba-4910-419c-887f-d863ea5f7f3e.png" 
            alt="WhatsApp messaging example" 
            className="rounded-xl max-w-full h-auto object-cover"
          />
          <div className="absolute -bottom-10 right-0 bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-64">
            <div className="flex mb-2">
              <div className="w-8 h-8 bg-trinks-orange rounded-full flex-shrink-0 mr-2"></div>
              <div>
                <p className="text-xs font-medium">Trinks ✓</p>
                <p className="text-xs text-gray-600">Olá! Salão Carioca está agradecendo o seu retorno! 🙂</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <Tabs defaultValue="benefits">
          <TabsList className="border-b border-gray-200 w-full justify-center">
            <TabsTrigger 
              value="benefits" 
              className="data-[state=active]:text-trinks-orange data-[state=active]:border-b-2 data-[state=active]:border-trinks-orange px-8 py-2"
            >
              Benefícios
            </TabsTrigger>
            <TabsTrigger 
              value="how-it-works" 
              className="data-[state=active]:text-trinks-orange data-[state=active]:border-b-2 data-[state=active]:border-trinks-orange px-8 py-2"
            >
              Como funciona
            </TabsTrigger>
            <TabsTrigger 
              value="packages" 
              className="data-[state=active]:text-trinks-orange data-[state=active]:border-b-2 data-[state=active]:border-trinks-orange px-8 py-2"
            >
              Pacotes
            </TabsTrigger>
            <TabsTrigger 
              value="faq" 
              className="data-[state=active]:text-trinks-orange data-[state=active]:border-b-2 data-[state=active]:border-trinks-orange px-8 py-2"
            >
              Dúvidas frequentes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="benefits" className="pt-12">
            <h2 className="text-3xl font-bold text-center mb-12">Conheça os benefícios</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-trinks-blue/10 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-trinks-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Comunicação direta</h3>
                <p className="text-gray-600">Envie mensagens personalizadas diretamente para o WhatsApp dos seus clientes.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-trinks-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-trinks-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Economia de tempo</h3>
                <p className="text-gray-600">Automatize seus convites de retorno e economize tempo na gestão do seu negócio.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-trinks-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-trinks-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Aumento de fidelização</h3>
                <p className="text-gray-600">Aumente a taxa de retorno e fidelização dos seus clientes com lembretes personalizados.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="how-it-works">
            <div className="py-12 text-center">
              <p className="text-gray-500">Explicações sobre como funciona o serviço estarão disponíveis aqui</p>
            </div>
          </TabsContent>
          
          <TabsContent value="packages">
            <div className="py-12 text-center">
              <p className="text-gray-500">Informações sobre pacotes e preços estarão disponíveis aqui</p>
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="py-12 text-center">
              <p className="text-gray-500">Perguntas frequentes e respostas estarão disponíveis aqui</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WhatsAppInvitation;

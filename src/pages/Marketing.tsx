
import React from 'react';
import { MessageSquare, Mail, Instagram, Facebook, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Marketing: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Marketing</h1>
        <p className="text-gray-600">Ferramentas para promover seu negócio e atrair novos clientes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-2">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>WhatsApp</CardTitle>
            <CardDescription>
              Conecte-se com seus clientes via WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Envie lembretes de agendamento, promoções e mensagens personalizadas diretamente pelo WhatsApp.
            </p>
            <div className="bg-gray-50 p-3 rounded-md text-sm mb-4">
              <p className="font-medium">Recursos disponíveis:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Mensagens automatizadas</li>
                <li>Lembretes de agendamento</li>
                <li>Link de agendamento</li>
                <li>Modelos de mensagem</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Configurar WhatsApp
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-2">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Email Marketing</CardTitle>
            <CardDescription>
              Envie campanhas para sua base de clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Crie campanhas de email personalizadas para manter seus clientes informados sobre novidades, promoções e eventos.
            </p>
            <div className="bg-gray-50 p-3 rounded-md text-sm mb-4">
              <p className="font-medium">Recursos disponíveis:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Templates personalizáveis</li>
                <li>Segmentação de público</li>
                <li>Relatórios de desempenho</li>
                <li>Automação de envios</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Criar Campanha
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center mb-2">
              <Instagram className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle>Redes Sociais</CardTitle>
            <CardDescription>
              Integre e gerencie suas redes sociais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Conecte suas redes sociais para facilitar a gestão de conteúdo e aumentar o engajamento com seus clientes.
            </p>
            <div className="bg-gray-50 p-3 rounded-md text-sm mb-4">
              <p className="font-medium">Plataformas disponíveis:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Google Meu Negócio</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Conectar Redes
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recursos Adicionais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex p-4 border rounded-md">
            <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center mr-4">
              <Share2 className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium">Link de Agendamento</h3>
              <p className="text-sm text-gray-500 mb-2">Compartilhe seu link de agendamento para que clientes possam marcar horários diretamente.</p>
              <div className="flex items-center">
                <input
                  type="text"
                  value="trinks.com/teste12341234"
                  readOnly
                  className="text-sm bg-gray-50 border border-gray-200 rounded-md px-2 py-1 flex-1 mr-2"
                />
                <Button size="sm" variant="ghost">Copiar</Button>
              </div>
            </div>
          </div>
          
          <div className="flex p-4 border rounded-md">
            <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mr-4">
              <Facebook className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Botão de Reserva no Facebook</h3>
              <p className="text-sm text-gray-500 mb-2">Adicione um botão de agendamento diretamente na sua página do Facebook.</p>
              <Button size="sm">Configurar Botão</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;

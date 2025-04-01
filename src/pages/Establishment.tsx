
import React from 'react';
import { Store, MapPin, Clock, Phone, Globe, Instagram, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Establishment: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meu Estabelecimento</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Store className="w-6 h-6 text-trinks-orange mr-2" />
              <h2 className="text-xl font-semibold">Informações Básicas</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Nome do Estabelecimento</h3>
                <p className="text-gray-800">Barber.IA</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Endereço</h3>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                  <p className="text-gray-800">
                    UNIEURO
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Horário de Funcionamento</h3>
                <div className="flex items-start">
                  <Clock className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-gray-800">Segunda - Sexta: 08:00 - 18:00</p>
                    <p className="text-gray-800">Sábado: 08:00 - 16:00</p>
                    <p className="text-gray-800">Domingo: Fechado</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Contato</h3>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-500 mr-2" />
                  <p className="text-gray-800">(61) 9 7070-7070</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="bg-trinks-orange hover:bg-trinks-orange/90">
                Editar Informações
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-trinks-orange mr-2" />
              <h2 className="text-xl font-semibold">Site e Redes Sociais</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Globe className="w-4 h-4 text-gray-500 mr-2" />
                <p className="text-gray-800">www.barberia.com.br</p>
              </div>
              
              <div className="flex items-center">
                <Instagram className="w-4 h-4 text-gray-500 mr-2" />
                <p className="text-gray-800">@barber.ia</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline">Gerenciar Links</Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-trinks-orange mr-2" />
              <h2 className="text-xl font-semibold">Equipe</h2>
            </div>
            
            <p className="text-gray-600 mb-4">Gerencie sua equipe e defina suas especialidades.</p>
            
            <Button className="w-full">Ver Equipe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Establishment;

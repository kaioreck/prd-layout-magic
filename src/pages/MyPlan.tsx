
import React from 'react';
import { CheckCircle, Users, Star, Crown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PlanFeature: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center mb-2">
    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
    <span>{text}</span>
  </div>
);

const MyPlan: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meu Plano</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                Plano Gratuito
              </CardTitle>
              <CardDescription>
                Seu plano atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Recursos incluídos:</h3>
                <PlanFeature text="Agenda online básica" />
                <PlanFeature text="Até 3 profissionais" />
                <PlanFeature text="Limite de 50 agendamentos mensais" />
                <PlanFeature text="Acesso ao site Trinks" />
              </div>

              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="font-medium mb-2">Uso atual:</h3>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Profissionais:</span>
                    <span>1 de 3</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-trinks-orange h-2 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Agendamentos:</span>
                    <span>12 de 50</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-trinks-orange h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-trinks-orange hover:bg-trinks-orange/90 w-full">
                Fazer upgrade para o plano Premium
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="w-6 h-6 text-yellow-500 mr-2" />
                Plano Premium
              </CardTitle>
              <CardDescription>
                Desbloqueie todos os recursos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-lg mb-2">R$ 89,90/mês</p>
              <p className="text-sm text-gray-500 mb-4">Contrato anual</p>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Inclui todos os recursos do plano gratuito, mais:</h3>
                <PlanFeature text="Profissionais ilimitados" />
                <PlanFeature text="Agendamentos ilimitados" />
                <PlanFeature text="Relatórios avançados" />
                <PlanFeature text="Integração com WhatsApp" />
                <PlanFeature text="Domínio personalizado" />
                <PlanFeature text="Suporte prioritário" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full flex justify-between items-center">
                Ver detalhes
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyPlan;

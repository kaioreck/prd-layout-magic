
import React, { useState, useEffect } from 'react';
import { User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/contexts/SettingsContext';
import ProfessionalsList from '@/components/settings/ProfessionalsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "@/hooks/use-toast";

const Settings: React.FC = () => {
  const { barbearia, updateBarbearia, notifications, updateNotifications } = useSettings();
  
  // Profile form state
  const [formProfile, setFormProfile] = useState({
    nome: barbearia.nome,
    email: barbearia.email || '',
    telefone: barbearia.telefone || '',
    endereco: barbearia.endereco || '',
    horario_funcionamento: barbearia.horario_funcionamento || ''
  });

  // Update form when profile changes
  useEffect(() => {
    setFormProfile({
      nome: barbearia.nome,
      email: barbearia.email || '',
      telefone: barbearia.telefone || '',
      endereco: barbearia.endereco || '',
      horario_funcionamento: barbearia.horario_funcionamento || ''
    });
  }, [barbearia]);

  // Handle profile form input changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormProfile(prev => ({ ...prev, [id]: value }));
  };

  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBarbearia({
      ...barbearia,
      nome: formProfile.nome,
      email: formProfile.email,
      telefone: formProfile.telefone,
      endereco: formProfile.endereco,
      horario_funcionamento: formProfile.horario_funcionamento
    });
    
    toast({
      title: "Configurações salvas",
      description: "As informações do estabelecimento foram atualizadas."
    });
  };

  // Handle notification toggle changes
  const handleNotificationChange = (key: keyof typeof notifications, checked: boolean) => {
    updateNotifications({ ...notifications, [key]: checked });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
        <p className="text-gray-600 mt-2">Gerencie as configurações do seu estabelecimento</p>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-trinks-orange data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Dados do Estabelecimento
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-trinks-orange data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Estabelecimento</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="text-base">Nome do estabelecimento</Label>
                      <Input 
                        id="nome"
                        value={formProfile.nome} 
                        onChange={handleProfileChange}
                        className="h-10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="text-base">Telefone</Label>
                      <Input 
                        id="telefone"
                        value={formProfile.telefone} 
                        onChange={handleProfileChange}
                        placeholder="(00) 00000-0000"
                        className="h-10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">Email</Label>
                      <Input 
                        id="email"
                        type="email" 
                        value={formProfile.email} 
                        onChange={handleProfileChange}
                        className="h-10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endereco" className="text-base">Endereço</Label>
                      <Input 
                        id="endereco"
                        value={formProfile.endereco} 
                        onChange={handleProfileChange}
                        className="h-10"
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="horario_funcionamento" className="text-base">Horário de Funcionamento</Label>
                      <Input 
                        id="horario_funcionamento"
                        value={formProfile.horario_funcionamento} 
                        onChange={handleProfileChange}
                        placeholder="Ex: Seg-Sex: 9h-19h, Sáb: 9h-17h"
                        className="h-10"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-trinks-orange hover:bg-trinks-orange/90 mt-4"
                  >
                    Salvar Alterações
                  </Button>
                </form>

                <div className="mt-12 pt-6 border-t border-gray-200">
                  <ProfessionalsList />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">Notificações por Email</h3>
                      <p className="text-sm text-gray-500">Receba atualizações importantes por email</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={notifications.email} 
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-lg">Notificações por SMS</h3>
                      <p className="text-sm text-gray-500">Receba atualizações importantes por SMS</p>
                    </div>
                    <Switch 
                      id="sms-notifications" 
                      checked={notifications.sms} 
                      onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;

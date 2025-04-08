
import React, { useState, useEffect } from 'react';
import { User, Bell, Building2, Phone, Mail, MapPin, Clock, Save, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/contexts/SettingsContext';
import ProfessionalsList from '@/components/settings/ProfessionalsList';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">Gerencie as configurações do seu estabelecimento</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-8 p-1 bg-muted rounded-lg">
          <TabsTrigger value="profile" className="rounded-md py-2.5 data-[state=active]:bg-trinks-orange data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" />
            Dados do Estabelecimento
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-md py-2.5 data-[state=active]:bg-trinks-orange data-[state=active]:text-white">
            <Bell className="w-4 h-4 mr-2" />
            Notificações
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="border shadow-md">
            <CardHeader className="bg-gray-50 border-b rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-trinks-orange" />
                Informações do Estabelecimento
              </CardTitle>
              <CardDescription>
                Atualize as informações de contato e localização do seu estabelecimento
              </CardDescription>
            </CardHeader>
            <CardContent className="py-8">
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="flex items-center gap-2 font-medium text-base">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      Nome do estabelecimento
                    </Label>
                    <Input 
                      id="nome"
                      value={formProfile.nome} 
                      onChange={handleProfileChange}
                      className="h-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="flex items-center gap-2 font-medium text-base">
                      <Phone className="h-4 w-4 text-gray-500" />
                      Telefone
                    </Label>
                    <Input 
                      id="telefone"
                      value={formProfile.telefone} 
                      onChange={handleProfileChange}
                      placeholder="(00) 00000-0000"
                      className="h-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 font-medium text-base">
                      <Mail className="h-4 w-4 text-gray-500" />
                      Email
                    </Label>
                    <Input 
                      id="email"
                      type="email" 
                      value={formProfile.email} 
                      onChange={handleProfileChange}
                      className="h-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endereco" className="flex items-center gap-2 font-medium text-base">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      Endereço
                    </Label>
                    <Input 
                      id="endereco"
                      value={formProfile.endereco} 
                      onChange={handleProfileChange}
                      className="h-10"
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="horario_funcionamento" className="flex items-center gap-2 font-medium text-base">
                      <Clock className="h-4 w-4 text-gray-500" />
                      Horário de Funcionamento
                    </Label>
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
                  className="bg-trinks-orange hover:bg-trinks-orange/90 mt-6 gap-2"
                >
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
              </form>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="h-5 w-5 text-trinks-orange" />
                  <h3 className="text-xl font-semibold">Gerenciar Equipe</h3>
                </div>
                <ProfessionalsList />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="border shadow-md">
            <CardHeader className="bg-gray-50 border-b rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-trinks-orange" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>
                Configure como você deseja receber notificações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="py-8">
              <div className="space-y-8">
                <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-medium text-lg">Notificações por Email</h3>
                    <p className="text-sm text-gray-500">Receba atualizações importantes por email</p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={notifications.email} 
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    className="data-[state=checked]:bg-trinks-orange"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-medium text-lg">Notificações por SMS</h3>
                    <p className="text-sm text-gray-500">Receba atualizações importantes por SMS</p>
                  </div>
                  <Switch 
                    id="sms-notifications" 
                    checked={notifications.sms} 
                    onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                    className="data-[state=checked]:bg-trinks-orange"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

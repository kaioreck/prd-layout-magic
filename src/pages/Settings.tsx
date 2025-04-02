
import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, CreditCard, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/contexts/SettingsContext';
import ProfessionalsList from '@/components/settings/ProfessionalsList';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const Settings: React.FC = () => {
  const { profile, updateProfile, notifications, updateNotifications } = useSettings();
  
  // Profile form state
  const [formProfile, setFormProfile] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    role: profile.role
  });

  // Update form when profile changes
  useEffect(() => {
    setFormProfile({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      role: profile.role
    });
  }, [profile]);

  // Handle profile form input changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormProfile(prev => ({ ...prev, [id]: value }));
  };

  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formProfile);
  };

  // Handle notification toggle changes
  const handleNotificationChange = (key: keyof typeof notifications, checked: boolean) => {
    updateNotifications({ ...notifications, [key]: checked });
  };

  // Password form state
  const passwordForm = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onPasswordSubmit = (data: any) => {
    console.log('Password change submitted:', data);
    passwordForm.reset();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="w-4 h-4 mr-2" />
              Pagamentos
            </TabsTrigger>
            <TabsTrigger value="help">
              <HelpCircle className="w-4 h-4 mr-2" />
              Ajuda
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Informações do Perfil</h2>
              
              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input 
                      id="name"
                      value={formProfile.name} 
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email" 
                      value={formProfile.email} 
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone"
                      value={formProfile.phone} 
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="role">Cargo</Label>
                    <Input 
                      id="role"
                      value={formProfile.role} 
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-trinks-orange hover:bg-trinks-orange/90"
                >
                  Salvar Alterações
                </Button>
              </form>

              <div className="mt-8">
                <ProfessionalsList />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Preferências de Notificação</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações por Email</h3>
                    <p className="text-sm text-gray-500">Receba atualizações por email</p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={notifications.email} 
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações por SMS</h3>
                    <p className="text-sm text-gray-500">Receba atualizações por SMS</p>
                  </div>
                  <Switch 
                    id="sms-notifications" 
                    checked={notifications.sms} 
                    onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Segurança da Conta</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Alterar Senha</h3>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-3">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha Atual</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nova Senha</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar Nova Senha</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Alterar Senha</Button>
                  </form>
                </Form>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Autenticação de Dois Fatores</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Adicionar uma camada extra de segurança</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Sessões Ativas</h3>
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Este dispositivo</p>
                      <p className="text-sm text-gray-500">São Paulo, Brasil • Última atividade agora</p>
                    </div>
                    <span className="text-green-500 text-sm font-medium">Ativo</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="billing">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Informações de Pagamento</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Plano Atual</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Plano Gratuito</p>
                      <p className="text-sm text-gray-500">Usando recursos básicos</p>
                    </div>
                    <Button className="bg-trinks-orange hover:bg-trinks-orange/90">
                      Upgrade
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Métodos de Pagamento</h3>
                <div className="bg-gray-50 p-4 rounded-md mb-4 flex justify-between items-center">
                  <p className="text-gray-500">Nenhum método de pagamento cadastrado</p>
                  <Button variant="outline">Adicionar</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="help">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Central de Ajuda</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Perguntas Frequentes</h3>
                <div className="space-y-3">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">Como adicionar um novo profissional?</h4>
                    <p className="text-sm text-gray-500">Acesse a seção "Perfil" nas Configurações e clique em "Adicionar Profissional".</p>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">Como gerenciar meus agendamentos?</h4>
                    <p className="text-sm text-gray-500">Utilize a página "Agenda" para visualizar e gerenciar todos os agendamentos.</p>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">Como exportar relatórios?</h4>
                    <p className="text-sm text-gray-500">Acesse a seção "Relatórios" e escolha o relatório desejado. Clique no botão de exportação.</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Suporte</h3>
                <div className="border rounded-md p-4">
                  <p className="mb-2">Precisa de ajuda? Nossa equipe está disponível para auxiliar.</p>
                  <div className="flex space-x-2">
                    <Button>Abrir Ticket</Button>
                    <Button variant="outline">Chat ao Vivo</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Materiais de Treinamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">Guia de Início Rápido</h4>
                    <p className="text-sm text-gray-500">Aprenda o básico do sistema em minutos.</p>
                    <Button variant="link" className="text-trinks-orange p-0 h-auto mt-1">Ver guia</Button>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">Vídeos Tutoriais</h4>
                    <p className="text-sm text-gray-500">Assista aos vídeos para aprender a usar o sistema.</p>
                    <Button variant="link" className="text-trinks-orange p-0 h-auto mt-1">Ver vídeos</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;

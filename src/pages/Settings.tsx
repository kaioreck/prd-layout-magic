
import React, { useState, useEffect } from 'react';
import { User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/contexts/SettingsContext';
import ProfessionalsList from '@/components/settings/ProfessionalsList';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from "@/hooks/use-toast";

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
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "Erro ao alterar senha",
        description: "As senhas não coincidem. Por favor, tente novamente.",
        variant: "destructive"
      });
      return;
    }
    
    if (data.newPassword.length < 6) {
      toast({
        title: "Erro ao alterar senha",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate password change success
    toast({
      title: "Senha alterada com sucesso",
      description: "Sua senha foi atualizada com sucesso."
    });
    passwordForm.reset();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
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
              
              <div className="mt-8 border-t pt-6">
                <h3 className="font-medium mb-4">Alterar Senha</h3>
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
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Preferências de Notificação</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações por Email</h3>
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
                    <h3 className="font-medium">Notificações por SMS</h3>
                    <p className="text-sm text-gray-500">Receba atualizações importantes por SMS</p>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;

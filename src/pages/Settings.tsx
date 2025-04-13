
import React from 'react';
import { User, Bell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSettings } from '@/contexts/SettingsContext';

// Import new component files
import ProfileForm from '@/components/settings/ProfileForm';
import TeamManagement from '@/components/settings/TeamManagement';
import NotificationSettings from '@/components/settings/NotificationSettings';

const Settings: React.FC = () => {
  const { barbearia, updateBarbearia, notifications, updateNotifications } = useSettings();

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
          <ProfileForm 
            barbearia={barbearia} 
            updateBarbearia={updateBarbearia} 
          />
          <TeamManagement />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings 
            notifications={notifications}
            onNotificationChange={handleNotificationChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

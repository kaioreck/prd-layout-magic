
import React from 'react';
import { Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface NotificationPreferences {
  email: boolean;
  sms: boolean;
}

interface NotificationSettingsProps {
  notifications: NotificationPreferences;
  onNotificationChange: (key: keyof NotificationPreferences, checked: boolean) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  notifications, 
  onNotificationChange 
}) => {
  return (
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
              onCheckedChange={(checked) => onNotificationChange('email', checked)}
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
              onCheckedChange={(checked) => onNotificationChange('sms', checked)}
              className="data-[state=checked]:bg-trinks-orange"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;

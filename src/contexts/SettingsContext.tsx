
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface NotificationPreferences {
  email: boolean;
  sms: boolean;
}

interface SettingsContextType {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
  notifications: NotificationPreferences;
  updateNotifications: (notifications: NotificationPreferences) => void;
  professionals: Professional[];
  addProfessional: (professional: Professional) => void;
  removeProfessional: (id: string) => void;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
}

const defaultProfile: UserProfile = {
  name: 'Administrador',
  email: 'admin@teste12341234.com',
  phone: '(11) 99999-9999',
  role: 'Proprietário'
};

const defaultNotifications: NotificationPreferences = {
  email: true,
  sms: false
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [notifications, setNotifications] = useState<NotificationPreferences>(defaultNotifications);
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  // Load saved data from localStorage when component mounts
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedNotifications = localStorage.getItem('notificationPreferences');
    const savedProfessionals = localStorage.getItem('professionals');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    
    if (savedProfessionals) {
      setProfessionals(JSON.parse(savedProfessionals));
    }
  }, []);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso."
    });
  };

  const updateNotifications = (newNotifications: NotificationPreferences) => {
    setNotifications(newNotifications);
    localStorage.setItem('notificationPreferences', JSON.stringify(newNotifications));
    toast({
      title: "Preferências atualizadas",
      description: "Suas preferências de notificação foram salvas."
    });
  };

  const addProfessional = (professional: Professional) => {
    const newProfessionals = [...professionals, professional];
    setProfessionals(newProfessionals);
    localStorage.setItem('professionals', JSON.stringify(newProfessionals));
    toast({
      title: "Profissional adicionado",
      description: `${professional.name} foi adicionado com sucesso.`
    });
  };

  const removeProfessional = (id: string) => {
    const professional = professionals.find(p => p.id === id);
    const newProfessionals = professionals.filter(p => p.id !== id);
    setProfessionals(newProfessionals);
    localStorage.setItem('professionals', JSON.stringify(newProfessionals));
    if (professional) {
      toast({
        title: "Profissional removido",
        description: `${professional.name} foi removido com sucesso.`
      });
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        profile,
        updateProfile,
        notifications,
        updateNotifications,
        professionals,
        addProfessional,
        removeProfessional
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

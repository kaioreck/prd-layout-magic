
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
    try {
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
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
      // If there's an error, we'll use the default values
    }
  }, []);

  const updateProfile = (newProfile: UserProfile) => {
    try {
      setProfile(newProfile);
      localStorage.setItem('userProfile', JSON.stringify(newProfile));
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso."
      });
    } catch (error) {
      console.error('Error saving profile to localStorage:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar suas informações.",
        variant: "destructive"
      });
    }
  };

  const updateNotifications = (newNotifications: NotificationPreferences) => {
    try {
      setNotifications(newNotifications);
      localStorage.setItem('notificationPreferences', JSON.stringify(newNotifications));
      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências de notificação foram salvas."
      });
    } catch (error) {
      console.error('Error saving notification preferences to localStorage:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar suas preferências.",
        variant: "destructive"
      });
    }
  };

  const addProfessional = (professional: Professional) => {
    try {
      const newProfessionals = [...professionals, professional];
      setProfessionals(newProfessionals);
      localStorage.setItem('professionals', JSON.stringify(newProfessionals));
      toast({
        title: "Profissional adicionado",
        description: `${professional.name} foi adicionado com sucesso.`
      });
    } catch (error) {
      console.error('Error adding professional to localStorage:', error);
      toast({
        title: "Erro ao adicionar",
        description: "Ocorreu um erro ao adicionar o profissional.",
        variant: "destructive"
      });
    }
  };

  const removeProfessional = (id: string) => {
    try {
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
    } catch (error) {
      console.error('Error removing professional from localStorage:', error);
      toast({
        title: "Erro ao remover",
        description: "Ocorreu um erro ao remover o profissional.",
        variant: "destructive"
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

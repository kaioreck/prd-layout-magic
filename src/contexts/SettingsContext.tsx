
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

// Interfaces alinhadas com o schema do banco de dados
interface Barbearia {
  id_barbearia?: number;
  nome: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  horario_funcionamento?: string;
}

interface Profissional {
  id_profissional?: string; // Usando string para compatibilidade com o código atual
  nome: string;
  especialidade?: string;
  ativo: boolean;
  telefone?: string; // Campo adicional para manter compatibilidade
  email?: string;    // Campo adicional para manter compatibilidade
}

interface Servico {
  id_servico?: number;
  descricao: string;
  preco: number;
  duracao_minutos: number;
}

interface NotificationPreferences {
  email: boolean;
  sms: boolean;
}

interface SettingsContextType {
  barbearia: Barbearia;
  updateBarbearia: (barbearia: Barbearia) => void;
  notifications: NotificationPreferences;
  updateNotifications: (notifications: NotificationPreferences) => void;
  profissionais: Profissional[];
  addProfissional: (profissional: Profissional) => void;
  removeProfissional: (id: string) => void;
  servicos: Servico[];
  addServico: (servico: Servico) => void;
  removeServico: (id: number) => void;
}

const defaultBarbearia: Barbearia = {
  nome: 'Minha Barbearia',
  endereco: 'Rua Exemplo, 123',
  telefone: '(11) 99999-9999',
  email: 'contato@minhababearia.com',
  horario_funcionamento: 'Seg-Sex: 9h-19h, Sáb: 9h-17h'
};

const defaultNotifications: NotificationPreferences = {
  email: true,
  sms: false
};

const defaultServicos: Servico[] = [
  { id_servico: 1, descricao: 'Corte de cabelo', preco: 35, duracao_minutos: 30 },
  { id_servico: 2, descricao: 'Barba', preco: 25, duracao_minutos: 20 },
  { id_servico: 3, descricao: 'Corte e barba', preco: 55, duracao_minutos: 50 },
  { id_servico: 4, descricao: 'Hidratação', preco: 45, duracao_minutos: 40 },
  { id_servico: 5, descricao: 'Coloração', preco: 70, duracao_minutos: 60 },
];

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
  const [barbearia, setBarbearia] = useState<Barbearia>(defaultBarbearia);
  const [notifications, setNotifications] = useState<NotificationPreferences>(defaultNotifications);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [servicos, setServicos] = useState<Servico[]>(defaultServicos);

  // Load saved data from localStorage when component mounts
  useEffect(() => {
    try {
      const savedBarbearia = localStorage.getItem('barbearia');
      const savedNotifications = localStorage.getItem('notificationPreferences');
      const savedProfissionais = localStorage.getItem('profissionais');
      const savedServicos = localStorage.getItem('servicos');
      
      if (savedBarbearia) {
        setBarbearia(JSON.parse(savedBarbearia));
      }
      
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }
      
      if (savedProfissionais) {
        setProfissionais(JSON.parse(savedProfissionais));
      }
      
      if (savedServicos) {
        setServicos(JSON.parse(savedServicos));
      }
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
      // If there's an error, we'll use the default values
    }
  }, []);

  const updateBarbearia = (newBarbearia: Barbearia) => {
    try {
      setBarbearia(newBarbearia);
      localStorage.setItem('barbearia', JSON.stringify(newBarbearia));
      toast({
        title: "Dados atualizados",
        description: "As informações da barbearia foram salvas com sucesso."
      });
    } catch (error) {
      console.error('Error saving barbearia to localStorage:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as informações.",
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

  const addProfissional = (profissional: Profissional) => {
    try {
      // Garantir que o profissional tenha um ID único
      const profissionalWithId = {
        ...profissional,
        id_profissional: profissional.id_profissional || `prof_${Date.now()}`,
        ativo: profissional.ativo !== undefined ? profissional.ativo : true
      };
      
      const newProfissionais = [...profissionais, profissionalWithId];
      setProfissionais(newProfissionais);
      localStorage.setItem('profissionais', JSON.stringify(newProfissionais));
      toast({
        title: "Profissional adicionado",
        description: `${profissional.nome} foi adicionado com sucesso.`
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

  const removeProfissional = (id: string) => {
    try {
      const profissional = profissionais.find(p => p.id_profissional === id);
      const newProfissionais = profissionais.filter(p => p.id_profissional !== id);
      setProfissionais(newProfissionais);
      localStorage.setItem('profissionais', JSON.stringify(newProfissionais));
      if (profissional) {
        toast({
          title: "Profissional removido",
          description: `${profissional.nome} foi removido com sucesso.`
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
  
  const addServico = (servico: Servico) => {
    try {
      // Garantir que o serviço tenha um ID único
      const servicoWithId = {
        ...servico,
        id_servico: servico.id_servico || Date.now()
      };
      
      const newServicos = [...servicos, servicoWithId];
      setServicos(newServicos);
      localStorage.setItem('servicos', JSON.stringify(newServicos));
      toast({
        title: "Serviço adicionado",
        description: `${servico.descricao} foi adicionado com sucesso.`
      });
    } catch (error) {
      console.error('Error adding service to localStorage:', error);
      toast({
        title: "Erro ao adicionar",
        description: "Ocorreu um erro ao adicionar o serviço.",
        variant: "destructive"
      });
    }
  };

  const removeServico = (id: number) => {
    try {
      const servico = servicos.find(s => s.id_servico === id);
      const newServicos = servicos.filter(s => s.id_servico !== id);
      setServicos(newServicos);
      localStorage.setItem('servicos', JSON.stringify(newServicos));
      if (servico) {
        toast({
          title: "Serviço removido",
          description: `${servico.descricao} foi removido com sucesso.`
        });
      }
    } catch (error) {
      console.error('Error removing service from localStorage:', error);
      toast({
        title: "Erro ao remover",
        description: "Ocorreu um erro ao remover o serviço.",
        variant: "destructive"
      });
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        barbearia,
        updateBarbearia,
        notifications,
        updateNotifications,
        profissionais,
        addProfissional,
        removeProfissional,
        servicos,
        addServico,
        removeServico
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export type { Barbearia, Profissional, Servico };

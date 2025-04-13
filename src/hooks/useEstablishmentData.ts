
import { useState, useEffect } from 'react';
import { useEstablishment } from '@/contexts/EstablishmentContext';
import { toast } from "sonner";

// Default initial state for the establishment data
const defaultEstablishmentData = {
  name: 'Barber.IA',
  address: 'UNIEURO',
  schedule: {
    weekdays: '08:00 - 18:00',
    saturday: '08:00 - 16:00',
    sunday: 'Fechado',
  },
  phone: '(61) 9 7070-7070',
  social: {
    website: 'www.barberia.com.br',
    instagram: '@barber.ia',
  },
  image: undefined,
};

export interface EstablishmentData {
  name: string;
  address: string;
  schedule: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  phone: string;
  social: {
    website: string;
    instagram: string;
  };
  image?: string;
}

export const useEstablishmentData = () => {
  // Get establishment context functions
  const { updateEstablishmentImage, updateEstablishmentName } = useEstablishment();
  
  // Estados para os dados do estabelecimento
  const [establishmentData, setEstablishmentData] = useState<EstablishmentData>(defaultEstablishmentData);
  const [savedData, setSavedData] = useState<EstablishmentData>(defaultEstablishmentData);
  
  // Estados para controle de edição
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedEstablishmentData = localStorage.getItem('establishmentData');
    
    if (savedEstablishmentData) {
      const parsedData = JSON.parse(savedEstablishmentData);
      setEstablishmentData(parsedData);
      setSavedData(parsedData);
      
      // Update context with saved values
      if (parsedData.image) {
        updateEstablishmentImage(parsedData.image);
      }
      
      updateEstablishmentName(parsedData.name);
    }
  }, [updateEstablishmentImage, updateEstablishmentName]);

  // Handlers para alterações nos campos
  const handleBasicFieldChange = (field: string, value: string) => {
    setEstablishmentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleScheduleChange = (field: string, value: string) => {
    setEstablishmentData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value,
      },
    }));
  };

  const handleSocialFieldChange = (field: string, value: string) => {
    setEstablishmentData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [field]: value,
      },
    }));
  };

  const handleImageChange = (image: string) => {
    const newData = {
      ...establishmentData,
      image: image,
    };
    
    setEstablishmentData(newData);
    setSavedData(newData);
    
    // Update the image in the context and localStorage
    updateEstablishmentImage(image);
    
    // Save all data to localStorage
    localStorage.setItem('establishmentData', JSON.stringify(newData));
    
    toast.success("Imagem atualizada com sucesso!");
  };

  // Handlers para salvar ou cancelar edição
  const handleSaveBasicInfo = () => {
    const newData = {
      ...savedData,
      name: establishmentData.name,
      address: establishmentData.address,
      schedule: establishmentData.schedule,
      phone: establishmentData.phone,
    };
    
    setSavedData(newData);
    
    // Update establishment name in the context
    updateEstablishmentName(establishmentData.name);
    
    // Save all data to localStorage
    localStorage.setItem('establishmentData', JSON.stringify(newData));
    
    setIsEditingBasic(false);
    toast.success("Informações básicas atualizadas com sucesso!");
  };

  const handleCancelBasicEdit = () => {
    setEstablishmentData((prev) => ({
      ...prev,
      name: savedData.name,
      address: savedData.address,
      schedule: savedData.schedule,
      phone: savedData.phone,
    }));
    
    setIsEditingBasic(false);
  };

  const handleSaveSocialMedia = () => {
    const newData = {
      ...savedData,
      social: establishmentData.social,
    };
    
    setSavedData(newData);
    
    // Save all data to localStorage
    localStorage.setItem('establishmentData', JSON.stringify(newData));
    
    setIsEditingSocial(false);
    toast.success("Informações de redes sociais atualizadas com sucesso!");
  };

  const handleCancelSocialEdit = () => {
    setEstablishmentData((prev) => ({
      ...prev,
      social: savedData.social,
    }));
    
    setIsEditingSocial(false);
  };

  return {
    establishmentData,
    savedData,
    isEditingBasic,
    isEditingSocial,
    teamDialogOpen,
    setIsEditingBasic,
    setIsEditingSocial,
    setTeamDialogOpen,
    handleBasicFieldChange,
    handleScheduleChange,
    handleSocialFieldChange,
    handleImageChange,
    handleSaveBasicInfo,
    handleCancelBasicEdit,
    handleSaveSocialMedia,
    handleCancelSocialEdit,
  };
};

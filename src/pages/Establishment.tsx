
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { useEstablishment } from '@/contexts/EstablishmentContext';

import ImageUpload from '@/components/establishment/ImageUpload';
import BasicInfoForm from '@/components/establishment/BasicInfoForm';
import SocialMediaForm from '@/components/establishment/SocialMediaForm';
import TeamButton from '@/components/establishment/TeamButton';

// Estado inicial com os dados do estabelecimento
const initialEstablishmentData = {
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

const Establishment: React.FC = () => {
  // Estados para os dados do estabelecimento
  const [establishmentData, setEstablishmentData] = useState(initialEstablishmentData);
  const [savedData, setSavedData] = useState(initialEstablishmentData);
  
  // Estados para controle de edição
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  
  const { updateEstablishmentImage } = useEstablishment();

  // Efeito para inicializar a imagem do estabelecimento no contexto
  useEffect(() => {
    if (savedData.image) {
      updateEstablishmentImage(savedData.image);
    }
  }, []);

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
    setEstablishmentData((prev) => ({
      ...prev,
      image: image,
    }));

    // Salva a imagem imediatamente
    setSavedData((prev) => ({
      ...prev,
      image: image,
    }));
    
    toast.success("Imagem atualizada com sucesso!");
  };

  // Handlers para salvar ou cancelar edição
  const handleSaveBasicInfo = () => {
    setSavedData((prev) => ({
      ...prev,
      name: establishmentData.name,
      address: establishmentData.address,
      schedule: establishmentData.schedule,
      phone: establishmentData.phone,
    }));
    
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
    setSavedData((prev) => ({
      ...prev,
      social: establishmentData.social,
    }));
    
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meu Estabelecimento</h1>
      </div>

      {/* Imagem de destaque do estabelecimento */}
      <div className="mb-6">
        <ImageUpload 
          currentImage={establishmentData.image} 
          onImageChange={handleImageChange} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <BasicInfoForm
            isEditing={isEditingBasic}
            establishmentData={{
              name: establishmentData.name,
              address: establishmentData.address,
              schedule: establishmentData.schedule,
              phone: establishmentData.phone,
            }}
            onEdit={() => setIsEditingBasic(true)}
            onCancel={handleCancelBasicEdit}
            onSave={handleSaveBasicInfo}
            onFieldChange={handleBasicFieldChange}
            onScheduleChange={handleScheduleChange}
          />
        </div>
        
        <div>
          <SocialMediaForm
            isEditing={isEditingSocial}
            socialData={{
              website: establishmentData.social.website,
              instagram: establishmentData.social.instagram,
            }}
            onEdit={() => setIsEditingSocial(true)}
            onCancel={handleCancelSocialEdit}
            onSave={handleSaveSocialMedia}
            onFieldChange={(field, value) => handleSocialFieldChange(field, value)}
          />
          
          <TeamButton onClick={() => setTeamDialogOpen(true)} />
        </div>
      </div>

      {/* Dialog para a equipe */}
      <Dialog open={teamDialogOpen} onOpenChange={setTeamDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Gerenciar Equipe</DialogTitle>
            <DialogDescription>
              Adicione membros à sua equipe e defina suas especialidades e horários de trabalho.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-center text-gray-500">
              Funcionalidade de gerenciamento de equipe em desenvolvimento.
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setTeamDialogOpen(false)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Establishment;

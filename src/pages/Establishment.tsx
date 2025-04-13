
import React from 'react';
import { useEstablishmentData } from '@/hooks/useEstablishmentData';
import ImageUpload from '@/components/establishment/ImageUpload';
import BasicInfoForm from '@/components/establishment/BasicInfoForm';
import SocialMediaForm from '@/components/establishment/SocialMediaForm';
import TeamButton from '@/components/establishment/TeamButton';
import TeamDialog from '@/components/establishment/TeamDialog';

const Establishment: React.FC = () => {
  const {
    establishmentData,
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
  } = useEstablishmentData();

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
      <TeamDialog 
        open={teamDialogOpen}
        onOpenChange={setTeamDialogOpen}
      />
    </div>
  );
};

export default Establishment;

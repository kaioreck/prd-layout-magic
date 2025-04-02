
import React from 'react';
import { Globe, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SocialMediaFormProps {
  isEditing: boolean;
  socialData: {
    website: string;
    instagram: string;
  };
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onFieldChange: (field: string, value: string) => void;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({
  isEditing,
  socialData,
  onEdit,
  onCancel,
  onSave,
  onFieldChange
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center mb-4">
        <Globe className="w-6 h-6 text-trinks-orange mr-2" />
        <h2 className="text-xl font-semibold">Site e Redes Sociais</h2>
      </div>
      
      <div className="space-y-4">
        {isEditing ? (
          <>
            <div>
              <label className="text-sm font-medium text-gray-500 mb-1 block">Website</label>
              <Input
                value={socialData.website}
                onChange={(e) => onFieldChange('website', e.target.value)}
                placeholder="www.seusite.com.br"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500 mb-1 block">Instagram</label>
              <Input
                value={socialData.instagram}
                onChange={(e) => onFieldChange('instagram', e.target.value)}
                placeholder="@seuinstagram"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center">
              <Globe className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-gray-800">{socialData.website}</p>
            </div>
            
            <div className="flex items-center">
              <Instagram className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-gray-800">{socialData.instagram}</p>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-6">
        {isEditing ? (
          <div className="flex gap-2">
            <Button onClick={onSave}>Salvar</Button>
            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          </div>
        ) : (
          <Button variant="outline" onClick={onEdit}>Gerenciar Links</Button>
        )}
      </div>
    </div>
  );
};

export default SocialMediaForm;

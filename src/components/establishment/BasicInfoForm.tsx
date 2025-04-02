
import React from 'react';
import { Store, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BasicInfoFormProps {
  isEditing: boolean;
  establishmentData: {
    name: string;
    address: string;
    schedule: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    phone: string;
  };
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onFieldChange: (field: string, value: string) => void;
  onScheduleChange: (field: string, value: string) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  isEditing,
  establishmentData,
  onEdit,
  onCancel,
  onSave,
  onFieldChange,
  onScheduleChange
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Store className="w-6 h-6 text-trinks-orange mr-2" />
        <h2 className="text-xl font-semibold">Informações Básicas</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Nome do Estabelecimento</h3>
          {isEditing ? (
            <Input
              value={establishmentData.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              placeholder="Nome do seu estabelecimento"
            />
          ) : (
            <p className="text-gray-800">{establishmentData.name}</p>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Endereço</h3>
          {isEditing ? (
            <Textarea
              value={establishmentData.address}
              onChange={(e) => onFieldChange('address', e.target.value)}
              placeholder="Endereço completo"
              className="min-h-[80px]"
            />
          ) : (
            <div className="flex items-start">
              <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
              <p className="text-gray-800">{establishmentData.address}</p>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Horário de Funcionamento</h3>
          {isEditing ? (
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-500">Segunda - Sexta</label>
                <Input
                  value={establishmentData.schedule.weekdays}
                  onChange={(e) => onScheduleChange('weekdays', e.target.value)}
                  placeholder="Ex: 08:00 - 18:00"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Sábado</label>
                <Input
                  value={establishmentData.schedule.saturday}
                  onChange={(e) => onScheduleChange('saturday', e.target.value)}
                  placeholder="Ex: 08:00 - 16:00"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Domingo</label>
                <Input
                  value={establishmentData.schedule.sunday}
                  onChange={(e) => onScheduleChange('sunday', e.target.value)}
                  placeholder="Ex: Fechado"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-start">
              <Clock className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="text-gray-800">Segunda - Sexta: {establishmentData.schedule.weekdays}</p>
                <p className="text-gray-800">Sábado: {establishmentData.schedule.saturday}</p>
                <p className="text-gray-800">Domingo: {establishmentData.schedule.sunday}</p>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Contato</h3>
          {isEditing ? (
            <Input
              value={establishmentData.phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
              placeholder="(00) 00000-0000"
            />
          ) : (
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-gray-800">{establishmentData.phone}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex gap-2">
        {isEditing ? (
          <>
            <Button className="bg-trinks-orange hover:bg-trinks-orange/90" onClick={onSave}>
              Salvar Alterações
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </>
        ) : (
          <Button className="bg-trinks-orange hover:bg-trinks-orange/90" onClick={onEdit}>
            Editar Informações
          </Button>
        )}
      </div>
    </div>
  );
};

export default BasicInfoForm;

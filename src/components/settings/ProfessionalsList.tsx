
import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Trash2, Mail, Phone } from 'lucide-react';
import AddProfessionalDialog from './AddProfessionalDialog';

const ProfessionalsList: React.FC = () => {
  const { professionals, removeProfessional } = useSettings();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Equipe</h3>
        <AddProfessionalDialog />
      </div>
      
      {professionals.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-gray-50">
          <p className="text-gray-500">Nenhum profissional cadastrado</p>
          <p className="text-sm text-gray-400 mt-1">Adicione profissionais à sua equipe</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {professionals.map((professional) => (
            <div key={professional.id} className="border rounded-md p-4 bg-white flex justify-between items-center">
              <div>
                <h4 className="font-medium">{professional.name}</h4>
                <p className="text-sm text-gray-500">{professional.role}</p>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-3 h-3 mr-1" />
                    {professional.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="w-3 h-3 mr-1" />
                    {professional.email}
                  </div>
                </div>
              </div>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => removeProfessional(professional.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessionalsList;

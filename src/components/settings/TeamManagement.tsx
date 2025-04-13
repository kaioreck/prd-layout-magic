
import React from 'react';
import { Users } from 'lucide-react';
import ProfessionalsList from '@/components/settings/ProfessionalsList';

const TeamManagement: React.FC = () => {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-trinks-orange" />
        <h3 className="text-xl font-semibold">Gerenciar Equipe</h3>
      </div>
      <ProfessionalsList />
    </div>
  );
};

export default TeamManagement;

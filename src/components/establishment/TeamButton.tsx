
import React from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamButtonProps {
  onClick: () => void;
}

const TeamButton: React.FC<TeamButtonProps> = ({ onClick }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Users className="w-6 h-6 text-trinks-orange mr-2" />
        <h2 className="text-xl font-semibold">Equipe</h2>
      </div>
      
      <p className="text-gray-600 mb-4">Gerencie sua equipe e defina suas especialidades.</p>
      
      <Button className="w-full" onClick={onClick}>Ver Equipe</Button>
    </div>
  );
};

export default TeamButton;

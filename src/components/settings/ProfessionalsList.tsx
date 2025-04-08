
import React, { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Trash2, Mail, Phone, UserPlus, Briefcase, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "@/hooks/use-toast";
import { Profissional } from '@/contexts/SettingsContext';

const ProfessionalsList: React.FC = () => {
  const { profissionais, addProfissional, removeProfissional } = useSettings();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProfissional, setNewProfissional] = useState<Omit<Profissional, 'id_profissional' | 'ativo'>>({
    nome: '',
    especialidade: '',
    telefone: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProfissional(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProfessional = () => {
    if (!newProfissional.nome || !newProfissional.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e email são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    addProfissional({
      ...newProfissional,
      ativo: true
    });

    setNewProfissional({
      nome: '',
      especialidade: '',
      telefone: '',
      email: ''
    });

    setIsDialogOpen(false);
  };

  const handleRemoveProfessional = (id: string) => {
    removeProfissional(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Equipe</h3>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-trinks-orange hover:bg-trinks-orange/90"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Adicionar Profissional
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-trinks-orange" />
                Adicionar Novo Profissional
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-gray-500" />
                  Nome *
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  value={newProfissional.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="especialidade" className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-gray-500" />
                  Especialidade
                </Label>
                <Input
                  id="especialidade"
                  name="especialidade"
                  value={newProfissional.especialidade}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone" className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-gray-500" />
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  name="telefone"
                  value={newProfissional.telefone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-gray-500" />
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newProfissional.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                type="button" 
                onClick={handleAddProfessional}
                className="bg-trinks-orange hover:bg-trinks-orange/90"
              >
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {profissionais.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50 flex flex-col items-center justify-center gap-2">
          <User className="h-12 w-12 text-gray-400" />
          <p className="text-gray-500 font-medium">Nenhum profissional cadastrado</p>
          <p className="text-sm text-gray-400">Adicione profissionais à sua equipe</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {profissionais.map((profissional) => (
            <div 
              key={profissional.id_profissional} 
              className="border rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
            >
              <div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-trinks-orange" />
                  <h4 className="font-medium">{profissional.nome}</h4>
                </div>
                {profissional.especialidade && (
                  <p className="text-sm text-gray-500 ml-7 mt-1">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {profissional.especialidade}
                    </span>
                  </p>
                )}
                <div className="flex items-center gap-4 mt-2 ml-7">
                  {profissional.telefone && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="w-3 h-3 mr-1" />
                      {profissional.telefone}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="w-3 h-3 mr-1" />
                    {profissional.email}
                  </div>
                </div>
              </div>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => handleRemoveProfessional(profissional.id_profissional || '')}
                className="h-9 opacity-80 hover:opacity-100"
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

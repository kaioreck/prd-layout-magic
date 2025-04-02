
import React, { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Trash2, Mail, Phone, UserPlus } from 'lucide-react';
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
import { Professional } from '@/contexts/SettingsContext';

const ProfessionalsList: React.FC = () => {
  const { professionals, addProfessional, removeProfessional } = useSettings();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProfessional, setNewProfessional] = useState<Omit<Professional, 'id'>>({
    name: '',
    role: '',
    phone: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProfessional(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProfessional = () => {
    if (!newProfessional.name || !newProfessional.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e email são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    addProfessional({
      ...newProfessional,
      id: Date.now().toString()
    });

    setNewProfessional({
      name: '',
      role: '',
      phone: '',
      email: ''
    });

    setIsDialogOpen(false);
  };

  const handleRemoveProfessional = (id: string) => {
    removeProfessional(id);
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
              <DialogTitle>Adicionar Novo Profissional</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newProfessional.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Cargo
                </Label>
                <Input
                  id="role"
                  name="role"
                  value={newProfessional.role}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={newProfessional.phone}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newProfessional.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="button" onClick={handleAddProfessional}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                onClick={() => handleRemoveProfessional(professional.id)}
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

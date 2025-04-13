
import React, { useState, useEffect } from 'react';
import { Building2, Phone, Mail, MapPin, Clock, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from "@/hooks/use-toast";
import { Barbearia } from '@/contexts/SettingsContext';

interface ProfileFormProps {
  barbearia: Barbearia;
  updateBarbearia: (barbearia: Barbearia) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ barbearia, updateBarbearia }) => {
  // Profile form state
  const [formProfile, setFormProfile] = useState({
    nome: barbearia.nome,
    email: barbearia.email || '',
    telefone: barbearia.telefone || '',
    endereco: barbearia.endereco || '',
    horario_funcionamento: barbearia.horario_funcionamento || ''
  });

  // Update form when profile changes
  useEffect(() => {
    setFormProfile({
      nome: barbearia.nome,
      email: barbearia.email || '',
      telefone: barbearia.telefone || '',
      endereco: barbearia.endereco || '',
      horario_funcionamento: barbearia.horario_funcionamento || ''
    });
  }, [barbearia]);

  // Handle profile form input changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormProfile(prev => ({ ...prev, [id]: value }));
  };

  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBarbearia({
      ...barbearia,
      nome: formProfile.nome,
      email: formProfile.email,
      telefone: formProfile.telefone,
      endereco: formProfile.endereco,
      horario_funcionamento: formProfile.horario_funcionamento
    });
    
    toast({
      title: "Configurações salvas",
      description: "As informações do estabelecimento foram atualizadas."
    });
  };

  return (
    <Card className="border shadow-md">
      <CardHeader className="bg-gray-50 border-b rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-trinks-orange" />
          Informações do Estabelecimento
        </CardTitle>
        <CardDescription>
          Atualize as informações de contato e localização do seu estabelecimento
        </CardDescription>
      </CardHeader>
      <CardContent className="py-8">
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome" className="flex items-center gap-2 font-medium text-base">
                <Building2 className="h-4 w-4 text-gray-500" />
                Nome do estabelecimento
              </Label>
              <Input 
                id="nome"
                value={formProfile.nome} 
                onChange={handleProfileChange}
                className="h-10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefone" className="flex items-center gap-2 font-medium text-base">
                <Phone className="h-4 w-4 text-gray-500" />
                Telefone
              </Label>
              <Input 
                id="telefone"
                value={formProfile.telefone} 
                onChange={handleProfileChange}
                placeholder="(00) 00000-0000"
                className="h-10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 font-medium text-base">
                <Mail className="h-4 w-4 text-gray-500" />
                Email
              </Label>
              <Input 
                id="email"
                type="email" 
                value={formProfile.email} 
                onChange={handleProfileChange}
                className="h-10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endereco" className="flex items-center gap-2 font-medium text-base">
                <MapPin className="h-4 w-4 text-gray-500" />
                Endereço
              </Label>
              <Input 
                id="endereco"
                value={formProfile.endereco} 
                onChange={handleProfileChange}
                className="h-10"
              />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="horario_funcionamento" className="flex items-center gap-2 font-medium text-base">
                <Clock className="h-4 w-4 text-gray-500" />
                Horário de Funcionamento
              </Label>
              <Input 
                id="horario_funcionamento"
                value={formProfile.horario_funcionamento} 
                onChange={handleProfileChange}
                placeholder="Ex: Seg-Sex: 9h-19h, Sáb: 9h-17h"
                className="h-10"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="bg-trinks-orange hover:bg-trinks-orange/90 mt-6 gap-2"
          >
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;

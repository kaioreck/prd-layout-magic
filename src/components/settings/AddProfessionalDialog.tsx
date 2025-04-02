
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useSettings, Professional } from '@/contexts/SettingsContext';
import { UserPlus } from 'lucide-react';

const AddProfessionalDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { addProfessional } = useSettings();
  const [professional, setProfessional] = useState<Omit<Professional, 'id'>>({
    name: '',
    role: '',
    phone: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfessional(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!professional.name || !professional.email) {
      return;
    }
    addProfessional({
      ...professional,
      id: Date.now().toString()
    });
    setProfessional({
      name: '',
      role: '',
      phone: '',
      email: ''
    });
    setOpen(false);
  };

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        className="bg-trinks-orange hover:bg-trinks-orange/90"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Adicionar Profissional
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Profissional</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={professional.name}
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
                  value={professional.role}
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
                  value={professional.phone}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={professional.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProfessionalDialog;

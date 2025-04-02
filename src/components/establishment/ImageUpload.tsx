
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Camera } from 'lucide-react';
import { useEstablishment } from '@/contexts/EstablishmentContext';
import { toast } from 'sonner';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (image: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ currentImage, onImageChange }) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentImage);
  const [isHovering, setIsHovering] = useState(false);
  const { updateEstablishmentImage } = useEstablishment();

  useEffect(() => {
    if (currentImage) {
      setPreviewImage(currentImage);
    }
  }, [currentImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        onImageChange(result);
        updateEstablishmentImage(result);
        toast.success("Imagem e logo atualizados com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full aspect-video relative rounded-lg overflow-hidden">
      <div 
        className="w-full h-full flex items-center justify-center bg-gray-100"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {previewImage ? (
          <img 
            src={previewImage} 
            alt="Foto do estabelecimento" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-gray-500">
            <ImageIcon className="w-12 h-12 mb-2" />
            <p>Adicione uma foto do seu estabelecimento</p>
          </div>
        )}

        <div 
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${
            isHovering || !previewImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button variant="outline" className="bg-white hover:bg-white/90">
            <label className="cursor-pointer flex items-center">
              <Camera className="w-4 h-4 mr-2" />
              <span>{previewImage ? 'Alterar' : 'Adicionar'} Imagem</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;

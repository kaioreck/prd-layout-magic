
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface EstablishmentContextType {
  establishmentImage: string | undefined;
  updateEstablishmentImage: (image: string) => void;
  establishmentName: string;
  updateEstablishmentName: (name: string) => void;
}

const EstablishmentContext = createContext<EstablishmentContextType | undefined>(undefined);

export const useEstablishment = () => {
  const context = useContext(EstablishmentContext);
  if (!context) {
    throw new Error('useEstablishment must be used within an EstablishmentProvider');
  }
  return context;
};

interface EstablishmentProviderProps {
  children: ReactNode;
}

export const EstablishmentProvider: React.FC<EstablishmentProviderProps> = ({ children }) => {
  const [establishmentImage, setEstablishmentImage] = useState<string | undefined>(undefined);
  const [establishmentName, setEstablishmentName] = useState<string>('Barber.IA');

  const updateEstablishmentImage = (image: string) => {
    setEstablishmentImage(image);
    // Store in localStorage for persistence
    localStorage.setItem('establishmentImage', image);
  };

  const updateEstablishmentName = (name: string) => {
    setEstablishmentName(name);
    // Store in localStorage for persistence
    localStorage.setItem('establishmentName', name);
  };

  // Load saved data from localStorage when component mounts
  useEffect(() => {
    const savedImage = localStorage.getItem('establishmentImage');
    const savedName = localStorage.getItem('establishmentName');
    
    if (savedImage) {
      setEstablishmentImage(savedImage);
    }
    
    if (savedName) {
      setEstablishmentName(savedName);
    }
  }, []);

  return (
    <EstablishmentContext.Provider
      value={{
        establishmentImage,
        updateEstablishmentImage,
        establishmentName,
        updateEstablishmentName,
      }}
    >
      {children}
    </EstablishmentContext.Provider>
  );
};

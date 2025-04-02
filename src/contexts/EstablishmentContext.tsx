
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EstablishmentContextType {
  establishmentImage: string | undefined;
  updateEstablishmentImage: (image: string) => void;
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

  const updateEstablishmentImage = (image: string) => {
    setEstablishmentImage(image);
  };

  return (
    <EstablishmentContext.Provider
      value={{
        establishmentImage,
        updateEstablishmentImage,
      }}
    >
      {children}
    </EstablishmentContext.Provider>
  );
};

// context/TransportContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TransportData {
  name: string;
  price: string;
}

interface TransportContextType {
  transportData: TransportData;
  setTransport: (name: string, price: string) => void;
}

const TransportContext = createContext<TransportContextType | undefined>(undefined);

interface TransportProviderProps {
  children: ReactNode;
}

export function TransportProvider({ children }: TransportProviderProps) {
  const [transportData, setTransportData] = useState<TransportData>({
    name: '',
    price: '',
  });

  const setTransport = (name: string, price: string) => {
    setTransportData({ name, price });
  };

  return (
    <TransportContext.Provider value={{ transportData, setTransport }}>
      {children}
    </TransportContext.Provider>
  );
}

export const useTransport = (): TransportContextType => {
  const context = useContext(TransportContext);
  if (!context) {
    throw new Error('useTransport must be used within a TransportProvider');
  }
  return context;
};

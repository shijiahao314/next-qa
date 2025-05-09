'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type HeaderContextType = {
  header: ReactNode;
  setHeader: (header: ReactNode) => void;
  rbtn: ReactNode;
  setRbtn: (rbtn: ReactNode) => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [header, setHeader] = useState<ReactNode>(null);
  const [rbtn, setRbtn] = useState<ReactNode>(null);

  return (
    <HeaderContext.Provider value={{ header, setHeader, rbtn, setRbtn }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}

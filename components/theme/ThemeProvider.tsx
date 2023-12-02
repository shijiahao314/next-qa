'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider enableColorScheme={true} enableSystem={true} attribute="theme-mode">
      {children}
    </ThemeProvider>
  );
};

export default Provider;

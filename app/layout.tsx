'use client';

import React from 'react';

// css
import './globals.css';
// theme
import Provider from '@/components/theme/ThemeProvider';
import { SSEConnectProvider } from './utils/sseContext';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <SSEConnectProvider>{props.children}</SSEConnectProvider>
        </Provider>
      </body>
    </html>
  );
}

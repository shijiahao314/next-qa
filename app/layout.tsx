'use client';

import { HeaderProvider } from '@/components/frame/HeaderProvider';
import NavProvider from '@/components/frame/NavProvider';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className="text-sm sm:text-base">
      <head>
        <title>NextQA</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex h-[100svh] w-screen flex-col overflow-hidden border-my-border bg-my-bg text-my-text0 dark:border-my-darkborder dark:bg-my-darkbg0 dark:text-my-darktext0 sm:flex-row">
        <ThemeProvider attribute="class">
          <HeaderProvider>
            <NavProvider>{children}</NavProvider>
          </HeaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

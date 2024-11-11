'use client';

import { HeaderProvider } from '@/components/frame/HeaderProvider'; // 不再在这里调用 useHeader
import NavProvider from '@/components/frame/NavProvider';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import Hydration from '@/lib/hydration';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className="text-sm md:text-base">
      <head>
        <title>NextQA</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex h-[100svh] w-screen flex-col overflow-hidden border-my-border bg-my-bg text-my-text0 dark:border-my-darkborder dark:bg-my-darkbg0 dark:text-my-darktext0 sm:flex-row">
        {/* <Hydration></Hydration> */}
        <ThemeProvider attribute="class">
          <HeaderProvider>
            {' '}
            {/* 将 HeaderProvider 包裹在这里 */}
            <NavProvider>{children}</NavProvider>
          </HeaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

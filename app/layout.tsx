'use client';

import './globals.css';
import SideNav from '@/components/frame/sideNav';
import { useBearStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const store = useStore(useBearStore, (state) => state);
  const store = useBearStore(useShallow((state) => state));

  return (
    <html lang="en">
      <head>
        <script src="/theme.js"></script>
      </head>
      <body className="flex h-[100svh] w-screen flex-row overflow-hidden bg-my-bg text-my-text0 dark:bg-my-darkbg0 dark:text-my-darktext0">
        <div
          className={
            'absolute z-30 h-full transform border-my-border shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] transition-transform duration-[2000ms] dark:border-my-darkborder md:relative md:block md:translate-x-0 md:border-r-2 md:shadow-none ' +
            `${store.getNavOpen() ? 'translate-x-0' : '-translate-x-[100vw]'}`
          }
        >
          <SideNav></SideNav>
        </div>
        <div className="h-full w-full flex-grow md:block">{children}</div>
        <div
          className={
            'dura absolute h-full w-full bg-black transition-all duration-[2000ms] md:hidden ' +
            `${store.getNavOpen() ? 'z-20 opacity-50' : '-z-10 opacity-0'}`
          }
          onClick={() => {
            store?.setNavOpen(false);
          }}
        ></div>
      </body>
    </html>
  );
}

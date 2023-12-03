import React from 'react';

// css
import './globals.css';
// theme
import SideNav from '@/components/frame/sideNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-screen flex-row">
          <div className="w-[200px]">
            <SideNav></SideNav>
          </div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}

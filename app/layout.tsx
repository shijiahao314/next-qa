import './globals.css';
import SideNav from '@/components/frame/SideNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="/theme.js"></script>
      </head>
      <body className="z-0 flex h-[100svh] w-screen flex-row overflow-hidden bg-my-bg text-my-text0 dark:bg-my-darkbg0 dark:text-my-darktext0">
        <SideNav></SideNav>
        <div className="z-0 h-full w-full flex-grow md:block">{children}</div>
      </body>
    </html>
  );
}

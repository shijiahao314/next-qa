import './globals.css';
import SideNav from '@/components/frame/SideNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="text-sm md:text-base">
      <head>
        <script src="/theme.js"></script>
      </head>
      <body className="flex h-[100svh] w-screen flex-row overflow-hidden border-my-border bg-my-bg text-my-text0 dark:border-my-darkborder dark:bg-my-darkbg0 dark:text-my-darktext0">
        <SideNav></SideNav>
        <div className="h-full w-full">{children}</div>
      </body>
    </html>
  );
}

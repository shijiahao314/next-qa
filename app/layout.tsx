// css
import './globals.css';
// theme
import SideNav from '@/components/frame/sideNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <head>
          <script src="/theme.js"></script>
        </head>
        <body className="text-my-text0 dark:text-my-darktext0">
          <div className="flex h-screen w-screen flex-row bg-my-bg dark:bg-my-darkbg0">
            <div className="border-r-[2px] border-my-border dark:border-r-my-darkborder">
              <SideNav></SideNav>
            </div>
            <div className="w-full">{children}</div>
          </div>
        </body>
      </html>
    </>
  );
}

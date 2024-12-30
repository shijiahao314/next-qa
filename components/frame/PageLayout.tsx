export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-shrink flex-grow overflow-hidden px-4 py-4">{children}</div>
  );
}

import HistoryChat from '@/components/chat/HistoryChat';

export default function ChatPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute flex h-full w-full flex-row overflow-hidden md:relative">
      {children}
      <HistoryChat></HistoryChat>
    </div>
  );
}

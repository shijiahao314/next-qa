import HistoryChat from '@/components/chat/HistoryChat';

export default function ChatPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-row">
      {children}
      <HistoryChat></HistoryChat>
    </div>
  );
}

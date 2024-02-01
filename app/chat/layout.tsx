export default function ChatPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <title>NextQA - 开放对话</title>
      </head>
      <div className="absolute flex h-full w-full flex-row overflow-hidden md:relative">
        {children}
      </div>
    </>
  );
}

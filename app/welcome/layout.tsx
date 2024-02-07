export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <title>NextQA - 欢迎！</title>
      </head>
      {children}
    </>
  );
}

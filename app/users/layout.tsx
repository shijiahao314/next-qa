export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <title>NextQA - 用户管理</title>
      </head>
      {children}
    </>
  );
}

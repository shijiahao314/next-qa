import UserTable from '../../components/user/UserTable';

export default async function UsersPage() {
  return (
    <>
      <head>
        <title>NextQA - 用户管理</title>
      </head>
      <div className="flex h-full w-full flex-col px-10 py-10">
        <UserTable></UserTable>
      </div>
    </>
  );
}

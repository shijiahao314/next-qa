'use client';

import UserTable from '../../components/user/UserTable';

export default function UsersPage() {
  return (
    <>
      <title>Users-用户管理</title>
      <div className="flex h-full w-full flex-col px-10 py-10">
        <UserTable></UserTable>
      </div>
    </>
  );
}

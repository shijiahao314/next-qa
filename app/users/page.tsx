'use client';

import Head from 'next/head';
import UserTable from '../../components/user/UserTable';

export default function UsersPage() {
  return (
    <>
      <Head>
        <title>NextQA - 用户管理</title>
      </Head>
      <div className="flex h-full w-full flex-col px-10 py-10">
        <UserTable></UserTable>
      </div>
    </>
  );
}

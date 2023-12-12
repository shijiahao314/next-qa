'use server';

import { GetUser } from './fetchUsers';

export default async function UserTable() {
  const users = await GetUser(1, 10);

  const cellStyle =
    'table-cell items-center justify-center align-middle border-r-[1px] font-medium';
  return (
    <div className="h-full w-full">
      <table className="w-full border-2 text-center">
        <thead>
          <tr className="h-10 border-collapse border-b-2 border-solid">
            <th className={cellStyle + 'font-semibold'}>用户ID</th>
            <th className={cellStyle + 'font-semibold'}>用户名称</th>
            <th className={cellStyle + 'font-semibold'}>用户角色</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: UserInfo) => (
            <tr className="h-10 border-collapse border-[1px] border-solid " key={user.userid}>
              <th className={cellStyle}>{user.userid.toString()}</th>
              <th className={cellStyle}>{user.username}</th>
              <th className={cellStyle}>{user.role}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <div></div>
    </div>
  );
}

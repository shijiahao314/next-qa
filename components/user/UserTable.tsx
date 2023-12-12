'use client';

import { DeleteUser, GetUser } from '@/app/api/users';
import { useEffect, useState } from 'react';

export default async function UserTable() {
  const [users, setUsers] = useState<UserInfo[]>([]);

  const handleDeleteClick = async (userid: string) => {
    await DeleteUser(userid);
    GetUser(1, 10).then((data) => {
      setUsers(data);
    });
  };

  useEffect(() => {
    GetUser(1, 10).then((data) => {
      setUsers(data);
    });
  }, []);

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
            <th className={cellStyle + 'font-semibold'}>操作</th>
          </tr>
        </thead>
        <tbody>
          {users != null &&
            users.length != 0 &&
            users.map((user: UserInfo) => (
              <tr className="h-10 border-collapse border-[1px] border-solid " key={user.userid}>
                <td className={cellStyle}>{user.userid.toString()}</td>
                <td className={cellStyle}>{user.username}</td>
                <td className={cellStyle}>{user.role}</td>
                <td className={cellStyle}>
                  <button className="" onClick={() => handleDeleteClick(user.userid)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

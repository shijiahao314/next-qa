'use client';

import { fetchUsers } from './fetchUsers';
import { useState, useEffect } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const userData = await fetchUsers();
        setUsers(userData); // 设置用户数据，确保为数组形式
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    getUsers();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center px-4 py-4">
      <div className="table w-full border-2 text-center">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell items-center justify-center">用户ID</div>
            <div className="table-cell items-center justify-center">用户名称</div>
            <div className="table-cell items-center justify-center">用户角色</div>
          </div>
        </div>
        {users.length != 0 && (
          <div className="table-row-group h-10">
            {users.map((user: UserData) => (
              <div className="table-row" key={user.userid}>
                <div className="table-cell items-center justify-center">
                  {user.userid.toString()}
                </div>
                <div className="table-cell items-center justify-center">{user.username}</div>
                <div className="table-cell items-center justify-center">{user.role}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

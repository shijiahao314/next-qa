'use client';

import { GetUser } from '@/action/user';
import { useEffect, useState } from 'react';
import NewUser from './NewUser';
import { GetUserResponse, UserInfo } from '@/action/model/user';

export default function UserTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [users, setUsers] = useState<UserInfo[]>([]);

  const handleDelte = (userid: string) => {
    console.log('delete userid=' + userid);
  };

  useEffect(() => {
    GetUser(1, 10).then(([success, resp]: [boolean, GetUserResponse]) => {
      if (success) {
        setUsers(resp.data.user_infos);
      } else {
        console.log('====================================');
        console.log('GetUser failed');
        console.log(resp);
        console.log('====================================');
      }
    });
  }, []);

  const cellStyle =
    'table-cell items-center justify-center align-middle border-r-[1px] font-medium';

  return (
    <div className="relative h-full w-full flex-col">
      {isModalOpen && <NewUser isOpen={isModalOpen} onClose={closeModal}></NewUser>}
      <div className="flex w-full flex-row">
        <button
          className="h-[35px] w-[70px] rounded-md bg-my-primary text-base text-my-darktext0 hover:bg-my-primaryHover
            dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
          onClick={openModal}
        >
          新增
        </button>
      </div>
      <table className="mt-4 w-full border-2 text-center">
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
              <tr className="h-10 border-collapse border-[1px] border-solid" key={user.userid}>
                <td className={cellStyle}>{user.userid.toString()}</td>
                <td className={cellStyle}>{user.username}</td>
                <td className={cellStyle}>{user.role}</td>
                <td className={`${cellStyle} space-x-2`}>
                  <button
                    className="h-8 w-12 rounded-md bg-my-primary text-sm text-my-darktext0 hover:bg-my-primaryHover
                      dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                    // onClick={() => }
                  >
                    详情
                  </button>
                  <button
                    className="h-8 w-12 rounded-md bg-my-primary text-sm text-my-darktext0 hover:bg-my-primaryHover
                      dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                    onClick={() => handleDelte(user.userid)}
                  >
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

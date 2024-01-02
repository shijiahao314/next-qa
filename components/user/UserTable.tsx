'use client';

import { DeleteUser, GetUser } from '@/app/api/user';
import { useEffect, useState } from 'react';
import NewUser from './NewUser';

export default async function UserTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [users, setUsers] = useState<UserInfo[]>([]);

  const handleDeleteClick = async (userid: string) => {
    await DeleteUser(userid);
    GetUser(1, 10).then((data) => {
      setUsers(data);
    });
  };

  const handleDelte = (userid: string) => {
    console.log('delete userid=' + userid);
  };

  useEffect(() => {
    GetUser(1, 10).then((data) => {
      setUsers(data);
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
                    className="h-[30px] w-[50px] rounded-md bg-my-primary text-base text-my-darktext0 hover:bg-my-primaryHover
                      dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                    // onClick={() => }
                  >
                    详情
                  </button>
                  <button
                    className="h-[30px] w-[50px] rounded-md bg-my-primary text-base text-my-darktext0 hover:bg-my-primaryHover
                      dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                    onClick={() => handleDeleteClick(user.userid)}
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

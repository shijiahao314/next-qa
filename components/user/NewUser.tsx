'use client';

import { AddUser } from '@/app/api/user';
import { userInfo } from 'os';
import { use, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewUser({ isOpen, onClose }: ModalProps) {
  const [show, setShow] = useState<boolean>(false);

  const modalClasses = isOpen ? 'block' : 'hidden';

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 向服务器发送 POST 请求，将 formData 发送到服务器
      const user: User = {
        username: formData.username,
        password: formData.password,
        role: formData.role
      };
      console.log('====================================');
      console.log(user);
      console.log('====================================');
      const success = await AddUser(user);
      console.log('Server Response:', success);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      className={`absolute z-10 flex h-full w-full items-center justify-center bg-my-bg/50 dark:bg-my-darkbg0/50 ${modalClasses}`}
    >
      <div className=" w-1/2 rounded-md border-2 bg-my-bg dark:bg-my-darkbg2">
        <div className="flex h-full w-full flex-col">
          <div className="w-full border-b px-6 py-2 text-lg font-semibold">新增用户</div>
          <div className="grid h-full w-full grid-cols-2 space-y-2 px-6 py-4 text-my-text0 dark:text-my-darktext0">
            <label className="flex items-center">用户名</label>
            <input
              className="rounded-md bg-my-bg p-2 dark:bg-my-darkbg3"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="用户名..."
            ></input>
            <label className="flex items-center">密码</label>
            <input
              className="rounded-md bg-my-bg p-2 dark:bg-my-darkbg3"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="密码..."
            ></input>
            <label className="flex items-center">角色</label>
            <input
              className="rounded-md bg-my-bg p-2 dark:bg-my-darkbg3"
              name="password"
              value={formData.role}
              onChange={handleChange}
              defaultValue="user"
              placeholder="user / admin"
            ></input>
          </div>
          <div className="flex w-full flex-row justify-end space-x-2 border-t px-6 py-4">
            <button
              className="h-[35px] w-[70px] rounded-md bg-my-primary text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
              onClick={handleSubmit}
            >
              确认
            </button>
            <button
              className="h-[35px] w-[70px] rounded-md bg-my-tertiary text-white hover:bg-my-tertiaryHover dark:bg-my-darkTertiary dark:hover:bg-my-darkTertiaryHover"
              onClick={onClose}
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

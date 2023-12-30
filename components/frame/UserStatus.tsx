'use client';

import { useLocalStore } from '@/lib/store';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Login, LoginRequest, Logout, LogoutRequest } from '@/app/api/auth';

export default function UserStatus() {
  // const store = useStore(useLocalStore, (state) => state);
  const pStore = useLocalStore(useShallow((state) => state));

  // login dialog
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async () => {
    const loginRequest: LoginRequest = {
      username: formData.username,
      password: formData.password
    };
    const success = await Login(loginRequest);
    console.log('====================================');
    console.log('request: ', loginRequest);
    console.log('response:', success);
    console.log('====================================');
    if (success) {
      pStore.setUsername(loginRequest.username);
      pStore.setLogin(true);
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    const logoutRequest: LogoutRequest = {};
    const success = await Logout(logoutRequest);
    if (success) {
      pStore?.setLogin(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <div
          // suppressHydrationWarning
          className="flex h-20 w-20 items-center justify-center rounded-full bg-my-primary text-base font-medium text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
          role="button"
          onClick={
            pStore?.getLogin()
              ? () => {
                  handleLogout();
                }
              : () => {
                  setIsOpen(true);
                }
          }
        ></div>
        <div className="mt-2 w-full px-5">
          <div className="flex h-8 items-center justify-center border-b-[3px] border-my-border dark:border-my-darkborder">
            <div>{pStore?.getLogin() ? <>{pStore?.getUsername()}</> : <>未登录</>}</div>
          </div>
        </div>
      </div>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog as="div" className="relative z-40" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 flex items-center justify-center bg-black/25">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-1/3 max-w-md transform overflow-hidden rounded-lg bg-my-bg p-4 text-left align-middle text-my-text0 shadow-xl transition-all dark:bg-my-darkbg2 dark:text-my-darktext0">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                    登录
                  </Dialog.Title>
                  <div className="mt-4 flex h-full w-full flex-col space-y-2 text-my-text0 dark:text-my-darktext0">
                    <div className="grid grid-cols-4">
                      <div className="flex items-center justify-end pr-3">
                        <label>用户名</label>
                      </div>
                      <input
                        className="col-span-3 rounded-md bg-my-bg p-2 dark:bg-my-darkbg3"
                        name="username"
                        value={formData.username}
                        placeholder="用户名..."
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="grid grid-cols-4">
                      <div className="flex items-center justify-end pr-3">
                        <label>密码</label>
                      </div>
                      <input
                        className="col-span-3 rounded-md bg-my-bg p-2 dark:bg-my-darkbg3"
                        name="password"
                        value={formData.password}
                        placeholder="密码..."
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-row justify-end space-x-2">
                    <button
                      // className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      className="flex w-16 items-center justify-center rounded-lg bg-my-primary text-base font-medium text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      登录
                    </button>
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      取消
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

'use client';

import { useLocalStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from 'next/navigation';

export default function UserStatus() {
  const isLogin = useLocalStore(useShallow((state) => state.isLogin));
  const username: string = useLocalStore(useShallow((state) => state.username));

  const router = useRouter();

  return (
    <>
      <div className="mt-5 flex w-full flex-col items-center space-y-4 border-b-2 border-my-border px-2 pb-2 dark:border-my-darkborder">
        <img
          className="h-24 w-24 rounded-full border-2 border-my-primary/80 p-[1px] dark:border-my-darkPrimary"
          src="https://placehold.co/96x96.png"
        ></img>
        <div
          className="flex h-10 w-full items-center justify-center rounded-lg bg-my-primary text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
          role="button"
          onClick={
            isLogin
              ? () => {
                  console.log('====================================');
                  console.log('clicked');
                  console.log('====================================');
                  router.push('/userInfo');
                }
              : () => router.push('/login')
          }
        >
          <svg
            className="aria-hidden h-5 w-5 fill-current text-white transition group-hover:text-base-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 18"
          >
            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
          </svg>
          {/* 加了 Suspense 但是显示会闪烁 */}
          {/* <Suspense fallback={'加载中'}>
            <p>{isLogin ? username : '登录'}</p>
          </Suspense> */}
        </div>
      </div>
      {/* <Transition
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
      </Transition> */}
    </>
  );
}

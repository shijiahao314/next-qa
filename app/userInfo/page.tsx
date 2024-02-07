'use client';

import { Logout } from '@/api/auth';
import { LogoutResponse } from '@/api/model/auth';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { useBearStore } from '@/lib/store';
import { useUserStore } from '@/lib/user';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function UserInfoPage() {
  const username = useUserStore((state) => state.username);

  const setNavOpen = useBearStore((state) => state.setNavOpen);
  const setIsLogin = useBearStore((state) => state.setIgLogin);
  const router = useRouter();

  return (
    <>
      <MyToastContainer></MyToastContainer>
      <div className="flex h-full w-full flex-col">
        <div className="relative flex flex-row justify-between border-b-[1px] border-my-border px-5 py-4 shadow dark:border-my-darkborder md:hidden">
          <button
            className="h-12 w-12 place-content-center items-center rounded-lg border-[1px] border-my-border p-2 text-base font-semibold dark:border-my-darkborder dark:bg-my-darkbg1 md:hidden"
            onClick={() => {
              setNavOpen(true);
            }}
          >
            <svg viewBox="0 0 1024 1024">
              <path
                d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                fill="#999"
              />
            </svg>
          </button>
          {/* <div>
            <div className="text-center text-xl font-bold md:text-start">用户信息</div>
            <div className="text-center text-sm text-my-text1 dark:text-my-darktext1 md:text-start">
              用户信息
            </div>
          </div> */}
        </div>
        <div className="relative flex flex-shrink flex-grow flex-col overflow-auto overflow-x-hidden p-5">
          <div className="mb-5 divide-y-2 divide-solid rounded-lg border-2 border-my-border dark:border-my-darkborder">
            <div className="flex flex-row items-center justify-between border-my-border px-5 py-3 dark:border-my-darkborder">
              <div>
                <div className="text-base text-my-text0 dark:text-my-darktext0">
                  用户名: {username}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5 flex items-center justify-end divide-y-2 divide-solid rounded-lg">
            <button
              className="bg-my-danger hover:bg-my-dangerHover dark:bg-my-darkDanger dark:hover:bg-my-darkDangerHover rounded-lg border-2 border-my-border px-4 py-2 font-semibold text-white dark:border-my-darkborder"
              onClick={() => {
                Logout({}).then(([success, resp]: [boolean, LogoutResponse]) => {
                  if (success) {
                    setIsLogin(false);
                    toast.success('登出成功，即将跳转到登录页', {
                      autoClose: 2000,
                      onClose: () => {
                        router.push('/login');
                      }
                    });
                  } else {
                    toast.error(resp.msg, {
                      autoClose: 2000,
                      onClose: () => {
                        router.push('/login');
                      }
                    });
                  }
                });
              }}
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

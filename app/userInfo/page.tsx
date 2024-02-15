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
  const email = useUserStore((state) => state.email);

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
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative flex max-w-xl flex-shrink flex-grow flex-col justify-center overflow-auto overflow-x-hidden px-5 pb-20 pt-2">
            <div className="m-6 flex flex-col items-center justify-center space-y-2">
              <img
                className="h-24 w-24 rounded-full border-2 border-my-primary/80 p-[1px] dark:border-my-darkPrimary"
                src="https://placehold.co/96x96.png"
                alt="user avatar"
              ></img>
              <button className="text-my-primary hover:text-my-primaryHover dark:text-my-darkPrimary dark:hover:text-my-darkPrimaryHover">
                编辑头像
              </button>
            </div>
            <div className="mb-2 flex justify-end">
              <svg
                viewBox="0 0 1024 1024"
                width="32"
                height="32"
                role="button"
                onClick={() => {
                  console.log('====================================');
                  console.log('edit click');
                  console.log('====================================');
                }}
              >
                <path
                  d="M898.8 422.5c-16.6 0-30 13.4-30 30v383.3c0 18.3-14.9 33.2-33.2 33.2H190.9c-18.3 0-33.2-14.9-33.2-33.2V191.2c0-18.3 14.9-33.2 33.2-33.2h385.2c16.6 0 30-13.4 30-30s-13.4-30-30-30H190.9c-51.4 0-93.2 41.8-93.2 93.2v644.7c0 51.4 41.8 93.2 93.2 93.2h644.7c51.4 0 93.2-41.8 93.2-93.2V452.5c0-16.5-13.5-30-30-30z"
                  fill="#3988FF"
                  p-id="4242"
                />
                <path
                  d="M381.3 644.2c12.9 12.9 33.7 12.9 46.6 0L916 156.1c12.9-12.9 12.9-33.7 0-46.6-12.9-12.9-33.7-12.9-46.6 0L381.3 597.7c-12.8 12.8-12.8 33.7 0 46.5z"
                  fill="#3988FF"
                  p-id="4243"
                />
              </svg>
            </div>
            <div className="mb-5 table-auto rounded-lg border-2 border-my-border dark:border-my-darkborder">
              <table className="w-full table-auto">
                <tbody className="divide-y-2 divide-my-border p-2 dark:divide-my-darkborder">
                  <tr className="h-10">
                    <td className="px-2">用户名:</td>
                    <td className="px-2">
                      <div className="flex flex-row items-center justify-between">
                        <div>sjh{username}</div>
                        <button className="rounded-lg bg-my-primary px-2 text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover">
                          修改密码
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="h-10">
                    <td className="px-2">电子邮箱:</td>
                    <td className="px-2">shijiahao314@foxmail.com{email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-end">
              <button
                className="rounded-lg border-2 border-my-border bg-my-danger px-4 py-2 font-semibold text-white hover:bg-my-dangerHover dark:border-my-darkborder dark:bg-my-darkDanger dark:hover:bg-my-darkDangerHover"
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
      </div>
    </>
  );
}

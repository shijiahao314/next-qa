'use client';

import { useBearStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function UserStatus() {
  const isLogin = useBearStore((state) => state.isLogin);
  const router = useRouter();
  return (
    <>
      <div className="flex w-full flex-col items-center gap-y-4 border-b-2 border-my-border px-2 pb-2 dark:border-my-darkborder">
        <img
          className="h-24 w-24 rounded-full border-2 border-my-primary/80 p-[1px] dark:border-my-darkPrimary"
          src="https://placehold.co/96x96.png"
          alt="user avatar"
        ></img>
        <div
          className="flex h-10 w-full items-center justify-center gap-x-2 rounded-lg bg-my-primary text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
          role="button"
          onClick={
            isLogin
              ? () => {
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
          <p className="text-base">用户信息</p>
          {/* 加了 Suspense 但是显示会闪烁 */}
          {/* <Suspense fallback={'加载中'}>
            <p>{isLogin ? username : '登录'}</p>
          </Suspense> */}
        </div>
      </div>
    </>
  );
}

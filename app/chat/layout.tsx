'use client';

import { IsLogin } from '@/api/auth';
import { IsLoginResponse } from '@/api/model/auth';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { useBearStore } from '@/lib/store';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ChatPageLayout({ children }: { children: React.ReactNode }) {
  const setIsLogin = useBearStore((state) => state.setIgLogin);

  useEffect(() => {
    IsLogin({}).then(([success, resp]: [boolean, IsLoginResponse]) => {
      if (!success) {
        setIsLogin(false);
        toast.error('未登录', {
          position: 'top-center',
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
          theme: 'colored'
        });
      } else {
        setIsLogin(true);
      }
    });
  });

  return (
    <>
      <MyToastContainer></MyToastContainer>
      <div className="absolute flex h-full w-full flex-row overflow-hidden md:relative">
        {children}
      </div>
    </>
  );
}

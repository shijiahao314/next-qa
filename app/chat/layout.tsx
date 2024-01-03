'use client';

import { IsLogin } from '@/api/auth';
import { toast } from 'react-toastify';
import { IsLoginResponse } from '@/api/model/auth';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { useEffect } from 'react';

export default function ChatPageLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('====================================');
    console.log('check login');
    console.log('====================================');
    IsLogin({}).then(([success, resp]: [boolean, IsLoginResponse]) => {
      if (!success) {
        console.log('====================================');
        console.log('not login');
        console.log('====================================');
        toast.error('未登录', {
          position: 'top-center',
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
          theme: 'colored'
        });
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

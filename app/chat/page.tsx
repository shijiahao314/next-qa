'use client';

import React, { Suspense, useEffect } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatFooter from '@/components/chat/ChatFooter';
import ChatBody from '@/components/chat/ChatBody';
import HistoryChat from '@/components/chat/HistoryChat';
import ChatBodyLoading from './loading';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { IsLogin } from '@/api/auth';
import { IsLoginResponse } from '@/api/model/auth';
import { useBearStore } from '@/lib/store';
import { toast } from 'react-toastify';

export default function Page() {
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
      <div className="flex w-full flex-col border-my-border dark:border-my-darkborder md:border-r-2">
        <MyToastContainer></MyToastContainer>
        <ChatHeader></ChatHeader>
        <Suspense fallback={<ChatBodyLoading></ChatBodyLoading>}>
          <ChatBody></ChatBody>
        </Suspense>
        <ChatFooter></ChatFooter>
      </div>
      <HistoryChat></HistoryChat>
    </>
  );
}

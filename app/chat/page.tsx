'use client';

import React, { Suspense } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatFooter from '@/components/chat/ChatFooter';
import ChatBody from '@/components/chat/ChatBody';
import HistoryChat from '@/components/chat/HistoryChat';
import Loading from './loading';

export default function Page() {
  return (
    <>
      <div className="flex w-full flex-col border-my-border dark:border-my-darkborder md:border-r-2">
        <ChatHeader></ChatHeader>
        <Suspense fallback={<Loading></Loading>}>
          <ChatBody></ChatBody>
        </Suspense>
        <ChatFooter></ChatFooter>
      </div>
      <HistoryChat></HistoryChat>
    </>
  );
}

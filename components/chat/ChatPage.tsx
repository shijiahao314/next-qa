'use client';

import ChatBody from '@/components/chat/ChatBody';
import { useBearStore } from '@/lib/store';
import React, { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function ChatPage() {
  const setNavOpen = useBearStore(useShallow((state) => state.setNavOpen));
  const setHistoryOpen = useBearStore(useShallow((state) => state.setHistoryOpen));
  const chatInfo: ChatInfo = useBearStore(useShallow((state) => state.chatInfo));

  // 发送
  const [inputValue, setInputValue] = useState('');
  const onSubmit = (): void => {};

  return (
    <div className="flex w-full flex-col border-my-border dark:border-my-darkborder md:border-r-2">
      <div className="relative flex flex-row justify-between border-b-[1px] border-my-border px-5 py-4 shadow dark:border-my-darkborder md:justify-start">
        <button
          className="h-12 w-12 place-content-center items-center rounded-lg border-[1px] border-my-border text-base font-semibold dark:border-my-darkborder  dark:bg-my-darkbg1 md:hidden"
          onClick={() => {
            setNavOpen(true);
          }}
        >
          M
        </button>
        <div>
          <div className="text-center text-xl md:text-start">{chatInfo.title}</div>
          <div className="text-center text-sm md:text-start">共 {chatInfo.num} 条对话</div>
        </div>
        <button
          className="h-12 w-12 place-content-center items-center rounded-lg border-[1px] border-my-border text-base font-semibold dark:border-my-darkborder  dark:bg-my-darkbg1 md:hidden"
          onClick={() => {
            setHistoryOpen(true);
          }}
        >
          历
        </button>
      </div>
      <ChatBody></ChatBody>
      <div className="relative block border-t-2 border-my-border px-5 py-4 dark:border-my-darkborder">
        <textarea
          className="h-full w-full flex-grow resize-none break-words rounded-lg border-my-border bg-my-bg pb-2 pl-4 pr-32 pt-2 text-sm leading-normal shadow outline outline-2 outline-my-border dark:bg-my-darkbg0 dark:outline-my-darkborder"
          placeholder="Shift+Enter发送，Enter换行"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              console.log('====================================');
              console.log('enter');
              console.log('输入内容:', inputValue);
              console.log('====================================');
              setInputValue('');
            }
          }}
          rows={3}
        ></textarea>
        <button
          className="absolute bottom-8 right-10 flex h-12 w-20 place-content-center items-center rounded-lg bg-my-button0 text-sm text-my-darktext0 dark:bg-my-darkButton0 md:text-base "
          onClick={onSubmit}
        >
          发&nbsp;送
        </button>
      </div>
    </div>
  );
}

// export const MemoChatPage = React.memo(ChatPage);

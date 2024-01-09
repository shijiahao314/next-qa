'use client';

import { ChatInfo } from '@/api/model/chat';
import { useBearStore, useChatStore } from '@/lib/store';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function ChatHeader() {
  const setNavOpen = useBearStore(useShallow((state) => state.setNavOpen));
  const setHistoryOpen = useBearStore(useShallow((state) => state.setHistoryOpen));

  const chatInfos: ChatInfo[] = useChatStore(useShallow((state) => state.chatInfos));
  const selectedChatInfoID: string = useChatStore(useShallow((state) => state.selectedChatInfoID));

  return (
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
        <div className="text-center text-xl md:text-start">
          {chatInfos.find((chatInfo) => chatInfo.id == selectedChatInfoID)?.title}&nbsp;
        </div>
        <div className="text-center text-sm md:text-start">
          共&nbsp;{chatInfos.find((chatInfo) => chatInfo.id == selectedChatInfoID)?.num}&nbsp;条对话
        </div>
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
  );
}

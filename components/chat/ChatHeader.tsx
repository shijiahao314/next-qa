'use client';

import { useBearStore } from '@/lib/store';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function ChatHeader() {
  const setNavOpen = useBearStore(useShallow((state) => state.setNavOpen));
  const setHistoryOpen = useBearStore(useShallow((state) => state.setHistoryOpen));
  const chatMetaInfo = useBearStore(useShallow((state) => state.chatMetaInfo));

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
        <div className="text-center text-xl md:text-start">{chatMetaInfo.title}</div>
        <div className="text-center text-sm md:text-start">共 {chatMetaInfo.num} 条对话</div>
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

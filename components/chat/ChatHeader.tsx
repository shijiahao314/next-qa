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
        className="h-12 w-12 place-content-center items-center rounded-lg border-[1px] border-my-border p-2 text-base font-semibold dark:border-my-darkborder  dark:bg-my-darkbg1 md:hidden"
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
      <div>
        <div className="cursor-pointer text-center text-xl decoration-my-primary decoration-2 hover:underline dark:decoration-my-darkPrimary md:text-start">
          {chatInfos.find((chatInfo) => chatInfo.id == selectedChatInfoID)?.title}&nbsp;
        </div>
        <div className="text-center text-sm md:text-start">
          共&nbsp;{chatInfos.find((chatInfo) => chatInfo.id == selectedChatInfoID)?.num}&nbsp;条对话
        </div>
      </div>
      <button
        className="h-12 w-12 place-content-center items-center rounded-lg border-[1px] border-my-border p-2 text-base font-semibold dark:border-my-darkborder  dark:bg-my-darkbg1 md:hidden"
        onClick={() => {
          setHistoryOpen(true);
        }}
      >
        <svg viewBox="0 0 1024 1024" className="p-[0.2rem]" fill="#999">
          <path d="M706.64485625 824.42174346l45.40866592 68.11255986A448.6084418 448.6084418 0 0 1 511.5901792 961.99949903C263.14988838 961.99949903 62 760.39961152 62 511.99974951S263.14988838 62 511.54974951 62c248.84986114 0 450.4488706 201.5998875 450.4488706 449.99974951 0 6.87304336-0.16435547 13.66346865-0.45 20.45389482h-81.94038398c0.4078125-6.79042617 0.57216797-13.58173037 0.57216797-20.45389482 0-203.27683974-165.02686084-368.1824124-368.63065459-368.1824124C308.43638633 143.81733711 143.81733711 308.68248008 143.81733711 511.99974951s164.61904922 368.18065459 367.7324124 368.18065459c71.63081982 0 138.51818438-20.45477373 195.13465752-55.75866064z" />
          <path d="M532.45364434 307.45464893h-61.36344229v245.45376914l214.77292735 128.86340449 30.6817207-50.31735469-184.09120577-109.2277705zM798.363067 511.99974951h245.45289023L921.08907266 675.63618154z" />
        </svg>
      </button>
    </div>
  );
}

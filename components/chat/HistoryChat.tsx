'use client';

import { GetChatInfos } from '@/app/api/chat';
import { useEffect, useState } from 'react';
import { useBearStore, useLocalStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';

export default function HistoryChat() {
  const selectedChatID = useBearStore(useShallow((state) => state.selectedChatID));

  const getSelectedChatID = useBearStore(useShallow((state) => state.getSelectedChatID));
  const setSelectedChatID = useBearStore(useShallow((state) => state.setSelectedChatID));
  const setChatTitle = useBearStore(useShallow((state) => state.setChatTitle));
  const setChatInfo = useBearStore(useShallow((state) => state.setChatInfo));

  const [chatInfos, setChatInfos] = useState<ChatInfo[]>([]);
  useEffect(() => {
    GetChatInfos('1').then((data) => {
      setChatInfos(data);
      if (data != null) {
        if (data.length != 0) {
          setSelectedChatID(data[0].id);
          setChatTitle(data[0].title);
          setChatInfo(data[0]);
        }
      }
    });
  }, []);

  const historyOpen = useBearStore(useShallow((state) => state.historyOpen));
  const setHistoryOpen = useBearStore(useShallow((state) => state.setHistoryOpen));

  const baseStyle =
    'w-full border-2 shadow-md cursor-pointer resize-none space-y-3 rounded-lg bg-my-bg hover:bg-my-bgHover px-[14px] py-[10px] font-sans dark:bg-my-darkbg2 dark:hover:bg-my-darkbg3 ';
  const selectedStyle = 'border-my-primary dark:border-my-darkPrimary';
  const unSelectedStyle = 'border-my-bg hover:border-my-bgHover dark:border-my-darkbg2';
  // right-full
  return (
    <>
      <div
        className={
          'absolute right-0 z-30 flex h-full transform border-my-border bg-my-bg transition-transform duration-300 dark:border-r-my-darkborder dark:bg-my-darkbg1 md:relative md:z-0 md:translate-x-0 ' +
          `${historyOpen ? 'translate-x-0' : 'translate-x-full'}`
        }
      >
        <div className="flex w-60 flex-col">
          <div className="relative flex h-20 w-full flex-shrink-0 flex-grow-0 items-center justify-center border-b-[1px] bg-my-bg text-lg shadow dark:border-my-darkborder dark:bg-my-darkbg1">
            对话历史
          </div>
          <div className="flex flex-shrink flex-grow flex-col overflow-y-auto overflow-x-hidden ">
            <div className="space-y-3 px-4 py-5">
              {chatInfos != null &&
                chatInfos.length != 0 &&
                chatInfos.map((chatInfo: ChatInfo) => (
                  <div
                    className={`${baseStyle} + ${
                      selectedChatID === chatInfo.id ? selectedStyle : unSelectedStyle
                    }`}
                    key={chatInfo.id}
                    role="button"
                    onClick={() => {
                      console.log('====================================');
                      console.log(chatInfo);
                      console.log('====================================');
                      setSelectedChatID(chatInfo.id);
                      setChatTitle(chatInfo.title);
                      setChatInfo(chatInfo);
                    }}
                  >
                    <div className="text-sm font-semibold">{chatInfo.title}</div>
                    <div className="flex flex-row justify-between text-xs text-my-text1 dark:text-my-darktext1">
                      <div>{chatInfo.num} 条对话</div>
                      <div>{String(chatInfo.utime)}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          'absolute z-20 h-screen w-screen bg-black/50 md:hidden ' +
          `${historyOpen ? 'block' : 'hidden'}`
        }
        onClick={() => {
          setHistoryOpen(false);
        }}
      ></div>
    </>
  );
}

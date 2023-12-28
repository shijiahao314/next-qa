'use client';

import { GetChatInfos } from '@/app/api/chat';
import { useEffect, useState } from 'react';
import { useBearStore, useLocalStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';

export default function HistoryChat() {
  const setChatTitle = useBearStore(useShallow((state) => state.setChatTitle));
  const setChatInfo = useBearStore(useShallow((state) => state.setChatInfo));

  const [selectedId, setSelectedId] = useState<string>('');
  const [chatInfos, setChatInfos] = useState<ChatInfo[]>([]);
  useEffect(() => {
    GetChatInfos('1').then((data) => {
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      setChatInfos(data);
      if (data != null) {
        if (data.length != 0) {
          setSelectedId(data[0].id);
          setChatTitle(data[0].title);
          setChatInfo(data[0]);
        }
      }
    });
  }, []);

  const historyOpen = useBearStore(useShallow((state) => state.historyOpen));
  const setHistoryOpen = useBearStore(useShallow((state) => state.setHistoryOpen));

  const baseStyle =
    'w-full shadow-md cursor-pointer resize-none space-y-3 rounded-lg bg-my-bg hover:bg-my-bgHover px-[14px] py-[10px] font-sans  dark:bg-my-darkbg2 dark:hover:bg-my-darkbg3';
  const selectedStyle = 'border-2 border-my-primary dark:border-my-darkPrimary';
  // const unSelectedStyle = 'border-my-border dark:border-my-darkborder';

  return (
    <>
      <div
        className={
          'absolute right-0 z-30 h-full transform border-my-border shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] transition-transform duration-300 dark:border-my-darkborder md:relative md:block md:translate-x-0 md:border-r-2 md:shadow-none ' +
          `${historyOpen ? 'translate-x-0' : 'translate-x-full'}`
        }
      >
        <div className="h-full border-my-border dark:border-my-darkborder">
          <div className="sticky top-0 flex h-20 w-full items-center justify-center border-b-[1px] bg-my-bg text-lg shadow dark:border-my-darkborder dark:bg-my-darkbg1">
            对话历史
          </div>
          <div className="flex h-full w-64 flex-col items-center space-y-[10px] overflow-y-auto bg-my-bg p-[20px] px-3 py-4 text-my-text0 dark:bg-my-darkbg1 dark:text-my-darktext0">
            {chatInfos != null &&
              chatInfos.length != 0 &&
              chatInfos.map((chatInfo: ChatInfo) => (
                <div
                  className={`${baseStyle} + ${selectedId === chatInfo.id ? selectedStyle : null}`}
                  key={chatInfo.id}
                  role="button"
                  onClick={() => {
                    setSelectedId(chatInfo.id);
                    setChatTitle(chatInfo.title);
                    setChatInfo(chatInfo);
                  }}
                >
                  <div className="font-sans text-[16px] font-bold">{chatInfo.title}</div>
                  <div className="flex flex-row justify-between text-[12px] text-my-text1 dark:text-my-darktext1">
                    <div>{chatInfo.num} 条对话</div>
                    <div>{String(chatInfo.utime)}</div>
                  </div>
                </div>
              ))}
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

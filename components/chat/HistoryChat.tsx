'use client';

import React, { useEffect, useState } from 'react';
import { useBearStore, useLocalStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';
import { GetChatInfos } from '@/api/chat';
import { ChatInfo, GetChatInfosResponse } from '@/api/model/chat';
import Notification from '../frame/Notification';
import { toast } from 'react-toastify';

export default async function HistoryChat() {
  const historyOpen = useBearStore(useShallow((state) => state.historyOpen));
  const setHistoryOpen = useBearStore(useShallow((state) => state.setHistoryOpen));
  const selectedChatID = useBearStore(useShallow((state) => state.selectedChatID));
  const setSelectedChatID = useBearStore(useShallow((state) => state.setSelectedChatID));
  const setChatMetaInfo = useBearStore(useShallow((state) => state.setChatMetaInfo));
  const currentChatID = useLocalStore(useShallow((state) => state.currentChatID));
  const setCurrentChatID = useLocalStore(useShallow((state) => state.setCurrentChatID));

  const [chatInfos, setChatInfos] = useState<ChatInfo[]>([]);

  useEffect(() => {
    GetChatInfos().then(([success, resp]: [boolean, GetChatInfosResponse]) => {
      console.log('====================================');
      console.log(resp);
      console.log('====================================');
      if (success) {
        const data = resp.data.chat_infos;
        if (data != null) {
          if (data.length != 0) {
            setChatInfos(data);
            for (let index = 0; index < data.length; index++) {
              if (data[index].id == currentChatID) {
                setSelectedChatID(data[index].id);
                setChatMetaInfo(data[index]);
              }
            }
          }
        }
      } else if (resp.code == '106') {
        toast.error('未登录');
      }
    });
  }, []);

  return (
    <>
      <Notification></Notification>
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
          <div className="flex flex-shrink flex-grow flex-col overflow-y-auto overflow-x-hidden">
            <div className="space-y-3 px-4 py-5">
              {chatInfos != null &&
                chatInfos.length != 0 &&
                chatInfos.map((chatInfo: ChatInfo) => (
                  <div
                    className={
                      'w-full cursor-pointer resize-none space-y-3 rounded-lg border-2 bg-my-bg px-3 py-3 font-sans shadow-md hover:bg-my-bgHover dark:bg-my-darkbg2 dark:hover:bg-my-darkbg3 ' +
                      `${
                        selectedChatID === chatInfo.id
                          ? 'border-my-primary dark:border-my-darkPrimary'
                          : 'border-my-bg hover:border-my-bgHover dark:border-my-darkbg2'
                      }`
                    }
                    key={chatInfo.id}
                    role="button"
                    onClick={() => {
                      setHistoryOpen(false);
                      setSelectedChatID(chatInfo.id);
                      setCurrentChatID(chatInfo.id);
                      setChatMetaInfo({
                        title: chatInfo.title,
                        num: chatInfo.num
                      });
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

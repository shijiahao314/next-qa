'use client';

import React, { useEffect, useState } from 'react';
import { useBearStore } from '@/lib/store';
import { GetChatInfos } from '@/api/chat';
import { ChatInfo, GetChatInfosResponse } from '@/api/model/chat';
import 'react-toastify/dist/ReactToastify.css';

export default function HistoryChat() {
  const historyOpen = useBearStore((state) => state.historyOpen);
  const setHistoryOpen = useBearStore((state) => state.setHistoryOpen);
  const selectedChatID = useBearStore((state) => state.selectedChatID);
  const setSelectedChatID = useBearStore((state) => state.setSelectedChatID);
  const setChatMetaInfo = useBearStore((state) => state.setChatMetaInfo);
  // chatInfos
  const [chatInfos, setChatInfos] = useState<ChatInfo[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const [success, resp]: [boolean, GetChatInfosResponse] = await GetChatInfos({});
      const data = resp.data.chat_infos;
      if (success) {
        setChatInfos(data);
        if (data.length > 0) {
          setSelectedChatID(data[0].id);
          setChatMetaInfo(data[0]);
        }
      }
    };
    fetchData();
  }, []);

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
          <div className="flex flex-shrink flex-grow flex-col overflow-y-auto overflow-x-hidden">
            <div className="space-y-3 px-4 py-5">
              {chatInfos != null &&
                chatInfos.length != 0 &&
                chatInfos.map((chatInfo: ChatInfo) => (
                  <div
                    className={
                      'w-full  resize-none space-y-3 rounded-lg border-2 bg-my-bg px-3 py-3 font-sans shadow-md hover:bg-my-bgHover dark:bg-my-darkbg2 dark:hover:bg-my-darkbg3 ' +
                      `${
                        selectedChatID === chatInfo.id
                          ? 'cursor-default border-my-primary dark:border-my-darkPrimary'
                          : 'cursor-pointer border-my-bg hover:border-my-bgHover dark:border-my-darkbg2'
                      }`
                    }
                    key={chatInfo.id}
                    onClick={() => {
                      if (selectedChatID != chatInfo.id) {
                        setHistoryOpen(false);
                        setSelectedChatID(chatInfo.id);
                        setChatMetaInfo({
                          title: chatInfo.title,
                          num: chatInfo.num
                        });
                      }
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

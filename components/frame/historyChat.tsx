'use client';

import { GetChatInfos } from '@/app/api/chat';
import { GetCurrentUser } from '@/app/api/user';
import { useEffect, useState } from 'react';
import ChatCard from './chatCard';

export default function HistoryChat() {
  const [selectedId, setSelectedId] = useState<string>('');
  const [chatInfos, setChatInfos] = useState<ChatInfo[]>([]);
  useEffect(() => {
    GetChatInfos('1').then((data) => {
      setChatInfos(data);
    });
  }, []);

  const baseStyle =
    'w-full cursor-pointer resize-none space-y-[10px] rounded-[10px] border-[3px]  bg-my-bg hover:bg-my-bgHover px-[14px] py-[10px] font-sans  dark:bg-my-darkbg2 dark:hover:bg-my-darkbg3';
  const selectedStyle = 'border-my-primary dark:border-my-darkPrimary';
  const unSelectedStyle = 'border-my-border dark:border-my-darkborder';

  return (
    <div className="flex h-full w-[250px] flex-col items-center space-y-[10px] overflow-y-auto bg-my-bg p-[20px] px-3 py-4 text-my-text0 dark:bg-my-darkbg1 dark:text-my-darktext0">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="43"
        height="44"
        fill="none"
      >
        <path
          fill="rgb(139, 202, 224);"
          fillRule="evenodd"
          opacity="0.27"
          d="M40.17 17.84c.36-1.11.55-2.27.55-3.43 0-1.93-.51-3.83-1.49-5.49a10.98 10.98 0 0 0-9.52-5.51c-.77 0-1.55.08-2.3.24A10.868 10.868 0 0 0 19.29 0h-.1c-4.76 0-8.98 3.07-10.45 7.6-3.06.63-5.71 2.55-7.26 5.27a10.993 10.993 0 0 0 1.35 12.87c-.36 1.11-.55 2.27-.55 3.43 0 1.93.51 3.83 1.49 5.49a10.97 10.97 0 0 0 11.82 5.27c2.06 2.32 5.02 3.65 8.12 3.65h.1c4.76 0 8.99-3.07 10.45-7.61a10.82 10.82 0 0 0 7.26-5.26 10.995 10.995 0 0 0-1.35-12.87ZM18.817 38.695c-.09.05-.17.1-.26.15a8.145 8.145 0 0 0 5.22 1.89h.01c4.5-.01 8.15-3.67 8.16-8.17v-10.13a.153.153 0 0 0-.07-.1l-3.67-2.12v12.24c0 .51-.27.98-.72 1.23l-8.67 5.01Zm-1.424-2.472 8.77-5.06c.04-.03.06-.07.06-.11h-.01v-4.24l-10.59 6.12c-.44.25-.98.25-1.42 0l-8.68-5.01c-.08-.05-.2-.12-.26-.16a8.19 8.19 0 0 0 .97 5.47 8.18 8.18 0 0 0 7.08 4.08c1.43 0 2.84-.37 4.08-1.09Zm-9.187-25.21v-.3c-1.79.66-3.3 1.93-4.25 3.58a8.226 8.226 0 0 0-1.09 4.08c0 2.92 1.55 5.61 4.08 7.07l8.77 5.07c.04.02.09.02.12-.01l3.67-2.12-10.59-6.11c-.44-.25-.71-.72-.71-1.23v-10.03Zm27.849 7.117-8.77-5.07a.126.126 0 0 0-.12.01l-3.67 2.12 10.59 6.12c.44.25.71.71.71 1.22v10.33a8.168 8.168 0 0 0 5.35-7.66 8.16 8.16 0 0 0-4.09-7.07Zm-19.22-5.718a.16.16 0 0 0-.05.11v4.24l10.59-6.12c.22-.12.47-.19.72-.19s.49.07.71.19l8.68 5.02c.08.05.17.1.25.15.08-.46.12-.92.12-1.38 0-4.51-3.66-8.17-8.17-8.17-1.43 0-2.83.38-4.08 1.09l-8.77 5.06ZM19.22 2.85c-4.51 0-8.17 3.65-8.17 8.16v10.13c.01.05.03.08.07.1l3.67 2.12.01-12.23v-.01c0-.5.27-.97.71-1.22l8.68-5.01c.07-.05.19-.11.25-.15a8.145 8.145 0 0 0-5.22-1.89ZM16.783 24.51l4.72 2.73 4.72-2.73v-5.45l-4.72-2.72-4.72 2.73v5.44Z"
          // style="fill: "
        ></path>
      </svg> */}
      <div className="flex h-10 w-full items-center justify-center border-b-2 text-lg">
        <label>对话历史</label>
      </div>
      {chatInfos != null &&
        chatInfos.length != 0 &&
        chatInfos.map((chatInfo: ChatInfo) => (
          <div
            className={`${baseStyle} + ${
              selectedId === chatInfo.id ? selectedStyle : unSelectedStyle
            }`}
            key={chatInfo.id}
            role="button"
            onClick={() => {
              setSelectedId(chatInfo.id);
            }}
          >
            <div className=" font-sans text-[16px] font-bold">{chatInfo.title}</div>
            <div className="flex flex-row justify-between text-[12px] text-my-text1 dark:text-my-darktext1">
              <div>{chatInfo.num} 条对话</div>
              <div>{String(chatInfo.utime)}</div>
            </div>
          </div>
        ))}
    </div>
  );
}

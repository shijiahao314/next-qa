'use client';

import { ChatInfo, FormattedTime } from '@/action/model/chat';
import { useChatStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function HistoryChat({ onClose }: { onClose: () => void }) {
  const selectedChatInfoID = useChatStore((state) => state.selectedChatInfoID);
  const setSelectedChatInfoID = useChatStore((state) => state.setSelectedChatInfoID);
  const chatInfos = useChatStore((state) => state.chatInfos);
  const setChatInfos = useChatStore((state) => state.setChatInfos);

  // useEffect only runs on the client, so now we can safely show the UI
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="flex h-full w-full flex-col overflow-y-auto">
        <div className="flex flex-col overflow-y-auto overflow-x-hidden">
          <div className="space-y-3 px-4 py-5">
            {/* 新的聊天 */}
            <div
              className="group flex w-full cursor-pointer resize-none flex-row items-center justify-center rounded-lg border border-my-border px-3 py-3 shadow-sm  hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg2 dark:hover:bg-my-darkbg3"
              onClick={() => {
                const nowTime: Date = new Date();
                const newChatInfo: ChatInfo = {
                  id: nowTime.getTime().toString(),
                  title: '新的聊天',
                  num: 0,
                  ctime: nowTime,
                  utime: nowTime
                };
                console.log('====================================');
                console.log('新的聊天');
                console.log(newChatInfo);
                console.log('====================================');
                let index = 0;
                for (let i = 0; i < chatInfos.length; i++) {
                  if (chatInfos[i].utime < nowTime) {
                    index = i;
                    break;
                  }
                }
                chatInfos.splice(index, 0, newChatInfo);
                setChatInfos(chatInfos);
                setSelectedChatInfoID(newChatInfo.id);
              }}
            >
              <div className="h-8 w-8">
                <svg viewBox="0 0 1024 1024">
                  <path
                    d="M963.072 446.336c0-211.744-200.96-384-448-384s-448 172.256-448 384c0 116.48 63.008 226.048 172.896 300.672 14.656 9.984 34.528 6.144 44.448-8.512 9.952-14.624 6.112-34.528-8.512-44.448-92.032-62.496-144.832-152.768-144.832-247.712 0-176.448 172.256-320 384-320 211.744 0 384 143.552 384 320 0 176.448-172.256 320-384 320-1.984 0-3.68 0.768-5.568 1.12-15.104-2.688-30.464 5.216-35.776 20.192-6.144 17.376-46.368 46.656-94.144 73.792 17.472-58.208 9.088-70.688 3.52-78.976-6.72-9.984-17.92-15.936-29.92-15.936-17.664 0-32 14.304-32 32 0 5.824 1.536 11.264 4.256 15.936-3.232 18.24-17.216 60.864-33.088 99.872-4.928 12.096-1.984 25.984 7.36 35.072 6.112 5.888 14.112 8.992 22.272 8.992 4.384 0 8.8-0.896 12.992-2.752 36.48-16.256 147.68-69.12 187.616-125.664C766.144 826.496 963.072 655.904 963.072 446.336z"
                    fill="#5E6570"
                  />
                  <path
                    d="M342.624 604.544c4.672 2.4 9.664 3.52 14.592 3.52 11.616 0 22.816-6.336 28.512-17.408l71.584-139.488 91.584 142.208c5.824 9.024 15.744 14.528 26.464 14.688 0.16 0 0.32 0 0.448 0 10.56 0 20.48-5.216 26.432-13.984l128.8-188.864c9.984-14.624 6.176-34.528-8.416-44.48-14.624-9.952-34.528-6.208-44.48 8.416l-101.632 148.992-95.456-148.288c-6.176-9.6-17.152-14.752-28.48-14.656-11.424 0.576-21.696 7.2-26.912 17.344l-96.896 188.896C320.672 577.184 326.88 596.48 342.624 604.544z"
                    fill="#5E6570"
                  />
                </svg>
              </div>
              <div className="px-3 font-medium">新的聊天</div>
            </div>
            {chatInfos.map((chatInfo: ChatInfo) => (
              // chatInfo.id === selectedChatInfoID ?<></> :<></>
              <div
                className={
                  'group w-full cursor-default resize-none space-y-3 rounded-lg border-2 bg-my-bg px-3 py-3 font-sans shadow-md hover:bg-my-bgHover dark:bg-my-darkbg2 dark:hover:bg-my-darkbg3 ' +
                  `${
                    chatInfo.id === selectedChatInfoID
                      ? 'border-my-primary dark:border-my-darkPrimary'
                      : 'border-my-bg hover:border-my-bgHover dark:border-my-darkbg2'
                  }`
                }
                key={chatInfo.id}
                onClick={(e) => {
                  if (chatInfo.id !== selectedChatInfoID) {
                    console.log('====================================');
                    console.log('选择对话');
                    console.log(chatInfo);
                    console.log('====================================');
                    setSelectedChatInfoID(chatInfo.id);
                    onClose();
                  }
                }}
              >
                <div className="flex flex-row items-center justify-between">
                  <div className="text-sm font-semibold">{chatInfo.title}</div>
                  {/* 删除对话 */}
                  <div
                    className="block h-4 w-4 cursor-pointer text-sm text-white group-hover:block sm:hidden"
                    onClick={(e) => {
                      e.stopPropagation(); // 阻止事件冒泡
                      // 删除所选对话
                      console.log('====================================');
                      console.log('删除对话');
                      console.log(chatInfo);
                      console.log('====================================');
                      // When using React, you should never mutate the state directly.
                      // If an object(or Array, which is an object too) is changed, you should create a new copy.
                      var index = chatInfos.indexOf(chatInfo);
                      if (index !== -1) {
                        chatInfos.splice(index, 1);
                        setChatInfos(chatInfos);
                      }
                      if (chatInfo.id === selectedChatInfoID) {
                        // 删除的为所选对象
                        if (chatInfos.length > 0) {
                          setSelectedChatInfoID(chatInfos[0].id);
                        } else {
                          setSelectedChatInfoID('');
                        }
                      }
                    }}
                  >
                    <svg viewBox="0 0 1024 1024">
                      <path
                        d="M562.688 510.976l321.408-321.408a36.672 36.672 0 0 0-51.84-51.84l-321.28 321.28L189.568 137.6a36.672 36.672 0 0 0-51.84 51.84l321.28 321.536-321.408 321.28a36.672 36.672 0 0 0 51.84 51.84l321.536-321.408 321.408 321.472a36.672 36.672 0 0 0 51.84-51.84z"
                        fill="red"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-row justify-between text-xs text-my-text1 dark:text-my-darktext1">
                  <div>{chatInfo.num} 条对话</div>
                  <div>{FormattedTime(chatInfo.utime)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

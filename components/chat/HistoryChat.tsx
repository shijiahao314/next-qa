'use client';

import React, { useEffect, useState } from 'react';
import { useBearStore, useChatStore } from '@/lib/store';
import { AddChatInfo, DeleteChatInfo, GetChatInfos } from '@/action/chat';
import {
  AddChatInfoResponse,
  ChatInfo,
  DeleteChatInfoResponse,
  FormattedTime,
  GetChatInfosResponse
} from '@/action/model/chat';
import 'react-toastify/dist/ReactToastify.css';

export default function HistoryChat() {
  const historyOpen = useBearStore((state) => state.historyOpen);
  const setHistoryOpen = useBearStore((state) => state.setHistoryOpen);

  const chatInfos = useChatStore((state) => state.chatInfos);
  const getChatInfos = useChatStore((state) => state.getChatInfos);
  const setChatInfos = useChatStore((state) => state.setChatInfos);
  const selectedChatInfoID: string = useChatStore((state) => state.selectedChatInfoID);
  const setSelectedChatInfoID = useChatStore((state) => state.setSelectedChatInfoID);

  useEffect(() => {
    GetChatInfos({}).then(([success, resp]: [boolean, GetChatInfosResponse]) => {
      if (success) {
        const data = resp.data.chat_infos;
        if (data.length > 0) {
          setChatInfos(data);
          setSelectedChatInfoID(data[0].id);
        }
      }
    });
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
              <div
                className="group flex w-full cursor-pointer resize-none flex-row items-center justify-center rounded-lg border-2 border-my-bg bg-my-bg px-3 py-3 font-sans shadow-md hover:border-my-bgHover hover:bg-my-bgHover dark:border-my-darkbg2 dark:bg-my-darkbg2 dark:hover:bg-my-darkbg3"
                onClick={(e) => {
                  setHistoryOpen(false);
                  AddChatInfo({
                    title: '新的聊天'
                  }).then(([success, resp]: [boolean, AddChatInfoResponse]) => {
                    if (success) {
                      setChatInfos([resp.data.chat_info, ...chatInfos]);
                      setSelectedChatInfoID(resp.data.chat_info.id);
                    }
                  });
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
                <div className="px-3 text-lg font-medium">新的聊天</div>
              </div>
              {chatInfos != null &&
                chatInfos.length != 0 &&
                chatInfos.map((chatInfo: ChatInfo) => (
                  <div
                    className={
                      'group w-full cursor-default resize-none space-y-3 rounded-lg border-2 bg-my-bg px-3 py-3 font-sans shadow-md hover:bg-my-bgHover dark:bg-my-darkbg2 dark:hover:bg-my-darkbg3 ' +
                      `${
                        selectedChatInfoID === chatInfo.id
                          ? 'border-my-primary dark:border-my-darkPrimary'
                          : 'border-my-bg hover:border-my-bgHover dark:border-my-darkbg2'
                      }`
                    }
                    key={chatInfo.id}
                    onClick={(e) => {
                      if (selectedChatInfoID != chatInfo.id) {
                        setHistoryOpen(false);
                        setSelectedChatInfoID(chatInfo.id);
                      }
                    }}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <div className="text-sm font-semibold">{chatInfo.title}</div>
                      <div
                        className="hidden h-4 w-4 cursor-pointer text-sm text-white group-hover:block"
                        onClick={(e) => {
                          e.stopPropagation();
                          DeleteChatInfo(chatInfo.id, {}).then(
                            ([success, resp]: [boolean, DeleteChatInfoResponse]) => {
                              if (success) {
                                setChatInfos(chatInfos.filter((item) => item.id !== chatInfo.id));
                                if (chatInfo.id === selectedChatInfoID && chatInfos.length > 0) {
                                  // 必须使用 get 获取最新值，若使用 chatInfos[0].id 则会获取旧值
                                  setSelectedChatInfoID(getChatInfos()[0].id);
                                }
                              }
                            }
                          );
                        }}
                      >
                        <svg viewBox="0 0 1024 1024">
                          <path
                            d="M562.688 510.976l321.408-321.408a36.672 36.672 0 0 0-51.84-51.84l-321.28 321.28L189.568 137.6a36.672 36.672 0 0 0-51.84 51.84l321.28 321.536-321.408 321.28a36.672 36.672 0 0 0 51.84 51.84l321.536-321.408 321.408 321.472a36.672 36.672 0 0 0 51.84-51.84z"
                            fill="red"
                          />
                        </svg>
                        {/* <svg
                          className="mx-1 hidden cursor-pointer group-hover:block"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14.663"
                          height="14.663"
                          fill="none"
                        >
                          <g>
                            <path d="M7.337.667c-3.69 0-6.67 2.98-6.67 6.67a6.66 6.66 0 0 0 6.67 6.66c3.68 0 6.66-2.98 6.66-6.66a6.66 6.66 0 0 0-6.66-6.67Z"></path>
                            <path
                              fill="#aaa"
                              d="m10.138 5.471-4.667 4.667q-.046.046-.1.083-.055.036-.116.062-.06.025-.125.038-.064.012-.13.012t-.13-.012q-.064-.013-.125-.038-.06-.026-.115-.062-.055-.037-.101-.083-.047-.046-.083-.101-.037-.055-.062-.115-.025-.06-.038-.125-.013-.065-.013-.13 0-.066.013-.13.013-.065.038-.125.025-.061.062-.116.036-.054.083-.1l4.666-4.667q.047-.047.101-.083.055-.037.116-.062.06-.025.125-.038.064-.013.13-.013.065 0 .13.013.064.013.125.038.06.025.115.062.055.036.101.083.046.046.083.1.036.055.062.116.025.06.038.125.012.064.012.13t-.012.13q-.013.064-.038.125-.026.06-.062.115-.037.055-.083.101ZM5.471 4.53l.667.666q.046.047.083.101.036.055.062.116.025.06.038.125.012.064.012.13 0 .065-.012.13-.013.064-.038.125-.026.06-.062.115-.036.055-.083.101-.046.046-.1.083-.056.036-.116.062-.06.025-.125.038-.065.012-.13.012-.066 0-.13-.012-.065-.013-.125-.038-.061-.026-.116-.062-.054-.036-.1-.083l-.667-.667q-.047-.046-.083-.1-.037-.055-.062-.116-.025-.06-.038-.125-.013-.064-.013-.13t.013-.13q.013-.064.038-.125.025-.06.062-.115.036-.055.083-.101.046-.047.1-.083.055-.037.116-.062.06-.025.125-.038.064-.013.13-.013t.13.013q.064.013.125.038.06.025.115.062.055.036.101.083Zm4 4 .667.666q.046.047.083.101.036.055.062.116.025.06.038.125.012.064.012.13 0 .065-.012.13-.013.064-.038.125-.026.06-.062.115-.036.055-.083.101-.046.046-.1.083-.056.036-.116.062-.06.025-.125.038-.065.012-.13.012-.066 0-.13-.012-.065-.013-.125-.038-.061-.026-.116-.062-.054-.036-.1-.083l-.667-.667q-.047-.046-.083-.1-.037-.055-.062-.116-.025-.06-.038-.125-.013-.064-.013-.13t.013-.13q.013-.064.038-.125.025-.06.062-.115.036-.055.083-.101.046-.047.1-.083.055-.037.116-.062.06-.025.125-.038.064-.013.13-.013t.13.013q.064.013.125.038.06.025.115.062.055.036.101.083Zm3.859-1.192q0-2.491-1.755-4.248-1.754-1.756-4.238-1.756-2.492 0-4.248 1.756-1.756 1.756-1.756 4.248 0 2.484 1.756 4.238 1.757 1.755 4.248 1.755 2.484 0 4.238-1.755 1.755-1.754 1.755-4.238Zm1.333 0q0 3.036-2.145 5.181t-5.181 2.145q-3.043 0-5.19-2.145Q0 10.374 0 7.337q0-3.044 2.147-5.19Q4.293 0 7.337 0q3.037 0 5.181 2.147 2.145 2.147 2.145 5.19ZM10.332 5q0 .066-.013.13t-.038.125q-.025.06-.061.114-.037.055-.083.101-.046.047-.1.083-.055.036-.116.061-.06.025-.125.038-.064.013-.13.013-.065 0-.13-.013-.063-.013-.124-.038-.06-.025-.115-.061-.054-.036-.1-.083-.047-.046-.083-.1-.037-.055-.062-.115-.025-.061-.038-.125-.012-.064-.012-.13 0-.065.012-.13.013-.064.038-.124.025-.061.062-.115.036-.055.082-.101.047-.047.101-.083.055-.036.115-.061.06-.025.125-.038.064-.013.13-.013.065 0 .13.013.064.013.124.038t.115.061q.055.036.1.083.047.046.084.1.036.055.061.116.025.06.038.124.013.065.013.13ZM5.665 9.667q0 .065-.013.13-.013.064-.038.124t-.061.115q-.036.055-.083.1-.046.047-.1.084-.055.036-.116.061-.06.025-.124.038-.064.013-.13.013-.065 0-.13-.013-.064-.013-.124-.038-.061-.025-.115-.061-.055-.037-.101-.083-.047-.046-.083-.1-.036-.055-.061-.116-.025-.06-.038-.125-.013-.064-.013-.13 0-.065.013-.13.013-.063.038-.124.025-.06.061-.115.036-.054.083-.1.046-.047.1-.083.055-.037.116-.062.06-.025.124-.038.065-.012.13-.012.066 0 .13.012.064.013.124.038.061.025.115.062.055.036.101.082.047.047.083.101.036.055.061.115.025.06.038.125.013.064.013.13Zm0-4.667q0 .066-.013.13t-.038.125q-.025.06-.061.114-.036.055-.083.101-.046.047-.1.083-.055.036-.116.061-.06.025-.124.038-.064.013-.13.013-.065 0-.13-.013-.064-.013-.124-.038-.061-.025-.115-.061-.055-.036-.101-.083-.047-.046-.083-.1-.036-.055-.061-.115-.025-.061-.038-.125-.013-.064-.013-.13 0-.065.013-.13.013-.064.038-.124.025-.061.061-.115.036-.055.083-.101.046-.047.1-.083.055-.036.116-.061.06-.025.124-.038.065-.013.13-.013.066 0 .13.013t.124.038q.061.025.115.061.055.036.101.083.047.046.083.1.036.055.061.116.025.06.038.124.013.065.013.13Zm.667.667q0 .065-.013.13-.013.064-.038.124t-.061.115q-.037.055-.083.1-.046.047-.1.084-.055.036-.116.061-.06.025-.125.038-.064.013-.13.013-.065 0-.13-.013-.063-.013-.124-.038-.06-.025-.115-.061-.054-.037-.1-.083-.047-.046-.083-.1-.037-.055-.062-.116-.025-.06-.038-.125-.012-.064-.012-.13 0-.065.012-.13.013-.063.038-.124.025-.06.062-.115.036-.054.082-.1.047-.047.101-.083.055-.037.115-.062.06-.025.125-.038.064-.012.13-.012.065 0 .13.012.064.013.124.038t.115.062q.055.036.1.082.047.047.084.101.036.055.061.115.025.06.038.125.013.064.013.13ZM9.665 9q0 .066-.013.13t-.038.125q-.025.06-.061.114-.036.055-.083.101-.046.047-.1.083-.055.036-.116.061-.06.025-.124.038-.064.013-.13.013-.065 0-.13-.013-.064-.013-.124-.038-.061-.025-.115-.061-.055-.036-.101-.083-.047-.046-.083-.1-.036-.055-.061-.115-.025-.061-.038-.125-.013-.064-.013-.13 0-.065.013-.13.013-.064.038-.124.025-.061.061-.115.036-.055.083-.101.046-.047.1-.083.055-.036.116-.061.06-.025.124-.038.065-.013.13-.013.066 0 .13.013t.124.038q.061.025.115.061.055.036.101.083.047.046.083.1.036.055.061.116.025.06.038.124.013.065.013.13Zm.667.667q0 .065-.013.13-.013.064-.038.124t-.061.115q-.037.055-.083.1-.046.047-.1.084-.055.036-.116.061-.06.025-.125.038-.064.013-.13.013-.065 0-.13-.013-.063-.013-.124-.038-.06-.025-.115-.061-.054-.037-.1-.083-.047-.046-.083-.1-.037-.055-.062-.116-.025-.06-.038-.125-.012-.064-.012-.13 0-.065.012-.13.013-.063.038-.124.025-.06.062-.115.036-.054.082-.1.047-.047.101-.083.055-.037.115-.062.06-.025.125-.038.064-.012.13-.012.065 0 .13.012.064.013.124.038t.115.062q.055.036.1.082.047.047.084.101.036.055.061.115.025.06.038.125.013.064.013.13Z"
                            ></path>
                          </g>
                        </svg> */}
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

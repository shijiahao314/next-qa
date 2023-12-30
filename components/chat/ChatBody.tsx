'use client';

import { GetChatCards } from '@/app/api/chat';
import ChatCard from './ChatCard';
import React, { useMemo } from 'react';
import { useBearStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';

export default async function ChatBody() {
  const selectedChatID = useBearStore(useShallow((state) => state.selectedChatID));

  const chatCards = await useMemo(async () => {
    // 避免首次渲染请求服务端操作
    if (selectedChatID === '') {
      return [];
    }
    const data = await GetChatCards(selectedChatID);
    return data;
  }, [selectedChatID]);

  return (
    <div className="flex-shrink flex-grow flex-col overflow-y-auto overflow-x-hidden px-5 py-4">
      {chatCards != null && chatCards.length > 0 ? (
        chatCards.map((chatCard: ChatCard) =>
          chatCard.role === 'user' ? (
            <div className="flex flex-row-reverse">
              <ChatCard role="user" content={chatCard.content}></ChatCard>
            </div>
          ) : (
            <div className="flex">
              <ChatCard role="assistant" content={chatCard.content}></ChatCard>
            </div>
          )
        )
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-10 w-40 items-center justify-center rounded-lg border-2 border-my-border dark:border-my-darkborder dark:bg-my-darkbg2">
            <div>暂无对话</div>
          </div>
        </div>
      )}

      {/* {tmpChatContent != '' && (
          <div className="flex flex-row-reverse">
            <ChatCard role="user" content={tmpChatContent}></ChatCard>
          </div>
        )} */}
    </div>
  );
}

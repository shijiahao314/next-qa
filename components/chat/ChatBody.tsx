'use client';

import { GetChatCards } from '@/api/chat';
import ChatContent from './ChatCard';
import { useBearStore } from '@/lib/store';
import { ChatCard } from '@/api/model/chat';
import { useEffect, useMemo, useState } from 'react';

// 如果需要loading，则改为async
export default function ChatBody() {
  const selectedChatID = useBearStore((state) => state.selectedChatID);

  const [chatCards, setChatCards] = useState<ChatCard[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const [success, resp] = await GetChatCards({ chat_info_id: selectedChatID });
      if (success) {
        setChatCards(resp.data.chat_cards);
      }
    };
    if (selectedChatID != '') {
      fetchData();
    }
  }, [selectedChatID]);

  // const chatCards = await useMemo(async () => {
  //   if (selectedChatID != '') {
  //     const [success, resp] = await GetChatCards({ chat_info_id: selectedChatID });
  //     return resp.data.chat_cards;
  //   }
  //   return [];
  // }, []);

  return (
    <div className="flex-shrink flex-grow flex-col overflow-y-auto overflow-x-hidden px-5 py-4">
      {chatCards != null && chatCards.length > 0 ? (
        chatCards.map((chatCard: ChatCard) =>
          chatCard.role === 'user' ? (
            <div className="flex flex-row-reverse" key={chatCard.id}>
              <ChatContent role="user" content={chatCard.content}></ChatContent>
            </div>
          ) : (
            <div className="flex flex-row" key={chatCard.id}>
              <ChatContent role="assistant" content={chatCard.content}></ChatContent>
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

'use client';

import { GetChatCards } from '@/app/api/chat';
import ChatCard from './ChatCard';
import { useEffect, useState } from 'react';

import React from 'react';
import { useBearStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';

export default async function ChatBody() {
  const selectedChatID = useBearStore(useShallow((state) => state.selectedChatID));
  const [chatCards, setChatCards] = useState<ChatCard[]>([]);

  useEffect(() => {
    GetChatCards(selectedChatID).then((data) => {
      setChatCards(data);
    });
  }, [selectedChatID]);

  console.log('chat body render, chatCards=', chatCards);

  return (
    <div className="flex-shrink flex-grow flex-col overflow-y-auto overflow-x-hidden">
      <div className="px-5 py-4">
        {chatCards != null &&
          chatCards.length > 0 &&
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
          )}

        {/* {tmpChatContent != '' && (
          <div className="flex flex-row-reverse">
            <ChatCard role="user" content={tmpChatContent}></ChatCard>
          </div>
        )} */}
      </div>
    </div>
  );
}

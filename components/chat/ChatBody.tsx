'use client';

import { GetChatCards } from '@/app/api/chat';
import ChatCard from '../frame/chatCard';
import { useEffect, useState } from 'react';

import React from 'react';

export default async function ChatBody() {
  const [chatCards, setChatCards] = useState<ChatCard[]>([]);

  useEffect(() => {
    GetChatCards('7').then((data) => {
      setChatCards(data);
    });
  }, []);

  return (
    <div className="flex-shrink flex-grow flex-col overflow-y-auto overflow-x-hidden">
      <div className="px-5">
        {chatCards != null &&
          chatCards.length > 0 &&
          chatCards.map((chatCard: ChatCard) =>
            chatCard.role === 'user' ? (
              <div className="flex flex-row-reverse">
                <ChatCard>{chatCard.content}</ChatCard>
              </div>
            ) : (
              <div className="flex">
                <ChatCard>{chatCard.content}</ChatCard>
              </div>
            )
          )}
      </div>
    </div>
  );
}

'use client';

import { GetChatCards } from '@/app/api/chat';
import ChatCard from '../frame/chatCard';
import { useEffect, useState } from 'react';

export default async function ChatBody() {
  const [chatCards, setChatCards] = useState<ChatCard[]>([]);

  useEffect(() => {
    GetChatCards('7').then((data) => {
      setChatCards(data);
    });
  }, []);

  return (
    <div className="relative block flex-shrink flex-grow flex-col justify-end overflow-auto overflow-x-hidden p-[20px]">
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
  );
}

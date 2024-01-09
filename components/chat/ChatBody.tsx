'use client';

import ChatContent from './ChatCard';
import { useChatStore } from '@/lib/store';
import { ChatCard } from '@/api/model/chat';
import { useEffect, useRef } from 'react';
import TmpChatCard from './TmpChatCard';
import { time } from 'console';

// 如果需要loading，则改为async
export default function ChatBody() {
  const chatCards: ChatCard[] = useChatStore((state) => state.chatCards);
  const tmpChatContent: string = useChatStore((state) => state.tmpChatContent);

  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatCards]);

  return (
    <div
      ref={chatBodyRef}
      className="flex flex-shrink flex-grow flex-col overflow-y-auto overflow-x-hidden px-5 py-4"
    >
      {chatCards != null && chatCards.length > 0 ? (
        chatCards.map((chatCard: ChatCard) =>
          chatCard.role === 'user' ? (
            <ChatContent key={chatCard.id} chatCard={chatCard}></ChatContent>
          ) : (
            <ChatContent key={chatCard.id} chatCard={chatCard}></ChatContent>
          )
        )
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-10 w-40 items-center justify-center rounded-lg border-2 border-my-border dark:border-my-darkborder dark:bg-my-darkbg2">
            <div>暂无对话</div>
          </div>
        </div>
      )}
      {tmpChatContent != '' && (
        <>
          <TmpChatCard role="user" content={tmpChatContent} utime={new Date()}></TmpChatCard>
          <TmpChatCard role="system" content={tmpChatContent} utime={new Date()}></TmpChatCard>
        </>
      )}
    </div>
  );
}

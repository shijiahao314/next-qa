'use client';

import { ChatCard, ChatRole } from '@/action/model/chat';
import { useChatStore } from '@/lib/store/chatStore';
import { useTmpChatStore } from '@/lib/store/tmpChatStore';
import { useEffect, useRef, useState } from 'react';
import ChatContent from './ChatCard';
import TmpChatCard from './TmpChatCard';

// 如果需要loading，则改为async
export default function ChatBody() {
  const selectedChatInfoID = useChatStore((state) => state.selectedChatInfoID);
  const getChatCards = useChatStore((state) => state.getChatCards);
  const [curChatCards, setCurChatCards] = useState<ChatCard[]>([]);

  const tmpChatContent: string = useTmpChatStore((state) => state.tmpChatContent);
  const tmpCompletionContent: string = useTmpChatStore((state) => state.tmpCompletionContent);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedChatInfoID) {
      const chatCards = getChatCards(selectedChatInfoID);
      setCurChatCards(chatCards);
    }
  }, [selectedChatInfoID, getChatCards]);

  useEffect(() => {
    if (!chatBodyRef.current) {
      return;
    }
    const end = chatBodyRef.current.scrollHeight - chatBodyRef.current.offsetHeight;
    chatBodyRef.current.scrollTop = end;
  }, [tmpChatContent, curChatCards]);

  return (
    <div
      ref={chatBodyRef}
      className="flex shrink grow flex-col overflow-x-hidden overflow-y-auto px-5 py-4"
    >
      {curChatCards != null ? (
        curChatCards.map((chatCard: ChatCard) =>
          chatCard.role === 'user' ? (
            <ChatContent key={chatCard.id} chatCard={chatCard}></ChatContent>
          ) : (
            <ChatContent key={chatCard.id} chatCard={chatCard}></ChatContent>
          )
        )
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="border0 dark:bg-my-dark-bg2 flex h-10 w-40 items-center justify-center rounded-lg border-2">
            <div>暂无对话</div>
          </div>
        </div>
      )}
      {tmpCompletionContent != '' && (
        <TmpChatCard
          role={ChatRole.ASSISTANT}
          content={tmpCompletionContent}
          utime={new Date()}
        ></TmpChatCard>
      )}
      {tmpChatContent != '' && (
        <TmpChatCard role={ChatRole.USER} content={tmpChatContent} utime={new Date()}></TmpChatCard>
      )}
    </div>
  );
}

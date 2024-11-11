'use client';

import { ChatCard, ChatRole } from '@/action/model/chat';
import { useChatStore } from '@/lib/store';
import { useEffect, useRef } from 'react';
import ChatContent from './ChatCard';
import TmpChatCard from './TmpChatCard';
import useStore from '@/lib/useStore';

// 如果需要loading，则改为async
export default function ChatBody() {
  const getChatCards = useChatStore((state) => state.getChatCards);
  const selectedChatInfoID = useChatStore((state) => state.selectedChatInfoID);
  const tmpCompletionContent: string = useChatStore((state) => state.tmpCompletionContent);
  const tmpChatContent: string = useChatStore((state) => state.tmpChatContent);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [selectedChatInfoID, tmpCompletionContent, tmpChatContent]);

  return (
    <div
      ref={chatBodyRef}
      className="flex flex-shrink flex-grow flex-col overflow-y-auto overflow-x-hidden px-5 py-4"
    >
      {getChatCards() != null && getChatCards().length > 0 ? (
        getChatCards().map((chatCard: ChatCard) =>
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

'use client';

import { ChatCard, ChatRole } from '@/action/model/chat';
import { useChatStore, useTmpChatStat } from '@/lib/store';
import { useEffect, useRef, useState } from 'react';
import ChatContent from './ChatCard';
import TmpChatCard from './TmpChatCard';

// 如果需要loading，则改为async
export default function ChatBody() {
  const chatMap = useChatStore((state) => state.chatMap);
  const selectedChatInfoID = useChatStore((state) => state.selectedChatInfoID);
  const getChatsCard = useChatStore((state) => state.getChatsCard);
  const [curChatCards, setCurChatCards] = useState<ChatCard[]>([]);

  const tmpChatContent: string = useTmpChatStat((state) => state.tmpChatContent);
  const tmpCompletionContent: string = useTmpChatStat((state) => state.tmpCompletionContent);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMap && selectedChatInfoID) {
      const chatCards = getChatsCard(selectedChatInfoID);
      setCurChatCards(chatCards);
    }
  }, [chatMap, selectedChatInfoID, getChatsCard]);

  useEffect(() => {
    if (!chatBodyRef.current) {
      return;
    }
    // const start = chatBodyRef.current.scrollTop;
    const end = chatBodyRef.current.scrollHeight - chatBodyRef.current.offsetHeight;
    //     const smoothScrollToBottom = (start: number, end: number) => {
    //       if (chatBodyRef.current && !isScrolling) {
    //         setIsScrolling(true);
    //         const distance = end - start;
    //         const duration = 100; // 动画持续时间，单位为毫秒
    //         let startTime: number | null = null;
    //
    //         const step = (timestamp: number) => {
    //           if (!startTime) startTime = timestamp;
    //           const progress = timestamp - startTime;
    //           const progressRatio = Math.min(progress / duration, 1); // 确保不会超过1
    //           chatBodyRef.current!.scrollTop = start + distance * progressRatio;
    //
    //           if (progress < duration) {
    //             window.requestAnimationFrame(step);
    //           } else {
    //             setIsScrolling(false);
    //           }
    //         };
    //
    //         window.requestAnimationFrame(step);
    //       }
    //     };
    chatBodyRef.current.scrollTop = end;
  }, [tmpChatContent, curChatCards]);

  return (
    <div
      ref={chatBodyRef}
      className="flex flex-shrink flex-grow flex-col overflow-y-auto overflow-x-hidden px-5 py-4"
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

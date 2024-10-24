'use client';

import { GetChatCards } from '@/action/chat';
import { GetChatCardsResponse } from '@/action/model/chat';
import ChatBody from '@/components/chat/ChatBody';
import ChatFooter from '@/components/chat/ChatFooter';
import ChatHeader from '@/components/chat/ChatHeader';
import HistoryChat from '@/components/chat/HistoryChat';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { useChatStore } from '@/lib/store';
import { Suspense, useEffect } from 'react';
import ChatBodyLoading from './loading';

export default function Page() {
  const selectedChatInfoID: string = useChatStore((state) => state.selectedChatInfoID);
  const setChatCards = useChatStore((state) => state.setChatCards);

  // load chat cards
  useEffect(() => {
    if (selectedChatInfoID != '') {
      GetChatCards(selectedChatInfoID).then(([success, resp]: [boolean, GetChatCardsResponse]) => {
        if (success) {
          setChatCards(resp.data.chat_cards);
        }
      });
    }
  }, [selectedChatInfoID, setChatCards]);

  return (
    <>
      <div className="absolute flex h-full w-full flex-row overflow-hidden md:relative">
        <div className="flex w-full flex-col border-my-border dark:border-my-darkborder md:border-r-2">
          <MyToastContainer></MyToastContainer>
          <ChatHeader></ChatHeader>
          <Suspense fallback={<ChatBodyLoading></ChatBodyLoading>}>
            <ChatBody></ChatBody>
          </Suspense>
          <ChatFooter></ChatFooter>
        </div>
        <HistoryChat></HistoryChat>
      </div>
    </>
  );
}

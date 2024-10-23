'use client';

import React, { Suspense, useEffect } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatFooter from '@/components/chat/ChatFooter';
import ChatBody from '@/components/chat/ChatBody';
import HistoryChat from '@/components/chat/HistoryChat';
import ChatBodyLoading from './loading';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { useChatStore } from '@/lib/store';
import { toast } from 'react-toastify';
import { GetChatCardsResponse } from '@/action/model/chat';
import { GetChatCards } from '@/action/chat';

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
  }, [selectedChatInfoID]);

  return (
    <>
      <head>
        <title>NextQA - 开放对话</title>
      </head>
      <div className="absolute w-full h-full flex flex-row overflow-hidden md:relative">
        <div className="w-full flex flex-col border-my-border dark:border-my-darkborder md:border-r-2">
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

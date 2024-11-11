'use client';

import ChatBody from '@/components/chat/ChatBody';
import ChatFooter from '@/components/chat/ChatFooter';
import ChatHeader from '@/components/chat/ChatHeader';
import HistoryChat from '@/components/chat/HistoryChat';
import { useHeader } from '@/components/frame/HeaderContent';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { useChatStore } from '@/lib/store';
import { Suspense, useEffect } from 'react';
import ChatBodyLoading from './loading';

export default function Page() {
  const selectedChatInfoID: string = useChatStore((state) => state.selectedChatInfoID);
  const setChatCards = useChatStore((state) => state.setChatCards);
  const { setHeader } = useHeader();

  useEffect(() => {
    // 设置 header 内容
    setHeader(<ChatHeader></ChatHeader>);
  }, [setHeader]);

  // load chat cards
  useEffect(() => {
    if (selectedChatInfoID != '') {
      // GetChatCards(selectedChatInfoID).then(([success, resp]: [boolean, GetChatCardsResponse]) => {
      //   if (success) {
      //     setChatCards(resp.data.chat_cards);
      //   }
      // });
    }
  }, [selectedChatInfoID, setChatCards]);

  return (
    <>
      <title>Chat-开放对话</title>
      <div className="flex h-full w-full flex-row overflow-hidden md:relative">
        <div className="flex w-full flex-col border-my-border dark:border-my-darkborder md:border-r-2">
          <MyToastContainer></MyToastContainer>

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

'use client';

import React, { Suspense, useEffect, useState } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatFooter from '@/components/chat/ChatFooter';
import ChatBody from '@/components/chat/ChatBody';
import HistoryChat from '@/components/chat/HistoryChat';
import ChatBodyLoading from './loading';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { IsLogin } from '@/api/auth';
import { IsLoginResponse } from '@/api/model/auth';
import { useBearStore, useChatStore } from '@/lib/store';
import { toast } from 'react-toastify';
import {
  ChatCard,
  ChatCardDTO,
  DeleteChatCardResponse,
  GetChatCardsResponse,
  WSChatReceiveMessage,
  WSChatSendMessage
} from '@/api/model/chat';
import { GetChatCards } from '@/api/chat';

export default function Page() {
  const setIsLogin = useBearStore((state) => state.setIgLogin);

  const selectedChatInfoID: string = useChatStore((state) => state.selectedChatInfoID);
  const setChatCards = useChatStore((state) => state.setChatCards);

  // check login
  useEffect(() => {
    console.log('====================================');
    console.log('check isLogin');
    console.log('====================================');
    IsLogin({}).then(([success, resp]: [boolean, IsLoginResponse]) => {
      if (!success) {
        setIsLogin(false);
        toast.error('未登录', {
          position: 'top-center',
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
          theme: 'colored'
        });
      } else {
        setIsLogin(true);
      }
    });
  }, []);

  // load chat cards
  useEffect(() => {
    if (selectedChatInfoID != '') {
      GetChatCards({
        chat_info_id: selectedChatInfoID
      }).then(([success, resp]: [boolean, GetChatCardsResponse]) => {
        if (success) {
          setChatCards(resp.data.chat_cards);
        }
      });
    }
  }, [selectedChatInfoID]);

  return (
    <>
      <div className="flex w-full flex-col border-my-border dark:border-my-darkborder md:border-r-2">
        <MyToastContainer></MyToastContainer>
        <ChatHeader></ChatHeader>
        <Suspense fallback={<ChatBodyLoading></ChatBodyLoading>}>
          <ChatBody></ChatBody>
        </Suspense>
        <ChatFooter></ChatFooter>
      </div>
      <HistoryChat></HistoryChat>
    </>
  );
}

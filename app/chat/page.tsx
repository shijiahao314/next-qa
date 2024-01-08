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
  AddChatCardResponse,
  ChatCard,
  ChatCardDTO,
  DeleteChatCardResponse,
  GetChatCardsResponse,
  WSChatReceiveMessage,
  WSChatSendMessage
} from '@/api/model/chat';
import { AddChatCard, DeleteChatCard, GetChatCards, UpdateChatCard } from '@/api/chat';

export default function Page() {
  const setIsLogin = useBearStore((state) => state.setIgLogin);

  const selectedChatInfoID: string = useChatStore((state) => state.selectedChatInfoID);
  const chatCards: ChatCard[] = useChatStore((state) => state.chatCards);
  const setChatCards = useChatStore((state) => state.setChatCards);

  // check login
  useEffect(() => {
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
  });

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
  // const onDeleteChatCard = (chatCardId: string) => {
  //   DeleteChatCard(chatCardId, {}).then(([success, resp]: [boolean, DeleteChatCardResponse]) => {
  //     if (success) {
  //       setChatCards(chatCards.filter((chatCard) => chatCard.id != chatCardId));
  //     }
  //   });
  // };
  // const handleUpdateChatCard = (chatCard: ChatCard) => {
  //   UpdateChatCard(chatCard).then(([success, resp]: [boolean, DeleteChatCardResponse]) => {
  //     if (success) {
  //       setChatCards(chatCards.map((item) => (item.id == chatCard.id ? chatCard : item)));
  //     }
  //   });
  // };
  // const handleSendChatCard = (chatCard: ChatCardDTO) => {
  //   AddChatCard(chatCard).then(([success, resp]: [boolean, AddChatCardResponse]) => {
  //     if (success) {
  //       setChatCards([...chatCards, resp.chatCard]);
  //     }
  //   });
  // };

  // const [ws, setWS] = useState<WebSocket>(new WebSocket('ws://10.112.188.168:8080/api/chat/ws'));
  // useEffect(() => {
  //   const newWs = new WebSocket('ws://10.112.188.168:8080/api/chat/ws');
  //   newWs.onerror = (err) => console.error(err);
  //   newWs.onopen = () => {
  //     // reset chatCards
  //     setChatCards([]);
  //     // init send
  //     const initSend: WSChatSendMessage = {
  //       type: 4,
  //       chat_id: '',
  //       content: '',
  //       chat_info_id: getSelectedChatID()
  //     };
  //     console.log('====================================');
  //     console.log('initSend:', initSend);
  //     console.log('====================================');
  //     ws.send(JSON.stringify(initSend));
  //     toast.success('连接成功');
  //   };
  //   newWs.onmessage = (msg: MessageEvent) => {
  //     const reply: WSChatReceiveMessage = JSON.parse(msg.data);
  //     console.log('====================================');
  //     console.log('receive reply:', reply);
  //     console.log('====================================');
  //     const chatCard: ChatCard = reply.data;
  //     setChatCards((chatCards) => [...chatCards, chatCard]);
  //   };
  //   newWs.onclose = () => {
  //     console.log('====================================');
  //     console.log('websocket close');
  //     console.log('====================================');
  //     toast.info('连接关闭');
  //   };
  //   setWS(newWs);
  // }, [selectedChatID]);

  // const handleSend = (msg: Message) => {
  //   if (ws.readyState === 1) {
  //     console.log('====================================');
  //     console.log('send msg:', msg);
  //     console.log('====================================');
  //     ws.send(JSON.stringify(msg));
  //   }
  // };

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

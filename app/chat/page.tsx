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
import { useBearStore } from '@/lib/store';
import { toast } from 'react-toastify';
import { ChatCard, WSChatReceiveMessage, WSChatSendMessage } from '@/api/model/chat';

export default function Page() {
  const setIsLogin = useBearStore((state) => state.setIgLogin);
  const selectedChatID = useBearStore((state) => state.selectedChatID);
  const getSelectedChatID = useBearStore((state) => state.getSelectedChatID);
  const [chatCards, setChatCards] = useState<ChatCard[]>([]);

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

  const [ws, setWS] = useState<WebSocket>(new WebSocket('ws://10.112.188.168:8080/api/chat/ws'));
  useEffect(() => {
    const newWs = new WebSocket('ws://10.112.188.168:8080/api/chat/ws');
    newWs.onerror = (err) => console.error(err);
    newWs.onopen = () => {
      setChatCards([]);
      const initSend: WSChatSendMessage = {
        type: 1,
        chat_info_id: getSelectedChatID(),
        content: ''
      };
      console.log('====================================');
      console.log('initSend:', initSend);
      console.log('====================================');
      ws.send(JSON.stringify(initSend));
    };
    newWs.onmessage = (msg: MessageEvent) => {
      const chatCard: ChatCard = JSON.parse(msg.data);
      setChatCards((chatCards) => [...chatCards, chatCard]);
      // chatCards.push(chatCard);
      console.log('====================================');
      console.log('chatCards:', chatCards);
      console.log('====================================');
    };
    newWs.onclose = () => {
      console.log('====================================');
      console.log('websocket close');
      console.log('====================================');
    };
    setWS(newWs);
  }, [selectedChatID]);

  interface Message {
    content: string;
  }

  const handleSend = (msg: Message) => {
    if (ws.readyState === 1) {
      console.log('====================================');
      console.log('send msg:', msg);
      console.log('====================================');
      ws.send(JSON.stringify(msg));
    }
  };

  return (
    <>
      <div className="flex w-full flex-col border-my-border dark:border-my-darkborder md:border-r-2">
        <MyToastContainer></MyToastContainer>
        <ChatHeader></ChatHeader>
        <Suspense fallback={<ChatBodyLoading></ChatBodyLoading>}>
          <ChatBody chatCards={chatCards}></ChatBody>
        </Suspense>
        <ChatFooter handleSend={handleSend}></ChatFooter>
      </div>
      <HistoryChat></HistoryChat>
    </>
  );
}

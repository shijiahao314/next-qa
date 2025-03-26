'use client';

import ChatBody from '@/components/chat/ChatBody';
import ChatFooter from '@/components/chat/ChatFooter';
import ChatHeader from '@/components/chat/ChatHeader';
import HistoryChat from '@/components/chat/HistoryChat';
import { useHeader } from '@/components/frame/HeaderProvider';
import Mask from '@/components/frame/Mask';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { useEffect, useState } from 'react';

export default function Page() {
  const { setHeader, setRbtn } = useHeader();
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    // 设置 header 内容
    setHeader(<ChatHeader></ChatHeader>);
    setRbtn(
      <button
        className="border0 dark:bg-my-dark-bg2 h-12 w-12 place-content-center items-center rounded-lg border p-2 text-base font-semibold sm:hidden"
        onClick={() => {
          setHistoryOpen(true);
        }}
      >
        <svg viewBox="0 0 1024 1024">
          <path
            d="M640.37558 431.263467a40.117532 40.117532 0 0 1-27.079334-10.029383L413.711525 241.708129a40.117532 40.117532 0 0 1 1.002939-60.176297L614.299185 10.029383a40.195761 40.195761 0 1 1 52.152791 61.179236L501.970096 212.622919l165.484818 148.434867a40.117532 40.117532 0 0 1-27.079334 70.205681z"
            fill="#999"
          ></path>
          <path
            d="M542.087627 1024h-26.076395A445.304603 445.304603 0 0 1 70.706628 578.695397a406.19001 406.19001 0 0 1 122.358472-290.852106l13.038198-13.038198a40.145614 40.145614 0 1 1 53.15573 60.176298l-11.032321 10.029383a324.952008 324.952008 0 0 0-98.287953 233.684623c0 201.590597 163.478942 365.06954 365.069539 365.069539h26.076396c182.53477 0 330.969638-148.434868 330.969638-330.969637 0-198.581783-161.473066-361.057786-361.057787-361.057787h-33.096964a40.117532 40.117532 0 0 1 0-80.235063h34.099902a440.289912 440.289912 0 0 1 441.292851 441.29285 411.204701 411.204701 0 0 1-411.204702 411.204701z"
            fill="#999"
          ></path>
          <path
            d="M657.425531 684.003918H482.914268a40.117532 40.117532 0 0 1-40.117532-40.117532V403.181195a40.117532 40.117532 0 1 1 80.235064 0v200.587659h134.393731a40.117532 40.117532 0 0 1 0 80.235064z"
            fill="#999"
          ></path>
        </svg>
      </button>
    );
  }, [setHeader, setRbtn]);

  return (
    <>
      <title>Chat-开放对话</title>

      {/* 对话窗口 */}
      <div className="flex h-full grow flex-col overflow-hidden sm:relative">
        <MyToastContainer></MyToastContainer>
        <div className="bg0 border0 hidden border-b py-2 pl-8 sm:flex">
          <ChatHeader></ChatHeader>
        </div>
        <ChatBody></ChatBody>
        <ChatFooter></ChatFooter>
      </div>

      {/* 历史对话 */}
      <div
        className={
          'border0 bg0 fixed inset-y-0 right-0 z-50 flex w-60 shrink-0 grow-0 transform border-l-2 transition-transform duration-300 sm:relative sm:z-0 sm:translate-x-0 ' +
          `${historyOpen ? 'translate-x-0' : 'translate-x-full'}`
        }
      >
        <HistoryChat
          onClose={() => {
            setHistoryOpen(false);
          }}
        ></HistoryChat>
      </div>

      {/* mask */}
      <Mask isOpen={historyOpen} onClose={() => setHistoryOpen(false)}></Mask>
    </>
  );
}

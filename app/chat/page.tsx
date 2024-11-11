'use client';

import ChatBody from '@/components/chat/ChatBody';
import ChatFooter from '@/components/chat/ChatFooter';
import ChatHeader from '@/components/chat/ChatHeader';
import HistoryChat from '@/components/chat/HistoryChat';
import { useHeader } from '@/components/frame/HeaderProvider';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { Suspense, useEffect, useState } from 'react';
import ChatBodyLoading from './loading';

export default function Page() {
  const { setHeader, setRbtn } = useHeader();
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    // 设置 header 内容
    setHeader(<ChatHeader></ChatHeader>);
    setRbtn(
      <button
        className="h-12 w-12 place-content-center items-center rounded-lg border border-my-border p-2 text-base font-semibold dark:border-my-darkborder dark:bg-my-darkbg2 sm:hidden"
        onClick={() => {
          console.log('====================================');
          console.log('历史对话');
          console.log('====================================');
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
      <div className="flex h-full w-full flex-row overflow-hidden sm:relative">
        <div className="flex w-full flex-col border-my-border dark:border-my-darkborder sm:border-r-2">
          <MyToastContainer></MyToastContainer>
          <div className="hidden border-b border-my-border py-2 pl-8 dark:border-my-darkborder sm:flex">
            <ChatHeader></ChatHeader>
          </div>
          <Suspense fallback={<ChatBodyLoading></ChatBodyLoading>}>
            <ChatBody></ChatBody>
          </Suspense>
          <ChatFooter></ChatFooter>
        </div>
      </div>
      <div
        className={
          'fixed right-0 z-50 h-screen w-60 transform border-my-border bg-my-bg transition-transform duration-300 dark:border-r-my-darkborder dark:bg-my-darkbg1 sm:relative sm:z-0 sm:translate-x-0 ' +
          `${historyOpen ? 'translate-x-0' : 'translate-x-full'}`
        }
      >
        <HistoryChat></HistoryChat>
      </div>

      {/* mask */}
      <div
        className={
          'absolute z-40 h-screen w-screen bg-black/50 sm:hidden ' +
          `${historyOpen ? 'block' : 'hidden'}`
        }
        onClick={() => {
          setHistoryOpen(false);
        }}
      ></div>
    </>
  );
}

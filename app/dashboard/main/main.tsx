import ChatCard from '@/components/frame/chatCard';
import React from 'react';

export default function MainContent() {
  const chatMessage = '';
  return (
    <div className="flex h-screen flex-col bg-my-bg dark:bg-my-darkbg0">
      <div className="border-my-border dark:border-my-darkborder relative mb-[4px] flex flex-row items-center justify-between space-x-8 rounded-[2px] border-b-[3px] px-[20px] py-[14px]">
        <div className="flex ">
          <h1 className="text-[32px]">ChatGPT-Next-Web</h1>
        </div>
        <div className="flex flex-row space-x-[10px]">
          <h2 className="">h2</h2>
          <h3 className="">h3</h3>
        </div>
      </div>
      <div className="relative flex flex-shrink flex-grow flex-col justify-end overflow-auto overflow-x-hidden p-[20px]">
        <div className="flex flex-row-reverse">
          <div className={'ChatMessage-container'}>
            <div className={'ChatMessage-header'}></div>
            <div className={'ChatMessage-content'}>
              <ChatCard>{'Question'}</ChatCard>
            </div>
            <div className={'ChatMessage-footer'}></div>
          </div>
        </div>
        <div className="">
          <div className={'ChatMessage-container'}>
            <div className={'ChatMessage-header'}></div>
            <div className={'ChatMessage-content'}>
              <ChatCard>{'Answer'}</ChatCard>
            </div>
            <div className={'ChatMessage-footer'}></div>
          </div>
        </div>
      </div>
      <div className="border-my-border dark:border-my-darkborder relative mt-[4px] block rounded-[2px] border-t-[3px] px-[20px] pb-[10px] pt-[10px]">
        <textarea
          className="border-my-border mt-[10px] max-h-[300px] w-full flex-grow resize-none break-words rounded-[10px] border-[2px] bg-my-bg pb-[15px] pl-[15px] pr-[120px] pt-[10px] font-sans text-[18px] outline-none dark:bg-my-darkbg1"
          placeholder="Shift+Enter发送，Enter换行"
          rows={4}
        ></textarea>
        <button className="bg-my-button0 dark:bg-my-darkButton0 absolute bottom-[32px] right-[40px] flex h-[50px] w-[80px] place-content-center items-center rounded-[10px] text-[16px] font-medium text-my-darktext0 ">
          发&nbsp;送
        </button>
      </div>
    </div>
  );
}

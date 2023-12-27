'use client';

import ChatBody from '@/components/chat/ChatBody';
import { useStore, useLocalStore, useBearStore } from '@/lib/store';

export default function ChatPage() {
  const pStore = useStore(useLocalStore, (state) => state);
  const store = useStore(useBearStore, (state) => state);

  return (
    <div className="flex w-full flex-col">
      <div className="relative z-10 flex flex-row justify-between border-b-[1px] border-my-border px-5 pb-2 pt-3 shadow dark:border-my-darkborder md:justify-start">
        <div>
          <button
            className="h-12 w-12 place-content-center items-center rounded-lg border-[1px] border-my-border text-base font-semibold dark:border-my-darkborder  dark:bg-my-darkbg1 md:hidden"
            // onClick={() => menuButtonClick(true)}
          ></button>
        </div>
        <div>
          <div className="text-center text-xl md:text-start">{pStore?.getChatTitle()}</div>
          <div className="text-center text-sm md:text-start">共 1 条对话</div>
        </div>
        <div>
          <button className="h-12 w-12 place-content-center items-center rounded-lg border-[1px] border-my-border text-base font-semibold  dark:border-my-darkborder dark:bg-my-darkbg1 md:hidden"></button>
        </div>
      </div>
      <ChatBody></ChatBody>
      <div className="relative block border-t-2 border-my-border px-5 py-4 dark:border-my-darkborder">
        <textarea
          className="h-full w-full flex-grow resize-none break-words rounded-lg border-my-border bg-my-bg pb-2 pl-4 pr-32 pt-2 text-sm leading-normal shadow outline outline-2 outline-my-border dark:bg-my-darkbg0 dark:outline-my-darkborder"
          placeholder="Shift+Enter发送，Enter换行"
          rows={3}
        ></textarea>
        <button className="absolute bottom-8 right-10 flex h-12 w-20 place-content-center items-center rounded-lg bg-my-button0 text-sm text-my-darktext0 dark:bg-my-darkButton0 md:text-base ">
          发&nbsp;送
        </button>
      </div>
    </div>
  );
}

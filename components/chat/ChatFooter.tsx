'use client';

import { AddChatCard } from '@/app/api/chat';
import { useBearStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';

export default function ChatFooter() {
  const getSelectedChatID = useBearStore(useShallow((state) => state.getSelectedChatID));

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    console.log('====================================');
    console.log(e.currentTarget.value);
    console.log('====================================');
    // setTmpChatContent(e.currentTarget.value);
  };
  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget as HTMLTextAreaElement;
      // 发送
      const chatCard: ChatCardDTO = {
        chat_info_id: getSelectedChatID(),
        content: textarea.value,
        role: 'user'
      };
      textarea.value = '';
      AddChatCard(chatCard);
    }
  };

  return (
    <div className="relative block border-t-2 border-my-border px-5 py-4 dark:border-my-darkborder">
      <textarea
        className="h-full w-full flex-grow resize-none break-words rounded-lg border-my-border bg-my-bg pb-2 pl-4 pr-32 pt-2 text-sm leading-normal shadow outline outline-2 outline-my-border dark:bg-my-darkbg0 dark:outline-my-darkborder"
        placeholder="Enter发送，Shift+Enter换行，不支持使用Tab空格"
        onChange={handleChange}
        onKeyDown={handleSubmit}
        rows={3}
      ></textarea>
      <button
        className="absolute bottom-8 right-10 flex h-12 w-20 place-content-center items-center rounded-lg border-[1px] border-black/30 bg-my-primary text-sm text-my-darktext0 duration-200 hover:bg-my-primaryHover dark:border-white/50 dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover md:text-base "
        type="submit"
        onClick={() => {
          console.log('====================================');
          console.log('clicked');
          console.log('====================================');
          // handleSubmit();
        }}
      >
        发&nbsp;送
      </button>
    </div>
  );
}
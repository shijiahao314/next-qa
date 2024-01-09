'use client';

import { AddChatCard } from '@/api/chat';
import { AddChatCardResponse, ChatCard, ChatCardDTO, WSChatSendMessage } from '@/api/model/chat';
import { useBearStore, useChatStore } from '@/lib/store';
import { useRef } from 'react';

export default function ChatFooter() {
  const getSelectedChatInfoID = useChatStore((state) => state.getSelectedChatInfoID);
  const addChatCard = useChatStore((state) => state.addChatCard);
  const setTmpChatContent = useChatStore((state) => state.setTmpChatContent);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddChatCard = () => {
    if (textareaRef.current) {
      const text: string = textareaRef.current.value;
      if (text === '') {
        return;
      }
      // 发送
      const chatCard: ChatCardDTO = {
        chat_info_id: getSelectedChatInfoID(),
        content: text
      };
      AddChatCard(chatCard).then(([success, resp]: [boolean, AddChatCardResponse]) => {
        if (success) {
          addChatCard(resp.chat_card);
        }
      });
      textareaRef.current.value = '';
      setTmpChatContent('');
    }
  };

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = '5rem';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
    setTmpChatContent(e.currentTarget.value);
  };
  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddChatCard();
    }
  };

  return (
    <div className="relative block border-t-2 border-my-border px-5 py-4 dark:border-my-darkborder">
      <textarea
        ref={textareaRef}
        className="h-20 max-h-48 w-full flex-grow resize-none overflow-y-visible break-words rounded-lg border-my-border bg-my-bg pb-2 pl-4 pr-32 pt-2 leading-normal shadow outline outline-2 outline-my-border dark:bg-my-darkbg0 dark:outline-my-darkborder"
        placeholder="Enter发送，Shift+Enter换行，不支持使用Tab空格"
        onChange={handleChange}
        onKeyDown={handleSubmit}
        rows={3}
      ></textarea>
      <button
        className="absolute bottom-8 right-10 flex h-12 w-20 place-content-center items-center rounded-lg border-[1px] border-black/30 bg-my-primary text-sm text-my-darktext0 duration-200 hover:bg-my-primaryHover dark:border-white/50 dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover md:text-base "
        type="submit"
        onClick={handleAddChatCard}
      >
        发&nbsp;送
      </button>
    </div>
  );
}

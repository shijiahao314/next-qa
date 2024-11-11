'use client';

import { AddChatCard } from '@/action/chat';
import { AddChatCardResponse, ChatCard, ChatRole } from '@/action/model/chat';
import { useChatStore } from '@/lib/store';
import useStore from '@/lib/useStore';
import { useChat } from 'ai/react';
import { OpenAI } from 'openai';
import { useRef } from 'react';

export default function ChatFooter() {
  const getSelectedChatInfoID = useChatStore((state) => state.getSelectedChatInfoID);
  const addChatCard = useChatStore((state) => state.addChatCard);
  const setTmpChatContent = useChatStore((state) => state.setTmpChatContent);
  const setTmpCompletionContent = useChatStore((state) => state.setTmpCompletionContent);
  const getTmpCompletionContent = useChatStore((state) => state.getTmpCompletionContent);
  const addTmpCompletionContent = useChatStore((state) => state.addTmpCompletionContent);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleAddChatCard = () => {
    if (textareaRef.current) {
      const text: string = textareaRef.current.value;
      if (text === '') {
        return;
      }
      console.log('====================================');
      console.log('发送');
      console.log(text);
      console.log('====================================');
      // 发送
      let date = new Date();
      const chatCard: ChatCard = {
        id: date.getTime().toString(),
        chat_info_id: getSelectedChatInfoID(),
        content: text,
        role: ChatRole.USER,
        ctime: date,
        utime: date
      };
      addChatCard(chatCard, getSelectedChatInfoID());
      textareaRef.current.value = '';
      setTmpChatContent('');
    }
  };

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = '5rem';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
    setTmpChatContent(e.currentTarget.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddChatCard();
    }
  };

  return (
    <>
      <div className="relative block border-t-2 border-my-border px-5 py-4 dark:border-my-darkborder">
        <textarea
          ref={textareaRef}
          className="h-20 max-h-48 w-full flex-grow resize-none overflow-y-visible break-words rounded-lg border-my-border bg-my-bg pb-2 pl-4 pr-32 pt-2 leading-normal shadow outline outline-2 outline-my-border dark:bg-my-darkbg0 dark:outline-my-darkborder"
          placeholder="Enter发送，Shift+Enter换行，不支持使用Tab空格"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={3}
        ></textarea>
        <button
          className="absolute bottom-8 right-10 flex h-12 w-20 place-content-center items-center rounded-lg border border-black/30 bg-my-primary text-sm text-my-darktext0 duration-200 hover:bg-my-primaryHover dark:border-white/50 dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover md:text-base "
          type="submit"
          onClick={handleAddChatCard}
        >
          发&nbsp;送
        </button>
      </div>
      {/* <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 text-black shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div> */}
    </>
  );
}

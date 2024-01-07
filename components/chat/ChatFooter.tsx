'use client';

import { AddChatCard } from '@/api/chat';
import { ChatCardDTO } from '@/api/model/chat';
import { useBearStore } from '@/lib/store';
import { useRef, useState } from 'react';

import { GetOpenAIResponse } from '@/api/openai';

export default function ChatFooter() {
  const getSelectedChatID = useBearStore((state) => state.getSelectedChatID);
  const getChatBodyRefresh = useBearStore((state) => state.getChatBodyRefresh);
  const setChatBodyRefresh = useBearStore((state) => state.setChatBodyRefresh);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddChatCard = async () => {
    if (textareaRef.current) {
      const text: string = textareaRef.current.value;
      if (text === '') {
        return;
      }
      // 发送
      const chatCard: ChatCardDTO = {
        chat_info_id: getSelectedChatID(),
        content: text,
        role: 'user'
      };
      textareaRef.current.value = '';
      AddChatCard(chatCard);
      setChatBodyRefresh(!getChatBodyRefresh());
      // send to openai
      setResponse('');
      setLoading(true);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text
        })
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResponse((prev) => prev + chunkValue);
      }
      setLoading(false);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = '5rem';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  };
  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddChatCard();
    }
  };

  // chat response
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<String>('');

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
      {true && (
        <div className="h-20 max-h-48 w-full flex-grow resize-none overflow-y-visible break-words rounded-lg border-my-border bg-my-bg pb-2 pl-4 pr-32 pt-2 leading-normal shadow outline outline-2 outline-my-border dark:bg-my-darkbg0 dark:outline-my-darkborder">
          {response}
        </div>
      )}
    </div>
  );
}

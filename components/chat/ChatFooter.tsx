'use client';

import { ChatCard, ChatRole } from '@/action/model/chat';
import { useChatStore, useTmpChatStat } from '@/lib/store';
import { useState } from 'react';

export default function ChatFooter() {
  const selectedChatInfoID = useChatStore((state) => state.selectedChatInfoID);
  const addChatCard = useChatStore((state) => state.addChatCard);
  const [tmpContent, setTmpContent] = useState(''); // 对话框内容
  const setTmpChatContent = useTmpChatStat((state) => state.setTmpChatContent);

  function handleSend() {
    const text = tmpContent;
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
      chat_info_id: selectedChatInfoID,
      content: text,
      role: ChatRole.USER,
      ctime: date,
      utime: date
    };
    addChatCard(selectedChatInfoID, chatCard);
    // mock reply
    let mockDate = new Date(date.getTime() + 10000);
    const mockReply: ChatCard = {
      id: mockDate.getTime().toString(),
      chat_info_id: selectedChatInfoID,
      content: text,
      role: ChatRole.ASSISTANT,
      ctime: mockDate,
      utime: mockDate
    };
    addChatCard(selectedChatInfoID, mockReply);
    setTmpContent('');
    setTmpChatContent('');
  }

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    e.currentTarget.style.height = '5rem';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
    setTmpContent(text);
    setTmpChatContent(text);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="relative block border-t border-my-border px-5 py-4 dark:border-my-darkborder">
        <textarea
          className="h-20 max-h-48 w-full flex-grow resize-none overflow-y-visible break-words rounded-lg border-my-border bg-my-bg py-2 pl-4 pr-32 text-sm leading-normal shadow outline outline-1 outline-my-border dark:bg-my-darkbg0 dark:outline-my-darkborder"
          placeholder="Enter发送，Shift+Enter换行，不支持使用Tab空格"
          value={tmpContent}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={3}
        ></textarea>
        <button
          className="absolute bottom-8 right-10 flex h-12 w-20 place-content-center items-center rounded-lg bg-my-primary text-my-darktext0 duration-200 hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
          type="submit"
          onClick={handleSend}
        >
          发&nbsp;送
        </button>
      </div>
    </>
  );
}

'use client';

import { ChatInfo } from '@/action/model/chat';
import { useChatStore } from '@/lib/store/chatStore';
import React, { Fragment, useEffect, useState } from 'react';
import Modal from '../frame/Modal';

export default function ChatHeader() {
  const selectedChatInfoID = useChatStore((state) => state.selectedChatInfoID);
  const chatInfos = useChatStore((state) => state.chatInfos);
  const setChatInfos = useChatStore((state) => state.setChatInfos);
  const [curChatInfo, setCurChatInfo] = useState<ChatInfo>({
    id: '',
    title: '',
    num: -1,
    ctime: new Date(),
    utime: new Date()
  } as ChatInfo);
  const [tmpTitle, setTmpTitle] = useState<string>('');

  useEffect(() => {
    if (selectedChatInfoID === '') {
      return;
    }
    console.log('====================================');
    console.log('selectedChatInfoID=', selectedChatInfoID);
    console.log('====================================');
    const chatInfo = chatInfos.find((chatInfo) => chatInfo.id === selectedChatInfoID);
    if (chatInfo) {
      setCurChatInfo(chatInfo);
    }
  }, [selectedChatInfoID, chatInfos]);

  // Dialog (Modal)
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpTitle(e.target.value);
  };
  const handleSubmit = () => {
    const newChatInfo: ChatInfo = curChatInfo;
    const date = new Date();
    newChatInfo.title = tmpTitle;
    newChatInfo.utime = date;
    const newChatInfos = [...chatInfos];
    const index = newChatInfos.findIndex((chatInfo) => chatInfo.id === selectedChatInfoID);
    newChatInfos[index] = newChatInfo;
    setChatInfos(newChatInfos);
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-1 sm:items-start sm:justify-start">
        {curChatInfo.title ? (
          <label
            className="cursor-pointer text-xl font-bold underline underline-offset-2"
            onClick={() => {
              setModalOpen(true);
              if (curChatInfo) {
                setTmpTitle(curChatInfo.title);
              }
            }}
          >
            {curChatInfo.title}
          </label>
        ) : (
          <div className="bg2 animate-pulse rounded-sm text-xl text-transparent visited:hidden">
            新的聊天
          </div>
        )}
        {curChatInfo.num !== -1 ? (
          <label className="text-xs">共 {curChatInfo.num} 条对话</label>
        ) : (
          <div className="bg2 animate-pulse rounded-sm text-xs text-transparent visited:hidden">
            共 0 条对话
          </div>
        )}
      </div>

      <Modal title="编辑聊天主题" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col gap-2">
          <div className="border0 flex flex-row space-x-4 rounded-lg border px-5 py-3 text-base">
            <div className="flex flex-col">
              <div className="text-base font-semibold">聊天主题</div>
              <div className="text-sm font-light">更改当前的聊天主题</div>
            </div>
            <input
              className="bg-my-bg outline-my-border focus:outline-my-primary dark:bg-my-dark-bg1 dark:outline-my-darkborder dark:focus:outline-my-darkPrimary rounded-lg px-3 text-center outline"
              name="title"
              value={tmpTitle}
              onChange={handleChange}
            ></input>
          </div>
          <div className="flex justify-end gap-3">
            <button className="btn-confirm" onClick={handleSubmit}>
              确认
            </button>
            <button className="btn-cancel" onClick={() => setModalOpen(false)}>
              取消
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

'use client';

import { ChatInfo, UpdateChatInfoRequest } from '@/action/model/chat';
import { useBearStore, useChatStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { UpdateChatInfo } from '@/action/chat';

export default function ChatHeader() {
  const setNavOpen = useBearStore(useShallow((state) => state.setNavOpen));
  const setHistoryOpen = useBearStore(useShallow((state) => state.setHistoryOpen));

  const chatInfos: ChatInfo[] = useChatStore(useShallow((state) => state.chatInfos));
  const setChatInfos = useChatStore(useShallow((state) => state.setChatInfos));
  const selectedChatInfoID: string = useChatStore(useShallow((state) => state.selectedChatInfoID));

  // Dialog (Modal)
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // formData
  const [formdata, setFormData] = useState({
    title: chatInfos.find((chatInfo) => chatInfo.id === selectedChatInfoID)?.title || 'error'
  });
  useEffect(() => {
    setFormData({
      title: chatInfos.find((chatInfo) => chatInfo.id === selectedChatInfoID)?.title || 'error'
    });
  }, [selectedChatInfoID]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateChatInfoRequest: UpdateChatInfoRequest = {
      title: formdata.title
    };
    UpdateChatInfo(selectedChatInfoID, updateChatInfoRequest).then(([success, resp]) => {
      if (success) {
        setChatInfos(
          chatInfos.map((chatInfo) => {
            if (chatInfo.id === selectedChatInfoID) {
              chatInfo.title = formdata.title;
            }
            return chatInfo;
          })
        );
        closeModal();
      }
    });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-my-bg text-left align-middle text-my-text0 shadow-xl transition-all dark:bg-my-darkbg1 dark:text-my-darktext0">
                  <Dialog.Title
                    as="h3"
                    className="border-b-2 border-my-border p-5 text-lg font-semibold dark:border-my-darkborder"
                  >
                    编辑对话记录
                  </Dialog.Title>
                  <div className="mt-2 p-5">
                    <div className="flex w-full flex-row space-x-4 rounded-lg border-2 border-my-border px-5 py-3 text-base dark:border-my-darkborder">
                      <div className="flex flex-col">
                        <div className="text-base font-semibold">聊天主题</div>
                        <div className="text-sm font-light">更改当前的聊天主题</div>
                      </div>
                      <input
                        className="bg-my-bg1 flex-grow rounded-lg px-2 text-center outline outline-2 outline-my-border focus:border-[0.15rem] dark:bg-my-darkbg1 dark:outline-my-darkborder"
                        name="title"
                        value={formdata.title}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 p-5">
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-my-primary px-6 py-2 text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                      onClick={handleSubmit}
                    >
                      确认
                    </button>
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-6 py-2 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      取消
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

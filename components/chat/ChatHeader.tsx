'use client';

import { ChatInfo, UpdateChatInfoRequest } from '@/api/model/chat';
import { useBearStore, useChatStore } from '@/lib/store';
import { useShallow } from 'zustand/react/shallow';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { UpdateChatInfo } from '@/api/chat';

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
      <div className="relative flex flex-row justify-between border-b-[1px] border-my-border px-5 py-4 shadow dark:border-my-darkborder md:justify-start">
        <button
          className="h-12 w-12 place-content-center items-center rounded-lg border-[1px] border-my-border p-2 text-base font-semibold dark:border-my-darkborder  dark:bg-my-darkbg1 md:hidden"
          onClick={() => {
            setNavOpen(true);
          }}
        >
          <svg viewBox="0 0 1024 1024">
            <path
              d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
              fill="#999"
            />
          </svg>
        </button>
        <div>
          <div
            className="cursor-pointer text-center text-xl font-bold decoration-my-primary decoration-2 hover:underline dark:decoration-my-darkPrimary md:text-start"
            onClick={() => {
              openModal();
            }}
          >
            {chatInfos.find((chatInfo) => chatInfo.id == selectedChatInfoID)?.title}
          </div>
          <div className="text-center text-sm md:text-start">
            共&nbsp;{chatInfos.find((chatInfo) => chatInfo.id == selectedChatInfoID)?.num}
            &nbsp;条对话
          </div>
        </div>
        <button
          className="h-12 w-12 place-content-center items-center rounded-lg border-[1px] border-my-border p-2 text-base font-semibold dark:border-my-darkborder  dark:bg-my-darkbg1 md:hidden"
          onClick={() => {
            setHistoryOpen(true);
          }}
        >
          <svg viewBox="0 0 1024 1024" className="p-[0.2rem]" fill="#999">
            <path d="M706.64485625 824.42174346l45.40866592 68.11255986A448.6084418 448.6084418 0 0 1 511.5901792 961.99949903C263.14988838 961.99949903 62 760.39961152 62 511.99974951S263.14988838 62 511.54974951 62c248.84986114 0 450.4488706 201.5998875 450.4488706 449.99974951 0 6.87304336-0.16435547 13.66346865-0.45 20.45389482h-81.94038398c0.4078125-6.79042617 0.57216797-13.58173037 0.57216797-20.45389482 0-203.27683974-165.02686084-368.1824124-368.63065459-368.1824124C308.43638633 143.81733711 143.81733711 308.68248008 143.81733711 511.99974951s164.61904922 368.18065459 367.7324124 368.18065459c71.63081982 0 138.51818438-20.45477373 195.13465752-55.75866064z" />
            <path d="M532.45364434 307.45464893h-61.36344229v245.45376914l214.77292735 128.86340449 30.6817207-50.31735469-184.09120577-109.2277705zM798.363067 511.99974951h245.45289023L921.08907266 675.63618154z" />
          </svg>
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      确认
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

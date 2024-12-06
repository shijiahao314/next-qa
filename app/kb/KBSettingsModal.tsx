'use client';

import Modal from '@/components/frame/Modal';
import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function KBSettingsModal({ modalOpen, setModalOpen }: ModalProps) {
  const KBSettings = [
    [
      // group1
      {
        title: 'LLM',
        descp: '对话使用的 LLM 模型',
        value: (
          <select
            id="countries"
            className="h-10 rounded-lg border border-solid border-my-border bg-my-bg text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
          >
            <option value="qwen2.5:latest">qwen2.5:latest</option>
            <option value="llama3:latest">llama3:latest</option>
          </select>
        )
      },
      {
        title: 'API Key',
        descp: '使用 API Key 访问',
        value: (
          <input
            className="h-10 w-48 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
            placeholder="OpenAI API Key"
            type="password"
          ></input>
        )
      },
      {
        title: 'Base URL',
        descp: '自定义访问 URL 地址',
        value: (
          <input
            className="h-10 w-48 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
            placeholder="http://127.0.0.1:11434/v1"
            defaultValue={'http://127.0.0.1:11434/v1'}
          ></input>
        )
      },
      {
        title: 'Max Tokens',
        descp: 'LLM 对话最大 Token 数',
        value: (
          <input
            className="h-10 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
            placeholder="8192"
            defaultValue={8192}
          ></input>
        )
      }
    ],
    [
      // group2
      {
        title: 'Embedding',
        descp: '对话使用的 Embedding 模型',
        value: (
          <select
            id="countries"
            className="h-10 rounded-lg border border-solid border-my-border bg-my-bg text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
          >
            <option value="qwen2.5:latest">mxbai-embed-large:latest</option>
          </select>
        )
      },
      {
        title: 'API Key',
        descp: '使用 API Key 访问',
        value: (
          <input
            className="h-10 w-48 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
            placeholder="OpenAI API Key"
            type="password"
          ></input>
        )
      },
      {
        title: 'Base URL',
        descp: '自定义访问 URL 地址',
        value: (
          <input
            className="h-10 w-48 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
            placeholder="http://127.0.0.1:11434/v1"
            defaultValue={'http://127.0.0.1:11434/v1'}
          ></input>
        )
      },
      {
        title: 'Concurrent Requests',
        descp: '最大并发请求数',
        value: (
          <input
            className="h-10 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
            placeholder="25"
            defaultValue={25}
          ></input>
        )
      }
    ]
  ];

  return (
    <>
      <Modal title="知识库设置" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex h-full w-full flex-col space-y-5">
          {KBSettings.map((group, index) => (
            <div
              key={index}
              className="divide-y-2 divide-solid rounded-lg border border-my-border dark:border-my-darkborder"
            >
              {group.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-row items-center justify-between space-x-2 border-my-border px-5 py-3 dark:border-my-darkborder"
                >
                  <div>
                    <div className="text-base text-my-text0 dark:text-my-darktext0">
                      {item.title}
                    </div>
                    <div className="text-xs text-my-text2 dark:text-my-darktext2">{item.descp}</div>
                  </div>
                  <div className="flex items-center">{item.value}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Modal>
      ;
    </>
  );
}

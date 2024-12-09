'use client';

import Modal from '@/components/frame/Modal';
import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

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
            className="h-full w-full rounded-lg border border-solid border-my-border bg-my-bg text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-full w-full rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-full w-full rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-full w-full rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-full w-full rounded-lg border border-solid border-my-border bg-my-bg text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-full w-full rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-full w-full rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-full w-full rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
          {/* 设置 */}
          {KBSettings.map((group, index) => (
            <div
              key={index}
              className="flex flex-col divide-y rounded-lg border border-my-border dark:border-my-darkborder"
            >
              {group.map((item) => (
                // Row
                <div className="flex w-full flex-row gap-5 px-4 py-2">
                  {/* Left */}
                  <div className="flex w-2/5 flex-col">
                    <label className="text-nowrap text-base text-my-text0 dark:text-my-darktext0">
                      {item.title}
                    </label>
                    <label className="inline-block text-xs text-my-text2 dark:text-my-darktext2">
                      {item.descp}
                    </label>
                  </div>
                  {/* Right */}
                  <div className="flex w-3/5">{item.value}</div>
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

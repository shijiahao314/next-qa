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
            className="bg1 border0 h-full w-full rounded-lg border px-3 text-center text-sm"
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
            className="bg1 border0 h-full w-full rounded-lg border px-3 text-center text-sm"
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
            className="bg1 border0 h-full w-full rounded-lg border px-3 text-center text-sm"
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
            className="bg1 border0 h-full w-full rounded-lg border px-3 text-center text-sm"
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
            className="bg1 border0 h-full w-full rounded-lg border px-3 text-center text-sm"
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
            className="bg1 border0 h-full w-full rounded-lg border px-3 text-center text-sm"
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
            className="bg1 border0 h-full w-full rounded-lg border px-3 text-center text-sm"
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
            className="bg1 border0 h-full w-full rounded-lg border px-3 text-center text-sm"
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
              className="border0 divide-my-border dark:divide-my-darkborder flex flex-col divide-y rounded-lg border"
            >
              {group.map((item) => (
                // Row
                <div key={item.title} className="flex w-full flex-row gap-5 px-4 py-2">
                  {/* Left */}
                  <div className="flex w-2/5 flex-col">
                    <label className="text-my-text0 dark:text-my-darktext0 text-base text-nowrap">
                      {item.title}
                    </label>
                    <label className="text-my-text2 dark:text-my-darktext2 inline-block text-xs">
                      {item.descp}
                    </label>
                  </div>
                  {/* Right */}
                  <div className="flex w-3/5">{item.value}</div>
                </div>
              ))}
            </div>
          ))}
          {/* 按钮 */}
          <div className="flex justify-end gap-3">
            <button className="btn-confirm" onClick={() => setModalOpen(false)}>
              确认
            </button>
            <button className="btn-cancel" onClick={() => setModalOpen(false)}>
              取消
            </button>
          </div>
        </div>
      </Modal>
      ;
    </>
  );
}

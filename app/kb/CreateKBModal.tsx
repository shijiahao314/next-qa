'use client';

import Modal from '@/components/frame/Modal';
import { Dispatch, SetStateAction, useState } from 'react';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateKBModal({ modalOpen, setModalOpen }: ModalProps) {
  const [tmpKBName, setTmpKBName] = useState('');

  const CreateKB = [
    [
      // group1
      {
        title: '知识库名称',
        descp: '所创建的知识库名称',
        value: (
          <input
            className="h-10 w-40 rounded-lg bg-my-bg px-3 text-center outline outline-my-border focus:outline-my-primary dark:bg-my-darkbg1 dark:outline-my-darkborder dark:focus:outline-my-darkPrimary"
            name="kbname"
            type="text"
            value={tmpKBName}
            onChange={(e) => setTmpKBName(e.target.value)}
            placeholder="知识库名称"
          ></input>
        )
      },
      {
        title: '知识库类型',
        descp: '所创建的知识库类型',
        value: (
          <select
            id="countries"
            className="h-10 rounded-lg border border-solid border-my-border bg-my-bg text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
          >
            <option value="RAG 知识库">RAG 知识库</option>
            <option value="GraphRAG 知识图库">GraphRAG 知识图库</option>
          </select>
        )
      }
    ]
  ];

  function handleCreateKB() {
    console.log('====================================');
    console.log('创建知识库');
    console.log('====================================');
    setModalOpen(false);
  }

  return (
    <>
      {/* 新建知识库 */}
      <Modal title="新建知识库" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex h-full w-full flex-col space-y-3">
          {/* 设置 */}
          {CreateKB.map((group, index) => (
            <div
              key={index}
              className="divide-y-2 divide-solid rounded-lg border border-my-border dark:border-my-darkborder"
            >
              {group.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-row items-center justify-between gap-x-5 border-my-border px-5 py-3 dark:border-my-darkborder"
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
          {/* 按钮 */}
          <div className="flex justify-end gap-3">
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-my-primary px-6 py-2 text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
              onClick={handleCreateKB}
            >
              确认
            </button>
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-6 py-2 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setModalOpen(false)}
            >
              取消
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

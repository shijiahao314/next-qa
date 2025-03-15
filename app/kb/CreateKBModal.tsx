'use client';

import Modal from '@/components/frame/Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { API_URL } from '../config';

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
            className="bg-my-bg outline-my-border focus:outline-my-primary dark:bg-my-dark-bg1 dark:outline-my-darkborder dark:focus:outline-my-darkPrimary h-full w-full rounded-lg px-3 text-center outline outline-1"
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
            className="border-my-border bg-my-bg dark:border-my-darkborder dark:bg-my-dark-bg1 h-full w-full rounded-lg border border-solid text-center text-sm"
          >
            <option value="RAG 知识库">RAG 知识库</option>
            <option value="GraphRAG 知识图库">GraphRAG 知识图库</option>
          </select>
        )
      }
    ]
  ];

  // 创建知识库
  async function handleCreateKB() {
    console.log('====================================');
    console.log('创建知识库');
    console.log('====================================');
    try {
      class AddKBReq {
        name!: string;
      }
      const res = await fetch(API_URL + '/kb/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: tmpKBName
        } as AddKBReq)
      });
      class AddKBRsp {
        code!: number;
        msg!: string;
      }
      const rsp: AddKBRsp = await res.json();
      if (res.ok) {
        setModalOpen(false);
        window.location.reload(); // 刷新页面
      } else {
        console.log(`Failed to create kb: ${rsp.msg}`);
      }
    } catch (error) {
      console.log('Error fetching kbs:', error);
    }
  }

  return (
    <>
      {/* 新建知识库 */}
      <Modal title="新建知识库" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex h-full w-full flex-col space-y-3">
          {/* 设置 */}
          {CreateKB.map((group, index) => (
            <table
              key={index}
              className="border-my-border dark:border-my-darkborder flex table-auto rounded-lg border"
            >
              <tbody className="divide-my-border dark:divide-my-darkborder divide-y">
                {group.map((item) => (
                  <tr key={item.title} className="flex gap-4 px-4 py-3">
                    {/* Left */}
                    <td className="flex flex-col justify-center">
                      <label className="text-my-text0 dark:text-my-darktext0 text-base text-nowrap">
                        {item.title}
                      </label>
                      <label className="text-my-text2 dark:text-my-darktext2 text-xs text-nowrap">
                        {item.descp}
                      </label>
                    </td>
                    {/* Right */}
                    <td className="h-10 w-full shrink grow items-end">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
          {/* 按钮 */}
          <div className="flex justify-end gap-3">
            <button
              className="bg-my-primary hover:bg-my-primary-hover dark:bg-my-dark-primary dark:hover:bg-my-dark-primaryHover inline-flex justify-center rounded-md border border-transparent px-6 py-2 text-white"
              onClick={handleCreateKB}
            >
              确认
            </button>
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-6 py-2 text-blue-900 hover:bg-blue-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

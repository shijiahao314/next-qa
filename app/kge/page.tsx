'use client';

import { API_URL } from '@/app/config';
import { useHeader } from '@/components/frame/HeaderProvider';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

class NERRsp {
  code!: number;
  msg!: string;
  head!: string;
  relation!: string;
  tail!: string;
}

export default function Page() {
  const headInput = useRef<HTMLInputElement>(null); // head
  const relationInput = useRef<HTMLInputElement>(null); // relation
  const tailInput = useRef<HTMLInputElement>(null); // tail

  const { setHeader } = useHeader();

  useEffect(() => {
    // 设置 header 内容
    setHeader(<label className="flex items-center text-xl font-bold">命名实体识别</label>);
  }, [setHeader]);

  async function fetchKGC() {
    if (
      headInput.current === null ||
      relationInput.current === null ||
      tailInput.current === null
    ) {
      return;
    }
    // 计数器
    let count = 0;

    const head = headInput.current.value;
    const relation = relationInput.current.value;
    const tail = tailInput.current.value;

    if (head !== '') {
      count++;
    }
    if (relation !== '') {
      count++;
    }
    if (tail !== '') {
      count++;
    }
    if (count !== 2) {
      toast.error('请填入三元组中的两个');
      return;
    }

    try {
      const res = await fetch(API_URL + '/kgc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          head: head,
          relation: relation,
          tail: tail
        })
      });

      if (res.ok) {
        const data: NERRsp = await res.json();
        if (headInput.current !== null) {
          headInput.current.value = data.head;
        }
        if (relationInput.current !== null) {
          relationInput.current.value = data.relation;
        }
        if (tailInput.current !== null) {
          tailInput.current.value = data.tail;
        }
        console.log('====================================');
        console.log(data);
        console.log('====================================');
      } else {
        console.error('Failed to fetch kgc result:');
        toast.error('无法获取补全结果');
      }
    } catch (error) {
      console.error('Error fetching kgc result:', error);
      toast.error('无法获取补全结果，错误信息：\n' + error);
    }
  }

  return (
    <>
      <title>KGE-知识图谱表征</title>
      <MyToastContainer></MyToastContainer>
      <div className="flex h-full w-full flex-col overflow-y-auto sm:relative">
        <label className="bg1 border-my-border dark:border-my-darkborder hidden w-full border-b py-4 pl-8 text-xl font-bold sm:block">
          知识图谱表征
        </label>
        <div className="flex grow flex-col justify-center space-y-4 overflow-y-auto px-8 py-4">
          <div className="border-my-border dark:border-my-darkborder flex flex-wrap space-x-4 rounded-lg border p-4 px-4">
            <div className="flex h-full grow flex-col justify-center space-y-2">
              <div className="flew-row flex items-center">
                <label>三元组形式：</label>
                <label className="font-mono text-sm italic">(h,r,t)</label>
              </div>
              <p className="">填入三元组中的两个，点击补全</p>
              <div className="border-my-border dark:border-my-darkborder flex w-full flex-row space-x-2 rounded-md border p-4">
                <div className="flex w-full flex-col space-y-2">
                  <div className="flex flex-col space-y-1">
                    <label>head - 头实体</label>
                    <input
                      ref={headInput}
                      className="bg1 borer border-my-border dark:border-my-darkborder rounded-md px-2 py-2 outline-none"
                    ></input>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>relation - 关系</label>
                    <input
                      ref={relationInput}
                      className="bg1 borer border-my-border dark:border-my-darkborder rounded-md px-2 py-2 outline-none"
                    ></input>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label>tail - 尾实体</label>
                    <input
                      ref={tailInput}
                      className="bg1 borer border-my-border dark:border-my-darkborder rounded-md px-2 py-2 outline-none"
                    ></input>
                  </div>
                </div>
                <button className="btn-confirm" onClick={fetchKGC}>
                  补 全
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

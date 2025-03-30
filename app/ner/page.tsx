'use client';

import { API_URL } from '@/app/config';
import { useHeader } from '@/components/frame/HeaderProvider';
import { useEffect, useRef } from 'react';

class NERRsp {
  code!: number;
  msg!: string;
  text!: string;
}

export default function Page() {
  const queryArea = useRef<HTMLTextAreaElement>(null); // Query
  const ansArea = useRef<HTMLTextAreaElement>(null); // Answer

  const { setHeader } = useHeader();

  useEffect(() => {
    // 设置 header 内容
    setHeader(<label className="flex items-center text-xl font-bold">命名实体识别</label>);
  }, [setHeader]);

  async function fetchNER() {
    if (queryArea.current === null || ansArea.current === null) {
      return;
    }

    let sentence = queryArea.current.value;
    if (sentence === '') {
      sentence = '检查变压器接地线是否连接1000千伏变电站的断路器。';
      queryArea.current.value = sentence;
    }

    ansArea.current.value = '等待回复...';

    try {
      const res = await fetch(API_URL + '/ner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: sentence
        })
      });

      if (res.ok) {
        const data: NERRsp = await res.json();
        if (ansArea.current !== null) {
          ansArea.current.value = data.text;
        }
        console.log('====================================');
        console.log(data);
        console.log('====================================');
      } else {
        console.error('Failed to fetch ner result.');
        if (ansArea.current !== null) {
          ansArea.current.value = 'Failed to fetch ner result.';
        }
      }
    } catch (error) {
      console.error('Error fetching ner result:', error);
      if (ansArea.current !== null) {
        ansArea.current.value = '服务异常！错误信息：\n' + error;
      }
    }
  }

  return (
    <>
      <title>NER-命名实体识别</title>
      <div className="flex h-full w-full flex-col overflow-y-auto sm:relative">
        <label className="bg0 border0 hidden w-full border-b py-4 pl-8 text-xl font-bold sm:block">
          命名实体识别
        </label>
        <div className="flex grow flex-col space-y-4 overflow-y-auto px-8 py-4">
          <div className="border0 flex grow flex-col space-y-4 rounded-lg border p-4">
            <div className="flex w-full flex-row space-x-4">
              <textarea
                ref={queryArea}
                className="outline-my-border bg1 dark:outline-my-darkborder w-full resize-none rounded-lg px-4 py-2 outline"
                placeholder="检查变压器接地线是否连接1000千伏变电站的断路器。"
                rows={3}
              ></textarea>
              <button className="btn-confirm" onClick={fetchNER}>
                发 送
              </button>
            </div>
            <div className="border0 flex w-full shrink grow flex-col space-y-2 rounded-md border p-4">
              <label>识别结果</label>
              <div className="flex w-full shrink grow">
                <textarea
                  ref={ansArea}
                  className="outline-my-border bg1 border0 dark:outline-my-darkborder w-full resize-none rounded-lg px-4 py-2 font-mono outline"
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

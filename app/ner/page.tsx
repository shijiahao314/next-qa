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
    if (queryArea.current === null) {
      return;
    }

    const sentence = queryArea.current.value;
    if (sentence === '') {
      return;
    }

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
        ansArea.current.value = 'Error fetching ner result:' + error;
      }
    }
  }

  return (
    <>
      <title>NER-命名实体识别</title>
      <div className="flex h-full w-full flex-col overflow-y-auto sm:relative">
        <label className="hidden w-full border-b border-my-border bg-my-bg py-4 pl-8 text-xl font-bold dark:border-my-darkborder dark:bg-my-darkbg1/50 sm:block">
          命名实体识别
        </label>
        <div className="flex flex-grow flex-col space-y-4 overflow-y-auto px-8 py-4">
          <div className="flex flex-grow flex-col space-y-4 rounded-lg border border-my-border p-4 px-4 dark:border-my-darkborder">
            <div className="flex w-full flex-row space-x-4">
              <textarea
                ref={queryArea}
                className="w-full resize-none rounded-lg px-4 py-2 shadow outline outline-1 outline-my-border dark:bg-my-darkbg1 dark:outline-my-darkborder"
              ></textarea>
              <button
                className="inline-block w-24 whitespace-nowrap rounded-md bg-my-primary px-4 py-2 text-lg text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                onClick={fetchNER}
              >
                发 送
              </button>
            </div>
            <div className="flex w-full flex-shrink flex-grow font-mono">
              <textarea
                ref={ansArea}
                className="w-full resize-none rounded-lg px-4 py-2 shadow outline outline-1 outline-my-border dark:bg-my-darkbg1 dark:outline-my-darkborder"
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

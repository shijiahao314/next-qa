'use client';

import { API_URL } from '@/app/config';
import MarkdownCard from '@/components/chat/MarkdownCard';
import { useHeader } from '@/components/frame/HeaderProvider';
import { useEffect, useRef, useState } from 'react';

class GetKBRsp {
  code!: number;
  msg!: string;
  kbs!: string[];
}

class GetDBRsp {
  code!: number;
  msg!: string;
  dbs!: string[];
}

class QueryRsp {
  code!: number;
  msg!: string;
  text!: string;
}

export default function Page() {
  const [kbs, setKBs] = useState<string[]>([]); // KB 列表
  const [dbs, setDBs] = useState<string[]>([]); // DB 列表
  const [selectedKB, setSelectedKB] = useState(''); // 所选 KB
  const [selectedDB, setSelectedDB] = useState(''); // 所选 KB
  const queryArea = useRef<HTMLTextAreaElement>(null); // Query
  const ansArea = useRef<HTMLTextAreaElement>(null); // Answer
  const { setHeader } = useHeader();

  useEffect(() => {
    // 设置 header 内容
    setHeader(<label className="flex items-center text-xl font-bold">知识库问答</label>);
  }, [setHeader]);

  useEffect(() => {
    async function fetchKBs() {
      try {
        let res = await fetch(API_URL + '/kb', {
          method: 'GET'
        });

        if (res.ok) {
          let data: GetKBRsp = await res.json();
          setKBs(data.kbs);
          if (data.kbs.length > 0) {
            setSelectedKB(data.kbs[0]);
          }
        } else {
          console.error('Failed to fetch kbs.');
        }
      } catch (error) {
        console.error('Error fetching kbs:', error);
      }
    }
    fetchKBs();
  }, []);

  useEffect(() => {
    async function fetchDBs() {
      try {
        let res = await fetch(API_URL + '/db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            kb: selectedKB
          })
        });

        if (res.ok) {
          let data: GetDBRsp = await res.json();
          setDBs(data.dbs);
          if (data.dbs.length > 0) {
            setSelectedDB(data.dbs[0]);
            // 如果立即使用 selectedDB 无法获取最新值（useState 特性）
          }
        } else {
          console.error('Failed to fetch dbs.');
        }
      } catch (error) {
        console.error('Error fetching dbs:', error);
      }
    }

    if (selectedKB) {
      fetchDBs();
    }
  }, [selectedKB]);

  async function fetchQuery() {
    if (queryArea.current === null) {
      return;
    }

    const query = queryArea.current.value;
    if (query === '') {
      return;
    }

    console.log('====================================');
    console.log(selectedKB, selectedDB, query);
    console.log('====================================');
    try {
      if (ansArea.current !== null) {
        ansArea.current.value =
          '等待回复中，本地模型第一次对话预计需要 30 秒，后续对话需要 10 秒左右';
      }
      let res = await fetch(API_URL + '/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          kb: selectedKB,
          db: selectedDB,
          text: query
        })
      });

      if (res.ok) {
        let data: QueryRsp = await res.json();
        if (ansArea.current !== null) {
          ansArea.current.value = data.text;
        }
        console.log('====================================');
        console.log(data);
        console.log('====================================');
      } else {
        console.error('Failed to fetch query.');
        if (ansArea.current !== null) {
          ansArea.current.value = 'Failed to fetch query.';
        }
      }
    } catch (error) {
      console.error('Error fetching query:', error);
      if (ansArea.current !== null) {
        ansArea.current.value = 'Error fetching query:' + error;
      }
    }
  }

  function handleSelectKB(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedKB(event.target.value);
  }

  function handleSelectDB(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDB(event.target.value);
  }

  function handleChangeText(event: React.FormEvent<HTMLTextAreaElement>) {
    if (queryArea.current !== null) {
      queryArea.current.value = event.currentTarget.value;
    }
  }

  const ans = `

在刘慈欣的科幻小说《三体》中，共有四位面壁者，以下是四位面壁者及其背景：

## 1.弗雷德里克·泰勒（Frederick Tyler）

身份：美国前防务部长、海军上将

计划：主张利用大规模的核动力太空舰队对抗三体舰队。他的策略建立在人类军事技术的快速发展和规模压制的基础上。

## 2.曼努尔·雷迪亚兹（Manuel Rey Diaz）

身份：委内瑞拉前总统

计划：他采用心理战策略，试图利用三体人的思维局限性，通过伪造信息迷惑敌方。

## 3.比尔·希恩斯（Bill Hines）

身份：英国著名科学家

计划：集中于利用基础科学的突破来打破技术壁垒，推动人类科技迎头赶上三体人。

## 4.罗辑（Luo Ji）

身份：社会学教授

计划：提出“黑暗森林威慑理论”，利用宇宙中的黑暗森林法则，以“威慑广播”威胁三体文明。罗辑是唯一成功完成战略的面壁者，被誉为“执剑人”。

面壁计划本质上是人类的一种生存赌博，每位面壁者在巨大的外界压力下发挥独特的智慧和策略，同时与破壁者展开对抗。

  `;

  const selectStyle =
    'h-10 px-4 rounded-lg border border-solid border-my-border bg-my-bg dark:border-my-darkborder dark:bg-my-darkbg1';

  return (
    <>
      <title>RAG-知识库问答</title>
      <div className="flex h-full w-full flex-col overflow-y-auto sm:relative">
        <label className="hidden w-full border-b border-my-border bg-my-bg py-4 pl-8 text-xl font-bold dark:border-my-darkborder dark:bg-my-darkbg1/50 sm:block">
          知识图问答
        </label>
        <div className="flex flex-grow flex-col space-y-4 overflow-y-auto px-8 py-4">
          <div className="flex flex-grow flex-col space-y-4 rounded-lg border border-my-border p-4 px-4 dark:border-my-darkborder">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row flex-wrap justify-between gap-2">
                <div className="flex flex-row">
                  <label className="flex items-center whitespace-nowrap text-lg">KB 知识库：</label>
                  <div className="flex items-center">
                    {kbs.length === 0 ? (
                      <select className={`${selectStyle} text-red-500`} disabled>
                        <option>无可用 KB</option>
                      </select>
                    ) : (
                      <select className={`${selectStyle}`} onChange={handleSelectKB}>
                        <option className="" key={'sgyy'} value={'sgyy'}>
                          《三体》
                        </option>
                        {kbs.map((kb: string) => (
                          <option className="" key={kb} value={kb}>
                            {kb}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div className="flex flex-row">
                  <label className="flex items-center whitespace-nowrap text-lg">DB 数据库：</label>
                  <div className="flex">
                    {dbs.length === 0 ? (
                      <select className={`${selectStyle} text-red-500`} disabled>
                        <option>无可用 DB</option>
                      </select>
                    ) : (
                      <select className={`${selectStyle}`} onChange={handleSelectDB}>
                        {dbs.map((db: string) => (
                          <option key={db} value={db}>
                            {db}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-row space-x-4">
              <textarea
                ref={queryArea}
                className="w-full resize-none overflow-y-visible rounded-lg border-my-border bg-my-bg px-4 py-2 leading-normal shadow outline outline-1 outline-my-border dark:bg-my-darkbg1 dark:outline-my-darkborder"
                rows={3}
                onChange={handleChangeText}
                placeholder={'《三体》中有几位面壁人，他们分别是谁'}
              ></textarea>
              <button
                className="inline-block w-24 whitespace-nowrap rounded-md bg-my-primary px-4 py-2 text-lg text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                onClick={fetchQuery}
              >
                发 送
              </button>
            </div>
            <div className="flex rounded-lg border border-my-border p-4 dark:border-my-darkborder">
              <MarkdownCard content={ans} />
              {/* <textarea
                ref={ansArea}
                className="w-full resize-none rounded-lg px-4 py-2 shadow outline outline-1 outline-my-border dark:bg-my-darkbg1 dark:outline-my-darkborder"
                disabled
              ></textarea> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

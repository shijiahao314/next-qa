'use client';

import { API_URL } from '@/app/config';
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
  const [method, setMethod] = useState('local'); // Method
  const queryArea = useRef<HTMLTextAreaElement>(null); // Query
  const ansArea = useRef<HTMLTextAreaElement>(null); // Answer
  const { setHeader } = useHeader();

  const defaultQueryText = '你知道哪些电力知识';

  useEffect(() => {
    // 设置 header 内容
    setHeader(<label className="flex items-center text-xl font-bold">知识图问答</label>);
  }, [setHeader]);

  useEffect(() => {
    async function fetchKBs() {
      try {
        const res = await fetch(API_URL + '/kb', {
          method: 'GET'
        });

        if (res.ok) {
          const rsp: GetKBRsp = await res.json();
          setKBs(rsp.kbs);
          if (rsp.kbs.length > 0) {
            setSelectedKB(rsp.kbs[0]);
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
        const res = await fetch(API_URL + '/db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            kb: selectedKB
          })
        });

        if (res.ok) {
          const data: GetDBRsp = await res.json();
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

    let query = queryArea.current.value;
    if (query === '') {
      query = defaultQueryText;
      queryArea.current.value = query;
    }

    console.log('====================================');
    console.log(selectedKB, selectedDB, method, query);
    console.log('====================================');
    try {
      if (ansArea.current !== null) {
        ansArea.current.value =
          '等待回复中，本地模型第一次对话预计需要 30 秒，后续对话需要 10 秒左右';
      }
      const res = await fetch(API_URL + '/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          kb: selectedKB,
          db: selectedDB,
          method: method,
          text: query
        })
      });

      if (res.ok) {
        const data: QueryRsp = await res.json();
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

  function handleSelectMethod(event: React.ChangeEvent<HTMLSelectElement>) {
    setMethod(event.target.value);
  }

  function handleChangeText(event: React.FormEvent<HTMLTextAreaElement>) {
    if (queryArea.current !== null) {
      queryArea.current.value = event.currentTarget.value;
    }
  }

  const selectStyle = 'h-10 px-4 rounded-lg border border0 bg1 dark:border-my-darkborder';

  return (
    <>
      <title>QA-知识图问答</title>
      <div className="flex h-full w-full flex-col overflow-y-auto sm:relative">
        <label className="border-my-border bg0 dark:border-my-darkborder hidden w-full border-b py-4 pl-8 text-xl font-bold sm:block">
          知识图问答
        </label>
        <div className="flex grow px-8 py-4">
          <div className="border0 flex grow flex-col space-y-4 rounded-lg border p-4 px-4">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
                <div className="flex flex-row">
                  <label className="flex items-center text-lg whitespace-nowrap">知识库：</label>
                  <div className="flex items-center">
                    {kbs.length === 0 ? (
                      <select className={`${selectStyle} text-red-500`} disabled>
                        <option>无可用 KB</option>
                      </select>
                    ) : (
                      <select className={`${selectStyle}`} onChange={handleSelectKB}>
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
                  <label className="flex items-center text-lg whitespace-nowrap">构建库：</label>
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
                <div hidden className="flex flex-row">
                  <label className="flex items-center">Method：</label>
                  <select className={`${selectStyle}`} onChange={handleSelectMethod}>
                    <option key="local">local</option>
                    <option key="global">global</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-row space-x-4">
              <textarea
                ref={queryArea}
                className="border-my-border bg1 outline-my-border dark:outline-my-darkborder w-full resize-none overflow-y-visible rounded-lg px-4 py-2 leading-normal shadow-sm outline"
                rows={3}
                onChange={handleChangeText}
                placeholder={defaultQueryText}
              ></textarea>
              <button className="btn-confirm" onClick={fetchQuery}>
                发 送
              </button>
            </div>
            <div className="flex w-full shrink grow">
              <textarea
                ref={ansArea}
                className="outline-my-border bg1 dark:outline-my-darkborder w-full resize-none rounded-lg px-4 py-2 shadow-sm outline"
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

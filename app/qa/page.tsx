'use client'

import { useState, useEffect, useRef } from 'react'

class GetKBRsp {
  code!: number
  msg!: string
  kbs!: string[]
}

class GetDBRsp {
  code!: number
  msg!: string
  dbs!: string[]
}

class QueryRsp {
  code!: number
  msg!: string
  text!: string
}

export default function Page() {
  const [kbs, setKBs] = useState<string[]>([])  // KB 列表
  const [dbs, setDBs] = useState<string[]>([])  // DB 列表
  const [selectedKB, setSelectedKB] = useState(''); // 所选 KB
  const [selectedDB, setSelectedDB] = useState(''); // 所选 KB
  const [method, setMethod] = useState('local'); // Method

  const queryArea = useRef<HTMLTextAreaElement>(null); // Query
  const ansArea = useRef<HTMLTextAreaElement>(null); // Answer

  useEffect(() => {
    async function fetchKBs() {
      try {
        let res = await fetch('http://localhost:8080/api/kb', {
          method: 'GET'
        })

        if (res.ok) {
          let data: GetKBRsp = await res.json()
          setKBs(data.kbs)
          if (data.kbs.length > 0) {
            setSelectedKB(data.kbs[0])
          }
        } else {
          console.error('Failed to fetch kbs.')
        }
      } catch (error) {
        console.error('Error fetching kbs:', error)
      }
    }
    fetchKBs()
  }, [])

  useEffect(() => {
    if (selectedKB) {
      fetchDBs();
    }
  }, [selectedKB]);

  async function fetchDBs() {
    try {
      let res = await fetch('http://localhost:8080/api/db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          kb: selectedKB,
        })
      });

      if (res.ok) {
        let data: GetDBRsp = await res.json();
        setDBs(data.dbs);
        if (data.dbs.length > 0) {
          setSelectedDB(data.dbs[0])
          // 如果立即使用 selectedDB 无法获取最新值（useState 特性）
        }
      } else {
        console.error('Failed to fetch dbs.');
      }
    } catch (error) {
      console.error('Error fetching dbs:', error);
    }
  }


  async function fetchQuery() {
    if (queryArea.current === null) {
      return
    }

    const query = queryArea.current.value;
    if (query === '') {
      return
    }

    console.log('====================================');
    console.log(selectedKB, selectedDB, method, query);
    console.log('====================================');
    try {
      if (ansArea.current !== null) {
        ansArea.current.value = "等待回复中，本地模型第一次对话预计需要 30 秒，后续对话需要 10 秒左右"
      }
      let res = await fetch('http://localhost:8080/api/query', {
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
        let data: QueryRsp = await res.json();
        if (ansArea.current !== null) {
          ansArea.current.value = data.text;
        }
        console.log('====================================');
        console.log(data)
        console.log('====================================');
      } else {
        console.error('Failed to fetch query.');
        if (ansArea.current !== null) {
          ansArea.current.value = "Failed to fetch query.";
        }
      }
    } catch (error) {
      console.error('Error fetching query:', error);
      if (ansArea.current !== null) {
        ansArea.current.value = "Error fetching query:" + error;
      }
    }
  }

  function handleSelectKB(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedKB(event.target.value)
  }

  function handleSelectDB(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDB(event.target.value)
  }

  function handleSelectMethod(event: React.ChangeEvent<HTMLSelectElement>) {
    setMethod(event.target.value)
  }

  function handleChangeText(event: React.FormEvent<HTMLTextAreaElement>) {
    if (queryArea.current !== null) {
      queryArea.current.value = event.currentTarget.value
    }
  }

  const selectStyle = "h-10 px-4 rounded-lg border-2 border-solid border-my-border bg-my-bg dark:border-my-darkborder dark:bg-my-darkbg1"

  return (
    <>
      <head>
        <title>QA - 知识库问答</title>
      </head>
      <div className="absolute overflow-hidden md:relative w-full h-full flex flex-col p-10">
        <label className="text-4xl">知识库问答</label>
        <div className="flex flex-grow flex-col m-4">
          <div className="flex flex-col">
            <label className="inline-block whitespace-nowrap text-2xl">
              Select
            </label>
            <div className="flex flex-col m-4 gap-x-6 gap-y-4">
              <div className="flex flex-row">
                <label className="flex items-center whitespace-nowrap text-lg">
                  KB 知识库：
                </label>
                <div className="flex items-center">
                  {kbs.length === 0 ?
                    <select className={`${selectStyle} text-red-500`} disabled>
                      <option>无可用 KB</option>
                    </select>
                    :
                    <select className={`${selectStyle}`}
                      onChange={handleSelectKB}>
                      {kbs.map((kb: string) => (
                        <option className="" key={kb} value={kb}>{kb}</option>
                      ))}
                    </select>
                  }
                </div>
              </div>
              <div className="flex flex-row">
                <label className="flex items-center whitespace-nowrap text-lg">
                  DB 数据库：
                </label>
                <div className="flex">
                  {dbs.length === 0 ?
                    <select className={`${selectStyle} text-red-500`} disabled>
                      <option>无可用 DB</option>
                    </select>
                    :
                    <select className={`${selectStyle}`}
                      onChange={handleSelectDB}>
                      {dbs.map((db: string) => (
                        <option key={db} value={db}>{db}</option>
                      ))}
                    </select>
                  }
                </div>
              </div>
            </div >
          </div>

          <div className="flex flex-grow flex-col">
            <label className="inline-block whitespace-nowrap text-2xl">
              Query
            </label>
            <div className="flex flex-grow flex-col m-4 p-4 gap-3 border-2 rounded-lg border-my-border dark:border-my-darkborder">
              <div className="flex flex-row gap-2">
                <label className="flex items-center whitespace-nowrap">
                  Method:
                </label>
                <select className={`${selectStyle}`}
                  onChange={handleSelectMethod}>
                  <option key="local">local</option>
                  <option key="global">global</option>
                </select>
              </div>
              <div className="w-full flex flex-row gap-3">
                <textarea
                  ref={queryArea}
                  className="w-full px-4 py-2 text-xl resize-none overflow-y-visible break-words rounded-lg border-my-border bg-my-bg pb-2 pl-4 pr-32 pt-2 leading-normal shadow outline outline-2 outline-my-border dark:bg-my-darkbg1 dark:outline-my-darkborder"
                  rows={3}
                  onChange={handleChangeText}
                  placeholder={`${method === "local" ? "What are the top themes in this story?" : "Who is Scrooge, and what are his main relationships?"}`}>
                </textarea>
                <button
                  className="w-24 inline-block whitespace-nowrap px-4 py-2 text-lg text-white rounded-md bg-my-primary dark:bg-my-darkPrimary hover:bg-my-primaryHover dark:hover:bg-my-darkPrimaryHover"
                  onClick={fetchQuery}
                >
                  发 送
                </button>
              </div>
              <div className="w-full flex flex-grow gap-2">
                <textarea
                  ref={ansArea}
                  className="w-full px-4 py-2 text-xl text-black rounded-md resize-none disabled:bg-blue-200"
                  disabled>
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

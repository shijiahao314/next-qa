'use client';

import { API_URL } from '@/app/config';
import { useHeader } from '@/components/frame/HeaderProvider';
import KBSettingModal from '@/components/frame/SettingModal';
import { useEffect, useState } from 'react';

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

class GetInputRsp {
  code!: number;
  msg!: string;
  files!: string[];
}

class GetOuptutRsp {
  code!: number;
  msg!: string;
  files!: string[];
}

export default function KBPage() {
  const [kbs, setKBs] = useState<string[]>([]); // KB 列表
  const [dbs, setDBs] = useState<string[]>([]); // DB 列表
  const [selectedKB, setSelectedKB] = useState(''); // 所选 KB
  const [selectedDB, setSelectedDB] = useState(''); // 所选 KB
  const [inputs, setInputs] = useState<string[]>([]); // Input 列表
  const [outputs, setOutputs] = useState<string[]>([]); // Output 列表
  const { setHeader } = useHeader();

  useEffect(() => {
    // 设置 header 内容
    setHeader(<label className="flex items-center text-xl font-bold">知识库管理</label>);
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
    async function fetchInputs() {
      try {
        let res = await fetch(API_URL + '/kb/input', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            kb: selectedKB
          })
        });

        if (res.ok) {
          let data: GetInputRsp = await res.json();
          setInputs(data.files);
        } else {
          console.error('Failed to fetch inputs.');
        }
      } catch (error) {
        console.error('Error fetching inputs:', error);
      }
    }
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
      fetchInputs();
      fetchDBs();
    }
  }, [selectedKB]);

  useEffect(() => {
    async function fetchOutputs() {
      try {
        let res = await fetch(API_URL + '/db/output', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            kb: selectedKB,
            db: selectedDB
          })
        });

        if (res.ok) {
          let data: GetOuptutRsp = await res.json();
          setOutputs(data.files);
        } else {
          console.error('Failed to fetch outputs.');
        }
      } catch (error) {
        console.error('Error fetching outputs:', error);
      }
    }

    if (selectedDB) {
      if (dbs.length > 0) {
        fetchOutputs();
      } else {
        setOutputs([]);
      }
    }
  }, [dbs, selectedDB]);

  function handleSelectKB(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedKB(event.target.value);
  }

  function handleSelectDB(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDB(event.target.value);
  }

  const selectStyle =
    'h-10 px-4 rounded-lg border border-solid border-my-border bg-my-bg dark:border-my-darkborder dark:bg-my-darkbg1';

  const [modalOpen, setModalOpen] = useState(false);

  const settings = [
    [
      // group1
      {
        title: 'LLM',
        descp: '对话使用的 LLM 模型',
        value: (
          <select
            id="countries"
            className="h-10 rounded-lg border border-solid border-my-border bg-my-bg text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-10 w-48 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-10 w-48 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-10 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-10 rounded-lg border border-solid border-my-border bg-my-bg text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-10 w-48 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-10 w-48 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
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
            className="h-10 rounded-lg border border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
            placeholder="25"
            defaultValue={25}
          ></input>
        )
      }
    ]
  ];

  // 上传文件
  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      console.log('====================================');
      console.log(file);
      console.log('====================================');
    }
  }

  return (
    <>
      <title>KB-知识库管理</title>
      <div className="flex w-full flex-col overflow-y-auto md:relative">
        <label className="hidden w-full border-b border-my-border bg-my-bg py-4 pl-8 text-xl font-bold dark:border-my-darkborder dark:bg-my-darkbg1/50 sm:block">
          知识库管理
        </label>
        <div className="flex flex-grow flex-col gap-4 overflow-y-auto px-8 py-4">
          {/* 输入文件管理 */}
          <div className="flex flex-col gap-2 rounded-lg border border-my-border px-4 pb-4 pt-2 dark:border-my-darkborder sm:gap-4">
            <label className="text-lg font-semibold">输入文件</label>
            <div className="flex flex-row flex-wrap justify-between gap-2 sm:gap-4">
              <div className="flex flex-row">
                <label className="flex items-center whitespace-nowrap text-lg">KB 知识库：</label>
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
              <div
                className={
                  'flex flex-row gap-2 sm:gap-4 ' + ` ${selectedKB === '' ? 'hidden' : ''}`
                }
              >
                <button
                  onClick={() => {
                    // 配置
                    console.log('配置');
                    setModalOpen(true);
                  }}
                  className="h-10 w-16 rounded-lg bg-my-primary text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                >
                  配置
                </button>
                <button
                  onClick={() => {
                    // 上传文件
                    console.log('上传文件');
                    document.getElementById('upload')?.click();
                  }}
                  className="h-10 w-24 rounded-lg bg-my-primary text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                >
                  上传文件
                </button>
                <input
                  className="hidden"
                  type="file"
                  name="upload"
                  id="upload"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={() => {
                    // Indexing
                    console.log('Indexing');
                  }}
                  className="h-10 w-24 rounded-lg bg-my-primary text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                >
                  Indexing
                </button>
                <button
                  onClick={() => {
                    // 上传文件
                    console.log('删除文件');
                  }}
                  className="h-10 w-16 rounded-lg bg-my-danger text-white hover:bg-my-dangerHover dark:bg-my-darkDanger dark:hover:bg-my-darkDangerHover"
                >
                  删除
                </button>
              </div>
            </div>
            <table className="w-full text-left">
              <thead className="border-y-2 border-my-border dark:border-my-darkborder">
                <tr className="">
                  <th className="flex h-10 items-center justify-center">选择</th>
                  <th className="px-6">文件名</th>
                  <th className="px-6">文件类型</th>
                </tr>
              </thead>
              <tbody>
                {inputs.map((filename: string) => (
                  <tr
                    className="border-b border-my-border dark:border-my-darkborder"
                    key={filename}
                  >
                    <td className="flex h-10 items-center justify-center">
                      <input
                        type="checkbox"
                        value=""
                        className="h-4 w-4 cursor-pointer appearance-none rounded-md border-gray-300 bg-gray-100 bg-transparent text-blue-600 ring-2 ring-offset-2 checked:bg-my-primary focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:checked:bg-my-darkPrimary dark:focus:ring-blue-600"
                      ></input>
                    </td>
                    <td className="px-6">{filename}</td>
                    <td className="px-6">.{filename.split('.')[filename.split('.').length - 1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 输出文件管理 */}
          <div className="flex flex-col gap-2 rounded-lg border border-my-border px-4 pb-4 pt-2 dark:border-my-darkborder sm:gap-4">
            <label className="text-lg font-semibold">输出文件</label>
            <div className="flex w-full flex-grow flex-col gap-2 overflow-x-auto sm:flex-row sm:gap-4">
              <div className="flex flex-grow flex-col gap-2 sm:gap-4">
                <div className="flex flex-row flex-wrap justify-between gap-2 sm:gap-4">
                  <div className="flex flex-row">
                    <label className="flex items-center whitespace-nowrap text-lg">
                      DB 数据库：
                    </label>
                    <div className="flex items-center">
                      {dbs.length === 0 ? (
                        <select className={`${selectStyle} text-red-500`} disabled>
                          <option>无可用 DB</option>
                        </select>
                      ) : (
                        <select className={`${selectStyle}`} onChange={handleSelectDB}>
                          {dbs.map((db: string) => (
                            <option className="" key={db} value={db}>
                              {db}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  <div className={'flex flex-row gap-4 ' + `${selectedDB === '' ? 'hidden' : ''}`}>
                    <button
                      onClick={() => {
                        // 上传文件
                        console.log('删除文件');
                      }}
                      className="h-10 w-16 rounded-lg bg-my-danger text-white hover:bg-my-dangerHover dark:bg-my-darkDanger dark:hover:bg-my-darkDangerHover"
                    >
                      删除
                    </button>
                  </div>
                </div>
                <table className="max-w-full table-auto overflow-scroll text-left">
                  <thead className="border-y-2 border-my-border dark:border-my-darkborder">
                    <tr className="h-10">
                      <th className="whitespace-nowrap text-center">选择</th>
                      <th className="whitespace-nowrap pl-6">文件名</th>
                      <th className="whitespace-nowrap pl-6">文件类型</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outputs.map((filename: string) => (
                      <tr
                        className="border-b border-my-border dark:border-my-darkborder"
                        key={filename}
                      >
                        <td className="flex h-10 items-center justify-center">
                          <input
                            type="checkbox"
                            value=""
                            className="h-4 w-4 cursor-pointer appearance-none rounded-md border-gray-300 bg-gray-100 bg-transparent text-blue-600 ring-2 ring-offset-2 checked:bg-my-primary focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:checked:bg-my-darkPrimary dark:focus:ring-blue-600"
                          ></input>
                        </td>
                        <td className="px-6">{filename}</td>
                        <td className="px-6">
                          .{filename.split('.')[filename.split('.').length - 1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className="flex flex-grow">
                <textarea className="w-full rounded-lg border border-my-border dark:border-my-darkborder"></textarea>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* 知识库设置 */}
      <KBSettingModal title="知识库设置" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex h-full w-full flex-col gap-5">
          {settings.map((group, index) => (
            <div
              key={index}
              className="divide-y-2 divide-solid rounded-lg border border-my-border dark:border-my-darkborder"
            >
              {group.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-row items-center justify-between gap-2 border-my-border px-5 py-3 dark:border-my-darkborder"
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
        </div>
      </KBSettingModal>
    </>
  );
}

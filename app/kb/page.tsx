'use client';

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

const API_URL = 'http://10.112.20.92:8080/api';

export default function KBPage() {
  const [kbs, setKBs] = useState<string[]>([]); // KB 列表
  const [dbs, setDBs] = useState<string[]>([]); // DB 列表
  const [selectedKB, setSelectedKB] = useState(''); // 所选 KB
  const [selectedDB, setSelectedDB] = useState(''); // 所选 KB
  const [inputs, setInputs] = useState<string[]>([]); // Input 列表
  const [outputs, setOutputs] = useState<string[]>([]); // Output 列表

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
      fetchOutputs();
    }
  }, [selectedDB]);

  function handleSelectKB(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedKB(event.target.value);
  }

  const selectStyle =
    'h-10 px-4 rounded-lg border-2 border-solid border-my-border bg-my-bg dark:border-my-darkborder dark:bg-my-darkbg1';

  return (
    <>
      <title>KB-知识库管理</title>
      <div className="flex w-full flex-col overflow-y-auto md:relative">
        <label className="shadow-b-2 w-full border-b border-my-border py-4 pl-8 text-xl font-bold dark:border-my-darkborder">
          知识库管理
        </label>
        <div className="flex flex-grow flex-col gap-4 overflow-y-auto px-8 py-4">
          {/* 输入文件管理 */}
          <div className="flex flex-col gap-2 rounded-lg border-2 border-my-border px-4 pb-4 pt-2 dark:border-my-darkborder sm:gap-4">
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
              <div className="flex flex-row gap-2 sm:gap-4">
                <button
                  onClick={() => {
                    // 上传文件
                    console.log('上传文件');
                  }}
                  className="h-10 w-24 rounded-lg bg-my-primary text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                >
                  上传文件
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
                    <td className="flex h-8 items-center justify-center">
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
          <div className="flex flex-grow flex-col gap-2 rounded-lg border-2 border-my-border px-4 pb-4 pt-2 dark:border-my-darkborder">
            <label className="text-lg font-semibold">输出文件</label>
            <div className="flex w-full flex-grow flex-col gap-2 overflow-x-auto sm:flex-row">
              <div className="flex flex-grow flex-col gap-2">
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
                        <select className={`${selectStyle}`} onChange={handleSelectKB}>
                          {dbs.map((db: string) => (
                            <option className="" key={db} value={db}>
                              {db}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
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
                        <td className="flex h-8 items-center justify-center">
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
              <div className="flex flex-grow">
                <textarea className="w-full rounded-lg border-2 border-my-border dark:border-my-darkborder"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

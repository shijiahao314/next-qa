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

class QueryRsp {
  code!: number;
  msg!: string;
  text!: string;
}

const API_URL = 'http://10.112.20.92:8080/api';

export default function KBPage() {
  const [kbs, setKBs] = useState<string[]>([]); // KB 列表
  const [selectedKB, setSelectedKB] = useState(''); // 所选 KB

  useEffect(() => {
    async function fetchKBs() {
      try {
        let res = await fetch(API_URL + '/kb', {
          method: 'GET'
        });

        if (res.ok) {
          let data: GetKBRsp = await res.json();
          setKBs(data.kbs);
          // if (data.kbs.length > 0) {
          //   setSelectedKB(data.kbs[0]);
          // }
        } else {
          console.error('Failed to fetch kbs.');
        }
      } catch (error) {
        console.error('Error fetching kbs:', error);
      }
    }
    fetchKBs();
  }, []);

  function handleSelectKB(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedKB(event.target.value);
  }

  const selectStyle =
    'h-10 px-4 rounded-lg border-2 border-solid border-my-border bg-my-bg dark:border-my-darkborder dark:bg-my-darkbg1';

  return (
    <>
      <title>KB-知识库管理</title>
      <div className="flex h-full w-full flex-col overflow-hidden p-8 md:relative md:p-16">
        <label className="w-full text-4xl">知识库管理</label>
        <div className="flex h-full w-full flex-col gap-4 overflow-x-auto p-4">
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

          {/* 输入文件管理 */}
          <div className="flex flex-col gap-2 rounded-lg border-2 border-my-border p-4 dark:border-my-darkborder">
            <label className="text-lg italic">输入文件</label>
            <div className="flex flex-row justify-between">
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
            <table className="w-full text-left rtl:text-right">
              <thead className="border-y-2 border-my-border dark:border-my-darkborder">
                <tr className="">
                  <th className="flex h-10 items-center justify-center">选择</th>
                  <th className="px-6">文件名</th>
                  <th className="px-6">文件类型</th>
                </tr>
              </thead>
              <tbody>
                {kbs.map((kb: string) => (
                  <tr className="border-b border-my-border dark:border-my-darkborder" key={kb}>
                    <td className="flex h-10 items-center justify-center">
                      <input
                        type="checkbox"
                        value=""
                        className="h-4 w-4 cursor-pointer appearance-none rounded-md border-gray-300 bg-gray-100 text-blue-600 ring-2 ring-offset-2 checked:bg-my-primary focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:checked:bg-my-darkPrimary dark:focus:ring-blue-600"
                      ></input>
                    </td>
                    <td className="px-6">{kb}</td>
                    <td className="px-6">{kb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 输出文件管理 */}
          <div className="flex flex-grow flex-col gap-2 rounded-lg border-2 border-my-border p-4 dark:border-my-darkborder">
            <label className="text-lg italic">输出文件</label>
            <div className="flex h-full flex-row">
              <div className="flex flex-grow flex-col">
                <div className="flex flex-row place-items-end justify-between">
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
                <table className="w-full text-left rtl:text-right">
                  <thead className="border-y-2 border-my-border dark:border-my-darkborder">
                    <tr className="">
                      <th className="flex h-10 items-center justify-center">选择</th>
                      <th className="px-6">文件名</th>
                      <th className="px-6">文件类型</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kbs.map((kb: string) => (
                      <tr className="border-b border-my-border dark:border-my-darkborder" key={kb}>
                        <td className="flex h-10 items-center justify-center">
                          <input
                            type="checkbox"
                            value=""
                            className="h-4 w-4 cursor-pointer appearance-none rounded-md border-gray-300 bg-gray-100 text-blue-600 ring-2 ring-offset-2 checked:bg-my-primary focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:checked:bg-my-darkPrimary dark:focus:ring-blue-600"
                          ></input>
                        </td>
                        <td className="px-6">{kb}</td>
                        <td className="px-6">{kb}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <label className="border-2 border-my-border dark:border-my-darkborder">
                  文件内容
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

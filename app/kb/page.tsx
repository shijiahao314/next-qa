'use client';

import { API_URL } from '@/app/config';
import { useHeader } from '@/components/frame/HeaderProvider';
import { useEffect, useState } from 'react';
import { CreateKBModal } from './CreateKBModal';
import { KBSettingsModal } from './KBSettingsModal';

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
  const { setHeader } = useHeader(); // header
  useEffect(() => {
    // 设置 header 内容
    setHeader(<label className="flex items-center text-xl font-bold">知识库管理</label>);
  }, [setHeader]);

  const [kbs, setKBs] = useState<string[]>([]); // KB 列表
  const [selectedKB, setSelectedKB] = useState(''); // 所选 KB

  const [createKBModalOpen, setCreateKBModalOpen] = useState(false); // 创建 KB 页面

  const [kbSettingModalOpen, setKbSettingModalOpen] = useState(false); // KB 配置页面

  const [dbs, setDBs] = useState<string[]>([]); // DB 列表
  const [selectedDB, setSelectedDB] = useState(''); // 所选 DB

  const [inputs, setInputs] = useState<string[]>([]); // Input 列表
  const [outputs, setOutputs] = useState<string[]>([]); // Output 列表

  useEffect(() => {
    async function fetchKBs() {
      console.log('====================================');
      console.log('获取知识库列表');
      console.log('====================================');
      try {
        let res = await fetch(API_URL + '/kb', {
          method: 'GET'
        });

        let rsp: GetKBRsp = await res.json();
        if (res.ok) {
          setKBs(rsp.kbs);
          if (rsp.kbs.length > 0) {
            setSelectedKB(rsp.kbs[0]);
          }
        } else {
          console.log(`Failed to fetch kbs: ${rsp.msg}`);
        }
      } catch (error) {
        console.log('Error fetching kbs:', error);
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
          console.warn('Failed to fetch inputs.');
        }
      } catch (error) {
        console.warn('Error fetching inputs:', error);
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
          console.warn('Failed to fetch dbs.');
        }
      } catch (error) {
        console.warn('Error fetching dbs:', error);
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
          console.warn('Failed to fetch outputs.');
        }
      } catch (error) {
        console.warn('Error fetching outputs:', error);
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

  // 上传文件
  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      console.log('====================================');
      console.log(file);
      console.log('====================================');
    }
  }

  // 点击知识库
  function handleKBClick(kb: string) {
    console.log('====================================');
    console.log(`知识库 ${kb}`);
    console.log('====================================');
  }

  // 删除知识库
  async function handleDeleteKB() {
    let kb: string = selectedKB;
    console.log('====================================');
    console.log(`删除知识库：${kb}`);
    console.log('====================================');
    try {
      class DeleteKBReq {
        name!: string;
      }
      let res = await fetch(API_URL + '/kb/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: kb
        } as DeleteKBReq)
      });
      class DeleteKBRsp {
        code!: number;
        msg!: string;
      }
      let rsp: DeleteKBRsp = await res.json();
      console.log(rsp.msg);
      if (res.ok) {
        window.location.reload(); // 刷新页面
      } else {
        console.log(`Failed to delete kb: ${rsp.msg}`);
      }
    } catch (error) {
      console.log('Error deleting kb:', error);
    }
  }

  return (
    <>
      <title>KB-知识库管理</title>
      <div className="flex w-full flex-col overflow-y-auto sm:relative">
        <label className="hidden w-full border-b border-my-border bg-my-bg py-4 pl-8 text-xl font-bold dark:border-my-darkborder dark:bg-my-darkbg1/50 sm:block">
          知识库管理
        </label>
        <div className="flex flex-grow flex-col space-y-4 overflow-y-auto px-8 py-4">
          {/* 知识库管理 */}
          <div className="flex flex-col space-y-2 rounded-lg border border-my-border px-4 py-2 dark:border-my-darkborder">
            <label className="text-lg font-semibold">知识库</label>
            <div className="flex flex-row flex-wrap justify-end gap-2">
              <div className="flex h-10 flex-row space-x-2 overflow-x-auto">
                <button
                  onClick={() => {
                    setCreateKBModalOpen(true);
                  }}
                  className="whitespace-nowrap rounded-lg bg-my-primary px-5 text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                >
                  新建知识库
                </button>
                <button
                  onClick={() => {
                    // 删除知识库
                    handleDeleteKB();
                  }}
                  className="whitespace-nowrap rounded-lg bg-my-danger px-5 text-white hover:bg-my-dangerHover dark:bg-my-darkDanger dark:hover:bg-my-darkDangerHover"
                >
                  删除
                </button>
              </div>
            </div>
            <div className="flex w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-y-2 border-my-border dark:border-my-darkborder">
                  <tr className="">
                    <th className="flex h-10 items-center justify-center">选择</th>
                    <th className="px-4">知识库名</th>
                    <th className="px-4">知识库类型</th>
                  </tr>
                </thead>
                <tbody>
                  {kbs.map((filename: string) => (
                    <tr
                      className="border-b border-my-border dark:border-my-darkborder"
                      key={filename}
                    >
                      <td className="flex h-10 items-center justify-center">
                        <input
                          type="checkbox"
                          className="h-3 w-3 cursor-pointer appearance-none rounded-sm border-gray-300 bg-gray-100 bg-transparent text-blue-600 ring-2 ring-offset-2 checked:bg-my-primary focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:checked:bg-my-darkPrimary dark:focus:ring-blue-600"
                        ></input>
                      </td>
                      <td
                        className="cursor-pointer px-4 underline underline-offset-4"
                        onClick={() => handleKBClick(filename)}
                      >
                        {filename}
                      </td>
                      <td className="px-4">{filename}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* 输入文件管理 */}
          <div className="flex flex-col space-y-2 rounded-lg border border-my-border px-4 py-2 dark:border-my-darkborder">
            <label className="text-lg font-semibold">输入文件</label>
            <div className="flex flex-row flex-wrap justify-between gap-2">
              <div className="flex flex-row">
                <label className="flex items-center whitespace-nowrap text-lg">知识库：</label>
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
              <div className="flex h-10 flex-row space-x-2 overflow-x-auto">
                <button
                  onClick={() => {
                    // 配置
                    console.log('====================================');
                    console.log('配置');
                    console.log('====================================');
                    setKbSettingModalOpen(true);
                  }}
                  className="whitespace-nowrap rounded-lg bg-my-primary px-5 text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                >
                  配置
                </button>
                <button
                  onClick={() => {
                    // 上传文件
                    console.log('上传文件');
                    document.getElementById('upload')?.click();
                  }}
                  className="whitespace-nowrap rounded-lg bg-my-primary px-5 text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
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
                  className="whitespace-nowrap rounded-lg bg-my-primary px-5 text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                >
                  Indexing
                </button>
                <button
                  onClick={() => {
                    // 上传文件
                    console.log('删除文件');
                  }}
                  className="whitespace-nowrap rounded-lg bg-my-danger px-5 text-white hover:bg-my-dangerHover dark:bg-my-darkDanger dark:hover:bg-my-darkDangerHover"
                >
                  删除
                </button>
              </div>
            </div>
            <div className="flex w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-y-2 border-my-border dark:border-my-darkborder">
                  <tr className="">
                    <th className="flex h-10 items-center justify-center">选择</th>
                    <th className="px-4">文件名</th>
                    <th className="px-4">文件类型</th>
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
                          className="h-3 w-3 cursor-pointer appearance-none rounded-sm border-gray-300 bg-gray-100 bg-transparent text-blue-600 ring-2 ring-offset-2 checked:bg-my-primary focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:checked:bg-my-darkPrimary dark:focus:ring-blue-600"
                        ></input>
                      </td>
                      <td className="px-4">{filename}</td>
                      <td className="px-4">
                        .{filename.split('.')[filename.split('.').length - 1]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* 输出文件管理 */}
            <div className="flex flex-col space-y-2 rounded-lg border border-my-border px-4 py-2 dark:border-my-darkborder">
              <label className="text-lg font-semibold">输出文件</label>
              <div className="flex flex-row flex-wrap justify-between gap-2">
                <div className="flex flex-row">
                  <label className="flex items-center whitespace-nowrap text-lg">构建库：</label>
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
                <div className="flex flex-row space-x-2">
                  <button
                    onClick={() => {
                      console.log('删除文件');
                    }}
                    className="h-10 w-16 rounded-lg bg-my-danger text-white hover:bg-my-dangerHover dark:bg-my-darkDanger dark:hover:bg-my-darkDangerHover"
                  >
                    删除
                  </button>
                </div>
              </div>
              <div className="flex w-full overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-y-2 border-my-border dark:border-my-darkborder">
                    <tr className="h-10">
                      <th className="whitespace-nowrap text-center">选择</th>
                      <th className="whitespace-nowrap px-4">文件名</th>
                      <th className="whitespace-nowrap px-4">文件类型</th>
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
                        <td className="px-4">{filename}</td>
                        <td className="px-4">
                          .{filename.split('.')[filename.split('.').length - 1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 创建知识库 */}
      <CreateKBModal
        modalOpen={createKBModalOpen}
        setModalOpen={setCreateKBModalOpen}
      ></CreateKBModal>

      {/* 知识库设置 */}
      <KBSettingsModal
        modalOpen={kbSettingModalOpen}
        setModalOpen={setKbSettingModalOpen}
      ></KBSettingsModal>
    </>
  );
}

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
  const [checkedKBs, setCheckedKBs] = useState<string[]>([]);
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
        const res = await fetch(API_URL + '/kb', {
          method: 'GET'
        });

        const rsp: GetKBRsp = await res.json();
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
        const res = await fetch(API_URL + '/kb/input', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            kb: selectedKB
          })
        });

        if (res.ok) {
          const data: GetInputRsp = await res.json();
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
          const rsp: GetDBRsp = await res.json();
          setDBs(rsp.dbs);
          if (rsp.dbs.length > 0) {
            setSelectedDB(rsp.dbs[0]);
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
        const res = await fetch(API_URL + '/db/output', {
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
          const rsp: GetOuptutRsp = await res.json();
          setOutputs(rsp.files);
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
  }, [dbs, selectedKB, selectedDB]);

  function handleSelectKB(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedKB(event.target.value);
  }

  function handleSelectDB(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDB(event.target.value);
  }

  const selectStyle = 'h-10 px-4 rounded-lg border bg1 border0';

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
    try {
      class DeleteKBReq {
        name!: string;
      }
      const kbs: string[] = checkedKBs;
      for (let i = 0; i < kbs.length; i++) {
        const kb: string = kbs[i];
        console.log('====================================');
        console.log(`删除知识库：${kb}`);
        console.log('====================================');
        const res = await fetch(API_URL + '/kb/delete', {
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
        const rsp: DeleteKBRsp = await res.json();
        console.log(rsp.msg);
        if (!res.ok) {
          console.log(`Failed to delete kb: ${rsp.msg}`);
          break;
        }
      }
      window.location.reload(); // 刷新页面
    } catch (error) {
      console.log('Error deleting kb:', error);
    }
  }

  return (
    <>
      <title>KB-知识库管理</title>
      <div className="flex h-full w-full flex-col overflow-y-auto sm:relative">
        <label className="border-my-border bg0 dark:border-my-darkborder hidden w-full border-b py-4 pl-8 text-xl font-bold sm:block">
          知识库管理
        </label>
        <div className="flex grow flex-col space-y-4 overflow-y-auto px-8 py-4">
          {/* 知识库管理 */}
          <div className="border0 flex flex-col space-y-2 rounded-lg border px-4 py-2">
            <label className="text-lg font-semibold">知识库</label>
            <div className="flex flex-row flex-wrap justify-end gap-2">
              <div className="flex h-10 flex-row space-x-2 overflow-x-auto">
                <button
                  onClick={() => {
                    setCreateKBModalOpen(true);
                  }}
                  className="btn-confirm"
                >
                  新建知识库
                </button>
                <button
                  onClick={() => {
                    // 删除知识库
                    handleDeleteKB();
                  }}
                  className="btn-delete"
                >
                  删除
                </button>
              </div>
            </div>
            <div className="flex w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border0 border-y-2">
                  <tr className="">
                    <th className="flex h-10 items-center justify-center">选择</th>
                    <th className="px-4">知识库名</th>
                    <th className="px-4">知识库类型</th>
                  </tr>
                </thead>
                <tbody>
                  {kbs.map((filename: string) => (
                    <tr className="border0 border-b" key={filename}>
                      <td className="flex h-10 items-center justify-center">
                        <input
                          type="checkbox"
                          className="checkbox h-3 w-3"
                          onChange={(e) => {
                            if (e.target.checked) {
                              // checked
                              setCheckedKBs((checkedKBs) => [...checkedKBs, filename]);
                            } else {
                              // unchecked
                              setCheckedKBs((checkedKBs) =>
                                checkedKBs.filter((name) => name !== filename)
                              );
                            }
                          }}
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
          <div className="border0 flex grow flex-col space-y-2 rounded-lg border px-4 py-2">
            <label className="text-lg font-semibold">输入文件</label>
            <div className="flex flex-row flex-wrap justify-between gap-2">
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
              <div className="flex h-10 flex-row space-x-2 overflow-x-auto">
                <button
                  onClick={() => {
                    // 配置
                    console.log('====================================');
                    console.log('配置');
                    console.log('====================================');
                    setKbSettingModalOpen(true);
                  }}
                  className="btn-confirm"
                >
                  配置
                </button>
                <button
                  onClick={() => {
                    // 上传文件
                    console.log('上传文件');
                    document.getElementById('upload')?.click();
                  }}
                  className="btn-confirm"
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
                  className="btn-confirm"
                >
                  Indexing
                </button>
                <button
                  onClick={() => {
                    // 上传文件
                    console.log('删除文件');
                  }}
                  className="btn-delete"
                >
                  删除
                </button>
              </div>
            </div>
            <div className="flex w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border0 border-y-2">
                  <tr className="">
                    <th className="flex h-10 items-center justify-center">选择</th>
                    <th className="px-4">文件名</th>
                    <th className="px-4">文件类型</th>
                  </tr>
                </thead>
                <tbody>
                  {inputs.map((filename: string) => (
                    <tr className="border0 border-b" key={filename}>
                      <td className="flex h-10 items-center justify-center">
                        <input type="checkbox" className="checkbox h-3 w-3"></input>
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
            <div className="border0 flex grow flex-col space-y-2 rounded-lg border px-4 py-2">
              <label className="text-lg font-semibold">输出文件</label>
              <div className="flex flex-row flex-wrap justify-between gap-2">
                <div className="flex flex-row">
                  <label className="flex items-center text-lg whitespace-nowrap">构建库：</label>
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
                    className="btn-delete"
                  >
                    删除
                  </button>
                </div>
              </div>
              <div className="flex w-full overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border0 border-y-2">
                    <tr className="h-10">
                      <th className="text-center whitespace-nowrap">选择</th>
                      <th className="px-4 whitespace-nowrap">文件名</th>
                      <th className="px-4 whitespace-nowrap">文件类型</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outputs.map((filename: string) => (
                      <tr className="border0 border-b" key={filename}>
                        <td className="flex h-10 items-center justify-center">
                          <input type="checkbox" className="checkbox h-3 w-3"></input>
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

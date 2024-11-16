'use client';

import { API_URL } from '@/app/config';
import { useHeader } from '@/components/frame/HeaderProvider';
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

class GetLogsRsp {
  code!: number;
  msg!: string;
  files!: string;
}

export default function LogsPage() {
  const [kbs, setKBs] = useState<string[]>([]); // KB 列表
  const [dbs, setDBs] = useState<string[]>([]); // DB 列表
  const [selectedKB, setSelectedKB] = useState(''); // 所选 KB
  const [selectedDB, setSelectedDB] = useState(''); // 所选 KB
  const [logsText, setLogsText] = useState(''); // 日志内容
  const { setHeader } = useHeader();

  useEffect(() => {
    // 设置 header 内容
    setHeader(
      <>
        <div className="flex flex-col items-center justify-center">
          {/* <label className="text-lg font-semibold">NextQA</label> */}
          <label className="flex items-center text-xl font-bold">日志监控</label>
        </div>
      </>
    );
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

  useEffect(() => {
    async function fetchLogs() {
      try {
        let res = await fetch(API_URL + '/db/logs', {
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
          let data: GetLogsRsp = await res.json();
          console.log(data);
          setLogsText(data.files);
        } else {
          console.error('Failed to fetch logs.');
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    }

    if (selectedKB && selectedDB) {
      fetchLogs();
    }
  }, [selectedKB, selectedDB]);

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

  return (
    <>
      <title>Logs-日志监控</title>
      <div className="flex h-full w-full flex-col overflow-y-auto">
        <label className="hidden w-full border-b border-my-border bg-my-bg py-4 pl-8 text-xl font-bold dark:border-my-darkborder dark:bg-my-darkbg1/50 sm:block">
          日志监控
        </label>
        <div className="flex flex-grow flex-col space-y-4 overflow-y-auto px-8 py-4">
          {/* 输入文件管理 */}
          <div className="flex flex-grow flex-col space-y-2 rounded-lg border border-my-border p-4 dark:border-my-darkborder">
            {/* <label className="text-lg font-semibold">日志查看</label> */}
            <div className="flex flex-row flex-wrap justify-between gap-2">
              {/* 知识库 */}
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
              {/* 数据库 */}
              <div className="flex flex-row">
                <label className="flex items-center whitespace-nowrap text-lg">DB 数据库：</label>
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
              <div
                className={
                  'sm:space-4 flex flex-row space-x-2 ' + ` ${selectedKB === '' ? 'hidden' : ''}`
                }
              >
                <button
                  onClick={() => {
                    // 上传文件
                    console.log('上传文件');
                    document.getElementById('upload')?.click();
                  }}
                  className="h-10 w-24 rounded-lg bg-my-primary text-white hover:bg-my-primaryHover dark:bg-my-darkPrimary dark:hover:bg-my-darkPrimaryHover"
                >
                  下载
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
                    // 上传文件
                    console.log('删除文件');
                  }}
                  className="h-10 w-16 rounded-lg bg-my-danger text-white hover:bg-my-dangerHover dark:bg-my-darkDanger dark:hover:bg-my-darkDangerHover"
                >
                  删除
                </button>
              </div>
            </div>
            <textarea
              className="flex flex-grow resize-none overflow-y-auto whitespace-nowrap rounded-lg border border-my-border p-2 text-xs dark:border-my-darkborder"
              onChange={(e) => setLogsText(e.target.value)}
              value={logsText}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

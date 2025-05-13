'use client';

import { useHeader } from '@/components/frame/HeaderProvider';
import { ReactNode, useEffect, useState } from 'react';
import OpenAISetting from './opanei';
import DeepSeekSetting from './deepseek';

export default function Page() {
  const { setHeader, setRbtn } = useHeader();

  useEffect(() => {
    setHeader(<label className="flex items-center text-xl font-bold">设置</label>);
    setRbtn(null);
  }, [setHeader, setRbtn]);

  // 所选对话平台
  const [platform, setPlatform] = useState<string>('OpenAI');

  // 对话平台映射
  const platformSettingMap: Map<string, ReactNode> = new Map();
  platformSettingMap.set('OpenAI', <OpenAISetting />);
  platformSettingMap.set('DeepSeek', <DeepSeekSetting />);

  return (
    <>
      <title>Settings-设置</title>
      <div className="flex h-full w-full flex-col">
        <div className="relative flex shrink grow flex-col space-y-4 overflow-auto overflow-x-hidden p-5">
          {/* 通用设置 */}
          <div className="border0 rounded-lg border-2">
            {/* 平台选择 */}
            <div className="border0 flex flex-row items-center space-x-5 border-b-2 px-5 py-2">
              <div className="text-my-text0 dark:text-my-darktext0 text-lg font-bold">通用设置</div>
            </div>
            {/* 配置 */}
            <div className="flex flex-col space-y-4 p-4">
              {/* Group */}
              <div className="border0 divide-my-border dark:divide-my-darkborder divide-y divide-solid rounded-lg border">
                {/* 随机性 */}
                <div className="flex flex-row items-center justify-between px-5 py-3">
                  <div>
                    <div className={'text-base'}>随机性（temperature）</div>
                    <div className="text-my-text2 dark:text-my-darktext2 text-xs">
                      值越大，回复越随机（0.0 ~ 1.0）
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      className="border0 bg1 w-24 rounded-lg border p-2 text-center text-sm"
                      type="number"
                      min="0"
                      max="1"
                      placeholder="0.0 ~ 1.0"
                      defaultValue={'0.5'}
                      onBlur={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (target.value === '') {
                          target.value = '0.5';
                          return;
                        }
                        const value = parseFloat(target.value);
                        if (value < 0) {
                          target.value = '0';
                        }
                        if (value > 1) {
                          target.value = '1';
                        }
                      }}
                    ></input>
                  </div>
                </div>
                {/* 自定义模型 */}
                <div className="flex flex-col space-y-2 px-5 py-3">
                  <div className="flex flex-row">
                    <div className={'text-base'}>自定义模型</div>
                  </div>
                  <div className="flex w-full items-center space-x-2">
                    <div className="text-my-text2 dark:text-my-darktext2 text-sm">对话模型</div>
                    <input
                      className="border0 bg1 flex grow rounded-lg border p-2 text-left text-sm"
                      placeholder="model1,model2,model3,..."
                    ></input>
                  </div>
                  <div className="flex w-full items-center space-x-2">
                    <div className="text-my-text2 dark:text-my-darktext2 text-sm">嵌入模型</div>
                    <input
                      className="border0 bg1 flex grow rounded-lg border p-2 text-left text-sm"
                      placeholder="model1,model2,model3,..."
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 对话平台 */}
          <div className="border0 rounded-lg border-2">
            {/* 平台选择 */}
            <div className="border0 flex flex-row items-center space-x-5 border-b-2 px-5 py-2">
              <div className="text-my-text0 dark:text-my-darktext0 text-lg font-bold">对话平台</div>
              <div className="flex items-center">
                <select
                  className="border0 bg1 h-10 rounded-lg border px-2 text-center text-base"
                  onChange={(e) => {
                    setPlatform(e.target.value);
                  }}
                >
                  {Array.from(platformSettingMap.keys()).map((key) => {
                    return (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* 配置 */}
            <div className="flex flex-col space-y-4 p-4">
              {/* Group */}
              <div className="border0 divide-my-border dark:divide-my-darkborder divide-y divide-solid rounded-lg border">
                {/* 模型设置 */}
                {platformSettingMap.get(platform)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

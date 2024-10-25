'use client';

import { GetSettingsResponse } from '@/action/model/settings';
import { GetSettings } from '@/action/settings';
import { useBearStore } from '@/lib/store';
import Head from 'next/head';

export default function Page() {
  const settings = [
    [
      // group1
      {
        title: 'OpenAI API Key',
        descp: '使用自定义 OpenAI API Key 访问 ChatGPT',
        value: (
          <input
            className="h-10 rounded-lg border-[1px] border-solid border-my-border bg-my-bg px-3 text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
            placeholder="OpenAI API Key"
            type="password"
          ></input>
        )
      },
      {
        title: '模型',
        descp: '选择使用的对话模型',
        value: (
          <select
            id="countries"
            className="h-10 rounded-lg border-[1px] border-solid border-my-border bg-my-bg text-center text-sm dark:border-my-darkborder dark:bg-my-darkbg1"
          >
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            <option value="gpt-3.5-turbo-0301">gpt-3.5-turbo-0301</option>
            <option value="gpt-3.5-turbo-0613">gpt-3.5-turbo-0613</option>
            <option value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106</option>
            <option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
            <option value="gpt-3.5-turbo-16k-0613">gpt-3.5-turbo-16k-0613</option>
            <option value="gpt-4">gpt-4</option>
            <option value="gpt-4-0314">gpt-4-0314</option>
            <option value="gpt-4-0613">gpt-4-0613</option>
            <option value="gpt-4-1106-preview">gpt-4-1106-preview</option>
            <option value="gpt-4-32k">gpt-4-32k</option>
            <option value="gpt-4-32k-0314">gpt-4-32k-0314</option>
            <option value="gpt-4-32k-0613">gpt-4-32k-0613</option>
            <option value="gpt-4-vision-preview">gpt-4-vision-preview</option>
          </select>
        )
      }
    ],
    [
      // group2
      {
        title: 'Test Mode',
        descp: '开发者测试模式',
        value: (
          <input
            type="checkbox"
            value=""
            className="m-2 h-4 w-4 cursor-pointer appearance-none rounded-md bg-transparent ring-2 ring-offset-2 ring-offset-my-bg checked:bg-my-primary dark:ring-offset-my-darkbg0 dark:checked:bg-my-darkPrimary"
          ></input>
        )
      }
    ]
  ];

  const setNavOpen = useBearStore((state) => state.setNavOpen);

  const syncSettings = () => {
    console.log('====================================');
    console.log('sync settings');
    console.log('====================================');
    GetSettings().then(([success, resp]: [boolean, GetSettingsResponse]) => {
      if (success) {
        console.log(resp);
      } else {
        console.log('====================================');
        console.log('failed to get settings', resp);
        console.log('====================================');
      }
    });
  };

  return (
    <>
      <title>Settings-设置</title>
      <div className="flex h-full w-full flex-col">
        <div className="relative flex flex-row justify-between border-b-[1px] border-my-border px-5 py-4 shadow dark:border-my-darkborder">
          <button
            className="h-12 w-12 place-content-center items-center rounded-lg border-[1px] border-my-border p-2 text-base font-semibold dark:border-my-darkborder dark:bg-my-darkbg1 md:hidden"
            onClick={() => {
              setNavOpen(true);
            }}
          >
            <svg viewBox="0 0 1024 1024">
              <path
                d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                fill="#999"
              />
            </svg>
          </button>
          <div>
            <div className="text-center text-xl font-bold md:text-start">设置</div>
            <div className="text-center text-sm text-my-text1 dark:text-my-darktext1 md:text-start">
              所有设置选项
            </div>
          </div>
          <button
            className="h-12 w-12 place-content-center items-center rounded-lg border-[1px] border-my-border p-2 text-base font-semibold hover:bg-my-bgHover dark:border-my-darkborder dark:bg-my-darkbg1 dark:hover:bg-my-darkbgHover/25"
            onClick={syncSettings}
          >
            <svg viewBox="0 0 1024 1024">
              <path
                d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27c40.9 17.3 77.7 42.1 109.3 73.8 9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47c-5.3 4.1-3.5 12.5 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8z m756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4S687 811.7 646 829c-42.4 17.9-87.4 27-133.9 27s-91.5-9.1-133.9-27c-40.9-17.3-77.7-42.1-109.3-73.8-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47c5.3-4.1 3.5-12.5-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-0.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8 0.1-4.5-3.5-8.2-8-8.2z"
                fill="#999"
              />
            </svg>
          </button>
        </div>
        <div className="relative flex flex-shrink flex-grow flex-col overflow-auto overflow-x-hidden p-5">
          {settings.map((group, index) => (
            <div
              key={index}
              className="mb-5 divide-y-2 divide-solid rounded-lg border-2 border-my-border dark:border-my-darkborder"
            >
              {group.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-row items-center justify-between border-my-border px-5 py-3 dark:border-my-darkborder"
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
      </div>
    </>
  );
}

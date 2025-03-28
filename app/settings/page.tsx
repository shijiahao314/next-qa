'use client';

import { GetSettingsResponse } from '@/action/model/settings';
import { GetSettings } from '@/action/settings';

export default function Page() {
  const settings = [
    [
      // group1
      {
        title: 'OpenAI API Key',
        descp: '使用自定义 OpenAI API Key 访问 ChatGPT',
        value: (
          <input
            className="border0 bg1 h-10 rounded-lg border px-3 text-center text-sm"
            placeholder="OpenAI API Key"
            type="password"
          ></input>
        )
      },
      {
        title: '模型',
        descp: '选择使用的对话模型',
        value: (
          <select id="countries" className="border0 bg1 h-10 rounded-lg border text-center text-sm">
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
            className="ring-offset-my-bg dark:ring-offset-my-dark-bg0 checked:bg-my-primary dark:checked:bg-my-dark-primary ring-grey-3 dark:ring-grey-6 m-2 h-4 w-4 cursor-pointer appearance-none rounded-md ring-2 ring-offset-2"
          ></input>
        )
      }
    ]
  ];

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
        <div className="border0 bg0 relative flex flex-row justify-between border-b px-5 py-4">
          <div>
            <div className="text-start text-xl font-bold">设置</div>
            <div className="text-my-text1 dark:text-my-darktext1 text-center text-sm sm:text-start">
              所有设置选项
            </div>
          </div>
          <button
            className="border0 hover:bg-my-bgHover dark:bg-my-dark-bg1 dark:hover:bg-my-dark-bgHover/25 h-12 w-12 place-content-center items-center rounded-lg border p-2 text-base font-semibold"
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
        <div className="relative flex shrink grow flex-col overflow-auto overflow-x-hidden p-5">
          {settings.map((group, index) => (
            <div key={index} className="border0 mb-5 divide-y-2 divide-solid rounded-lg border-2">
              {group.map((item) => (
                <div
                  key={item.title}
                  className="border0 flex flex-row items-center justify-between px-5 py-3"
                >
                  <div>
                    <div className="text-my-text0 dark:text-my-darktext0 text-base">
                      {item.title}
                    </div>
                    <div className="text-my-text2 dark:text-my-darktext2 text-xs">{item.descp}</div>
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

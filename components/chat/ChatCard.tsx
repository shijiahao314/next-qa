import React from 'react';

import MarkdownCard from '../markdown';

export default function ChatContent({ content, role }: { content: string; role: string }) {
  return (
    <div
      className={
        'mt-4 flex flex-col md:max-w-[80%] ' + `${role === 'user' ? 'items-end' : 'items-start'}`
      }
    >
      <div className="flex flex-row">
        <div
          className={
            'flex items-center justify-center space-x-1 ' +
            `${role === 'user' ? 'order-first mr-2' : 'order-last ml-2'}`
          }
        >
          <div className="group flex h-8 cursor-pointer flex-row items-center justify-center overflow-hidden rounded-xl border-[1px] border-my-border bg-my-bg px-3 py-1 text-sm duration-300 hover:w-full hover:bg-my-bgHover/50 dark:border-my-darkborder dark:bg-my-darkbg0 dark:hover:bg-my-darkbg1">
            <div className="flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="16"
                height="16"
                fill="none"
              >
                <g mask="url(#reload_svg__b)">
                  <path
                    transform="translate(14 2.667)"
                    d="M0 0v5.33"
                    style={{
                      stroke: 'rgb(155, 155, 155)',
                      strokeWidth: '1.33333',
                      strokeOpacity: '1',
                      strokeDasharray: '0, 0'
                    }}
                  ></path>
                  <path
                    transform="translate(2 8)"
                    d="M0 0v5.33"
                    style={{
                      stroke: 'rgb(155, 155, 155)',
                      strokeWidth: '1.33333',
                      strokeOpacity: '1',
                      strokeDasharray: '0, 0'
                    }}
                  ></path>
                  <path
                    transform="translate(2 2)"
                    d="M12.003 6a6.005 6.005 0 0 0-10.32-4.17M0 6a6.005 6.005 0 0 0 10.17 4.32"
                    style={{
                      stroke: 'rgb(155, 155, 155)',
                      strokeWidth: '1.33333',
                      strokeOpacity: '1',
                      strokeDasharray: '0, 0'
                    }}
                  ></path>
                </g>
              </svg>
            </div>
            <div className="hidden overflow-hidden whitespace-nowrap text-sm text-my-text0 group-hover:block dark:text-my-darktext0">
              &nbsp;重试
            </div>
          </div>
        </div>
        <div className="h-9 w-9 rounded-lg border-[1px] border-my-border dark:border-my-darkborder"></div>
      </div>
      <div
        className={
          'mt-2 w-fit rounded-lg border-[1px] border-my-border p-3 text-sm leading-6 dark:border-my-darkborder md:border-2 ' +
          `${
            role === 'user' ? 'bg-my-chatBg dark:bg-my-darkChatBg ' : 'bg-my-bg dark:bg-my-darkbg1'
          }`
        }
      >
        <MarkdownCard content={content}></MarkdownCard>
      </div>
      <div className="mx-2 text-end text-xs text-my-text3/30 dark:text-my-darktext3/30">
        2023/12/01 10:55:21
      </div>
    </div>
  );
}

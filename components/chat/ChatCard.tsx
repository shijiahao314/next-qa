import React from 'react';

import MarkdownCard from '../markdown';

export default async function ChatCard({ content, role }: { content: string; role: string }) {
  return (
    <div
      className={
        'mt-4 max-w-[80%] rounded-lg border-[1px] border-my-border  p-3 dark:border-my-darkborder  md:max-w-[80%] md:border-2 ' +
        `${
          role === 'user' ? 'bg-green-400/60 dark:bg-green-700/80' : 'bg-my-bg dark:bg-my-darkbg1'
        }`
      }
    >
      <div className={'text-xs dark:prose-invert md:text-sm'}>
        <MarkdownCard content={content}></MarkdownCard>
      </div>
    </div>
  );
}

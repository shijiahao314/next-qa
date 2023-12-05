import React from 'react';

export default function ChatCard({ children }: { children: string }) {
  return (
    <div className="border-my-border dark:border-my-darkborder">
      <textarea
        className="mt-[10px] min-w-0 resize-none rounded-[10px] border-[2px] border-my-border bg-my-bg p-[10px] font-sans text-[18px] outline-none dark:border-my-darkborder dark:bg-my-darkbg1"
        disabled
      >
        {children}
      </textarea>
    </div>
  );
}

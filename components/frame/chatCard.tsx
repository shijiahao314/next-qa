import React from 'react';

export default function ChatCard({ children }: { children: string }) {
  return (
    <div className="border-my-border dark:border-my-darkborder">
      <textarea
        className="dark:border-my-darkborder border-my-border mt-[10px] min-w-0 resize-none rounded-[10px] border-[2px] bg-my-bg p-[10px] font-sans text-[18px] outline-none dark:bg-my-darkbg1"
        disabled
      >
        {children}
      </textarea>
    </div>
  );
}

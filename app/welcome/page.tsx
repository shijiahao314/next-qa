// 'use client';

import { readFileSync } from 'fs';

import '@/styles/markdown.css';
import MarkdownCard from '@/components/markdown';
// import { useBearStore } from '@/lib/store';

export default function WelcomePage() {
  const markdownContent = readFileSync('app/welcome/welcome.md', 'utf-8');
  // const setNavOpen = useBearStore((state) => state.setNavOpen);

  return (
    <>
      <div className="flex h-full w-full flex-col">
        {/* <div className="relative flex flex-row justify-between border-b-[1px] border-my-border px-5 py-4 shadow dark:border-my-darkborder md:hidden">
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
        </div> */}
        <div className="relative flex flex-shrink flex-grow flex-col overflow-auto overflow-x-hidden p-5">
          <div className="flex h-full w-full">
            <MarkdownCard content={markdownContent}></MarkdownCard>
          </div>
        </div>
      </div>
    </>
  );
}

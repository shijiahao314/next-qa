'use client';

import { useHeader } from '@/components/frame/HeaderProvider';
import { useEffect } from 'react';

export default function Page() {
  const { setHeader } = useHeader();

  useEffect(() => {
    // 设置 header 内容
    setHeader(<label className="flex items-center text-xl font-bold">知识库问答</label>);
  }, [setHeader]);

  return (
    <>
      <title>RAG-知识库问答</title>
      <div className="flex w-full flex-col overflow-y-auto md:relative">
        <label className="shadow-b-2 hidden w-full border-b border-my-border bg-my-bg py-4 pl-8 text-xl font-bold dark:border-my-darkborder dark:bg-my-darkbg1/50 sm:block">
          知识库问答
        </label>
      </div>
    </>
  );
}

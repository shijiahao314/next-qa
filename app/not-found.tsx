'use client';

import { useHeader } from '@/components/frame/HeaderProvider';
import NextQAHeader from '@/components/frame/NextQA';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader(<NextQAHeader></NextQAHeader>);
  }, [setHeader]);

  return (
    <>
      <title>404 Not Found</title>
      <div className="flex h-full w-full flex-col items-center justify-center space-y-2 text-xl font-semibold">
        <label>页面未找到</label>
        <label>Page Not Found</label>
      </div>
    </>
  );
}

'use client';

import { useHeader } from '@/components/frame/HeaderProvider';
import NextQAHeader from '@/components/frame/NextQA';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader(<NextQAHeader></NextQAHeader>);
  }, [setHeader]);

  return (
    <>
      <title>404 Not Found</title>
      <div className="flex h-full w-full items-center justify-center text-xl font-semibold">
        Page Not Found
      </div>
    </>
  );
}

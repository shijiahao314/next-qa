'use client';

import MarkdownCard from '@/components/chat/MarkdownCard';
import { useHeader } from '@/components/frame/HeaderProvider';
import NextQAHeader from '@/components/frame/NextQA';
import { useEffect, useState } from 'react';

export default function WelcomePage() {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader(<NextQAHeader></NextQAHeader>);
  }, [setHeader]);

  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch('/welcome.md');
      const text = await response.text();
      setFileContent(text);
    };

    fetchFile();
  }, []);

  return (
    <>
      <div className="flex w-full overflow-y-auto p-4">
        <MarkdownCard content={fileContent}></MarkdownCard>
      </div>
    </>
  );
}

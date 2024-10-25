import MarkdownCard from '@/components/markdown';
import '@/styles/markdown.css';
import { readFileSync } from 'fs';

export default function WelcomePage() {
  const markdownContent = readFileSync('public/welcome.md', 'utf-8');

  return (
    <>
      <title>Welcome to NextQA</title>
      <div className="flex h-full w-full flex-col">
        <div className="relative flex flex-shrink flex-grow flex-col overflow-auto overflow-x-hidden p-5">
          <div className="flex h-full w-full">
            <MarkdownCard content={markdownContent}></MarkdownCard>
          </div>
        </div>
      </div>
    </>
  );
}

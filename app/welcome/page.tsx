import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypePrism from 'rehype-prism-plus';
import { readFileSync } from 'fs';

import '@/styles/markdown.css';

export default function WelcomePage() {
  const markdownContent = readFileSync('app/welcome/welcome.md', 'utf-8');

  return (
    <>
      <div className="p-4">
        <Markdown
          className="space-y-2"
          remarkPlugins={[remarkMath, remarkBreaks, remarkGfm]}
          rehypePlugins={[
            // rehypePrettyCode,
            // rehypeKatex,
            // rehypeHighlight
            rehypePrism
          ]}
        >
          {markdownContent}
        </Markdown>
      </div>
    </>
  );
}

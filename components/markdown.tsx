import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';

import '@/styles/markdown.css';

export default function MarkdownCard({ content }: { content: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkMath, remarkBreaks, remarkGfm]}
      rehypePlugins={[
        rehypeKatex,
        [
          rehypeHighlight,
          {
            detect: false,
            ignoreMissing: true
          }
        ]
      ]}
      components={{
        p: (pProps) => <p {...pProps} dir="auto" />
      }}
    >
      {content}
    </Markdown>
  );
}

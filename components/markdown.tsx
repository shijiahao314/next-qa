import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypePrism from 'rehype-prism-plus';

import '@/styles/markdown.css';
// import '@/styles/prism_light.css';
// import '@/styles/prism_dark.css';

export default function MarkdownCard({ content }: { content: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkMath, remarkBreaks, remarkGfm]}
      rehypePlugins={[
        // rehypePrettyCode,
        // rehypeKatex,
        // rehypeHighlight
        rehypePrism
      ]}
      components={{
        p: (pProps) => <p {...pProps} dir="auto" />
      }}
    >
      {content}
    </Markdown>
  );
}

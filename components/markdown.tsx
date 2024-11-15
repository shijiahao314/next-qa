import Markdown from 'react-markdown';
import rehypePrism from 'rehype-prism-plus';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import '@/styles/markdown.css';
// import '@/styles/prism_light.css';
// import '@/styles/prism_dark.css';

export default function MarkdownCard({ content }: { content: string }) {
  return (
    // <style>
    <Markdown
      className="gap-y-2"
      remarkPlugins={[remarkMath, remarkBreaks, remarkGfm]}
      rehypePlugins={
        [
          // rehypePrettyCode,
          // rehypeKatex,
          // rehypeHighlight
          // rehypePrism
        ]
      }
    >
      {content}
    </Markdown>
  );
}

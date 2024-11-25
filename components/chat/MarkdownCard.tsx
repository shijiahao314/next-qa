'use client';

import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm'; // 支持 GitHub 风格的 Markdown，如表格、删除线等

import '@/styles/markdown.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';

interface MarkdownRendererProps {
  content: string;
}

/*
# Markdown Example

This is an example of **Markdown** rendering in Next.js with Tailwind CSS.

## Inline Code
You can use `console.log('Hello, World!')` for inline code.

## Code Block
Here’s a JavaScript example:

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

## Table
| Feature     | Supported |
|-------------|-----------|
| Inline Code | ✅        |
| Code Block  | ✅        |

## Blockquote

> "Markdown is amazing!"
*/

export default function MarkdownCard({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-custom prose h-min max-w-full dark:prose-invert">
      <ReactMarkdown
        rehypePlugins={[rehypePrism]}
        remarkPlugins={[remarkGfm]} // 增加对表格等的支持
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              // code block
              <code {...props}>{children}</code>
            ) : (
              // inline code
              <code
                className={classNames(
                  'inline-code rounded bg-gray-300 dark:bg-gray-700',
                  className
                )}
                {...props}
              >
                {children}
              </code>
            );
          },
          table({ children, ...props }) {
            return (
              <div className="overflow-x-auto">
                <table
                  className="table-auto border-collapse border border-gray-300 dark:border-gray-600"
                  {...props}
                >
                  {children}
                </table>
              </div>
            );
          },
          th({ children, ...props }) {
            return (
              <th
                className="border border-gray-300 bg-gray-100 px-4 text-left dark:border-gray-600 dark:bg-gray-700"
                {...props}
              >
                {children}
              </th>
            );
          },
          td({ children, ...props }) {
            return (
              <td className="border border-gray-300 px-4 dark:border-gray-600" {...props}>
                {children}
              </td>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

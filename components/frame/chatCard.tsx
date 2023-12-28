import React from 'react';
import Markdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeColorChips from 'rehype-color-chips';

export default async function ChatCard({ children }: { children: string }) {
  const markdown = `
A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
| 1a | 2b |

`;

  const text =
    "\"7138163354002001920\" 这个数值的64位无符号二进制形式可以通过以下步骤得到：\n\n首先，将这个十进制数值转换为二进制。在Python中，可以使用内置的 `bin` 函数来实现这个转换。然后，去掉结果字符串的前两个字符（`'0b'`），这是Python用来表示二进制的前缀。\n\n```python\nbin(7138163354002001920)[2:]\n```\n\n执行上述代码，得到的结果是：`'11000100010'`";

  const math_text = '```python\r\nimport numpy\na = numpy.array([[1, 2], [3, 4]])\r\n```';

  return (
    <div className="mt-4 max-w-[80%] rounded-lg border-[1px] border-my-border bg-my-bg p-3 dark:border-my-darkborder dark:bg-my-darkbg1 md:max-w-[80%] md:border-2">
      {/* //TODO: use my own css */}
      <div className="markdown-body prose prose-green z-0 text-xs dark:prose-invert md:text-sm">
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
            // [rehypeColorChips, { customClassName: 'color-chip' }]
          ]}
          components={{
            p: (pProps) => <p {...pProps} dir="auto" />
          }}
        >
          {text}
        </Markdown>
      </div>
    </div>
  );
}

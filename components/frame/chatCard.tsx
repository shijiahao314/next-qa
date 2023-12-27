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
    "\"7138163354002001920\" 这个数值的64位无符号二进制形式可以通过以下步骤得到：\n\n首先，将这个十进制数值转换为二进制。在Python中，可以使用内置的 `bin` 函数来实现这个转换。然后，去掉结果字符串的前两个字符（`'0b'`），这是Python用来表示二进制的前缀。\n\n```python\nbin(7138163354002001920)[2:]\n```\n\n执行上述代码，得到的结果是：`'110001000111001011101000100110110111000000000000000000000000000'`。这是一个61位的二进制数。\n\n然后，为了得到64位的二进制数，你需要在这个结果的前面补上三个零。所以，\"7138163354002001920\"的64位无符号二进制形式是：\n\n`'0001100010001110010111010001001101101110000000000000000000000000'`";

  const math_text = '```python\r\nimport numpy\na = numpy.array([[1, 2], [3, 4]])\r\n```';

  return (
    <div className="mt-[10px] max-w-[90%] rounded-[10px] border-[2px] border-my-border bg-my-bg p-[10px] font-sans text-base outline-none dark:border-my-darkborder dark:bg-my-darkbg1 md:max-w-[80%]">
      {/* <div className="prose prose-base prose-slate dark:prose-invert ">
          <Markdown
            remarkPlugins={[
              [
                remarkGfm,
                {
                  singleTItle: false
                }
              ]
            ]}
            rehypePlugins={[
              rehypeKatex,
              rehypeHighlight,
              [rehypeColorChips, { customClassName: 'color-chip' }]
            ]}
          >
            {text}
          </Markdown>
        </div>
        <div>-------------------------------</div> */}
      {/* //TODO: use my own css */}
      <div className="markdown-body prose prose-green text-xs dark:prose-invert md:text-sm">
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

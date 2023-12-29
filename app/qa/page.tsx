import React from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

export default function Page() {
  const markdown =
    '\u5F53\u7136\uFF0C\u8FD9\u662F\u4E00\u4E2A\u975E\u5E38\u57FA\u7840\u7684Python\u51FD\u6570\u3002\u8FD9\u91CC\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u53EB\u505A`add`\uFF0C\u5B83\u63A5\u53D7\u4E24\u4E2A\u53C2\u6570`a`\u548C`b`\uFF0C\u7136\u540E\u8FD4\u56DE\u5B83\u4EEC\u7684\u548C\uFF1A\r\n\r\n```python\r\ndef add(a, b):\r\n    return a + b\r\n```\r\n\r\n\u4F60\u53EF\u4EE5\u4F7F\u7528\u8FD9\u4E2A\u51FD\u6570\u6765\u6DFB\u52A0\u4EFB\u4F55\u4E24\u4E2A\u6570\u5B57\u3002\u4F8B\u5982\uFF1A\r\n\r\n```python\r\nresult = add(3, 4)\r\nprint(result)  # \u8F93\u51FA7\r\n```';

  return (
    <>
      <div>
        <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>
      </div>
    </>
  );
}

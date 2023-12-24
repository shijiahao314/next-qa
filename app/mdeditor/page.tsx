'use client';

import ReactMarkdown from 'react-markdown';

import Editor from 'md-editor-rt';

import RemarkMath from 'remark-math';
import RemarkBreaks from 'remark-breaks';
import RehypeKatex from 'rehype-katex';
import RemarkGfm from 'remark-gfm';
import RehypeHighlight from 'rehype-highlight';
import mermaid from 'mermaid';
import { useDebouncedCallback } from 'use-debounce';

import 'md-editor-rt/lib/style.css';
import React, { useMemo, RefObject, useRef, useEffect, useState } from 'react';

// const msgs = `
// Markdown 文本主要是由普通的文本和一些特殊的标记符号组成，所以你可以选择使用 MySQL 中的文本类型字段来存储 Markdown 文本。具体来说，你可以根据你的需求选择以下几种类型：

// 1. \`TEXT\`: 这种类型可以存储最多 65,535 字符的文本，这应该足够存储大多数的 Markdown 文本了。

// 2. \`MEDIUMTEXT\`: 如果你需要存储更长的文本，你可以使用这种类型，它可以存储最多 16,777,215 字符的文本。

// 3. \`LONGTEXT\`: 这种类型可以存储最多 4,294,967,295 字符的文本，这应该足够存储任何长度的 Markdown 文本了。

// 在选择类型时，你应该考虑你的实际需求。如果你的 Markdown 文本通常不会很长，那么 \`TEXT\` 类型就足够了。如果你的 Markdown 文本可能会非常长，那么你应该选择 \`MEDIUMTEXT\` 或 \`LONGTEXT\` 类型。

// 在存储 Markdown 文本时，你应该注意保留所有的原始字符，包括空格、换行符和特殊字符。这是因为这些字符在 Markdown 中都有特殊的含义，如果你修改了它们，那么 Markdown 文本可能就不能正确地被解析了。

// 在从数据库中读取 Markdown 文本时，你可以直接将它传递给 Markdown 解析器，然后生成 HTML 代码。这样，你就可以在网页上显示出 Markdown 文本的格式了。
// `;
const msgs = {
  messages: [
    {
      role: 'system',
      content: 'hello'
    }
    // ...props.messages.map((m) => ({
    //   role: m.role,
    //   content: m.content
    // }))
  ]
};
const mdText = '```json\n' + JSON.stringify(msgs, null, 2) + '\n```';

const msg = '**asa**\n*asdasd*\n`aaa`';

export default function Md() {
  return (
    <>
      {/* <Editor modelValue={text} onChange={setText}></Editor> */}
      <Markdown content={mdText}></Markdown>
      <Markdown content={msg}></Markdown>
    </>
  );
}

export function Mermaid(props: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (props.code && ref.current) {
      mermaid
        .run({
          nodes: [ref.current],
          suppressErrors: true
        })
        .catch((e) => {
          setHasError(true);
          console.error('[Mermaid] ', e.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.code]);

  function viewSvgInNewWindow() {
    const svg = ref.current?.querySelector('svg');
    if (!svg) return;
    const text = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([text], { type: 'image/svg+xml' });
    // showImageModal(URL.createObjectURL(blob));
  }

  if (hasError) {
    return null;
  }

  return (
    <div
      className="no-dark mermaid"
      style={{
        cursor: 'pointer',
        overflow: 'auto'
      }}
      ref={ref}
      onClick={() => viewSvgInNewWindow()}
    >
      {props.code}
    </div>
  );
}

export function PreCode(props: { children: any }) {
  const ref = useRef<HTMLPreElement>(null);
  const refText = ref.current?.innerText;
  const [mermaidCode, setMermaidCode] = useState('');

  const renderMermaid = useDebouncedCallback(() => {
    if (!ref.current) return;
    const mermaidDom = ref.current.querySelector('code.language-mermaid');
    if (mermaidDom) {
      setMermaidCode((mermaidDom as HTMLElement).innerText);
    }
  }, 600);

  useEffect(() => {
    setTimeout(renderMermaid, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refText]);

  return (
    <>
      {mermaidCode.length > 0 && <Mermaid code={mermaidCode} key={mermaidCode} />}
      <pre ref={ref}>
        <span
          className="copy-code-button"
          //   onClick={() => {
          //     if (ref.current) {
          //       const code = ref.current.innerText;
          //       copyToClipboard(code);
          //     }
          //   }}
        ></span>
        {props.children}
      </pre>
    </>
  );
}

function escapeDollarNumber(text: string) {
  let escapedText = '';

  for (let i = 0; i < text.length; i += 1) {
    let char = text[i];
    const nextChar = text[i + 1] || ' ';

    if (char === '$' && nextChar >= '0' && nextChar <= '9') {
      char = '\\$';
    }

    escapedText += char;
  }

  return escapedText;
}

function _MarkDownContent(props: { content: string }) {
  const escapedContent = useMemo(() => escapeDollarNumber(props.content), [props.content]);

  return (
    <ReactMarkdown
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      rehypePlugins={[
        RehypeKatex,
        [
          RehypeHighlight,
          {
            detect: false,
            ignoreMissing: true
          }
        ]
      ]}
      components={{
        // pre: PreCode,
        p: (pProps) => <p {...pProps} dir="auto" />,
        a: (aProps) => {
          const href = aProps.href || '';
          const isInternal = /^\/#/i.test(href);
          const target = isInternal ? '_self' : aProps.target ?? '_blank';
          return <a {...aProps} target={target} />;
        }
      }}
    >
      {escapedContent}
    </ReactMarkdown>
  );
}

export const MarkdownContent = React.memo(_MarkDownContent);

export function Markdown(
  props: {
    content: string;
    loading?: boolean;
    fontSize?: number;
    parentRef?: RefObject<HTMLDivElement>;
    defaultShow?: boolean;
  } & React.DOMAttributes<HTMLDivElement>
) {
  const mdRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="markdown-body"
      style={{
        fontSize: `${props.fontSize ?? 14}px`
      }}
      ref={mdRef}
      onContextMenu={props.onContextMenu}
      onDoubleClickCapture={props.onDoubleClickCapture}
      dir="auto"
    >
      {/* {props.loading ? <LoadingIcon /> : */}
      <MarkdownContent content={props.content} />
      {/* } */}
    </div>
  );
}

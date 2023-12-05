import type { MDXComponents } from 'mdx/types';

// 在这里自定义对呀mdx的格式
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 style={{ fontSize: '32px' }}>{children}</h1>
  };
}

'use client';

import { Suspense, useEffect, useState } from 'react';
import Loading from '../loading';
import { Layout } from '@douyinfe/semi-ui';
import ThemeSwitcher from '@/components/theme/ThemeSwitcher';
import { useSSEContext } from '../utils/sseContext';
import LeftSide from '../../components/frame/leftSide';
import { leftSideWidth, leftSideWidthExpan } from '../config';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { Sider, Content } = Layout;

  // 从 SSEContext 中获取侧边栏状态及其 setter 函数
  const { isNavCollapsed } = useSSEContext();

  // 避免页面初始化时侧边栏闪烁的问题
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  const navWidth = isNavCollapsed ? leftSideWidth : leftSideWidthExpan;

  return (
    <Layout>
      <Sider
        style={{
          marginRight: navWidth
        }}
      >
        <LeftSide></LeftSide>
      </Sider>
      <Layout
        style={{
          height: '100vh',
          padding: '8px'
        }}
      >
        <Content>{children}</Content>
        <ThemeSwitcher></ThemeSwitcher>
      </Layout>
    </Layout>
  );
}

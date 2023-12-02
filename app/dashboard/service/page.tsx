'use client';

import { Layout } from '@douyinfe/semi-ui';

export default function ServicePage() {
  const { Header, Footer, Content } = Layout;

  const commonStyle = {
    // height: '100vh',
    lineHeight: '60px',
    background: 'var(--semi-color-fill-0)'
  };

  return (
    <Layout className="components-layout-demo" style={{ height: '100%' }}>
      <Header style={commonStyle}>Header</Header>
      <Content style={{ height: 300, lineHeight: '300px' }}>Content</Content>
    </Layout>
  );
}

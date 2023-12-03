'use client';
import { useSSEContext } from '@/app/utils/sseContext';
import ConfirmButton from '@/components/confirmButton';
import { IconGithubLogo, IconTickCircle, IconUploadError } from '@douyinfe/semi-icons';
import { Col, Form, Layout, Row, Tag, Typography } from '@douyinfe/semi-ui';
import Section from '@douyinfe/semi-ui/lib/es/form/section';
import Footer from '@douyinfe/semi-ui/lib/es/navigation/Footer';
import React from 'react';

export default function MainContent() {
  const { Title } = Typography;
  const { SSEConnect } = useSSEContext();

  const { Header, Footer, Content } = Layout;

  const { TextArea } = Form;

  const style = { width: '90%' };

  const commonStyle = {
    height: 64,
    lineHeight: '64px',
    background: 'var(--semi-color-fill-0)'
  };

  return (
    <Layout className="components-layout-demo">
      <Content style={{ height: 300, lineHeight: '300px' }}>
        <Title
          heading={2}
          style={{
            marginTop: '30px',
            marginLeft: '30px',
            marginBottom: '20px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'baseline'
            }}
          >
            👋 你好, 欢迎来到 HomeDash
            {SSEConnect ? (
              <Tag
                type={'light'}
                color="green"
                prefixIcon={<IconTickCircle />}
                size="large"
                shape="circle"
                style={{
                  marginLeft: '5px',
                  pointerEvents: 'none'
                }}
              >
                SSE 已连接
              </Tag>
            ) : (
              <Tag
                type={'light'}
                color="red"
                prefixIcon={<IconUploadError />}
                size="large"
                shape="circle"
                style={{
                  marginLeft: '5px',
                  pointerEvents: 'none'
                }}
              >
                SSE 未连接
              </Tag>
            )}
            <Tag
              color="grey"
              prefixIcon={<IconGithubLogo />}
              size="large"
              shape="circle"
              onClick={() => {
                window.open('https://github.com/hamster1963/HomeDash');
              }}
              style={{
                marginLeft: '5px',
                cursor: 'pointer'
              }}
            >
              GitHub
            </Tag>
          </div>
        </Title>
      </Content>
      <Footer
        style={{
          position: 'fixed',
          bottom: 20,
          height: 100
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'baseline'
          }}
        >
          <Form
            initValues={{
              name: 'semi',
              business: ['ulikeCam'],
              role: 'ued',
              switch: true,
              files: [
                {
                  uid: '1',
                  name: 'vigo.png',
                  status: 'success',
                  size: '130KB',
                  preview: true,
                  url: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/vigo.png'
                },
                {
                  uid: '2',
                  name: 'resso.jpeg',
                  status: 'validateFail',
                  size: '222KB',
                  percent: 50,
                  preview: true,
                  fileInstance: new File([new ArrayBuffer(2048)], 'resso.jpeg', {
                    type: 'image/jpeg'
                  }),
                  url: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/Resso.png'
                },
                {
                  uid: '3',
                  name: 'dy.jpeg',
                  status: 'uploading',
                  size: '222KB',
                  percent: 50,
                  preview: true,
                  fileInstance: new File([new ArrayBuffer(2048)], 'dy.jpeg', {
                    type: 'image/jpeg'
                  }),
                  url: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png'
                }
              ]
            }}
            style={{ padding: 10, width: '100%' }}
            onValueChange={(v) => console.log(v)}
          >
            <Section text="资源详情">
              <Row>
                <Col span={12}>
                  <TextArea
                    style={{ ...style, height: 120 }}
                    field="description"
                    label="申请理由（TextArea）"
                    placeholder="请填写申请资源理由"
                  ></TextArea>
                </Col>
              </Row>
            </Section>
          </Form>
          <ConfirmButton></ConfirmButton>
        </div>
      </Footer>
    </Layout>
  );
}

'use client';
import { useSSEContext } from '@/app/utils/sseContext';
import ConfirmButton from '@/components/confirmButton';
import { IconGithubLogo, IconTickCircle, IconUploadError } from '@douyinfe/semi-icons';
import {
  Button,
  Card,
  Col,
  Form,
  Layout,
  Popconfirm,
  Row,
  Tag,
  TextArea,
  Toast,
  Typography
} from '@douyinfe/semi-ui';
import Section from '@douyinfe/semi-ui/lib/es/form/section';
import Footer from '@douyinfe/semi-ui/lib/es/navigation/Footer';
import React from 'react';

export default function MainContent() {
  const { Title } = Typography;
  const { SSEConnect } = useSSEContext();
  const { Text } = Typography;

  const { Header, Footer, Content } = Layout;
  const commonStyle = {
    height: 64,
    lineHeight: '64px',
    background: 'var(--semi-color-fill-0)'
  };

  const onConfirm = () => {
    Toast.success('确认保存！');
  };

  const onCancel = () => {
    Toast.warning('取消保存！');
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="relative block rounded-[2px]">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'baseline'
          }}
        >
          ChatGPT-Next-Web
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
              window.open('https://github.com/shijiahao314/next-qa');
            }}
            style={{
              marginLeft: '5px',
              cursor: 'pointer'
            }}
          >
            GitHub
          </Tag>
        </div>
      </div>
      <div className="flex-shrink flex-grow overflow-auto overflow-x-hidden p-[20px]">
        <div className="relative w-full min-w-[200px]">
          <textarea
            className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0"
            placeholder=" "
          ></textarea>
          <label className="before:content[' '] after:content[' '] text-blue-gray-400 before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent">
            Textarea Gray
          </label>
        </div>
        <div>
          <div className={'ChatMessage'}>
            <div className={'ChatMessage-container'}>
              <div className={'ChatMessage-header'}></div>
              <div className={'ChatMessage-content'}>
                <Card
                  title="Semi Design"
                  style={{
                    position: 'relative'
                  }}
                  headerExtraContent={<Text link>更多</Text>}
                >
                  Semi Design 是由互娱社区前端团队与 UED
                  团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                  Web 应用。
                </Card>
              </div>
              <div className={'ChatMessage-footer'}></div>
            </div>
          </div>
          <div className={'ChatMessage-user'}>
            <div className={'ChatMessage-container'}>
              <div className={'ChatMessage-header'}></div>
              <div className={'ChatMessage-content'}>
                <Card
                  title="Semi Design"
                  style={{
                    position: 'relative',
                    fontSize: 20
                  }}
                  headerExtraContent={<Text link>更多</Text>}
                >
                  Semi Design 是由互娱社区前端团队与 UED
                  团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                  Web 应用。
                </Card>
              </div>
              <div className={'ChatMessage-footer'}></div>
            </div>
          </div>
          <div className={'ChatMessage'}>
            <div className={'ChatMessage-container'}>
              <div className={'ChatMessage-header'}></div>
              <div className={'ChatMessage-content'}>
                <Card
                  title="Semi Design"
                  style={{
                    position: 'relative'
                  }}
                  headerExtraContent={<Text link>更多</Text>}
                >
                  Semi Design 是由互娱社区前端团队与 UED
                  团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                  Web 应用。
                </Card>
              </div>
              <div className={'ChatMessage-footer'}></div>
            </div>
          </div>
          <div className={'ChatMessage-user'}>
            <div className={'ChatMessage-container'}>
              <div className={'ChatMessage-header'}></div>
              <div className={'ChatMessage-content'}>
                <Card
                  title="Semi Design"
                  style={{
                    position: 'relative'
                  }}
                  headerExtraContent={<Text link>更多</Text>}
                >
                  Semi Design 是由互娱社区前端团队与 UED
                  团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                  Web 应用。
                </Card>
              </div>
              <div className={'ChatMessage-footer'}></div>
            </div>
          </div>
          <div className={'ChatMessage'}>
            <div className={'ChatMessage-container'}>
              <div className={'ChatMessage-header'}></div>
              <div className={'ChatMessage-content'}>
                <Card
                  title="Semi Design"
                  style={{
                    position: 'relative'
                  }}
                  headerExtraContent={<Text link>更多</Text>}
                >
                  Semi Design 是由互娱社区前端团队与 UED
                  团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                  Web 应用。
                </Card>
              </div>
              <div className={'ChatMessage-footer'}></div>
            </div>
          </div>
          <div className={'ChatMessage-user'}>
            <div className={'ChatMessage-container'}>
              <div className={'ChatMessage-header'}></div>
              <div className={'ChatMessage-content'}>
                <Card
                  title="Semi Design"
                  style={{
                    position: 'relative'
                  }}
                  headerExtraContent={<Text link>更多</Text>}
                >
                  Semi Design 是由互娱社区前端团队与 UED
                  团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                  Web 应用。
                </Card>
              </div>
              <div className={'ChatMessage-footer'}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative block rounded-t-[2px] pb-[10px] pl-[20px] pr-[20px] pt-[15px]">
        <div className="grid-flex grid">
          <TextArea
            id="chat-input"
            onFocus={() => {}}
            placeholder="Message ChatGPT..."
            style={{
              border: '1px solid var(--semi-color-border)',
              borderWidth: 2,
              borderRadius: 10,
              marginBottom: 10,
              paddingTop: 4,
              paddingBottom: 10,
              paddingLeft: 10,
              paddingRight: 150
            }}
            borderless
          ></TextArea>
          <Button
            style={{
              position: 'absolute',
              display: 'flex',
              right: 32,
              bottom: 32,
              width: 80,
              height: 50,
              borderRadius: 10,
              fontSize: 16
            }}
          >
            发&nbsp;送
          </Button>
        </div>
      </div>
    </div>
  );
}

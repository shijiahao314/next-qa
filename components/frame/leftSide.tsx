import { IconHome, IconSemiLogo, IconServer, IconSetting } from '@douyinfe/semi-icons';
import { Nav } from '@douyinfe/semi-ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

import { useSSEContext } from '../../app/utils/sseContext';
import { leftSideWidth, leftSideWidthExpan } from '@/app/config';

const routerMap: Record<string, string> = {
  Chat: '/dashboard/main',
  Network: '/dashboard/settings',
  Service: '/dashboard/service'
};

export default function LeftSide() {
  const pathname = usePathname();
  const selectedKeys = useMemo(() => {
    const keys = Object.keys(routerMap);
    const selectedKey = keys.find((key) => pathname.startsWith(routerMap[key] as string));
    return selectedKey ? [selectedKey] : [];
  }, [pathname]);

  // 从 SSEContext 中获取侧边栏状态及其 setter 函数
  const { isNavCollapsed, setNavCollapsed } = useSSEContext();

  const toggleNav = useCallback(
    (isCollapse: boolean) => {
      setNavCollapsed(isCollapse);
    },
    [setNavCollapsed]
  );

  const navWidth = isNavCollapsed ? leftSideWidth : leftSideWidthExpan;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        toggleNav(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [toggleNav]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0 }}>
      <Nav
        isCollapsed={isNavCollapsed}
        onCollapseChange={(isCollapse) => toggleNav(isCollapse)}
        style={{ height: '100vh', width: navWidth }}
        renderWrapper={({ itemElement, props }) => {
          const itemKey = props.itemKey as string;
          const href = routerMap[itemKey] as string;
          return (
            <div style={{ marginBottom: '15px' }}>
              <Link
                style={{ textDecoration: 'none' }}
                href={href}
                prefetch={true}
                replace={true}
                passHref={true}
                shallow={true}
              >
                <div>{itemElement}</div>
              </Link>
            </div>
          );
        }}
        footer={{ collapseButton: true }}
        items={[
          { itemKey: 'Chat', text: '对话', icon: <IconHome /> },
          { itemKey: 'Service', text: '服务监控', icon: <IconServer /> },
          { itemKey: 'Network', text: '设置', icon: <IconSetting /> }
        ]}
        defaultSelectedKeys={selectedKeys}
      >
        <Nav.Header
          logo={<IconSemiLogo style={{ height: '36px', fontSize: 36 }} />}
          text={'Next QA'}
        />
      </Nav>
    </div>
  );
}

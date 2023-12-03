import React from 'react';
import { Popconfirm, Button, Toast } from '@douyinfe/semi-ui';

export default function ConfirmButton() {
  const onConfirm = () => {
    Toast.success('确认保存！');
  };

  const onCancel = () => {
    Toast.warning('取消保存！');
  };
  return (
    <Popconfirm
      title="确定是否要保存此修改？"
      content="此修改将不可逆"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Button>保存</Button>
    </Popconfirm>
  );
}

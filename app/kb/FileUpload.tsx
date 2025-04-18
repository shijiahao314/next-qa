import { useRef } from 'react';
import { API_URL } from '@/app/config';

class UploadFileRsp {
  code!: number;
  msg!: string;
}

const FileUpload = (props: { kb: string }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 触发文件选择窗口
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 触发文件输入框的点击事件
    }
  };

  // 选择文件后直接上传
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); // 将文件添加到 FormData 中
    formData.append('kb', props.kb); // 将额外的字段添加到 FormData 中

    // 向后端发送 POST 请求上传文件
    try {
      const res = await fetch(API_URL + '/kb/file/upload', {
        method: 'POST',
        body: formData // 直接发送 FormData
      });

      if (res.ok) {
        const data: UploadFileRsp = await res.json();
        if (data.code === 0) {
          console.log('文件上传成功');
          alert('文件上传成功');
          window.location.reload(); // 刷新页面
        } else {
          console.log('文件上传失败：', data.msg);
          alert(`文件上传失败：${data.msg}`);
        }
      } else {
        console.log('上传请求失败');
        alert('上传请求失败');
      }
    } catch (error) {
      console.error('文件上传失败:', error);
      alert('文件上传失败');
    }
  };

  return (
    <div>
      <button type="button" onClick={handleFileSelect} className="btn-confirm">
        上传文件
      </button>

      {/* 隐藏的文件输入框 */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileUpload;

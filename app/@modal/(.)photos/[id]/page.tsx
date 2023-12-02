import Photo from '@/app/components/frame';
import Modal from '@/app/components/modal';
import Photos from '@/app/photos';

export default function PhotoModal({
  params: { id: photoId }
}: {
  params: {
    id: string;
  };
}) {
  // 检查 photoId 是否存在
  if (!photoId) {
    return <Modal>No photo found!</Modal>;
  }

  // 查找匹配的照片
  const photo = Photos.find((p) => p.id === photoId);

  // 处理找不到照片的情况
  if (!photo) {
    return <Modal>Photo not found!</Modal>;
  }

  console.log(photo);

  return (
    <Modal>
      <Photo photo={photo}></Photo>
    </Modal>
  );
}

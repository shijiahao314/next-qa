import Photo from '@/app/components/frame';
import photos from '@/app/photos';

interface Params {
  id: string;
  name: string;
}

export default function PhotoPage({ params }: { params: Params }) {
  const photo = photos.find((p) => p.id === params.id);

  return (
    <div className={'container mx-auto my-10'}>
      <div className={'mx-auto w-1/2 border border-amber-600'}>
        <Photo photo={photo}></Photo>
      </div>
    </div>
  );
}

import Image from 'next/image';

export default function Photo({ photo }) {
  return (
    <>
      <Image
        src={photo.imageSrc}
        alt={''}
        width={600}
        height={600}
        className={'col-span-2 aspect-square w-full object-cover'}
      ></Image>
      <div className={'bg-white p-4 px-6'}>
        <h3>{photo.name}</h3>
        <p>Taken by {photo.username}</p>
      </div>
    </>
  );
}

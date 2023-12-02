'use client';

// `app/page.tsx` is the UI for the `/` URL
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PostList from './blog/PostList';
import photos from './photos';
import Image from 'next/image';

export default function Page() {
  const postData = [
    { id: 1, slug: 'blog1', title: '/blog/blog1' },
    { id: 2, slug: 'b-b-b', title: 'title 2b' },
    { id: 3, slug: 'c-c-c', title: 'title 3c' },
    { id: 4, slug: 'd-d-d', title: 'title 4d' },
    { id: 5, slug: 'e-e-e', title: 'title 5e' }
  ];
  const router = useRouter();

  return (
    <>
      <div>
        <p>
          <Link href="/dashboard">Dashboard</Link>
        </p>
        <p>
          <Link href="/dashboard#settings">Dashboard/Settings</Link>
        </p>
        <button type="button" onClick={() => router.push('/dashboard')}>
          Dashboard
        </button>
        <h3>blog list</h3>
        <PostList posts={postData}></PostList>
        <main className="container mx-auto">
          <div className="m-10 grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
            {photos.map(({ id, imageSrc }) => (
              <Link key={id} href={`/photos/${id}`}>
                <Image
                  alt=""
                  src={imageSrc}
                  height={100}
                  width={100}
                  className="aspect-square rounded-full object-cover"
                ></Image>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

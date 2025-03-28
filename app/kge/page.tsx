'use client';

import { useHeader } from '@/components/frame/HeaderProvider';
import MyToastContainer from '@/components/frame/MyToastContainer';
import { useEffect, useState } from 'react';
import { API_URL } from '../config';

type ImageType = 'entity_embeddings' | 'relation_embeddings' | 'kg_subgraph';

export default function Page() {
  const { setHeader } = useHeader();
  const [images, setImages] = useState<Record<ImageType, string | null>>({
    entity_embeddings: null,
    relation_embeddings: null,
    kg_subgraph: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHeader(<label className="flex items-center text-xl font-bold">命名实体识别</label>);
  }, [setHeader]);

  useEffect(() => {
    const fetchImage = async (type: ImageType) => {
      try {
        const response = await fetch(`${API_URL}/kge`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: type })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || 'Failed to fetch image');
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } catch (err) {
        console.error(`Error fetching ${type} image:`, err);
        return null;
      }
    };

    const loadAllImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const results = await Promise.all(
          (['entity_embeddings', 'relation_embeddings', 'kg_subgraph'] as ImageType[]).map(
            async (type) => ({
              type,
              url: await fetchImage(type)
            })
          )
        );

        const newImages = results.reduce(
          (acc, { type, url }) => {
            acc[type] = url;
            return acc;
          },
          {} as Record<ImageType, string | null>
        );

        setImages(newImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    loadAllImages();

    // Cleanup Blob URLs
    return () => {
      Object.values(images).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  const renderImageSection = (type: ImageType, title: string) => (
    <div key={type} className="border0 flex flex-col space-y-2 border border-dashed p-2">
      <label className="">{title}</label>
      <div className="flex w-full items-center justify-center">
        {images[type] ? (
          <img
            className="object-cover"
            src={images[type]!}
            alt={title}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center border-0">
            {loading ? '加载中...' : '图片不可用'}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <title>KGE-知识图谱表征</title>
      <MyToastContainer />
      <div className="flex h-full w-full flex-col overflow-y-auto sm:relative">
        <label className="bg0 border0 hidden w-full border-b py-4 pl-8 text-xl font-bold sm:block">
          知识图谱表征
        </label>

        <div className="flex grow flex-col items-center space-y-4 overflow-y-auto px-8 py-4">
          <div className="border0 flex w-full max-w-[800px] flex-col space-y-2 rounded-lg border p-4">
            <label className="text-lg font-bold">表征可视化</label>
            {renderImageSection('entity_embeddings', '实体嵌入')}
            {renderImageSection('relation_embeddings', '关系嵌入')}
            {renderImageSection('kg_subgraph', '知识子图')}
          </div>
        </div>
      </div>
    </>
  );
}

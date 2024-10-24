'use client';

export default function KBPage() {
  return (
    <>
      <div className="absolute flex h-full w-full flex-col overflow-hidden p-10 md:relative">
        <label className="text-4xl">知识库管理</label>
        <div className="m-4 flex flex-grow flex-col">
          <div className="flex flex-col">
            <label className="inline-block whitespace-nowrap text-2xl">Select</label>
            <div className="m-4 flex flex-col gap-x-6 gap-y-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

class GetKBRsp {
  code!: number;
  msg!: string;
  kbs!: string[];
}

const API_URL = 'http://10.112.67.227:8080/api';

export default function Page() {
  return (
    <>
      <title>RAG-知识库问答</title>
      <div className="flex w-full flex-col overflow-y-auto md:relative">
        <label className="shadow-b-2 w-full border-b border-my-border bg-my-bg py-4 pl-8 text-xl font-bold dark:border-my-darkborder dark:bg-my-darkbg1/50">
          知识库问答
        </label>
      </div>
    </>
  );
}

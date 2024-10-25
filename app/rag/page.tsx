'use client';

import { useEffect, useRef, useState } from 'react';

class GetKBRsp {
  code!: number;
  msg!: string;
  kbs!: string[];
}

const API_URL = 'http://10.112.20.92:8080/api';

export default function Page() {
  return (
    <>
      <title>RAG-知识库问答</title>
      <div className="absolute flex h-full w-full flex-col overflow-hidden p-8 md:relative md:p-16">
        <label className="text-4xl">知识库问答</label>
      </div>
    </>
  );
}

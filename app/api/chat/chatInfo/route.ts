import { cookies } from 'next/headers';
import { AddChatInfoResponse } from '@/action/model/chat';

export async function POST(request: Request) {
  const cookieStore = cookies();
  console.log('====================================');
  console.log(cookieStore.get('session'));
  console.log('====================================');
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/chat/chatInfo`;
  const data = await request.json();
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const resp: AddChatInfoResponse = await res.json();
  return Response.json(resp);
}

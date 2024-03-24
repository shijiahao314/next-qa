import { LogoutResponse } from '@/action/model/auth';

export async function POST(request: Request) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`;
  const data = await request.json();
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const resp: LogoutResponse = await res.json();
  return Response.json(resp);
}

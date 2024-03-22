import { IsLoginResponse } from '@/api/model/auth';

export async function GET(): Promise<[boolean, IsLoginResponse]> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/islogin`;
  const req = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store'
  });
  const resp: IsLoginResponse = await req.json();
  if (!req.ok) {
    return [false, resp];
  }
  return [true, resp];
}

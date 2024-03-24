import { LoginResponse } from '@/action/model/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`;
  const data = await request.json();
  // console.log('====================================');
  // console.log(data);
  // console.log('====================================');
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    // credentials: 'include',
    // cache: 'no-store'
  });
  
  // const resp: LoginResponse = await res.json();
  // // console.log('====================================');
  // // console.log('response=', resp);
  // // console.log('====================================');
  // const cookies = res.headers.getSetCookie();
  // console.log('====================================');
  // console.log(cookies);
  // console.log('====================================');
  // const response: NextResponse = NextResponse.json(resp);
  return res
}

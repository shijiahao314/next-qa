import { BaseResponse } from '@/api/model/base';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code: string = searchParams.get('code') as string;
  const githubLoginRequest: GithubLoginRequest = {};
  const url = `http://123.56.65.40:8080/api/auth/oauth/github?code=${code}`;
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store'
  });
  const resp: GithubLoginResponse = await res.json();
  console.log('====================================');
  console.log(resp);
  console.log('====================================');
  if (res.ok) {
    return NextResponse.redirect(new URL('/userInfo', 'http://123.56.65.40:3000'));
  }

  return NextResponse.redirect(new URL('/login', 'http://123.56.65.40:3000'));
}

// GithubLogin
export interface GithubLoginRequest {}
export interface GithubLoginResponse extends BaseResponse {}

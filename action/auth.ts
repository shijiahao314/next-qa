'use client';

import {
  GithubLoginRequest,
  GithubLoginResponse,
  IsLoginResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  SignUpRequest,
  SignUpResponse
} from './model/auth';

const API_URL = '/api/auth';

// SignUp
export async function SignUp(signUpRequest: SignUpRequest): Promise<[boolean, SignUpResponse]> {
  const url = `${API_URL}/signup`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signUpRequest)
  });
  const resp: SignUpResponse = await req.json();
  if (resp.code != 0) {
    // 注册失败
    console.error('SignUp failed: ', resp.msg);
    return [false, resp];
  }
  // 注册成功
  return [true, resp];
}

// Login
export async function Login(loginRequest: LoginRequest): Promise<[boolean, LoginResponse]> {
  const url = `${API_URL}/login`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginRequest),
    credentials: 'include'
  });
  const resp: LoginResponse = await req.json();
  if (resp.code != 0) {
    // 登录失败
    console.error('Login failed: ', resp.msg);
    return [false, resp];
  }
  // 登录成功
  return [true, resp];
}

// Logout
export async function Logout(logoutRequest: LogoutRequest): Promise<[boolean, LogoutResponse]> {
  const url = `${API_URL}/logout`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logoutRequest)
  });
  const resp: LoginResponse = await req.json();
  if (resp.code != 0) {
    // 登出失败
    console.error('Logout failed: ', resp.msg);
    return [false, resp];
  }
  // 登出成功
  return [true, resp];
}

// IsLogin
export async function IsLogin(): Promise<[boolean, IsLoginResponse]> {
  const url = `${API_URL}/islogin`;
  const req = await fetch(url);
  const resp: IsLoginResponse = await req.json();
  if (resp.code != 0) {
    // 是否登录失败
    console.error('IsLogin failed: ', resp.msg);
    return [false, resp];
  }
  // 是否登录成功
  return [true, resp];
}

// GithubLogin
export async function GithubLogin(
  githubLoginRequest: GithubLoginRequest,
  code: string
): Promise<[boolean, GithubLoginResponse]> {
  const url = `${API_URL}/oauth/github?code=${code}`;
  const req = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store'
  });
  const resp: GithubLoginResponse = await req.json();
  if (!req.ok) {
    return [false, resp];
  }
  return [true, resp];
}

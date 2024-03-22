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

// if 'use server', API_URL = `${BACKEND_URL}/api/auth`.
// if 'use client', API_URL = '/api/auth',
// then `next.config.js` will rewrites.
const API_URL = '/api/auth';

// SignUp
export async function SignUp(signUpRequest: SignUpRequest): Promise<[boolean, SignUpResponse]> {
  const url = `${API_URL}/signup`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signUpRequest),
    credentials: 'include',
    cache: 'no-store'
  });
  const resp: SignUpResponse = await req.json();
  if (!req.ok) {
    return [false, resp];
  }
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
    credentials: 'include',
    cache: 'no-store'
  });
  const resp: LoginResponse = await req.json();
  if (!req.ok) {
    return [false, resp];
  }
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
    body: JSON.stringify(logoutRequest),
    credentials: 'include',
    cache: 'no-store'
  });
  const resp: LoginResponse = await req.json();
  if (!req.ok) {
    return [false, resp];
  }
  return [true, resp];
}

// IsLogin
export async function IsLogin(): Promise<[boolean, IsLoginResponse]> {
  const url = `${API_URL}/islogin`;
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

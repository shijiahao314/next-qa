'use client';

import {
  IsLoginResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  SignUpRequest,
  SignUpResponse
} from './model/auth';

const API_URL = '/backend/auth';

// SignUp
export async function SignUp(signUpRequest: SignUpRequest): Promise<[boolean, SignUpResponse]> {
  const url = `${API_URL}/signup`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signUpRequest)
  });
  const data: SignUpResponse = await resp.json();
  if (data.code != 0) {
    // 失败
    console.error('SignUp failed: ', data.msg);
    return [false, data];
  }
  // 成功
  return [true, data];
}

// Login
export async function Login(loginRequest: LoginRequest): Promise<[boolean, LoginResponse]> {
  const url = `${API_URL}/login`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginRequest)
  });
  const data: LoginResponse = await resp.json();
  if (data.code != 0) {
    // 失败
    console.error('Login failed: ', data.msg);
    return [false, data];
  }
  // 成功
  return [true, data];
}

// Logout
export async function Logout(logoutRequest: LogoutRequest): Promise<[boolean, LogoutResponse]> {
  const url = `${API_URL}/logout`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logoutRequest)
  });
  const data: LoginResponse = await resp.json();
  if (data.code != 0) {
    // 失败
    console.error('Logout failed: ', data.msg);
    return [false, data];
  }
  // 成功
  return [true, data];
}

// IsLogin
export async function IsLogin(): Promise<[boolean, IsLoginResponse]> {
  const url = `${API_URL}/islogin`;
  const resp = await fetch(url);
  const data: IsLoginResponse = await resp.json();
  if (data.code != 0) {
    // 失败
    console.error('IsLogin failed: ', data.msg);
    return [false, data];
  }
  // 成功
  return [true, data];
}

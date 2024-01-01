'use client';

const API_URL = '/api/auth';

export interface BaseResponse {
  code: number;
  msg: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
}

export interface SignUpResponse extends BaseResponse {}

export async function SignUp(signUpRequest: SignUpRequest): Promise<[boolean, SignUpResponse]> {
  const url = `${API_URL}/signup`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpRequest),
      credentials: 'include',
      cache: 'no-store'
    });
    const signUpResponse: SignUpResponse = await res.json();
    if (!res.ok) {
      return [false, signUpResponse];
    }
    return [true, signUpResponse];
  } catch (error) {
    return [
      false,
      {
        code: -1,
        msg: String(error)
      }
    ];
  }
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends BaseResponse {}

export async function Login(loginRequest: LoginRequest): Promise<[boolean, LoginResponse]> {
  const url = `${API_URL}/login`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginRequest),
      credentials: 'include',
      cache: 'no-store'
    });
    const loginResponse: LoginResponse = await res.json();
    if (!res.ok) {
      return [false, loginResponse];
    }
    return [true, loginResponse];
  } catch (error) {
    return [
      false,
      {
        code: -1,
        msg: String(error)
      }
    ];
  }
}

export interface LogoutRequest {}

export interface LogoutResponse {
  code: number;
  msg: string;
}

export async function Logout(logoutRequest: LogoutRequest): Promise<boolean> {
  const url = `${API_URL}/logout`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logoutRequest),
    credentials: 'include',
    cache: 'no-store'
  });

  if (!res.ok) {
    return false;
  }

  return true;
}

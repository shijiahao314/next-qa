'use client';

const API_URL = '/api/auth';

export interface SignUpRequest {
  username: string;
  password: string;
}

export interface SignUpResponse {
  code: number;
  msg: string;
}

export async function SignUp(signUpRequest: SignUpRequest): Promise<[boolean, string]> {
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
      return [false, signUpResponse.msg];
    }
    return [true, signUpResponse.msg];
  } catch (error) {
    return [false, 'Error'];
  }
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  msg: string;
}

export async function Login(loginRequest: LoginRequest): Promise<boolean> {
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

    if (!res.ok) {
      return false;
    }

    const loginResponse: LoginResponse = await res.json();

    return true;
  } catch (error) {
    return false;
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

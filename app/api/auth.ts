'use client';

const API_URL = '/api/auth';

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

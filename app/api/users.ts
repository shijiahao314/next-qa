'use server';

import { BACKEND_URL } from '@/app/config';

const API_URL = `${BACKEND_URL}/admin/user`;

export async function GetUser(page: number, size: number): Promise<UserInfo[]> {
  const queryParams = `?page=${page}&size=${size}`;
  const url = `${API_URL}${queryParams}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }

  const data: GetUserRes = await res.json();

  return data.data.users;
}

export async function AddUser(user: User): Promise<boolean> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  if (!res.ok) {
    return false;
  }

  return true;
}

export async function DeleteUser(userid: string): Promise<boolean> {
  const url = `${API_URL}/${userid}`;
  const res = await fetch(url, {
    method: 'DELETE'
  });

  if (!res.ok) {
    return false;
  }

  return true;
}

export async function GetCurrentUser(): Promise<string> {
  return '1';
}

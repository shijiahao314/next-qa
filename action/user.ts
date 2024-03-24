'use client';

import { GetUserRequest, GetUserResponse, User } from './model/user';

const API_URL = '/api/admin/user';

export async function GetUser(getUserRequest: GetUserRequest): Promise<[boolean, GetUserResponse]> {
  const queryParams = `?page=${getUserRequest.page}&size=${getUserRequest.size}`;
  const url = `${API_URL}${queryParams}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: { revalidate: 60 }
  });
  const data: GetUserResponse = await res.json();
  if (!res.ok) {
    return [false, data];
  }
  return [true, data];
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

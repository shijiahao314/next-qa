'use client';

import { GetUserResponse, AddUserRequest, AddUserResponse, DeleteUserResponse } from './model/user';

const API_URL = '/backend/admin/user';

export async function AddUser(addUserRequest: AddUserRequest): Promise<[boolean, AddUserResponse]> {
  const url = API_URL;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addUserRequest)
  });
  const data: AddUserResponse = await resp.json();
  if (!resp.ok) {
    return [false, data];
  }
  return [true, data];
}

export async function DeleteUser(userid: string): Promise<[boolean, DeleteUserResponse]> {
  const url = `${API_URL}/${userid}`;
  const resp = await fetch(url, {
    method: 'DELETE'
  });
  const data: DeleteUserResponse = await resp.json();
  if (!resp.ok) {
    return [false, data];
  }
  return [true, data];
}

export async function GetUser(page: number, size: number): Promise<[boolean, GetUserResponse]> {
  const url = `${API_URL}?page=${page}&size=${size}`;
  const resp = await fetch(url);
  const data: GetUserResponse = await resp.json();
  if (!resp.ok) {
    return [false, data];
  }
  return [true, data];
}

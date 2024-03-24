'use client';

import {
  // ChatInfo
  AddChatInfoRequest,
  AddChatInfoResponse,
  DeleteChatInfoResponse,
  UpdateChatInfoRequest,
  UpdateChatInfoResponse,
  GetChatInfosResponse,
  // ChatCard
  AddChatCardRequset,
  AddChatCardResponse,
  DeleteChatCardResponse,
  UpdateChatCardRequest,
  UpdateChatCardResponse,
  GetChatCardsResponse
} from './model/chat';

const API_URL = '/backend/chat';

// ChatInfo
// AddChatInfo
export async function AddChatInfo(
  addChatInfoRequest: AddChatInfoRequest
): Promise<[boolean, AddChatInfoResponse]> {
  const url = `${API_URL}/chatInfo`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addChatInfoRequest)
  });
  const data: AddChatInfoResponse = await resp.json();
  if (data.code != 0) {
    console.error('AddChatInfo failed: ', data.msg);
    return [false, data];
  }
  return [true, data];
}

// DeleteChatInfo
export async function DeleteChatInfo(
  chatInfoId: string
): Promise<[boolean, DeleteChatInfoResponse]> {
  const url = `${API_URL}/chatInfo/${chatInfoId}`;
  const resp = await fetch(url, {
    method: 'DELETE'
  });
  const data: DeleteChatInfoResponse = await resp.json();
  if (data.code != 0) {
    console.error('AddChatInfo failed: ', data.msg);
    return [false, data];
  }
  return [true, data];
}

// UpdateChatInfo
export async function UpdateChatInfo(
  chatInfoId: string,
  updateChatInfoRequest: UpdateChatInfoRequest
): Promise<[boolean, UpdateChatInfoResponse]> {
  const url = `${API_URL}/chatInfo/${chatInfoId}`;
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateChatInfoRequest)
  });
  const data: UpdateChatInfoResponse = await resp.json();
  if (data.code != 0) {
    console.error('UpdateChatInfo failed: ', data.msg);
    return [false, data];
  }
  return [true, data];
}

// GetChatInfos
export async function GetChatInfos(): Promise<[boolean, GetChatInfosResponse]> {
  const url = `${API_URL}/chatInfos`;
  const resp = await fetch(url);
  const data: GetChatInfosResponse = await resp.json();
  if (data.code != 0) {
    return [false, data];
  }
  return [true, data];
}

// ChatCard
// AddChatCard
export async function AddChatCard(
  addChatCardRequset: AddChatCardRequset
): Promise<[boolean, AddChatCardResponse]> {
  const url = `${API_URL}/chatCard`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addChatCardRequset)
  });
  const data: AddChatCardResponse = await resp.json();
  if (data.code != 0) {
    console.error('AddChatCard failed: ', data.msg);
    return [false, data];
  }
  return [true, data];
}

// DeleteChatCard
export async function DeleteChatCard(
  chatCardId: string
): Promise<[boolean, DeleteChatCardResponse]> {
  const url = `${API_URL}/chatCard/${chatCardId}`;
  const resp = await fetch(url, {
    method: 'DELETE'
  });
  const data: AddChatCardResponse = await resp.json();
  if (data.code != 0) {
    console.error('DeleteChatCard failed: ', data.msg);
    return [false, data];
  }
  return [true, data];
}

// UpdateChatCard
export async function UpdateChatCard(
  updateChatCardRequest: UpdateChatCardRequest
): Promise<[boolean, UpdateChatCardResponse]> {
  const url = `${API_URL}/chatCard`;
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateChatCardRequest)
  });
  const data: UpdateChatCardResponse = await resp.json();
  if (data.code != 0) {
    return [false, data];
  }
  return [true, data];
}

// GetChatCards
export async function GetChatCards(chat_info_id: string): Promise<[boolean, GetChatCardsResponse]> {
  const url = `${API_URL}/chatCards/${chat_info_id}`;
  const resp = await fetch(url);
  const data: GetChatCardsResponse = await resp.json();
  if (data.code != 0) {
    return [false, data];
  }
  return [true, data];
}

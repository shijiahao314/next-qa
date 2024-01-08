'use client';

import { BACKEND_URL } from '../app/config';
import {
  AddChatCardRequset,
  AddChatCardResponse,
  DeleteChatCardRequest,
  DeleteChatCardResponse,
  ChatCard,
  ChatCardDTO,
  GetChatCardRequest,
  GetChatCardsResponse,
  GetChatInfosResponse,
  UpdateChatCardRequest,
  UpdateChatCardResponse,
  GetChatInfosRequest
} from './model/chat';

// const API_URL = `${BACKEND_URL}/api/chat`;
const API_URL = `/api/chat`;

// ChatInfo
// GetChatInfos
export async function GetChatInfos(
  getChatInfosRequest: GetChatInfosRequest
): Promise<[boolean, GetChatInfosResponse]> {
  const url = `${API_URL}/chatInfos`;
  const resp = await fetch(url);
  const data: GetChatInfosResponse = await resp.json();
  if (!resp.ok) {
    return [false, data];
  }
  // convert datetime format
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: 'short',
    timeStyle: 'medium'
  };
  for (let index = 0; index < data.data.chat_infos.length; index++) {
    const originalDate = new Date(data.data.chat_infos[index].utime);
    const formattedDate = new Intl.DateTimeFormat('zh-CN', options).format(originalDate);
    data.data.chat_infos[index].utime = formattedDate;
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
  if (!resp.ok) {
    return [false, data];
  }
  return [true, data];
}

// DeleteChatCard
export async function DeleteChatCard(
  chatCardId: string,
  deleteChatCardRequset: DeleteChatCardRequest
): Promise<[boolean, DeleteChatCardResponse]> {
  const url = `${API_URL}/chatCard/${chatCardId}`;
  const resp = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(deleteChatCardRequset)
  });
  const data: AddChatCardResponse = await resp.json();
  if (!resp.ok) {
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
  const data: AddChatCardResponse = await resp.json();
  if (!resp.ok) {
    return [false, data];
  }
  return [true, data];
}

// GetChatCards
export async function GetChatCards(
  getChatCardRequest: GetChatCardRequest
): Promise<[boolean, GetChatCardsResponse]> {
  const pathParams = `/${getChatCardRequest.chat_info_id}`;
  const url = `${API_URL}/chatCards${pathParams}`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });
  const data: GetChatCardsResponse = await resp.json();
  if (!resp.ok) {
    return [false, data];
  }
  return [true, data];
}

'use server';

import { log } from 'console';
import { BACKEND_URL } from '../app/config';

import {
  AddChatCardResponse,
  ChatCard,
  ChatCardDTO,
  GetChatCardsResponse,
  GetChatInfosResponse
} from './model/chat';

const API_URL = `${BACKEND_URL}/api/chat`;

// ChatInfo
// GetChatInfos
export async function GetChatInfos(): Promise<[boolean, GetChatInfosResponse]> {
  const url = `${API_URL}/chatInfo`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });
  const data: GetChatInfosResponse = await res.json();
  if (!res.ok) {
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
export async function AddChatCard(chatCardDTO: ChatCardDTO): Promise<boolean> {
  const url = `${API_URL}/chatCard`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(chatCardDTO)
  });

  log(JSON.stringify(chatCardDTO));

  if (!res.ok) {
    return false;
  }

  const data: AddChatCardResponse = await res.json();

  return true;
}
// GetChatCards
export async function GetChatCards(chatid: string): Promise<ChatCard[]> {
  const pathParams = `/${chatid}`;
  const url = `${API_URL}/chatCards${pathParams}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });

  const data: GetChatCardsResponse = await res.json();
  if (!res.ok) {
    return [];
  }
  return data.data.chat_cards;
}

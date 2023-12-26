'use server';

import { BACKEND_URL } from "../config";

const API_URL = `${BACKEND_URL}/api/chat`;

export async function GetChatInfos(userid: string): Promise<ChatInfo[]> {
  const queryParams = `?userid=${userid}`;
  const url = `${API_URL}/chatInfo${queryParams}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch chat data');
  }

  const data: GetChatInfosRes = await res.json();

  const options: Intl.DateTimeFormatOptions = {
    dateStyle: 'short',
    timeStyle: 'medium'
  };

  for (let index = 0; index < data.data.chat_infos.length; index++) {
    const originalDate = new Date(data.data.chat_infos[index].utime);
    const formattedDate = new Intl.DateTimeFormat('zh-CN', options).format(originalDate);
    data.data.chat_infos[index].utime = formattedDate;
  }

  return data.data.chat_infos;
}

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

  if (!res.ok) {
    throw new Error('Failed to fetch chat cards');
  }

  const data : GetChatCardsResponse = await res.json();

  return data.data.chat_cards
}

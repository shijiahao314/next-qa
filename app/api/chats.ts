'use server';

import { log } from 'console';
import { BACKEND_URL } from '../config';

const ChatInfoURL = `${BACKEND_URL}/chat/chatInfo`;

export async function GetChatInfos(userid: string): Promise<ChatInfo[]> {
  const queryParams = `?userid=${userid}`;
  const url = `${ChatInfoURL}${queryParams}`;
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

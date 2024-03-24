'use client';

import {
  // ChatInfo
  AddChatInfoRequest,
  AddChatInfoResponse,
  DeleteChatInfoRequest,
  DeleteChatInfoResponse,
  UpdateChatInfoRequest,
  UpdateChatInfoResponse,
  GetChatInfosRequest,
  GetChatInfosResponse,
  // ChatCard
  AddChatCardRequset,
  AddChatCardResponse,
  DeleteChatCardRequest,
  DeleteChatCardResponse,
  UpdateChatCardRequest,
  UpdateChatCardResponse,
  GetChatCardRequest,
  GetChatCardsResponse
} from './model/chat';

// const API_URL = `${BACKEND_URL}/api/chat`;
const API_URL = `/api/chat`;

// ChatInfo
// AddChatInfo
export async function AddChatInfo(
  addChatInfoRequest: AddChatInfoRequest
): Promise<[boolean, AddChatInfoResponse]> {
  console.log('====================================');
  console.log(111);
  console.log('====================================');
  const url = `${API_URL}/chatInfo`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addChatInfoRequest),
    credentials: 'include'
  });
  const resp: AddChatInfoResponse = await req.json();
  console.log('====================================');
  console.log(resp);
  console.log('====================================');
  if (resp.code != 0) {
    // 失败
    console.error('AddChatInfo failed: ', resp.msg);
    return [false, resp];
  }
  // 成功
  return [true, resp];
}

// DeleteChatInfo
export async function DeleteChatInfo(
  chatInfoId: string,
  deleteChatInfoRequest: DeleteChatInfoRequest
): Promise<[boolean, DeleteChatInfoResponse]> {
  const url = `${API_URL}/chatInfo/${chatInfoId}`;
  const resp = await fetch(url, {
    method: 'DELETE'
  });
  const data: DeleteChatInfoResponse = await resp.json();
  if (!resp.ok) {
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
  if (!resp.ok) {
    return [false, data];
  }
  return [true, data];
}

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
  // data.data.chat_infos.forEach(chatInfo => {
  //   chatInfo.ctime = timeFormatter.format(new Date(chatInfo.ctime));
  //   chatInfo.utime = timeFormatter.format(new Date(chatInfo.utime));
  // });
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
  const data: UpdateChatCardResponse = await resp.json();
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

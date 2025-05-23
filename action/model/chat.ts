import { BaseResponse } from './base';

// ChatInfo
export interface ChatInfo {
  id: string;
  title: string;
  num: number;
  ctime: Date;
  utime: Date;
}

const timeFormatter = new Intl.DateTimeFormat('zh-CN', {
  dateStyle: 'short',
  timeStyle: 'medium'
});

export function FormattedTime(time: Date) {
  return timeFormatter.format(new Date(time));
}

// AddChatInfo
export interface AddChatInfoRequest {
  title: string;
}
export interface AddChatInfoResponse extends BaseResponse {
  data: {
    chat_info: ChatInfo;
  };
}
// DeleteChatInfo
export interface DeleteChatInfoRequest {}
export interface DeleteChatInfoResponse extends BaseResponse {}
// UpdateChatInfo
export interface UpdateChatInfoRequest {
  title: string;
}
export interface UpdateChatInfoResponse extends BaseResponse {}
// GetChatInfos
export interface GetChatInfosRequest {}
export interface GetChatInfosResponse extends BaseResponse {
  data: {
    chat_infos: ChatInfo[];
  };
}

// ChatCard
export interface ChatCard {
  id: string;
  chat_info_id: string;
  content: string;
  role: string;
  ctime: Date;
  utime: Date;
}
export enum ChatRole {
  USER = 'user',
  ASSISTANT = 'assistant'
}
export interface ChatCardDTO {
  chat_info_id: string;
  content: string;
  role: ChatRole;
}
// AddChatCard
export interface AddChatCardRequset extends ChatCardDTO {}
export interface AddChatCardResponse extends BaseResponse {
  chat_card: ChatCard;
}
// DeleteChatCard
export interface DeleteChatCardRequest {}
export interface DeleteChatCardResponse extends BaseResponse {}
// UpdateChatCard
export interface UpdateChatCardRequest {}
export interface UpdateChatCardResponse extends BaseResponse {}
// GetChatCard
export interface GetChatCardRequest {
  chat_info_id: string;
}
export interface GetChatCardsResponse extends BaseResponse {
  data: {
    chat_cards: ChatCard[];
  };
}

// WebSocket
export interface WSChatSendMessage {
  // 1: AddChatCard
  // 2: DeleteChatCard
  // 3: UpdateChatCard
  // 4: GetChatCards
  type: number;
  chat_id: string; // Add, Delete, Update
  content: string; // Add, Update
  chat_info_id: string; // Get
}
export interface WSChatReceiveMessage {
  // 0: success
  // !0: failed
  code: number;
  msg: string;
  data: ChatCard; // Get
}

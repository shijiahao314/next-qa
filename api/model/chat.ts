import { BaseRequest, BaseResponse } from './base';

// ChatInfo
export interface ChatInfo {
  id: string;
  userid: string;
  title: string;
  num: number;
  ctime: string;
  utime: string;
}
// AddChatInfo
export interface AddChatInfoRequest extends BaseRequest {}
export interface AddChatInfoResponse extends BaseResponse {}
// DeleteChatInfo
export interface DeleteChatInfoRequest extends BaseRequest {}
export interface DeleteChatInfoResponse extends BaseResponse {}
// UpdateChatInfo
export interface UpdateChatInfoRequest extends BaseRequest {}
export interface UpdateChatInfoResponse extends BaseResponse {}
// GetChatInfos
export interface GetChatInfosRequest extends BaseRequest {}
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
}
export interface ChatCardDTO {
  chat_info_id: string;
  content: string;
}
// AddChatCard
export interface AddChatCardRequset extends BaseRequest {
  chat_info_id: string;
  content: string;
}
export interface AddChatCardResponse extends BaseResponse {
  chat_card: ChatCard;
}
// DeleteChatCard
export interface DeleteChatCardRequest extends BaseRequest {}
export interface DeleteChatCardResponse extends BaseResponse {}
// UpdateChatCard
export interface UpdateChatCardRequest extends BaseRequest {}
export interface UpdateChatCardResponse extends BaseResponse {}
// GetChatCard
export interface GetChatCardRequest extends BaseRequest {
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

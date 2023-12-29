interface ChatInfo {
  id: string;
  userid: string;
  title: string;
  num: string;
  ctime: string;
  utime: string;
}

interface GetChatInfosRes {
  code: number;
  msg: string;
  data: {
    chat_infos: ChatInfo[];
  };
}

interface AddChatCardResponse {
  code: number;
  msg: string;
}

interface GetChatCardsResponse {
  code: number;
  msg: string;
  data: {
    chat_cards: ChatCard[];
  };
}

interface ChatCard {
  id: string;
  chat_info_id: string;
  content: string;
  role: string;
}

interface ChatCardDTO {
  chat_info_id: string;
  content: string;
  role: string;
}

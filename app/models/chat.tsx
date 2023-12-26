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

interface GetChatCardsResponse {
  code: number;
  msg: string;
  data: {
    chat_cards: ChatCard[];
  };
}

interface ChatCard {
  id: string;
  chatInfoId: string;
  content: string;
  role: string;
}

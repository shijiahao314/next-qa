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

interface Role {
  name: string;
}

interface ChatCard {
  id: string;
  chatInfoId: string;
  content: string;
  role: Role;
}

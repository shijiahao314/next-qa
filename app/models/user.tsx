interface UserInfo {
  userid: string;
  username: string;
  role: string;
}

interface User {
  username: string;
  password: string;
  role: string;
}

interface GetUserRes {
  code: number;
  msg: string;
  data: {
    page: number;
    size: number;
    total: number;
    users: UserInfo[];
  };
}

interface PostUserRes {
  code: number;
  msg: string;
}

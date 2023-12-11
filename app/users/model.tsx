interface UserData {
  userid: string;
  username: string;
  role: string;
}

interface FetchUsersRes {
  code: number;
  msg: string;
  data: {
    page: number;
    size: number;
    total: number;
    users: UserData[];
  };
}

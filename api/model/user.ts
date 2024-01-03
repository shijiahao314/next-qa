import { BaseResponse } from './base';

export interface UserInfo {
  userid: string;
  username: string;
  role: string;
}

export interface User {
  username: string;
  password: string;
  role: string;
}

// GetUser
export interface GetUserRequest {
  page: number;
  size: number;
}
export interface GetUserResponse extends BaseResponse {
  data: {
    page: number;
    size: number;
    total: number;
    users: UserInfo[];
  };
}

export interface PostUserResponse extends BaseResponse {}

import { BaseResponse } from './base';

export interface UserInfo {
  userid: string;
  username: string;
  role: string;
}

// AddUser
export interface AddUserRequest {
  username: string;
  password: string;
  role: string;
}
export interface AddUserResponse extends BaseResponse {}

// DeleteUser
export interface DeleteUserRequest {}
export interface DeleteUserResponse extends BaseResponse {}

// GetUser
export interface GetUserRequest {
  page: number;
  size: number;
}
export interface GetUserResponse extends BaseResponse {
  data: {
    total: number;
    size: number;
    page: number;
    user_infos: UserInfo[];
  };
}

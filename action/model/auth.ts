import { BaseResponse } from './base';

// SignUp
export type SignUpRequest = object;
export interface SignUpResponse extends BaseResponse {
  username: string;
  password: string;
}

// Login
export interface LoginRequest {
  username: string;
  password: string;
}
export type LoginResponse = BaseResponse;

// Logout
export type LogoutRequest = object;
export type LogoutResponse = BaseResponse;

// IsLogin GET
export interface IsLoginResponse extends BaseResponse {
  isLogin: boolean;
}

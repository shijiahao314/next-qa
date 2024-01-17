import { BaseResponse } from './base';

// SignUp
export interface SignUpRequest {}
export interface SignUpResponse extends BaseResponse {
  username: string;
  password: string;
}

// Login
export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse extends BaseResponse {}

// Logout
export interface LogoutRequest {}
export interface LogoutResponse extends BaseResponse {}

// IsLogin
export interface IsLoginRequest {}
export interface IsLoginResponse extends BaseResponse {
  isLogin: boolean;
}

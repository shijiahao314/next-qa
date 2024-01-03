import { BaseRequest, BaseResponse } from './base';

// SignUp
export interface SignUpRequest extends BaseRequest {}
export interface SignUpResponse extends BaseResponse {
  username: string;
  password: string;
}

// Login
export interface LoginRequest extends BaseRequest {
  username: string;
  password: string;
}
export interface LoginResponse extends BaseResponse {}

// Logout
export interface LogoutRequest extends BaseRequest {}
export interface LogoutResponse extends BaseResponse {}

// IsLogin
export interface IsLoginRequest extends BaseRequest {}
export interface IsLoginResponse extends BaseResponse {
  isLogin: boolean;
}

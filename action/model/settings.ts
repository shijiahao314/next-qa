import { BaseResponse } from './base';

// Settings
export interface Settings {
  openai_api_key: string;
  chat_model: string;
  test_mode: boolean;
}

export interface GetSettingsRequest {}
export interface GetSettingsResponse extends BaseResponse {
  data: Settings;
}

'use client';

import { GetSettingsResponse } from './model/settings';

const API_URL = '/api/settings';

// Settings
export async function GetSettings(): Promise<[boolean, GetSettingsResponse]> {
  const url = `${API_URL}/settings`;
  const resp = await fetch(url);
  const data: GetSettingsResponse = await resp.json();
  if (!resp.ok) {
    return [false, data];
  }
  return [true, data];
}

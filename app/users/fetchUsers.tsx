'use server';

import { api } from '@/app/config';

export async function fetchUsers(): Promise<UserData[]> {
  const response = await fetch(`${api}/admin/user`, { next: { revalidate: 60 } });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data: FetchUsersRes = await response.json(); // 在 await 中获取 JSON 数据

  return data.data.users; // 返回获取到的数据
}

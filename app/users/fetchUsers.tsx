'use server';

import { BACKEND_URL } from '@/app/config';

export async function GetUser(page = 1, size = 10): Promise<UserInfo[]> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString()
    });

    const res = await fetch(`${BACKEND_URL}/admin/user?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 60 }
    });

    const data: GetUserRes = await res.json();

    return data.data.users;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch user data');
  }
}

export async function PostUser(userInfo: UserInfo): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/admin/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (res.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch user data');
  }
}

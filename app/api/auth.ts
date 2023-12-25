'use server';

import { BACKEND_URL } from '@/app/config';

const API_URL = `${BACKEND_URL}/auth`;

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
    code: number;
    msg: string;
}


export async function Login(loginRequest: LoginRequest): Promise<boolean> {
    const url = `${API_URL}/login`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginRequest)
    });

    if (!res.ok) {
        return false;
    }

    const rep: LoginResponse = await res.json();
    
    return true;
}

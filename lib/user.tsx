'use client';

import { create } from 'zustand';

interface UserState {
  username: string;
  email: string;
}

export const useUserStore = create<UserState>((set, get) => ({
  username: '',
  setUsername: (username: string) => set({ username: username }),
  getUsername: () => get().username,
  email: '',
  setEmail: (email: string) => set({ email: email }),
  getEmail: () => get().email
}));

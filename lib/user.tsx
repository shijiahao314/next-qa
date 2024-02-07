'use client';

import { create } from 'zustand';

interface UserState {
  username: string;
}

export const useUserStore = create<UserState>((set, get) => ({
  username: '',
  setUsername: (username: string) => set({ username: username }),
  getUsername: () => get().username
}));

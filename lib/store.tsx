'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist, combine, createJSONStorage } from 'zustand/middleware';

export const useLocalStore = create(
  persist(
    combine(
      {
        chatTitle: '',
        username: '',
        isLogin: true
      },
      (set, get) => ({
        getChatTitle: () => get().chatTitle,
        setChatTitle: (chatTitle: string) => set({ chatTitle: chatTitle }),
        getUsername: () => get().username,
        setUsername: (username: string) => set({ username: username }),
        getLogin: () => get().isLogin,
        setLogin: (state: boolean) => set({ isLogin: state })
      })
    ),
    {
      name: 'state-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const useBearStore = create(
  combine(
    {
      sideNavOpen: false
    },
    (set, get) => ({
      getSideNavOpen: () => get().sideNavOpen,
      setSideNavOpen: (state: boolean) => set({ sideNavOpen: state })
    })
  )
);

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

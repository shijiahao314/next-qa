'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist, combine, createJSONStorage } from 'zustand/middleware';

export const useLocalStore = create(
  persist(
    combine(
      {
        username: '',
        isLogin: true
      },
      (set, get) => ({
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
      navOpen: false,
      historyOpen: false,
      selectedChatID: '',
      chatInfo: {
        id: '0',
        userid: 'userid',
        title: 'title',
        num: '0',
        ctime: 'utime',
        utime: 'ctime'
      }
    },
    (set, get) => ({
      getNavOpen: () => get().navOpen,
      setNavOpen: (state: boolean) => set({ navOpen: state }),
      getHistoryOpen: () => get().historyOpen,
      setHistoryOpen: (state: boolean) => set({ historyOpen: state }),
      getSelectedChatID: () => get().selectedChatID,
      setSelectedChatID: (id: string) => set({ selectedChatID: id }),
      setChatTitle: (title: string) => set({ chatInfo: { ...get().chatInfo, title: title } }),
      getChatInfo: () => get().chatInfo,
      setChatInfo: (chatInfo: ChatInfo) => set({ chatInfo: chatInfo })
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

// 直接操作变量，和使用函数操作变量似乎不同
// 直接操作变量，会导致组件重新渲染，而使用函数操作变量不会？

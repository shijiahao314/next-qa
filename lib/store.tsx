'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist, combine, createJSONStorage } from 'zustand/middleware';

export const useLocalStore = create(
  persist(
    combine(
      {
        username: ''
      },
      (set, get) => ({
        getUsername: () => get().username,
        setUsername: (username: string) => set({ username: username })
      })
    ),
    {
      name: 'state-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

interface ChatMetaInfo {
  title: string;
  num: string;
}

export const useBearStore = create(
  combine(
    {
      isLogin: false,
      navOpen: false,
      historyOpen: false,
      selectedChatID: '',
      chatMetaInfo: {
        title: '新的聊天',
        num: '0'
      },
      tmpChatContent: '',
      chatBodyRefresh: false
    },
    (set, get) => ({
      getIsLogin: () => get().isLogin,
      setIgLogin: (state: boolean) => set({ isLogin: state }),
      setNavOpen: (state: boolean) => set({ navOpen: state }),
      setHistoryOpen: (state: boolean) => set({ historyOpen: state }),
      getSelectedChatID: () => get().selectedChatID,
      setSelectedChatID: (id: string) => set({ selectedChatID: id }),
      setChatMetaInfo: (chatMetaInfo: ChatMetaInfo) => set({ chatMetaInfo: chatMetaInfo }),
      setTmpChatContent: (content: string) => set({ tmpChatContent: content }),
      getChatBodyRefresh: () => get().chatBodyRefresh,
      setChatBodyRefresh: (state: boolean) => set({ chatBodyRefresh: state })
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

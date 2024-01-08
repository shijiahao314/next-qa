'use client';

import { DeleteChatCard, GetChatInfos } from '@/api/chat';
import { ChatCard, ChatCardDTO, ChatInfo, DeleteChatCardResponse } from '@/api/model/chat';
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

interface ChatState {
  chatInfos: ChatInfo[];
  getChatInfos: () => ChatInfo[];
  setChatInfos: (chatInfos: ChatInfo[]) => void;
  selectedChatInfoID: string;
  getSelectedChatInfoID: () => string;
  setSelectedChatInfoID: (chatInfoID: string) => void;
  chatCards: ChatCard[];
  getChatCards: () => ChatCard[];
  setChatCards: (chatCards: ChatCard[]) => void;
  addChatCard: (chatCard: ChatCard) => void;
  deleteChatCard: (chatCardId: string) => void;
  // handleDeleteChatCard: (chatCardId: string) => void;
  // handleUpdateChatCard: (chatCard: ChatCard) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chatInfos: [],
  getChatInfos: () => get().chatInfos,
  setChatInfos: (chatInfos: ChatInfo[]) => set({ chatInfos: chatInfos }),
  selectedChatInfoID: '',
  getSelectedChatInfoID: () => get().selectedChatInfoID,
  setSelectedChatInfoID: (chatInfoID: string) => set({ selectedChatInfoID: chatInfoID }),
  chatCards: [],
  getChatCards: () => get().chatCards,
  // setChatCards: (chatCards: ChatCard[]) => set({ chatCards: chatCards })
  setChatCards: (chatCards: ChatCard[]) =>
    set((state) => ({
      chatCards: [...chatCards]
    })),
  addChatCard: (chatCard: ChatCard) =>
    set((state) => ({
      ...state,
      chatCards: [...state.chatCards, chatCard]
    })),
  deleteChatCard: (chatCardId: string) =>
    set((state) => ({
      ...state,
      chatCards: state.chatCards.filter((chatCard) => chatCard.id != chatCardId)
    }))
  // chatCardsAdd: (chatCard: ChatCard) => {
  //   get().chatCards = [...get().chatCards, chatCard];
  // }
  // handleDeleteChatCard: (chatCardId: string) => {
  //   DeleteChatCard(chatCardId, {}).then(([success, resp]: [boolean, DeleteChatCardResponse]) => {
  //     if (success) {
  //       get().chatCards.filter((chatCard) => chatCard.id != chatCardId);
  //     }
  //   });
  // },
  // handleUpdateChatCard: (chatCard: ChatCard) => {}
}));

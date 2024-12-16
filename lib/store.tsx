'use client';

import { ChatCard, ChatInfo } from '@/action/model/chat';
import { create } from 'zustand';
import { combine, devtools, persist, StorageValue } from 'zustand/middleware';

// 直接操作变量，和使用函数操作变量似乎不同
// 直接操作变量，会导致组件重新渲染，而使用函数操作变量不会？

const bearStoreName = 'bearStore';
const chatStoreName = 'chatStore';

export const useBearStore = create(
  devtools(
    persist(
      combine(
        {
          isLogin: false
        },
        (set, get) => ({
          getIsLogin: () => get().isLogin,
          setIgLogin: (state: boolean) => set({ isLogin: state })
        })
      ),
      {
        name: bearStoreName
      }
    )
  )
);

interface ChatState {
  // chatInfos
  chatInfos: ChatInfo[];
  setChatInfos: (chatInfos: ChatInfo[]) => void;
  // selectedChatInfo
  selectedChatInfoID: string;
  getSelectedChatInfoID: () => string;
  setSelectedChatInfoID: (chatInfoID: string) => void;
  // chatMap
  chatMap: Map<string, ChatCard[]>;
  // chatCard CRUD
  addChatCard: (key: string, chatCard: ChatCard) => void;
  removeChatCard: (key: string, chatId: string) => void;
  updateChatCard: (key: string, chatCard: ChatCard) => void;
  getChatsCard: (key: string) => ChatCard[];
}

function sortChatInfos(chatInfos: ChatInfo[]) {
  return chatInfos.sort((a, b) => {
    const aTime = new Date(a.utime).getTime();
    const bTime = new Date(b.utime).getTime();
    return bTime - aTime;
  });
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set, get) => ({
        // chatInfos
        chatInfos: [],
        setChatInfos: (chatInfos: ChatInfo[]) => {
          let newChatInfos = [...chatInfos]; // deep copy
          newChatInfos = sortChatInfos(newChatInfos); // sort
          set({ chatInfos: newChatInfos });
        },
        // selectedChatInfo
        selectedChatInfoID: '',
        getSelectedChatInfoID: () => get().selectedChatInfoID,
        setSelectedChatInfoID: (chatInfoID: string) => set({ selectedChatInfoID: chatInfoID }),
        // chatMap
        chatMap: new Map<string, ChatCard[]>(),
        // chatCard CRUD
        addChatCard: (key, chatCard) => {
          set((state) => {
            // chatMap
            const chatMap = new Map(state.chatMap); // deep copy
            const chatCards = chatMap.get(key) || [];
            chatMap.set(key, [...chatCards, chatCard]);
            // chatInfo
            let chatInfos = [...state.chatInfos]; // deep copy
            const index = chatInfos.findIndex((chatInfo) => chatInfo.id === key);
            chatInfos[index].num++;
            chatInfos[index].utime = new Date();
            chatInfos = sortChatInfos(chatInfos);
            return { chatMap: chatMap, chatInfos: chatInfos };
          });
        },
        removeChatCard: (key, chatId) => {
          set((state) => {
            // chatMap
            const chatMap = new Map(state.chatMap); // deep copy
            const chatCards = chatMap.get(key);
            if (chatCards) {
              chatMap.set(
                key,
                chatCards.filter((chat) => chat.id !== chatId)
              );
            }
            // chatInfo
            let chatInfos = [...state.chatInfos]; // deep copy
            const index = chatInfos.findIndex((chatInfo) => chatInfo.id === key);
            chatInfos[index].num--;
            chatInfos[index].utime = new Date();
            chatInfos = sortChatInfos(chatInfos);
            return { chatMap: chatMap, chatInfos: chatInfos };
          });
        },
        updateChatCard: (key, updatedChatCard) => {
          set((state) => {
            // chatMap
            const chatMap = new Map(state.chatMap); // deep copy
            const chatCards = chatMap.get(key);
            if (chatCards) {
              chatMap.set(
                key,
                chatCards.map((chat) => (chat.id === updatedChatCard.id ? updatedChatCard : chat))
              );
            }
            // chatInfo
            let chatInfos = [...state.chatInfos]; // deep copy
            const index = chatInfos.findIndex((chatInfo) => chatInfo.id === key);
            chatInfos[index].utime = new Date();
            chatInfos = sortChatInfos(chatInfos);
            return { chatMap: chatMap };
          });
        },
        getChatsCard: (key) => {
          return get().chatMap.get(key) || [];
        }
      }),
      {
        name: chatStoreName,
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            if (!str) return null;
            const existingValue = JSON.parse(str);
            return {
              ...existingValue,
              state: {
                ...existingValue.state,
                chatMap: new Map(existingValue.state.chatMap)
              }
            };
          },
          setItem: (name, newValue: StorageValue<ChatState>) => {
            // functions cannot be JSON encoded
            const str = JSON.stringify({
              ...newValue,
              state: {
                ...newValue.state,
                chatMap: Array.from(newValue.state.chatMap.entries())
              }
            });
            localStorage.setItem(name, str);
          },
          removeItem: (name) => localStorage.removeItem(name)
        }
      }
    )
  )
);

interface TmpChatStat {
  // tmpChatContent
  tmpChatContent: string;
  setTmpChatContent: (chatInfos: string) => void;
  // tmpCompletionContent
  tmpCompletionContent: string;
}

export const useTmpChatStat = create<TmpChatStat>()((set) => ({
  // tmpChatContent
  tmpChatContent: '',
  setTmpChatContent: (content: string) => set({ tmpChatContent: content }),
  // tmpCompletionContent
  tmpCompletionContent: ''
}));

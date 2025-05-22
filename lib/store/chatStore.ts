'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ChatCard, ChatInfo } from '@/action/model/chat';

const storeName = 'chatStore';

interface ChatState {
  chatInfos: ChatInfo[];
  setChatInfos: (chatInfos: ChatInfo[]) => void;

  selectedChatInfoID: string;
  getSelectedChatInfoID: () => string;
  setSelectedChatInfoID: (chatInfoID: string) => void;

  chatMap: Map<string, ChatCard[]>;
  addChatCard: (key: string, chatCard: ChatCard) => void;
  removeChatCard: (key: string, chatId: string) => void;
  updateChatCard: (key: string, chatCard: ChatCard) => void;
  getChatCards: (key: string) => ChatCard[];
}

function sortChatInfos(chatInfos: ChatInfo[]): ChatInfo[] {
  return chatInfos.sort((a, b) => new Date(b.utime).getTime() - new Date(a.utime).getTime());
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set, get) => ({
        chatInfos: [],
        setChatInfos: (chatInfos) =>
          set({
            chatInfos: sortChatInfos([...chatInfos])
          }),

        selectedChatInfoID: '',
        getSelectedChatInfoID: () => get().selectedChatInfoID,
        setSelectedChatInfoID: (chatInfoID) => set({ selectedChatInfoID: chatInfoID }),

        chatMap: new Map(),

        addChatCard: (key, chatCard) => {
          set((state) => {
            const newMap = new Map(state.chatMap);
            const chatList = newMap.get(key) || [];
            newMap.set(key, [...chatList, chatCard]);

            const chatInfos = [...state.chatInfos];
            const index = chatInfos.findIndex((c) => c.id === key);
            if (index >= 0) {
              chatInfos[index].num++;
              chatInfos[index].utime = new Date();
            }
            return {
              chatMap: newMap,
              chatInfos: sortChatInfos(chatInfos)
            };
          });
        },

        removeChatCard: (key, chatId) => {
          set((state) => {
            const newMap = new Map(state.chatMap);
            const chatList = newMap.get(key) || [];
            newMap.set(
              key,
              chatList.filter((c) => c.id !== chatId)
            );

            const chatInfos = [...state.chatInfos];
            const index = chatInfos.findIndex((c) => c.id === key);
            if (index >= 0) {
              chatInfos[index].num--;
              chatInfos[index].utime = new Date();
            }

            return {
              chatMap: newMap,
              chatInfos: sortChatInfos(chatInfos)
            };
          });
        },

        updateChatCard: (key, updatedCard) => {
          set((state) => {
            const newMap = new Map(state.chatMap);
            const chatList = newMap.get(key) || [];
            newMap.set(
              key,
              chatList.map((c) => (c.id === updatedCard.id ? updatedCard : c))
            );

            const chatInfos = [...state.chatInfos];
            const index = chatInfos.findIndex((c) => c.id === key);
            if (index >= 0) chatInfos[index].utime = new Date();

            return {
              chatMap: newMap,
              chatInfos: sortChatInfos(chatInfos)
            };
          });
        },

        getChatCards: (key) => get().chatMap.get(key) || []
      }),
      {
        name: storeName,
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            if (!str) return null;
            const parsed = JSON.parse(str);
            return {
              ...parsed,
              state: {
                ...parsed.state,
                chatMap: new Map(parsed.state.chatMap)
              }
            };
          },
          setItem: (name, newValue) => {
            const valueToStore = {
              ...newValue,
              state: {
                ...newValue.state,
                chatMap: Array.from(newValue.state.chatMap.entries())
              }
            };
            localStorage.setItem(name, JSON.stringify(valueToStore));
          },
          removeItem: (name) => localStorage.removeItem(name)
        }
      }
    )
  )
);

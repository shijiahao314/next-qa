'use client';

import { ChatCard, ChatInfo } from '@/action/model/chat';
import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

// 直接操作变量，和使用函数操作变量似乎不同
// 直接操作变量，会导致组件重新渲染，而使用函数操作变量不会？

const bearStoreName = 'bearStore';
const chatStoreName = 'chatStore';

export const useBearStore = create(
  devtools(
    persist(
      combine(
        {
          isLogin: false,
          navOpen: false,
          historyOpen: false
        },
        (set, get) => ({
          getIsLogin: () => get().isLogin,
          setIgLogin: (state: boolean) => set({ isLogin: state }),
          setNavOpen: (state: boolean) => set({ navOpen: state }),
          setHistoryOpen: (state: boolean) => set({ historyOpen: state })
        })
      ),
      {
        name: bearStoreName
      }
    )
  )
);

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
  tmpChatContent: string;
  setTmpChatContent: (content: string) => void;
  tmpCompletionContent: string;
  getTmpCompletionContent: () => string;
  setTmpCompletionContent: (content: string) => void;
  addTmpCompletionContent: (content: string) => void;
  // handleDeleteChatCard: (chatCardId: string) => void;
  // handleUpdateChatCard: (chatCard: ChatCard) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set, get) => ({
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
        addChatCard: (chatCard: ChatCard) => {
          set((state) => ({
            chatCards: [...state.chatCards, chatCard]
          }));
          let _chatInfos: ChatInfo[] = get().chatInfos;
          _chatInfos.forEach((chatInfo) => {
            if (chatInfo.id === chatCard.chat_info_id) {
              chatInfo.num++;
            }
          });
        },
        deleteChatCard: (chatCardId: string) => {
          set((state) => ({
            ...state,
            chatCards: state.chatCards.filter((chatCard) => chatCard.id != chatCardId)
          }));
          let _chatInfos: ChatInfo[] = get().chatInfos;
          const _selectedChatInfoID = get().selectedChatInfoID;
          _chatInfos.forEach((chatInfo) => {
            if (chatInfo.id === _selectedChatInfoID) {
              chatInfo.num--;
            }
          });
        },
        tmpChatContent: '',
        setTmpChatContent: (content: string) => set({ tmpChatContent: content }),
        tmpCompletionContent: '',
        getTmpCompletionContent: () => get().tmpCompletionContent,
        setTmpCompletionContent: (content: string) => set({ tmpCompletionContent: content }),
        addTmpCompletionContent: (content: string) => {
          set({ tmpCompletionContent: get().tmpCompletionContent + content });
        }
      }),
      {
        name: chatStoreName
      }
    )
  )
);

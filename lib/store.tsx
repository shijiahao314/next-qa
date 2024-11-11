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
  chatMap: Map<string, ChatCard[]>;
  getChatCards: () => ChatCard[];
  addChatCard: (chatCard: ChatCard, chatInfoID: string) => void;
  deleteChatCard: (chatCardID: string, chatInfoID: string) => void;
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
        chatMap: new Map<string, ChatCard[]>([['', []]]),
        getChatCards: () => {
          let selectedChatInfoID = get().selectedChatInfoID;
          if (!selectedChatInfoID) {
            return [];
          }
          if (!get().chatMap) {
            return [];
          }
          let _chatMap = get().chatMap.get(selectedChatInfoID);
          if (_chatMap) {
            return _chatMap;
          }
          return [];
        },
        addChatCard: (chatCard: ChatCard, chatInfoID: string) => {
          let _chatMap = new Map(get().chatMap);
          let _chatCards = _chatMap.get(chatInfoID);
          if (_chatCards) {
            // 更新 chatMap
            _chatCards.push(chatCard);
            set({ chatMap: _chatMap });
            // 更新 num
            let _chatInfos: ChatInfo[] = get().chatInfos;
            _chatInfos.forEach((chatInfo) => {
              if (chatInfo.id === chatCard.chat_info_id) {
                chatInfo.num++;
              }
            });
          }
        },
        deleteChatCard: (chatCardID: string, chatInfoID: string) => {
          let _chatMap = new Map(get().chatMap);
          let _chatCards = _chatMap.get(chatInfoID);
          if (_chatCards) {
            for (let i = 0; i < _chatCards.length; i++) {
              if (_chatCards[i].id === chatCardID) {
                _chatCards.splice(i, 1);
              }
            }
          }
          set({ chatMap: _chatMap });
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

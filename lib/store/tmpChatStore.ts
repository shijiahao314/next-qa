import { create } from 'zustand';

interface TmpChatState {
  tmpChatContent: string;
  tmpCompletionContent: string;
  setTmpChatContent: (content: string) => void;
}

export const useTmpChatStore = create<TmpChatState>()((set) => ({
  tmpChatContent: '',
  tmpCompletionContent: '',
  setTmpChatContent: (content) => set({ tmpChatContent: content })
}));

// store/settingStore.ts
'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface PlatformSetting {
  apiUrl: string;
  apiKey: string;
  chatModel: string;
}

const storeName = 'settingStore';

interface SettingState {
  temperature: string;
  setTemperature: (temperature: string) => void;

  chatModels: string[];
  setChatModels: (chatModels: string[]) => void;

  platformSettingMap: Map<string, PlatformSetting>;
  getPlatformSetting: (key: string) => PlatformSetting;
  setPlatformSettingMap: (platformSettingMap: Map<string, PlatformSetting>) => void;
}

export const useSettingStore = create<SettingState>()(
  devtools(
    persist(
      (set, get) => ({
        temperature: '',
        setTemperature: (temperature) => set({ temperature }),

        chatModels: [],
        setChatModels: (chatModels) => set({ chatModels }),

        platformSettingMap: new Map(),
        getPlatformSetting: (key) => get().platformSettingMap.get(key) || ({} as PlatformSetting),
        setPlatformSettingMap: (platformSettingMap) => set({ platformSettingMap })
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
                platformSettingMap: new Map(parsed.state.platformSettingMap)
              }
            };
          },
          setItem: (name, newValue) => {
            const valueToStore = {
              ...newValue,
              state: {
                ...newValue.state,
                platformSettingMap: Array.from(newValue.state.platformSettingMap.entries())
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

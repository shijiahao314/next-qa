import { create } from 'zustand';
import { devtools, persist, combine } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      combine(
        {
          username: '',
          isLogin: true,
          cnt: 1
        },
        (set, get) => ({
          setUsername: (username: string) => set({ username: username }),
          getUsername: () => get().username,
          setLogin: (status: boolean) => set({ isLogin: status }),
          incCnt: (by: number) => set((state) => ({ cnt: state.cnt + by }))
        })
      ),
      {
        name: 'login_status'
      }
    )
  )
);

export default useStore;

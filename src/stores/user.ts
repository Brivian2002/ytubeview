import { create } from 'zustand';

interface UserStore {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    image: string | null;
    plan: 'free' | 'pro' | 'premium';
  } | null;
  setUser: (user: UserStore['user']) => void;
  setPlan: (plan: 'free' | 'pro' | 'premium') => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setPlan: (plan) =>
    set((state) => ({
      user: state.user ? { ...state.user, plan } : null,
    })),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

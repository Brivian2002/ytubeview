import { create } from 'zustand';
import { type AppRoute } from '@/types';

interface RouterStore {
  currentRoute: AppRoute;
  previousRoute: AppRoute | null;
  routeParams: Record<string, string>;
  navigate: (route: AppRoute, params?: Record<string, string>) => void;
  goBack: () => void;
  setParams: (params: Record<string, string>) => void;
}

export const useRouter = create<RouterStore>((set, get) => ({
  currentRoute: 'home',
  previousRoute: null,
  routeParams: {},
  navigate: (route, params = {}) => {
    const prev = get().currentRoute;
    set({ currentRoute: route, previousRoute: prev, routeParams: params });
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  goBack: () => {
    const prev = get().previousRoute;
    if (prev) {
      set({ currentRoute: prev, previousRoute: get().currentRoute });
    }
  },
  setParams: (params) => set({ routeParams: params }),
}));

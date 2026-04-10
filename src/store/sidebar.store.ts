import { create } from 'zustand';

interface SidebarStore {
  activeItem: string | null;
  handleItemClick: (itemTitle: string | null) => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  activeItem: null,
  handleItemClick: (itemTitle) => set((state) => ({
    activeItem: itemTitle === state.activeItem ? state.activeItem : itemTitle
  }))
})); 
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TabState {
  activeTab: string;
  setActiveTab: (activeTab: string)=> void;
}

export const useTabStore = create<TabState>()(
  persist(
  (set)=>({
    activeTab: 'clipboard',
    setActiveTab: (activeTab)=> set({activeTab})
  }),
  {name: 'active-tab'}
));

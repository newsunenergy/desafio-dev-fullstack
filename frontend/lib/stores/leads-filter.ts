import { create } from "zustand";

export interface LeadsFilters {
  name: string;
  email: string;
  codigoDaUnidadeConsumidora: string;
}

interface LeadsFilterStore {
  filters: LeadsFilters;
  setFilters: (filters: Partial<LeadsFilters>) => void;
  clearFilters: () => void;
}

const initialFilters: LeadsFilters = {
  name: "",
  email: "",
  codigoDaUnidadeConsumidora: "",
};

export const useLeadsFilterStore = create<LeadsFilterStore>((set) => ({
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  clearFilters: () => set({ filters: initialFilters }),
}));

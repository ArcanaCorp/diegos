import { create } from "zustand";

export const useSalesStore = create((set, get) => ({
    sales: [],
    hydrated: false,

    hydrate: (sales) => {
        localStorage.setItem("sales", JSON.stringify(sales));
        set({ sales, hydrated: true });
    },

    loadFromCache: () => {
        const local = localStorage.getItem("sales");
        if (local) {
            set({ sales: JSON.parse(local), hydrated: true });
        }
    },

    addSale: (sale) =>
        set((state) => {
            const exists = state.sales.some(s => s.id === sale.id);
            if (exists) return state;

            const updated = [sale, ...state.sales];
            localStorage.setItem("sales", JSON.stringify(updated));
            return { sales: updated };
        }),
}));
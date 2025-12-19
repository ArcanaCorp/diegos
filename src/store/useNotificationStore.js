import { create } from "zustand";

export const useNotificationStore = create((set, get) => ({
    notifications: [],
    hydrated: false,

    hydrate: (notifications) => {
        localStorage.setItem("notifications", JSON.stringify(notifications));
        set({ notifications, hydrated: true });
    },

    loadFromCache: () => {
        const local = localStorage.getItem("notifications");
        if (local) {
            set({
                notifications: JSON.parse(local),
                hydrated: true
            });
        }
    },

    addNotify: (notify) =>
        set((state) => {
            const exists = state.notifications.some(n => n.id === notify.id);
            if (exists) return state;

            const updated = [notify, ...state.notifications];
            localStorage.setItem("notifications", JSON.stringify(updated));
            return { notifications: updated };
        }),

    markAsRead: (id) =>
        set((state) => {
            const updated = state.notifications.map(n =>
                n.id === id ? { ...n, read: true } : n
            );
            localStorage.setItem("notifications", JSON.stringify(updated));
            return { notifications: updated };
        }),

    clearAll: () => {
        localStorage.removeItem("notifications");
        set({ notifications: [] });
    }
}));
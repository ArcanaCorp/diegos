import { useEffect } from "react";
import { useNotificationStore } from "../store/useNotificationStore";
// opcional: servicio API
// import { serviceGetNotifications } from "@/services/notifications.service";

export const useNotifications = () => {

    const { notifications, hydrated, loadFromCache, hydrate, addNotify, markAsRead, clearAll } = useNotificationStore();

    useEffect(() => {
        if (!hydrated && notifications.length === 0) {
            loadFromCache();
        }
    }, [hydrated, notifications.length, loadFromCache]);

    const fetchNotifications = async () => {
        if (notifications.length > 0) return;

        // si luego traes de backend:
        // const res = await serviceGetNotifications();
        // if (res.ok) hydrate(res.data);
    };

    return {
        list: notifications,
        fetchNotifications,
        addNotification: addNotify,
        markAsRead,
        clearNotifications: clearAll,
        hydrate
    };
};
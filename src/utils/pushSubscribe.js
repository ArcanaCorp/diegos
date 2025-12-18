import { REACT_VAPID_PUBLIC_KEY } from "../config";

export const subscribeToPush = async () => {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: REACT_VAPID_PUBLIC_KEY
    });

    return subscription;
};
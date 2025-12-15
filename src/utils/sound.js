// src/utils/sound.js
const notificationSound = new Audio("/bell.mp3");

notificationSound.preload = "auto";

export const playNotificationSound = () => {
    notificationSound.currentTime = 0;
    notificationSound.play().catch(() => {
        // Autoplay bloqueado (normal en primer load)
    });
};
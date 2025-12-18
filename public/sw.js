self.addEventListener("install", () => {
    console.log("🟢 Service Worker instalado");
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    console.log("🔵 Service Worker activo");
});

self.addEventListener("push", (event) => {
    const data = event.data?.json() || {};

    self.registration.showNotification(data.title || "Nueva notificación", {
        body: data.body || "Tienes una actualización",
        icon: "/icon.png",
        badge: "/badge.png",
    });
});
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
        data: { url: data.url || "/" },
        actions: [
            { action: 'view', title: 'Ver ahora' },
            { action: 'dismiss', title: 'Ignorar' }
        ]
    });
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    if (event.action === 'view') {
        event.waitUntil(clients.openWindow(event.notification.data.url));
    } else if (event.action === 'dismiss') {
        // aquí puedes hacer tracking o simplemente cerrar
    } else {
        // click en la notificación, fuera de los botones
        event.waitUntil(clients.openWindow(event.notification.data.url));
    }
});
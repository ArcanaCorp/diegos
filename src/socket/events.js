import { getSocket } from "./connection";
import { toast } from "sonner";

export const registerGlobalEvents = () => {

    const socket = getSocket();
    if (!socket) return;

    socket.on("connect", () => {
        console.log("🟢 Socket conectado:", socket.id);
    });

    socket.on("disconnect", () => {
        console.log("🔴 Socket desconectado");
    });

    // 🔔 ADMIN
    socket.on("venta:notificacion", (data) => {
        toast.success(data.mensaje);
        console.log("📢 Venta recibida:", data.venta);
    });

    socket.on("dashboard:update", (data) => {
        console.log("📊 Dashboard update:", data);
        // aquí actualizas estado global / context / store
    });

    // 📦 ALMACÉN
    socket.on("stock:update", (data) => {
        console.log("📦 Stock actualizado:", data.productos);
    });
};
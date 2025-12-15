import { io } from "socket.io-client";
import { SOCKET_URL } from "@/config"; // URL del backend

let socket = null;

export const initSocket = () => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 500,
            autoConnect: true,
        });

        console.log("⚡ Socket conectado:", SOCKET_URL);
    }
    return socket;
};

export const getSocket = () => socket;
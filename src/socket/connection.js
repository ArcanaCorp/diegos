import { io } from "socket.io-client";
import { SOCKET_URL } from "@/config";

let socket = null;

export const initSocket = (user) => {
    
    if (!socket && user) {
        socket = io(SOCKET_URL, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 500,
            autoConnect: true,
            auth: {
                role: user.role,      // admin | tienda | almacen
                userId: user.id
            }
        });

        console.log(`⚡ Socket iniciado como ${user.role}`);
    }
    return socket;
};

export const getSocket = () => socket;
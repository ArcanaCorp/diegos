import { useEffect } from "react";
import { getSocket } from "../socket/connection";

export const useSocket = (event, callback) => {
    const socket = getSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on(event, callback);

        return () => {
            socket.off(event, callback);
        };
    }, [socket, event, callback]);
};
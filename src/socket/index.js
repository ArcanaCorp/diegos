import { initSocket } from "./connection";
import { registerGlobalEvents } from "./events";

export const setupSockets = () => {
    const socket = initSocket();
    registerGlobalEvents();
    return socket;
};
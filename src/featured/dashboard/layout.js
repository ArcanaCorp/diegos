import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { MENUS } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { playNotificationSound } from "@/utils/sound";

import { setupSockets } from "@/socket";

import Drawer from "./components/Drawer";
import Tabs from "./components/Tabs";
import Header from "./layout/Header";
import Nav from "./components/Nav";

import './styles/layout.css'

export default function DashboardLayout () {

    const { user } = useAuth();
    const [ menu, setMenu ] = useState(false);

    const extras = MENUS[user.role].filter(m => !m.mobile);

    const toogleMenu = () => setMenu(!menu)

    useEffect(() => {
        const enableSound = () => {
            playNotificationSound(); // desbloquea autoplay
            window.removeEventListener("click", enableSound);
        };

        window.addEventListener("click", enableSound);

        return () => {
            window.removeEventListener("click", enableSound);
        };
    }, []);


    useEffect(() => {
        if (!user) return; // seguridad extra

        setupSockets(user); // se conecta UNA sola vez mientras este layout exista
    }, [user]);

    return (
        <>
            <div className="__app">
                <Nav/>
                <main className="__main_app">
                    <Header/>
                    <div className="__content_main">
                        <div className="__box_main">
                            <Outlet/>
                        </div>
                    </div>
                </main>
            </div>
            <Drawer extras={extras} menu={menu} toogleMenu={toogleMenu} />
            <Tabs toogleMenu={toogleMenu} />
            <Toaster position="top-center" duration={3000} richColors />
        </>
    )
}
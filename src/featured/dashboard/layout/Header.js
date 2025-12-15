import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { MENUS } from "@/config";
import './styles/header.css'

export default function Header () {

    const location = useLocation();
    const { user } = useAuth();

    const currentItem = MENUS[user.role].find(item => item.link === location.pathname);

    return (

        <header className="__header_app">
            <div className="__box_header_app">
                <p className="__txt_location">{location.pathname === '/' ? '/' : location.pathname}</p>
                <h1 className="__txt_title">{currentItem?.txt || ''}</h1>
            </div>
        </header>

    )

}
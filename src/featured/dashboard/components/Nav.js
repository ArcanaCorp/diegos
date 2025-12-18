import { useState } from "react";
import { IconLogout2, IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarLeftExpandFilled } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { MENUS } from "@/config";
import './styles/nav.css'

export default function Nav () {

    const location = useLocation();
    const { user, logout } = useAuth();
    const [ expand, setExpand ] = useState(true)

    return (
        <nav className={`__nav_app ${expand ? '' : 'collapse'}`}>
            <div className="__nav_header">
                <button className="__btn_collapse" onClick={() => setExpand(!expand)}>{expand ? <IconLayoutSidebarLeftCollapseFilled/> : <IconLayoutSidebarLeftExpandFilled/>}</button>
            </div>
            <ul className={`__nav_items`}>
                {MENUS[user?.role].map((nav, idx) => (
                    <li key={idx} className={`__nav_item ${location.pathname === nav.link ? 'active' : ''}`}>
                        <Link to={nav.link} className="__item_link">
                            <span className="__item_ico">{nav.ico}</span>
                            <span className="__item_txt">{nav.txt}</span>
                        </Link>
                    </li>
                ))}
                <li className="__nav_item">
                    <button className="__item_link danger" onClick={() => logout()}>
                        <span className="__item_ico"><IconLogout2/></span>
                        <span className="__item_txt">Cerrar sesión</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}
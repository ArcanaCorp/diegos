import { MENUS } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { IconDots } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

import './styles/tabs.css'

export default function Tabs ({ toogleMenu }) {

    const { user } = useAuth();
    const location = useLocation();

    return (

        <footer className="__footer_layout_app">
            <ul className="__tabs">
                {MENUS[user?.role]
                    .filter(m => m.mobile)
                    .map((nav, idx) => (
                        <li key={idx} className={`__tab ${location.pathname === nav.link ? '__tab--active' : ''}`}>
                            <Link to={nav.link} className={`__tab_link`}>
                                <span className="__tab_ico">{nav.ico}</span>
                                <span className="__tab_txt">{nav.txt}</span>
                            </Link>
                        </li>
                    ))
                }
                {MENUS[user?.role].some(m => !m.mobile) && (
                    <li className="__tab">
                        <button className="__tab_link" onClick={toogleMenu}>
                            <span className="__tab_ico"><IconDots/></span>
                            <span className="__tab_txt">Más</span>
                        </button>
                    </li>
                )}
            </ul>
        </footer>

    )

}
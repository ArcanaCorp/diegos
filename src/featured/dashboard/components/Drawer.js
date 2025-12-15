import { IconLogout2, IconX } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import './styles/drawer.css'

export default function Drawer ({ extras, menu, toogleMenu }) {

    const location = useLocation();

    return (

        <nav className={`__nav_drawer ${menu ? '__nav_drawer--active' : ''}`}>
            <ul className="__drawer">
                <li className="__item __item_btn_close">
                    <button className="__btn_closed" onClick={() => toogleMenu()}><IconX/></button>
                </li>
                {extras.map((e, idx) => (
                    <li key={idx} className={`__item_nav ${location.pathname === e.link ? '__item_nav--active' : ''}`}>
                        <Link to={e.link} className="__item_link_nav">
                            <span className="__item_ico">{e.ico}</span>
                            <span className="__item_txt">{e.txt}</span>
                        </Link>
                    </li>
                ))}
                <li className={`__item_nav __item_nav--danger`}>
                    <button className="__item_link_nav">
                        <span className="__item_ico"><IconLogout2/></span>
                        <span>Cerrar Sesión</span>
                    </button>
                </li>
            </ul>
        </nav>

    )

}
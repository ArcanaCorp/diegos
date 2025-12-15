import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import logo from '@/shared/img/LOGO.svg'
import './styles/layout.css'

export default function AuthLayout () {
    return (
        <>
            <div className='__page __page_auth'>

                <header className="__page_header">
                    <img className="__img" src={logo} alt='Logo de Diegos' fetchPriority="high" />
                </header>

                <main className="__page_main">
                    <div className="__box_page_main">
                        <h1>Iniciar Sesión</h1>
                        <p>Ingresa tus credenciales para poder usar tus herramientas.</p>
                        <div className="__form">
                            <Outlet/>
                        </div>
                    </div>
                </main>

            </div>
            <Toaster position="top-center" duration={3000} richColors />
        </>
    )
}
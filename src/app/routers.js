import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoutes";
import { PublicRoute } from "@/routes/PublicRoute";

import DashboardLayout from "@/featured/dashboard/layout";
import AuthLayout from "@/featured/auth/layout";
import LoginPage from "@/featured/auth/page";
import HomePage from "@/featured/dashboard/tabs/home/page";
import UsersPage from "@/featured/dashboard/tabs/users/page";
import VentasPage from "@/featured/dashboard/tabs/ventas/page";
import ProductosPage from "@/featured/dashboard/tabs/productos/page";
import POSPage from "@/featured/dashboard/tabs/pos/page";
import InsumosPage from "@/featured/dashboard/tabs/insumos/page";
import ConfigPage from "@/featured/dashboard/tabs/config/page";

export const routers = createBrowserRouter([
    {
        element: <ProtectedRoute/>,
        children: [
            {
                path: '/',
                element: <DashboardLayout/>,
                children: [
                    {
                        index: true,
                        element: <HomePage/>
                    },
                    {
                        path: '/ventas',
                        element: <VentasPage/>
                    },
                    {
                        path: '/productos',
                        element: <ProductosPage/>
                    },
                    {
                        path: '/insumos',
                        element: <InsumosPage/>
                    },
                    {
                        path: '/usuarios',
                        element: <UsersPage/>
                    },
                    {
                        path: '/config',
                        element: <ConfigPage/>
                    },
                    {
                        path: '/pos',
                        element: <POSPage/>
                    }
                ]
            }
        ]
    },
    {
        element: <PublicRoute/>,
        children: [
            {
                path: '/login',
                element: <AuthLayout/>,
                children: [
                    {
                        index: true,
                        element: <LoginPage/>
                    }
                ]
            }
        ],
    }
])
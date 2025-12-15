import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoutes";
import { PublicRoute } from "@/routes/PublicRoute";
import DashboardLayout from "@/featured/dashboard/layout";
import AuthLayout from "@/featured/auth/layout";
import LoginPage from "@/featured/auth/page";
import HomePage from "@/featured/dashboard/tabs/home";
import UsersPage from "@/featured/dashboard/tabs/users";
import VentasPage from "../featured/dashboard/tabs/ventas/page";
import ProductosPage from "../featured/dashboard/tabs/productos/page";

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
                        path: '/insumos'
                    },
                    {
                        path: '/usuarios',
                        element: <UsersPage/>
                    },
                    {
                        path: '/reportes'
                    },
                    {
                        path: '/config'
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
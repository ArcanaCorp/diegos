import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const PublicRoute = () => {
    const { user } = useAuth();
    return user ? <Navigate to="/" replace /> : <Outlet />;
};
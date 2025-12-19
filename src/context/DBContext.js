import { createContext, useContext } from "react";
import { useUsers } from "@/hook/useUsers";
import { useProducts } from "../hook/useProducts";
import { useSales } from "../hook/useSales";
import { useInputs } from "../hook/useInputs";
import { useNotifications } from "../hook/useNotifications";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const users = useUsers();
    const sales = useSales();
    const products = useProducts();
    const inputs = useInputs();

    const notifications = useNotifications();

    const contextValue = {
        users,
        sales,
        products,
        inputs,
        notifications
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export const useDB = () => useContext(DBContext);
import { createContext, useContext } from "react";
import { useUsers } from "@/hook/useUsers";
import { useProducts } from "../hook/useProducts";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const users = useUsers();
    const products = useProducts();

    const contextValue = {
        users,
        products
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export const useDB = () => useContext(DBContext);
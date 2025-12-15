import { createContext, useContext } from "react";
import { useUsers } from "@/hook/useUsers";
import { useProducts } from "../hook/useProducts";
import { useSales } from "../hook/useSales";
import { useInputs } from "../hook/useInputs";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const users = useUsers();
    const sales = useSales();
    const products = useProducts();
    const inputs = useInputs();

    const contextValue = {
        users,
        sales,
        products,
        inputs
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export const useDB = () => useContext(DBContext);
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserAccount } from "@/services/account.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(() => {
        try {
            const token = sessionStorage.getItem('diegos_user')
            const cook = Cookies.get('diegos_token')
            if (!token || !cook) return null
                return jwtDecode(token)
        } catch (error) {
            return null;
        }
    });

    const getAccount = async (token) => {
        try {
            const data = await getUserAccount(token)
            if (!data.ok) {
                setUser(null)
                sessionStorage.removeItem('diegos_user')
                return;
            }
            sessionStorage.setItem('diegos_user', data.user)
            const decoded = jwtDecode(data.user)
            setUser(decoded);
        } catch (error) {
            setUser(null)
            sessionStorage.removeItem('diegos_user')
        }
    }

    const logout = async () => {
        try {
            Cookies.remove('diegos_token')
            sessionStorage.removeItem('diegos_user')
            setUser(null)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const token = Cookies.get('diegos_token')
                if (user === null && token) {
                    await getAccount(token)
                }
            } catch (error) {
                console.error(error);
            }
        }
        verifyAccount();
    }, [user])

    const contextValue = {
        user,
        getAccount,
        logout
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);
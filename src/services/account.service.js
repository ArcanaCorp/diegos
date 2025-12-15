import { STATUS_CODE } from "@/helpers/status_code"
import { REACT_APP_API } from "@/config"

export const login = async (name, pwd) => {
    try {
        
        const response = await fetch(`${REACT_APP_API}/account/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name, pwd})
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;

    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, status: STATUS_CODE.SERVER_ERROR, code: 500}
    }
}

export const getUserAccount = async (token) => {
    if (!token) return;
    try {
        const response = await fetch(`${REACT_APP_API}/account`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;

    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, status: STATUS_CODE.SERVER_ERROR, code: 500}
    }
}
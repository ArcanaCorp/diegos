import { STATUS_CODE } from "@/helpers/status_code"
import { REACT_APP_API } from "@/config"
import Cookies from "js-cookie"

export const getUserList = async () => {
    try {       
        const token = Cookies.get('diegos_token')
        if (!token) return;
        const response = await fetch(`${REACT_APP_API}/user/list`, {
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

export const createdUser = async (name, pwd, role) => {
    try {
        const token = Cookies.get('diegos_token')
        if (!token) return;
        const response = await fetch(`${REACT_APP_API}/user/created`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name, pwd, role})
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, status: STATUS_CODE.SERVER_ERROR, code: 500}
    }
}

export const updateUser = async () => {}

export const deleteUser = async (code) => {
    try {
        const token = Cookies.get('diegos_token')
        if (!token) return;
        const response = await fetch(`${REACT_APP_API}/user/delete`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({code})
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, status: STATUS_CODE.SERVER_ERROR, code: 500}
    }
}
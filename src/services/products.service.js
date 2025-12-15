import { STATUS_CODE } from "@/helpers/status_code"
import { REACT_APP_API } from "@/config"
import Cookies from 'js-cookie'

export const serviceGetProductAll = async () => {

    try {
        
        const token = Cookies.get('diegos_token')
        if (!token) return;
        const response = await fetch(`${REACT_APP_API}/products/all`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;

    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, status: STATUS_CODE.SERVER_ERROR, code: 500}
    }

}

export const serviceUpdateProduct = async (id, field, value) => {
    try {
        const response = await fetch(`${REACT_APP_API}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({field, value})
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, status: STATUS_CODE.SERVER_ERROR, code: 500}
    }
}

export const serviceDeleteProduct = async (id) => {
    try {
        const response = await fetch(`${REACT_APP_API}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, status: STATUS_CODE.SERVER_ERROR, code: 500}
    }
}
import { STATUS_CODE } from "@/helpers/status_code"
import { REACT_APP_API } from "@/config"

export const serviceGetProductAll = async () => {

    try {
        
        const response = await fetch(`${REACT_APP_API}/products/all`);
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
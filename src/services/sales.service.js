import { STATUS_CODE } from "@/helpers/status_code"
import { REACT_APP_API } from "@/config"

export const serviceGetSalesAll = async () => {
    try {
        const response = await fetch(`${REACT_APP_API}/sales/all`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, status: STATUS_CODE.SERVER_ERROR, code: 500}
    }
}

export const serviceNewSale = async (formData) => {
    try {
        const response = await fetch(`${REACT_APP_API}/sales`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, status: STATUS_CODE.SERVER_ERROR, code: 500}
    }
}
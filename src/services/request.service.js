import { STATUS_CODE } from "@/helpers/status_code"
import { REACT_APP_API } from "@/config"
import Cookies from 'js-cookie'

export const serviceRequestProducts = async (form) => {
    try {
        const token = Cookies.get('diegos_token')
        if (!token) return;
        const response = await fetch(`${REACT_APP_API}/request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || response.statusText);
            return data;
    } catch (error) {
        return {ok: false, message: `Error: ${error.message}`, error: error, status: STATUS_CODE.SERVER_ERROR, code: 500}
    }
}
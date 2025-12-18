import { subscribeToPush } from "@/utils/pushSubscribe";
import { REACT_APP_API } from "../config";
import Cookies from 'js-cookie'

export const enablePush = async () => {
    const token = Cookies.get('diegos_token')
    const subscription = await subscribeToPush();
    await fetch(`${REACT_APP_API}/push/subscribe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ subscription })
    });
};
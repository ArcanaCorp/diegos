import { useState } from "react"

export const useNotifications = () => {

    const [ state, setState ] = useState({
        list: [],
        loading: false,
        error: ''
    })

    const addNotifications = (notify) => {
        setState(prev => ({
            ...prev,
            list: notify
        }))
    }

    return {
        ...state,
    }

}
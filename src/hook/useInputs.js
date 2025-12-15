import { useEffect, useState } from "react"
import { serviceGetInputs } from "../services/inputs.service";

export const useInputs = () => {

    const [ state, setState ] = useState({
        list: [],
        loading: false,
        error: ''
    });

    useEffect(() => {
        const fetchInputs = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const local = localStorage.getItem('inputs');
                if (local) {
                    const parsed = JSON.parse(local);
                    setState({
                        list: parsed,
                        loading: false,
                        error: ''
                    })
                    return;
                }
                const data = await serviceGetInputs();
                if (!data.ok) return setState(prev => ({...prev, error: data.message, loading: false}));
                    setState({list: data.data, loading: false, error: ''})
                    localStorage.setItem('inputs', JSON.stringify(data.data))
            } catch (error) {
                setState({ list: [], loading: false, error: error.message });
            }
        }
        fetchInputs();
    }, [])

    return {
        ...state
    }

}
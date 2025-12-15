import { useState } from "react"
import { STATUS_CODE } from "@/helpers/status_code"
import { serviceDeleteProduct, serviceGetProductAll, serviceUpdateProduct } from "../services/products.service";

export const useProducts = () => {

    const [ state, setState ] = useState({
        list: [],
        loading: false,
        error: ''
    });

    const fetchProducts = async () => {
        try {
            setState(prev => ({...prev, loading: true}));
            const local = localStorage.getItem("products");

            if (local) {
                const parsed = JSON.parse(local);

                // Levanta desde localStorage
                return setState({
                    list: parsed,
                    loading: false,
                    error: ""
                });
            }
            const data = await serviceGetProductAll();
            if (!data.ok) {
                return setState(prev => ({...prev, error: data.message}));
            }
            setState({list: data.data, loading: false, error: ''})
            localStorage.setItem("products", JSON.stringify(data.data));
        } catch (error) {
            setState({list: [], loading: false, error: error.message})
        }
    }

    const updateProduct = async (id, field, value) => {
        try {
            setState(prev => ({ ...prev, loading: true }));

            const response = await serviceUpdateProduct(id, field, value);

            if (!response.ok && response.status !== STATUS_CODE.SUCCESS) {
                return setState(prev => ({
                    ...prev,
                    loading: false,
                    error: response.message
                }));
            }

            // Actualizamos la lista en memoria
            setState(prev => {
                const newData = response.updated;
                const updatedList = prev.list.map(p =>
                    p.id === id ? { ...p, [newData.field]: value } : p
                );

                // Guardamos en localStorage
                localStorage.setItem("products", JSON.stringify(updatedList));

                return {
                    ...prev,
                    list: updatedList,
                    loading: false,
                    error: ""
                };
            });

            return { ok: true };

        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.message
            }));
            return { ok: false, message: error.message };
        }
    };

    const deleteProduct = async (id) => {
        try {
            
            setState(prev => ({...prev, loading: true}));
            const response = await serviceDeleteProduct(id)
            if (!response.ok && response.status !== STATUS_CODE.SUCCESS) {
                return setState(prev => ({
                    ...prev,
                    loading: false,
                    error: response.message
                }));
            }

            setState(prev => {
                const updatedList = prev.list.filter(p => p.id !== id);

                localStorage.setItem("products", JSON.stringify(updatedList));

                return {
                    ...prev,
                    list: updatedList,
                    loading: false,
                    error: ""
                };
            });

            return { ok: true };

        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.message
            }));
            return { ok: false, message: error.message }
        }
    }

    return {
        ...state,
        fetchProducts,
        updateProduct,
        deleteProduct
    }

}
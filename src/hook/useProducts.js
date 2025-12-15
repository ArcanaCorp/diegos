import { useState, useEffect } from "react";
import { STATUS_CODE } from "@/helpers/status_code";
import { serviceDeleteProduct, serviceGetProductAll, serviceUpdateProduct } from "../services/products.service";

export const useProducts = () => {

    const [state, setState] = useState({
        list: [],
        loading: false,
        error: ''
    });

    // Traer productos solo una vez (cuando no existan en el estado ni en localStorage)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));

                // Verifica si ya tienes productos en el estado o en localStorage
                const local = localStorage.getItem("products");

                if (local) {
                    const parsed = JSON.parse(local);

                    // Levanta desde localStorage
                    setState({
                        list: parsed,
                        loading: false,
                        error: ""
                    });
                    return;
                }

                // Si no hay productos en localStorage, obtenemos desde la API
                const data = await serviceGetProductAll();
                if (!data.ok) {
                    return setState(prev => ({ ...prev, error: data.message, loading: false }));
                }

                // Guardamos los productos en el estado y localStorage
                setState({ list: data.data, loading: false, error: '' });
                localStorage.setItem("products", JSON.stringify(data.data));

            } catch (error) {
                setState({ list: [], loading: false, error: error.message });
            }
        };

        // Solo ejecutamos el fetch una vez al montar el componente
        fetchProducts();
    }, []);  // No hay dependencias, se ejecutará una vez al montar el componente

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
            setState(prev => ({ ...prev, loading: true }));
            const response = await serviceDeleteProduct(id);
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
            return { ok: false, message: error.message };
        }
    };

    const syncStockAfterSale = (soldProducts = []) => {
        if (!Array.isArray(soldProducts) || soldProducts.length === 0) return;

        setState(prev => {
            const updatedList = prev.list.map(product => {
                const sold = soldProducts.find(
                    sp => sp.code === product.code
                );

                if (!sold) return product;

                const newAmount =
                    Number(product.amountByStore) - Number(sold.quantity);

                return {
                    ...product,
                    amountByStore: Math.max(newAmount, 0)
                };
            });

            localStorage.setItem("products", JSON.stringify(updatedList));

            return {
                ...prev,
                list: updatedList
            };
        });
    };

    return {
        ...state,
        updateProduct,
        deleteProduct,
        syncStockAfterSale
    };

}
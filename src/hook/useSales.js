import { useState } from "react";
import { serviceGetSalesAll } from "../services/sales.service";
import { useSocket } from "./useSocket";
import { playNotificationSound } from "@/utils/sound";

export const useSales = () => {

    const [state, setState] = useState({
        list: [],
        loading: false,
        error: ""
    });

    const fetchSales = async (force = false) => {

        // Evita llamadas repetidas
        if (state.list.length > 0 && !force) return;

        try {
            setState(prev => ({ ...prev, loading: true, error: "" }));

            // Cache local
            const local = localStorage.getItem("sales");
            if (local && !force) {
                setState({
                    list: JSON.parse(local),
                    loading: false,
                    error: ""
                });
                return;
            }

            const response = await serviceGetSalesAll();

            if (!response.ok) {
                throw new Error(response.message || "Error al obtener ventas");
            }

            setState({
                list: response.data,
                loading: false,
                error: ""
            });

            localStorage.setItem("sales", JSON.stringify(response.data));

        } catch (error) {
            setState({
                list: [],
                loading: false,
                error: error.message
            });
        }
    };

    const addSale = (sale) => {
        if (!sale) return;

        setState(prev => {
            const updatedList = [sale, ...prev.list];
            localStorage.setItem("sales", JSON.stringify(updatedList));
            return {
                ...prev,
                list: updatedList
            };
        });
    };

    useSocket("venta:notificacion", (data) => {
        addSale(data.venta);
        playNotificationSound();
    });

    return {
        ...state,
        fetchSales,
        addSale
    };
};
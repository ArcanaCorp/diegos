import { useEffect } from "react";
import { useSalesStore } from "@/store/useSalesStore";
import { serviceGetSalesAll } from "../services/sales.service";

export const useSales = () => {

    const { sales, hydrated, loadFromCache, hydrate } = useSalesStore();

    useEffect(() => {
        if (!hydrated && sales.length === 0) {
            loadFromCache();
        }
    }, [hydrated, loadFromCache, sales.length]);

    const fetchSales = async () => {
        if (sales.length > 0) return;

        const response = await serviceGetSalesAll();
        if (response.ok) {
            hydrate(response.data);
        }
    };

    return {
        list: sales,
        fetchSales
    };
};
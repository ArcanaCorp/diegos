import { useEffect, useState } from 'react'
import Filtros from './components/Filtros';
import './page.css'
import { useDB } from '@/context/DBContext';
import Table from './components/Table';
export default function VentasPage () {

    const { sales } = useDB();
    const { list, loading, error, fetchSales } = sales;
    const [filter, setFilter] = useState({
        text: "",
        dateFrom: "",
        dateTo: "",
        store: "",
        product: "",
    });

    const ventasFiltradas = list.filter(v => {
        const fechaVenta = v.date.split(" ")[0];

        // --- FILTRO DE TEXTO ---
        if (filter.text) {
            const t = filter.text.toLowerCase();
            const match =
                v.headquarter.toLowerCase().includes(t) ||
                v.total.toString().includes(t) ||
                v.date.toLowerCase().includes(t);

            if (!match) return false;
        }

        // --- RANGO DE FECHAS ---
        if (filter.dateFrom && fechaVenta < filter.dateFrom) return false;
        if (filter.dateTo && fechaVenta > filter.dateTo) return false;

        // --- TIENDA ---
        if (filter.store && filter.store !== v.headquarter) return false;

        // --- PRODUCTO ---
        //if (filter.product && filter.product !== v.producto) return false;

        return true;
    });

    const handleClearFilter = () => {
        setFilter({
            text: "",
            dateFrom: "",
            dateTo: "",
            store: "",
            product: "",
        })
    }

    useEffect(() => {
        fetchSales();
    }, [fetchSales])

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (

        <>
        
            <div className='--sales-title'>
                <h2>Filtrar</h2>
                <Filtros filter={filter} setFilter={setFilter} ventas={list} onClear={handleClearFilter} />
            </div>

            <Table ventasFiltradas={ventasFiltradas} />

        </>

    )

}
import { useState } from 'react'
import Filtros from './components/Filtros';
import './page.css'
import Row from './components/Row';
export default function VentasPage () {

    const [filter, setFilter] = useState({
        text: "",
        dateFrom: "",
        dateTo: "",
        store: "",
        product: "",
    });


    const ventas = [
        {
            id: 1,
            tienda: "Tienda 1",
            producto: "Pan blanco",
            total: 25.50,
            fecha: "2025-01-12 06:45"
        },
        {
            id: 2,
            tienda: "Tienda 1",
            producto: "Concha de vainilla",
            total: 12.00,
            fecha: "2025-01-12 07:10"
        },
        {
            id: 3,
            tienda: "Tienda 2",
            producto: "Croissant mantequilla",
            total: 32.00,
            fecha: "2025-01-12 07:30"
        },
        {
            id: 4,
            tienda: "Tienda 1",
            producto: "Roles de canela",
            total: 18.50,
            fecha: "2025-01-12 08:05"
        },
        {
            id: 5,
            tienda: "Tienda 2",
            producto: "Pan integral",
            total: 28.00,
            fecha: "2025-01-12 08:50"
        },
        {
            id: 6,
            tienda: "Tienda 1",
            producto: "Bolillo",
            total: 8.00,
            fecha: "2025-01-12 09:15"
        },
        {
            id: 7,
            tienda: "Tienda 2",
            producto: "Donas glaseadas",
            total: 15.00,
            fecha: "2025-01-12 09:40"
        },
        {
            id: 8,
            tienda: "Tienda 1",
            producto: "Conchas chocolate",
            total: 14.00,
            fecha: "2025-01-12 10:20"
        },
        {
            id: 9,
            tienda: "Tienda 2",
            producto: "Pan de elote",
            total: 20.00,
            fecha: "2025-01-12 10:55"
        },
        {
            id: 10,
            tienda: "Tienda 1",
            producto: "Baguette",
            total: 35.00,
            fecha: "2025-01-12 11:30"
        }
    ];

    const ventasFiltradas = ventas.filter(v => {
        const fechaVenta = v.fecha.split(" ")[0];

        // --- FILTRO DE TEXTO ---
        if (filter.text) {
            const t = filter.text.toLowerCase();
            const match =
                v.tienda.toLowerCase().includes(t) ||
                v.producto.toLowerCase().includes(t) ||
                v.total.toString().includes(t) ||
                v.fecha.toLowerCase().includes(t);

            if (!match) return false;
        }

        // --- RANGO DE FECHAS ---
        if (filter.dateFrom && fechaVenta < filter.dateFrom) return false;
        if (filter.dateTo && fechaVenta > filter.dateTo) return false;

        // --- TIENDA ---
        if (filter.store && filter.store !== v.tienda) return false;

        // --- PRODUCTO ---
        if (filter.product && filter.product !== v.producto) return false;

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

    return (

        <>
        
            <div className='--sales-title'>
                <h2>Filtrar</h2>
                <Filtros filter={filter} setFilter={setFilter} ventas={ventas} onClear={handleClearFilter} />
            </div>

            <div className='--sales-table'>
                <div className='--sales-table-head'>
                    <span className='--col --col-1'><input type='checkbox' /></span>
                    <span className='--col --col-2'>Tienda</span>
                    <span className='--col --col-3'>Producto</span>
                    <span className='--col --col-4'>Total</span>
                    <span className='--col --col-5'>Fecha</span>
                    <span className='--col --col-6'>Acciones</span>
                </div>
                <div className='--sales-table-body'>
                    {ventasFiltradas.map((venta) => (
                        <Row key={venta.id} venta={venta} />
                    ))}
                </div>
            </div>

        </>

    )

}
import Alert from "../components/alerts/Alert";
import ChartsCard from "../components/cards/charts";
import Kpis from "../components/cards/kpis";
import './styles/home.css'

export default function HomePage () {

    const data = {
        kpis: [
            {
                "title": "Ventas del día",
                "value": 1240.50,
                "prefix": "S/",
                "description": "Total vendido hoy",
                "trend": { "value": 12, "type": "up" }
            },
            {
                "title": "N° de ventas del día",
                "value": 87,
                "description": "Transacciones procesadas",
                "trend": { "value": -5, "type": "down" }
            },
            {
                "title": "Productos vendidos",
                "value": 362,
                "description": "Unidades totales vendidas",
                "trend": { "value": 8, "type": "up" }
            },
            {
                "title": "Alertas activas",
                "value": 5,
                "description": "Stock en mínimo o agotado",
                "trend": { "value": 2, "type": "up" }
            }
        ],
        ventas: {
            ventasPorHora: [
                { "hora": "06:00", "total": 120.50 },
                { "hora": "07:00", "total": 310.00 },
                { "hora": "08:00", "total": 480.75 },
                { "hora": "09:00", "total": 260.10 },
                { "hora": "10:00", "total": 150.00 },
                { "hora": "11:00", "total": 380.40 },
                { "hora": "12:00", "total": 550.90 },
                { "hora": "12:40", "total": 550.90 },
            ],
            metaDiaria: 3000.00
        },
        alertasStock: [
            {
                "tipo": "Insumo",
                "nombre": "Harina 50kg",
                "estado": "agotado",
                "cantidadActual": 0,
                "cantidadMinima": 20,
                "ultimaActualizacion": "2025-02-10T09:15:00Z"
            },
            {
                "tipo": "Insumo",
                "nombre": "Levadura",
                "estado": "bajo",
                "cantidadActual": 3,
                "cantidadMinima": 5,
                "ultimaActualizacion": "2025-02-10T09:17:00Z"
            },
            {
                "tipo": "Producto",
                "nombre": "Pan Francés",
                "estado": "bajo",
                "cantidadActual": 15,
                "cantidadMinima": 40,
                "ultimaActualizacion": "2025-02-10T09:20:00Z"
            }
        ],
        actividadReciente: [
            {
                "tipo": "venta",
                "mensaje": "Venta realizada en Tienda Centro por S/ 35.20",
                "timestamp": "2025-02-10T09:22:00Z"
            },
            {
                "tipo": "stock",
                "mensaje": "Almacén reporta agotado: Harina 50kg",
                "timestamp": "2025-02-10T09:18:30Z"
            },
            {
                "tipo": "produccion",
                "mensaje": "Producción registrada: 120 unidades de Pan Francés",
                "timestamp": "2025-02-10T09:11:00Z"
            },
            {
                "tipo": "venta",
                "mensaje": "Venta realizada en Tienda Norte por S/ 18.00",
                "timestamp": "2025-02-10T09:05:15Z"
            }
        ]
    }

    return (

        <>
        
            <div className="--content-grid">

                <div className="--row-A">

                    <div className="__kpis_list">
                        {data.kpis.map((k, i) => (
                            <Kpis key={i} kpis={k} />
                        ))}
                    </div>

                    <ChartsCard data={data} />

                </div>

                <div className="--row-B">
                    <div className="__alerts">
                        <h3 className="--title">Alertas</h3>
                        <ul className="--list">
                            {data.alertasStock.map((alr, i) => (
                                <Alert key={i} data={alr} />
                            ))}
                        </ul>
                    </div>
                </div>
                
            </div>

        </>

    )

}
import { useState } from "react";
import VentasChart from "../charts/Ventas";
import './styles/charts.css'

export default function ChartsCard ({ data }) {

    const [ filter, setFilter ] = useState('hour');

    const ventas = {
        hour: [
            { "hora": "06:00", "total": 120.50 },
            { "hora": "07:00", "total": 310.00 },
            { "hora": "08:00", "total": 480.75 },
            { "hora": "09:00", "total": 260.10 },
            { "hora": "10:00", "total": 150.00 },
            { "hora": "11:00", "total": 380.40 },
            { "hora": "12:00", "total": 550.90 },
            { "hora": "12:40", "total": 550.90 }
        ],
        dia: [
            { "dia": "2025-01-01", "total": 2850.30 },
            { "dia": "2025-01-02", "total": 3120.10 },
            { "dia": "2025-01-03", "total": 2980.40 },
            { "dia": "2025-01-04", "total": 3300.75 },
            { "dia": "2025-01-05", "total": 2700.20 }
        ],
        month: [
            { "mes": "2025-01", "total": 91250.40 },
            { "mes": "2025-02", "total": 87540.90 },
            { "mes": "2025-03", "total": 102340.20 }
        ],
        metaDiaria: 3000.00
    }

    return (
        <div className="__charts_alert">
            <h2 className="--title">Gráfico de ventas</h2>
            <ul className="--filters">
                <li className={`--filter ${filter === 'hour' ? '--filter--active' : ''}`} onClick={() => setFilter('hour')}>Ventas por hora</li>
                <li className={`--filter ${filter === 'dia' ? '--filter--active' : ''}`} onClick={() => setFilter('dia')}>Ventas por día</li>
                <li className={`--filter ${filter === 'month' ? '--filter--active' : ''}`} onClick={() => setFilter('month')}>Ventas por mes</li>
            </ul>
            <VentasChart data={ventas[filter]} />
        </div>
    )
}
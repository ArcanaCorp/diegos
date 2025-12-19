import { useEffect, useState } from "react";
import VentasChart from "../charts/Ventas";
import { getSalesStats } from "@/services/stats.service";
import './styles/charts.css'

export default function ChartsCard ({ data }) {

    const [ filter, setFilter ] = useState('hour');
    const [ ventas, setVentas ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('')

    const loadData = async (type) => {
        try {
            setLoading(true);
            const data = await getSalesStats(type);
            if (!data.ok) return setVentas([]);
                console.log(data)
                setVentas(data.data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData(filter)
    }, [filter])

    return (
        <div className="__charts_alert">
            <h2 className="--title">Gráfico de ventas</h2>
            <ul className="--filters">
                <li className={`--filter ${filter === 'hour' ? '--filter--active' : ''}`} onClick={() => setFilter('hour')}>Ventas por hora</li>
                <li className={`--filter ${filter === 'day' ? '--filter--active' : ''}`} onClick={() => setFilter('day')}>Ventas por día</li>
                <li className={`--filter ${filter === 'month' ? '--filter--active' : ''}`} onClick={() => setFilter('month')}>Ventas por mes</li>
            </ul>
            {loading ? (
                <div>Cargando...</div>
            ) : (
                error ? (
                    <div>{error}</div>
                ) : (
                    <VentasChart data={ventas} />
                )
            )}
        </div>
    )
}
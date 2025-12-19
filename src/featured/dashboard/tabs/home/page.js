import { useEffect, useState } from "react";
import Panel from "@/components/Alerts/Panel";
import ChartsCard from "../../components/cards/charts";
import Kpis from "../../components/cards/kpis";
import './page.css'
import { getSummaryStats } from "../../../../services/stats.service";
import { toast } from "sonner";

export default function HomePage () {

    const [ kpis, setKpis ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('')

    useEffect(() => {
        const summary = async () => {
            try {
                setLoading(true);
                const data = await getSummaryStats();
                if (!data.ok) return toast.warning('Alerta', { description: data.message })
                    toast.success('Éxito', { description: data.message })
                    setKpis(data.data)
            } catch (error) {
                setKpis([])
                setError(error.message)
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        summary();
    }, []);

    return (

        <>
        
            <div className="--content-grid">

                <div className="--row-A">

                    <div className="__kpis_list">
                        {loading ? (
                            <div>Cargando...</div>
                        ) : (
                            error ? (
                                <div>{error}</div>
                            ) : (
                                kpis.length > 0 ? (
                                    kpis.map((k, i) => (
                                        <Kpis key={i} kpis={k} />
                                    ))
                                ) : (
                                    <div>No hay datos</div>
                                )
                            )
                        )}
                    </div>

                    <ChartsCard />

                </div>

                <Panel/>
                
            </div>

        </>

    )

}
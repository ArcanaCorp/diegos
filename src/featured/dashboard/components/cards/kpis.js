import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import './styles/kpis.css'
export default function Kpis ({ kpis }) {

    console.log(kpis);

    return (

        <div className="--card-kpis">
            <div className="--card-info">
                <p className="--p-1">{kpis.title}</p>
                <h2>{kpis.prefix} {kpis.value} {kpis.trend.type === 'down' ? <IconTrendingDown color="#FF0000" /> : <IconTrendingUp color="#10bd00ff" />}</h2>
                <p className="--p-3">{kpis.description}</p>
            </div>
        </div>

    )

}
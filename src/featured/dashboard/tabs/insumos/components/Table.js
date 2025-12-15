import { useDB } from "@/context/DBContext";
import './styles/table.css'
import Rows from "./Rows";
export default function Table () {

    const { inputs } = useDB();
    const { list } = inputs;

    return (

        <div className="--table-inputs">
            <div className="--table-head-inputs">
                <span className="--span-col --span-col-2">Insumo</span>
                <span className="--span-col --span-col-1">Categoría</span>
                <span className="--span-col --span-col-1">Stock</span>
                <span className="--span-col --span-col-1">Mínimo</span>
                <span className="--span-col --span-col-1">Costo</span>
                <span className="--span-col --span-col-1">Vence</span>
                <span className="--span-col --span-col-1">Estado</span>
            </div>
            <div className="--table-body-inputs">
                {list.map((input) => (
                    <Rows key={input.id} input={input} />
                ))}
            </div>
        </div>

    )

}
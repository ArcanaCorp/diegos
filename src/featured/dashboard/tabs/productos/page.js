import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Table from "./components/Table";
import './page.css'

export default function ProductosPage () {

    const { user } = useAuth();
    const [ filter, setFilter ] = useState({
        text: '',
        select: ''
    });

    return (

        <>
        
            <div className="--head-page">
                {user?.role === 'ADMIN' && (
                    <button className="__btn __btn_primary">Crear nuevo producto</button>
                )}
                <ul className="__filters">
                    <li>
                        <input type="search" value={filter.text} placeholder="Buscar..." onChange={(e) => setFilter({text: e.target.value, select: ''})} />
                    </li>
                    <li>
                        <select value={filter.select} onChange={(e) => setFilter({text: '', select: e.target.value})}>
                            <option value={''} selected hidden>Categoria</option>
                            <option value={'1'}>Tortas</option>
                            <option value={'2'}>Embutidos</option>
                            <option value={'3'}>Otros</option>
                        </select>
                    </li>
                </ul>
            </div>

            <Table search={filter.text} selected={filter.select}/>
        
        </>

    )

}
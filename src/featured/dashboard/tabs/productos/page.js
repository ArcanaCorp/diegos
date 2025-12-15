import { useState } from "react";
import Table from "./components/Table";
import './page.css'

export default function ProductosPage () {

    const [ filter, setFilter ] = useState({
        text: '',
        select: ''
    });

    return (

        <>
        
            <div className="--head-page">
                <button className="__btn __btn_primary">Crear nuevo producto</button>
                <ul className="__filters">
                    <li>
                        <input type="search" value={filter.text} placeholder="Buscar..." onChange={(e) => setFilter({text: e.target.value, select: ''})} />
                    </li>
                    <li>
                        <select value={filter.select} onChange={(e) => setFilter({text: '', select: e.target.value})}>
                            <option value={''} selected hidden>Categoria</option>
                            <option value={'Categoria 1'}>Categoria 1</option>
                            <option value={'Categoria 2'}>Categoria 2</option>
                            <option value={'Categoria 3'}>Categoria 3</option>
                        </select>
                    </li>
                </ul>
            </div>

            <Table search={filter.text} selected={filter.select}/>
        
        </>

    )

}
import './styles/filtros.css'
export default function Filtros ({ filter, setFilter, ventas, onClear }) {
    return (
        <ul className='--filters'>
            <li className='--filter --filter-type'>
                <label className='--filter-label'>Buscar</label>
                <div className='--filter-control'>
                    <input type='search' value={filter.text} placeholder='Buscar por nombre, precio, tienda' onChange={(e) => setFilter(prev => ({ ...prev, text: e.target.value }))}/>
                </div>
            </li>
            <li className='--filter --filter-type'>
                <label className='--filter-label'>De</label>
                <div className='--filter-control'>
                    <input type='date' value={filter.dateFrom} onChange={(e) => setFilter(prev => ({ ...prev, dateFrom: e.target.value }))}/>
                </div>
            </li>
            <li className='--filter --filter-type'>
                <label className='--filter-label'>Hasta</label>
                <div className='--filter-control'>
                    <input type='date' value={filter.dateTo} onChange={(e) => setFilter(prev => ({ ...prev, dateTo: e.target.value }))}/>
                </div>
            </li>
            <li className='--filter --filter-type'>
                <label className='--filter-label'>Tiendas</label>
                <div className='--filter-control'>
                    <select value={filter.store} defaultValue={''} onChange={(e) => setFilter(prev => ({ ...prev, store: e.target.value }))}>
                        <option value={''} selected hidden>Tiendas</option>
                        <option value={'Tienda 1'}>Tienda 1</option>
                        <option value={'Tienda 2'}>Tienda 2</option>
                    </select>
                </div>
            </li>
            <li className='--filter --filter-type'>
                <label className='--filter-label'>Productos</label>
                <div className='--filter-control'>
                    <select value={filter.product} defaultValue={''} onChange={(e) => setFilter(prev => ({ ...prev, product: e.target.value }))}>
                        <option value={''} selected hidden>Producto</option>
                        {ventas.map((p) => (
                            <option key={p.id} value={p.producto}>{p.producto}</option>
                        ))}
                    </select>
                </div>
            </li>
            {(filter.text || filter.dateFrom || filter.dateTo || filter.store || filter.product) && (
                <button className='--filter-delete' onClick={onClear}>Borrar filtros</button>
            )}
        </ul>
    )
}
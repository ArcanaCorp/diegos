import Row from './Row'
import './styles/table.css'
export default function Table ({ ventasFiltradas }) {

    return (

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

    )

}
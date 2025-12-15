import './alert.css'
export default function Alert ({ data }) {

    return (

        <li className={`--alert`}>
            <div className='--alert-col'>
                <span className="--alert-sub">{data.tipo}</span>
                <h3 className="--alert-tit">{data.nombre}</h3>
            </div>
            <span className={`--alert-badge ${data.cantidadActual === data.cantidadMinima && '--alert-badge-warning'} ${data.cantidadActual < data.cantidadMinima && '--alert-badge-danger'}`}>{data.cantidadActual}/{data.cantidadMinima}</span>
        </li>

    )

}
export default function Alert ({ data }) {

    return (

        <li className={`--alert`}>
            <div className='--alert-col'>
                <span className="--alert-sub">Categoria</span>
                <h3 className="--alert-tit">Titulo de la notificación</h3>
            </div>
            <span className={`--alert-badge`}>Si</span>
        </li>

    )

}
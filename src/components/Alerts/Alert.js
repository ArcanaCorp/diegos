import './styles/alert.css'
export default function Alert ({ data, toogleModal }) {

    const lstStatus = {
        'PENDING': '--alert-warning'
    }

    const clasesStatus = lstStatus[data.status] || '--alert-status-default'

    return (

        <>
        
            <li className={`--alert ${clasesStatus}`} onClick={() => toogleModal(data)}>
                <div className='--alert-row --alert-row-A'>
                    <span className={`--alert-status`}>{data.status}</span>
                    <h3 className="--alert-tit">{data.title}</h3>
                    <span className="--alert-sub">{data.message}</span>
                </div>
            </li>

        </>

    )

}
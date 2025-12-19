import { IconX } from "@tabler/icons-react";
import moment from "moment";
import './styles/alertModal.css'

export default function Modal ({ view, info, toogleModal }) {

    const listTypeAlerts = {
        'STOCK_REQUEST': 'Alerta de Stock'
    }

    const listStatusAlerts = {
        'PENDING': 'Pendiente'
    }

    const typeAlert = listTypeAlerts[info?.type] || info?.type;
    const statusAlert = listStatusAlerts[info?.status] || info?.status;

    return (

        <div className={`--overlay ${view ? 'active' : ''}`}>
            <div className="--modal">
                <div className="--modal-head">
                    <h3>{info?.title}</h3>
                    <button onClick={toogleModal}><IconX/></button>
                </div>
                <div className="--modal-body">
                    <ul className="--modal-alert-info">
                        <li>
                            <span className="--row-span-1">Fecha</span>
                            <span className="--row-span-2">{moment(info?.created_at).fromNow()}</span>
                        </li>
                        <li>
                            <span className="--row-span-1">Tipo</span>
                            <span className="--row-span-2">{typeAlert}</span>
                        </li>
                        <li>
                            <span className="--row-span-1">Estado</span>
                            <span className="--row-span-2">{statusAlert}</span>
                        </li>
                        <li>
                            <span className="--row-span-1">Titulo</span>
                            <span className="--row-span-2">{info?.title}</span>
                        </li>
                        <li>
                            <span className="--row-span-1">Mensaje</span>
                            <span className="--row-span-2">{info?.message}</span>
                        </li>
                    </ul>
                    {info?.payload && (
                        <ul className="--modal-alert-info">
                            <li>
                                <span className="--row-span-1">Producto</span>
                                <span className="--row-span-2">{info?.payload?.product_id}</span>
                            </li>
                            <li>
                                <span className="--row-span-1">Cantidad solicitada</span>
                                <span className="--row-span-2">{info?.payload?.requested_qty}</span>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>

    )

}
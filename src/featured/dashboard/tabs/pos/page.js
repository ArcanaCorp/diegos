import { useEffect, useState } from "react";
import { useDB } from '@/context/DBContext';
import Modal from "./components/Modal";
import './page.css'
import moment from "moment";
import 'moment/locale/es'; // 👈 Importante
import { IconBrandWhatsapp, IconEye, IconPrinter } from "@tabler/icons-react";
moment.locale('es');

const Rows = ({itm}) => {
    
    const formattedDate = moment(itm.date).format("DD/MMM/YYYY").toUpperCase();
    
    return (
        <li className="--rows">
            <span className="--col --col-1"></span>
            <span className="--col --col-2">{itm.store}</span>
            <span className="--col --col-3">S/.{itm.total}</span>
            <span className="--col --col-4">{itm.payment}</span>
            <span className="--col --col-5">{formattedDate}</span>
            <span className="--col --col-6">
                <button>
                    <IconBrandWhatsapp/>
                    <span className="--tooltip">Enviar por WhatsApp</span>
                </button>
                <button>
                    <IconPrinter/>
                    <span className="--tooltip">Imprimir</span>
                </button>
                <button>
                    <IconEye/>
                    <span className="--tooltip">Ver más</span>
                </button>
            </span>
        </li>
    )
}

export default function POSPage () {

    const { sales } = useDB();
    const { list, loading, error, fetchSales } = sales;
    const [ modal, setModal ] = useState(false);

    useEffect(() => {
        fetchSales();
    }, [fetchSales]);

    return (

        <>

            <div className="--head-pos">
                <button className="__btn __btn_primary" onClick={() => setModal(!modal)}>Nueva venta</button>
            </div>

            <div className="--table-pos">
                <div className="--table-head-pos">
                    <span className="--col --col-1"></span>
                    <span className="--col --col-2">Venta</span>
                    <span className="--col --col-3">Total</span>
                    <span className="--col --col-4">Método de pago</span>
                    <span className="--col --col-5">Fecha</span>
                    <span className="--col --col-6">Acción</span>
                </div>
                <ul className="--table-body-pos">
                    {loading ? (
                        <li>
                            <span className="--col">Cargando...</span>
                        </li>
                    ) : (
                        error ? (
                            <li>
                                <span className="--col">{error}</span>
                            </li>
                        ) : (
                            list.map((itm) => ( <Rows itm={itm} /> ))
                        )
                    )}
                </ul>
            </div>

            {modal && ( <Modal active={modal} setModal={setModal} /> )}

        </>

    )

}
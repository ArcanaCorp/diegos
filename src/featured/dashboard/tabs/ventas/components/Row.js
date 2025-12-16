import moment from "moment/moment"
import 'moment/locale/es'; // 👈 Importante
import { IconBrandWhatsapp, IconEye, IconPrinter, IconX } from "@tabler/icons-react";
import { generateTiketSale } from '@/helpers/tikets';
import './styles/ticket.css'
import './styles/modal.css'
import { useState } from "react";
moment.locale('es');

export default function Row ({ venta }) {

    const [ modal, setModal ] = useState(false);

    console.log(venta);

    const handleWhatsapp = async () => {
        const { url } = await generateTiketSale(venta);
        const message = `Hola 👋\nAquí tienes tu nota de venta 🧾\n${url}\nGracias por comprar en Diego's 🥐`.trim();
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    const handlePrint = async () => {
        const { url } = await generateTiketSale(venta);

        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "0";
        iframe.src = url;

        document.body.appendChild(iframe);

        iframe.onload = () => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };
    };

    const formattedDate = moment(venta.fecha).format("DD/MMM/YYYY").toUpperCase();

    return (

        <>
        
            <div className='--row'>
                <span className='--col --col-1'><input type='checkbox' /></span>
                <span className='--col --col-2'>{venta.store}</span>
                <span className='--col --col-3'>{venta.payment}</span>
                <span className='--col --col-4'>S/.{venta.total}</span>
                <span className='--col --col-5'>{formattedDate}</span>
                <span className='--col --col-6'>
                    <button onClick={() => handleWhatsapp(venta)}><IconBrandWhatsapp/><span className="--tooltip">Enviar por WhatsApp</span></button>
                    <button onClick={() => handlePrint(venta)}><IconPrinter/><span className="--tooltip">Imprimir</span></button>
                    <button onClick={() => setModal(!modal)}><IconEye/><span className="--tooltip">Ver más</span></button>
                </span>
            </div>

            <div className={`--overlay ${modal && 'active'}`}>
                <div className="--modal">
                    <div className="--modal-head">
                        <h3>Nota de venta</h3>
                        <button onClick={() => setModal(!modal)}><IconX/></button>
                    </div>
                    <div className="--modal-body">
                        <ul className="--lst-details">
                            <li>
                                <span>Fecha:</span>
                                <span>{formattedDate}</span>
                            </li>
                            <li>
                                <span>Hora:</span>
                                <span>{moment(venta.date).format('HH:mm A')}</span>
                            </li>
                            <li>
                                <span>Tienda:</span>
                                <span>{venta.store}</span>
                            </li>
                            <li>
                                <span>Forma de pago:</span>
                                <span>{venta.payment}</span>
                            </li>
                            <li>
                                <span>Nota:</span>
                                <span>{venta.note || 'No hay notas para esta venta'}</span>
                            </li>
                        </ul>
                        <div className="--table">
                            <ul className="--table-head">
                                <li className="--span-1">CANT</li>
                                <li>PRODUCTO</li>
                                <li>PRECIO</li>
                                <li>TOTAL</li>
                            </ul>
                            <ul className="--table-body">
                                {venta.products.map((vp) => (
                                    <li key={vp.id}>
                                        <span className="--span-1">{vp.quantity}</span>
                                        <span>{vp.name}</span>
                                        <span>S/. {(vp.subtotal / vp.quantity).toFixed(2)}</span>
                                        <span>S/. {(vp.subtotal).toFixed(2)}</span>
                                    </li>
                                ))}
                                <li className="--sumary">
                                    <span>IMPORTE TOTAL:</span>
                                    <span>S/. {(venta.total).toFixed(2)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )

}
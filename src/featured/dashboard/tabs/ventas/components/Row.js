import moment from "moment/moment"
import 'moment/locale/es'; // 👈 Importante
import { IconBrandWhatsapp, IconDots, IconTicket } from "@tabler/icons-react";
import jsPDF from "jspdf";
moment.locale('es');

export default function Row ({ venta }) {

    const generatePDF = (venta) => {
        const doc = new jsPDF();

        // Título
        doc.setFontSize(18);
        doc.text('Nota de Venta', 20, 20);

        // Detalles de la venta
        doc.setFontSize(12);
        doc.text(`Tienda: ${venta.store}`, 20, 40);
        doc.text(`Método de Pago: ${venta.payment}`, 20, 50);
        doc.text(`Total: S/. ${venta.total}`, 20, 60);
        doc.text(`Fecha: ${moment(venta.fecha).format('DD/MMM/YYYY').toUpperCase()}`, 20, 70);

        // Aquí puedes agregar más detalles si quieres (productos, cantidades, etc.)

        // Generar PDF y abrir WhatsApp
        const pdfUrl = doc.output('bloburl');
        const whatsappUrl = `https://wa.me/?text=¡Hola! Aquí está la nota de venta: ${encodeURIComponent(pdfUrl)}`;

        window.open(whatsappUrl, '_blank');
    };

    const formattedDate = moment(venta.fecha).format("DD/MMM/YYYY").toUpperCase();

    return (

        <div className='--row'>
            <span className='--col --col-1'><input type='checkbox' /></span>
            <span className='--col --col-2'>{venta.store}</span>
            <span className='--col --col-3'>{venta.payment}</span>
            <span className='--col --col-4'>S/.{venta.total}</span>
            <span className='--col --col-5'>{formattedDate}</span>
            <span className='--col --col-6'>
                <button onClick={generatePDF}><IconBrandWhatsapp/></button>
                <button><IconTicket/></button>
                <button><IconDots/></button>
            </span>
        </div>

    )

}
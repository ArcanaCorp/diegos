import moment from "moment/moment"
import 'moment/locale/es'; // 👈 Importante
moment.locale('es');

export default function Row ({ venta }) {

    const formattedDate = moment(venta.fecha).format("DD/MMM/YYYY").toUpperCase();

    return (

        <div className='--row'>
            <span className='--col --col-1'><input type='checkbox' /></span>
            <span className='--col --col-2'>{venta.tienda}</span>
            <span className='--col --col-3'>{venta.producto}</span>
            <span className='--col --col-4'>S/.{venta.total}</span>
            <span className='--col --col-5'>{formattedDate}</span>
            <span className='--col --col-6'></span>
        </div>

    )

}
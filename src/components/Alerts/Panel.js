import { useDB } from "@/context/DBContext";
import Alert from "./Alert";
import { useState } from "react";
import Modal from "./Modal";

export default function Panel () {

    const { notifications } = useDB();
    const { list, loading, error } = notifications;

    const [ modal, setModal ] = useState({
        view: false,
        info: null
    });

    const toogleModal = (data) => setModal({
        view: !modal.view,
        info: data
    });

    return (

        <>
        
            <div className="--row-B">
                <div className="__alerts">
                    <h3 className="--title">Notificaciones</h3>
                    <ul className="--list">
                        {loading ? (
                            <div>Cargando...</div>
                        ) : (
                            error ? (
                                <div>{error}</div>
                            ) : (
                                list.length > 0 ? (
                                    list.map((noty) => (
                                        <Alert key={noty.id} data={noty} toogleModal={toogleModal} />
                                    ))
                                ) : (
                                    <div>No hay notificaciones</div>
                                )
                            )
                        )}
                    </ul>
                </div>
            </div>

            <Modal view={modal.view} info={modal.info} toogleModal={toogleModal} />

        </>

    )

}
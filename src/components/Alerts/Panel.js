import Alert from "./Alert";

export default function Panel () {

    return (

        <>
        
            <div className="--row-B">
                <div className="__alerts">
                    <h3 className="--title">Notificaciones</h3>
                    <ul className="--list">
                        <Alert/>
                        <Alert/>
                        <Alert/>
                    </ul>
                </div>
            </div>

        </>

    )

}
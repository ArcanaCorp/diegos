import { toast } from "sonner";
import { getSocket } from "@/socket/connection";
import { serviceRequestProducts } from "@/services/request.service";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";

export default function Replenish ({ data }) {

    const { user } = useAuth();
    
    const [ modalReplenish, setModalReplenish ] = useState(false);
    const [ amountReplenish, setAmountReplenish ] = useState(data.amountByStore || 0)
    const [ loading, setLoading ] = useState(false);

    const handleRequestProduct = async () => {
        try {
            const socket = getSocket();

            if (!socket) {
                toast.error('Error', {description: 'Socket no inicializado'})
                return;
            }

            setLoading(true);

            const form = {
                "type": "STOCK_REQUEST",
                "title": "Solicitud de stock",
                "message": `Se requiere reposición urgente para ${user?.name}`,
                "payload": {
                    "product_id": data.id,
                    "requested_qty": amountReplenish
                },
                "store_id": user?.code
            }
            const res = await serviceRequestProducts(form);
            if (!res.ok) return toast.warning('Alerta', { description: res.message })
                toast.success('Éxito', { description: res.message })
                socket.emit("request:nueva", res.data)
        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setModalReplenish(false);
            setLoading(false);
        }
    }

    return (

        <>
        
            <button className="__btn __txt_sm __btn_primary" onClick={() => setModalReplenish(true)}>Reponer</button>

            <div className={`--overlay ${modalReplenish ? 'active' : ''}`}>
                <div className="--modal">
                    <div className="--modal-head">
                        <h3>Reponer {data.name}</h3>
                        <button onClick={() => setModalReplenish(false)}><IconX/></button>
                    </div>
                    <div className="--modal-body">
                        <div style={{display: 'flex', alignItems: 'center', gap: '.5rem'}}>
                            <input 
                                type="number" 
                                style={{width: '100%', height: '44px', backgroundColor: 'var(--color-secondary)', borderRadius: 'var(--radius-md)', padding: '0 1rem'}} 
                                inputMode="numeric" 
                                pattern="[0-9]"
                                min={data.amountByStore} 
                                value={amountReplenish}
                                max={12}
                                placeholder="Ingresar cantidad para su reposición" 
                                onChange={(e) => setAmountReplenish(e.target.value)} 
                            />
                            <button className="__btn __btn_primary" style={{textWrap: 'nowrap', height: '44px'}} onClick={handleRequestProduct}>{loading ? 'Enviando petición' : 'Solicitar reposición'}</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )

}
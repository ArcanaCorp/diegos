import { toast } from "sonner"
import { enablePush } from "@/services/settings.service"

export default function ConfigPage () {

    const handleActiveNotifications = async () => {
        try {
            await enablePush();
        } catch (error) {
            toast.error('Error', { description: `${error.message}` })
        }
    }

    return (

        <>
        
            <div>
                <button onClick={handleActiveNotifications}>Activar notificaciones</button>
            </div>

        </>

    )

}
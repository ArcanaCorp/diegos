import { toast } from "sonner"
import { enablePush } from "@/services/settings.service"
import { requestNotificationPermission } from "@/helpers/requestNotificationPermission";

export default function ConfigPage () {

    const handleActiveNotifications = async () => {
        try {
            await requestNotificationPermission();
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
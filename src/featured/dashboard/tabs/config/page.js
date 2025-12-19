import { useState } from "react";
import { toast } from "sonner";
import { IconPencil, IconCheck } from "@tabler/icons-react";
import { enablePush } from "@/services/settings.service";
import { useAuth } from "@/context/AuthContext";
import { requestNotificationPermission } from "@/helpers/requestNotificationPermission";
import "./page.css";

export default function ConfigPage() {

    const { user } = useAuth();

    const [fields, setFields] = useState({
        username: { value: user.name || "", editing: false },
        password: { value: "", editing: false },
        ruc: { value: "", editing: false }
    });

    const isPushEnabled = Notification.permission === "granted";

    const handleChange = (field, value) => {
        setFields(prev => ({
            ...prev,
            [field]: { ...prev[field], value }
        }));
    };

    const toggleEdit = (field) => {
        setFields(prev => {
            const editing = prev[field].editing;

            if (editing) {
                toast.success("Cambios guardados");
            }

            return {
                ...prev,
                [field]: { ...prev[field], editing: !editing }
            };
        });
    };

    const handleActiveNotifications = async () => {
        try {
            await requestNotificationPermission();
            await enablePush();
            toast.success("Notificaciones activadas");
        } catch (error) {
            toast.error("Error", { description: error.message });
        }
    };

    const renderField = (label, field, type = "text") => (
        <li className="--itm">
            <p>{label}</p>
            <div className="--form-group">
                <input
                    className="__entry"
                    type={type}
                    value={fields[field].value}
                    disabled={!fields[field].editing}
                    placeholder={label}
                    onChange={(e) => handleChange(field, e.target.value)}
                />
                <button className="--btn" onClick={() => toggleEdit(field)}>
                    {fields[field].editing ? <IconCheck /> : <IconPencil />}
                </button>
            </div>
        </li>
    );

    return (
        <div className="--settings">

            <div className="--box-setting">
                <h3 className="--title">Cuenta</h3>
                <ul className="--lst">
                    {renderField("Cambiar usuario", "username")}
                    {renderField("Cambiar contraseña", "password", "password")}
                </ul>
            </div>

            <div className="--box-setting">
                <h3 className="--title">Empresa</h3>
                <ul className="--lst">
                    {renderField("RUC", "ruc")}
                </ul>
            </div>

            <div className="--box-setting">
                <h3 className="--title">Notificaciones</h3>
                <ul className="--lst">
                    <li className="--itm">
                        <p>Activar notificaciones</p>
                        <button className={`__btn ${isPushEnabled ? '__btn_primary' : '__btn_danger'}`} onClick={handleActiveNotifications}>
                            {isPushEnabled ? 'Activar' : 'Desactivar'}
                        </button>
                    </li>
                </ul>
            </div>

        </div>
    );
}
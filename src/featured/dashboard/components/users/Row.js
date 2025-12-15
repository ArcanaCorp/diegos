import { IconDots } from "@tabler/icons-react";
import { useDB } from "@/context/DBContext";
import { toast } from "sonner";
export default function Row ({ row }) {

    const { users } = useDB();
    const { removeUser } = users;

    const handleDelete = async () => {
        try {
            const data = await removeUser(row.code)
            if (!data.ok) return toast.warning('Alerta', { description: data.message })
                toast.success('Éxito', {description: data.message})
        } catch (error) {
            toast.error('Error', {description: error.message})
        }
    }

    const handleQuestionDelete = async () => {
        toast('¿Estás seguro que deseas eliminar?', {
            action: {
                label: 'Sí, eliminar',
                onClick: handleDelete 
            },
            cancel: {
                label: 'Cancelar'
            }
        })
    }

    return (
        <li className={`__table_row`}>
            <span className={`__span_row __span_row_id`}>{row.id}</span>
            <span className={`__span_row __span_row_name`}>{row.name}</span>
            <span className={`__span_row __span_row_role`}>{row.role}</span>
            <span className={`__span_row __span_row_actions`}><button onClick={handleQuestionDelete}><IconDots/></button></span>
        </li>        
    )
}
import { useState } from "react";
import { useDB } from "@/context/DBContext";
import { IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import Replenish from "./Replenish";

export default function Row({ data }) {

    const { user } = useAuth();
    const { products } = useDB();
    const { updateProduct, deleteProduct } = products;

    const [editing, setEditing] = useState(null);
    const [value, setValue] = useState("");

    const isAdmin = user.role === 'ADMIN';

    const startEditing = (field, currentValue) => {
        if (!isAdmin) return;
        setEditing(field);
        setValue(currentValue);
    };

    const saveChange = async () => {
        if (!editing) return;

        await updateProduct(data.id, editing, value);

        setEditing(null);
        setValue("");
    };

    const handleKey = (e) => {
        if (e.key === "Enter") saveChange();
        if (e.key === "Escape") setEditing(null);
    };

    const renderCell = (propKey, field, className) => (
        <span
            className={`--col ${className}`}
            onClick={() => startEditing(field, data[propKey])}
        >
            {editing === field && isAdmin ? (
                <input
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKey}
                    onBlur={saveChange}
                />
            ) : (
                data[propKey]
            )}
        </span>
    );

    const handleQuestionDelete = (id) => {
        toast.error('¿Eliminar este producto?', {
            action: {
                label: 'Si, eliminar',
                onClick: () => handleDeleting(id)
            },
            cancel: {
                label: 'No, cancelar'
            }
        })
    }

    const handleDeleting = (id) => {
        try {
            toast.promise(deleteProduct(id), {
                loading: 'Eliminando...',
                success: 'Producto eliminado correctamente',
                error: (err) => err?.message || 'Error al eliminar el producto' 
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="--row">
            <span className="--col --col-1">{data.id}</span>
            {renderCell("name",     "name_product", "--col-2")}
            {renderCell("category", "category_product", "--col-3")}
            {renderCell("price",   "uprice_product", "--col-4")}
            {renderCell("dprice",   "dprice_product", "--col-5")}
            <span className="--col --col-6">
                {user.role === 'ADMIN' && (
                    <button className="--btn-delete-row" onClick={() => handleQuestionDelete(data.id)}>Eliminar <IconTrash /></button>
                )}
                {user.role === 'TIENDA' && ( <>{data.amountByStore}</> )}
            </span>
            {user.role === 'TIENDA' && (
                <span className="--col --col-7">
                    <Replenish data={data} />
                </span>
            )}
        </div>
    );
}
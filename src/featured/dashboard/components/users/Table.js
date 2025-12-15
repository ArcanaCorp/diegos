import { useEffect } from 'react';
import { useDB } from '@/context/DBContext';
import Row from './Row';
import './styles/table.css'
export default function Table () {

    const { users } = useDB();
    const { list, loading, error, fetchUsers } = users;

    useEffect(() => {
        if (list.length === 0) {
            fetchUsers();
        }
    }, [list, fetchUsers])

    return (
        <ul className='__table'>
            <li className="__table_head">
                <span className={`__span_head __span_head_id`}>Id</span>
                <span className={`__span_head __span_head_name`}>Usuario</span>
                <span className={`__span_head __span_head_role`}>Rol</span>
                <span className={`__span_head __span_head_actions`}>Acción</span>
            </li>
            {error === '' ? (
                loading ? (
                    <li>Cargando...</li>
                ) : (
                    list.length > 0 ? (
                        list.map((u) => (
                            <Row key={u.id} row={u} />
                        ))
                    ) : (
                        <li>No tienes usuarios</li>
                    )
                )
            ) : (
                <li>{error}</li>
            )}
        </ul>
    )
}
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDB } from '@/context/DBContext'
import { IconChevronDown, IconChevronUp, IconEye, IconEyeOff, IconUserCircle } from '@tabler/icons-react'
import './styles/created.css'

export default function CreatedUser() {

    const { users } = useDB();
    const { addUser } = users;
    const [ collapse, setCollapse ] = useState(false)
    const [ name, setName ] = useState('')
    const [ pwd, setPwd ] = useState('')
    const [ vPwd, setVpwd ] = useState(false);
    const [ role, setRole ] = useState('')
    const [ loading, setLoading ] = useState(false);

    const handleCreate = async () => {
        if (!name || !pwd || !role) return toast.warning('Alerta', { description: 'Completa los datos necesarios.' })
        try {
            setLoading(true)
            const data = await addUser(name, pwd, role);
            if (!data.ok) return toast.warning('Alerta', { description: data.message })
                toast.success('Éxito', {description: data.message})
        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setName('')
            setPwd('')
            setRole('')
            setLoading(false)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setCollapse(window.innerWidth < 1024)
        }

        // Ejecuta una vez al montar
        handleResize()

        // Listener para cambios de tamaño
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className='__form_created_user'>
            <div className='__title'>
                <h3>Crear usuario</h3>
                <button onClick={() => setCollapse(!collapse)}>{collapse ? <IconChevronDown/> : <IconChevronUp/>}</button>
            </div>
            {!collapse && (
                <>
                    <div className='__form_group'>
                        <label>Ingresa el nombre de usuario</label>
                        <div className='__form_control'>
                            <input className='__entry' type='text' name='username' id='username' autoComplete='off' placeholder='Ingresa el nombre de usuario' value={name} onChange={(e) => setName(e.target.value)} />
                            <span className='__form_ico'><IconUserCircle/></span>
                        </div>
                    </div>
                    <div className='__form_group'>
                        <label>Ingresa nueva contraseña</label>
                        <div className='__form_control'>
                            <input className='__entry' type={vPwd ? 'text' : 'password'} name='password' id='password' autoComplete='off' placeholder='Ingresa nueva contraseña' value={pwd} onChange={(e) => setPwd(e.target.value)} />
                            <span className='__form_ico' onClick={() => setVpwd(!vPwd)}>{vPwd ? <IconEyeOff/> : <IconEye/>}</span>
                        </div>
                    </div>
                    <div className='__form_group'>
                        <label>Selecciona el rol de usuario</label>
                        <div className='__form_control'>
                            <select className='__entry' name='role' id='role' defaultValue={''} value={role} onChange={(e) => setRole(e.target.value) }>
                                <option value={''} selected hidden>Seleccionar el rol</option>
                                <option value={'ADMIN'}>ADMIN</option>
                                <option value={'ALMACEN'}>ALMACEN</option>
                                <option value={'TIENDA'}>TIENDA</option>
                            </select>
                        </div>
                    </div>
                    <div className='__form_group'>
                        <button className='__btn __btn_block __btn_primary' onClick={handleCreate}>{loading ? 'Creando...' : 'Crear usuario'}</button>
                    </div>
                </>
            )}
        </div>
    )
}
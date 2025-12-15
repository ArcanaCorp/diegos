import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { IconEye, IconEyeOff, IconUserCircle } from '@tabler/icons-react'
import { useAuth } from "@/context/AuthContext";
import { login } from "@/services/account.service";
import './styles/page.css'
export default function LoginPage () {

    const { getAccount } = useAuth();
    const [ usr, setUsr ] = useState()
    const [ pwd, setPwd ] = useState();
    const [ vPwd, setVpwd ] = useState(false);
    const [ loading, setLoading ] = useState(false)

    const handleLogin = async () => {
        if (!usr || !pwd) {
            return toast.warning('Alerta', { description: 'Ingresa datos válidos antes de ingresar.' })
        }

        try {
            setLoading(true)
            const data = await login(usr, pwd);
            if (!data.ok) return toast.warning('Alerta', { description: data.message })
                Cookies.set('diegos_token', data.data, { expires: 0.5 })
                await getAccount(data.data)
                toast.success('Éxito', { description: data.message })
        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false);
        }
    }

    return (
    
        <>
        
            <div className='__form_group'>
                <label className='__form_label' htmlFor='username'>Ingresa tu nombre de usuario</label>
                <div className='__form_control'>
                    <input className='__form_entry __entry' type='text' value={usr} id='username' name='username' autoComplete='off' placeholder='Ingresa tu nombre de usuario' onChange={(e) => setUsr(e.target.value)} />
                    <span className="__form_ico"><IconUserCircle/></span>
                </div>
            </div>

            <div className='__form_group'>
                <label className='__form_label' htmlFor='password'>Ingresa tu contraseña</label>
                <div className='__form_control'>
                    <input className='__form_entry __entry' type={vPwd ? 'text' : 'password'} value={pwd} id='password' name='password' autoComplete='off' placeholder='Ingresa tu contraseña' onChange={(e) => setPwd(e.target.value)} />
                    <span className="__form_ico" onClick={() => setVpwd(!vPwd)}>{vPwd ? <IconEyeOff/> : <IconEye/>}</span>
                </div>
            </div>

            <div className="__form_group">
                <button className={`__btn __btn_block __btn_primary`} onClick={handleLogin}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
            </div>

        </>
    
    )

}
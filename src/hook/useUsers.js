import { useState } from "react";
import { createdUser, getUserList } from "@/services/user.service";
import { deleteUser } from "../services/user.service";

export const useUsers = () => {

    const [state, setState] = useState({
        list: [],
        loading: false,
        error: ''
    });

    const fetchUsers = async () => {
        try {
            setState(prev => ({...prev, loading: true}));
            const data = await getUserList();
            if (!data.ok) {
                return setState(prev => ({...prev, error: data.message}));
            }
            setState({ list: data.data, loading: false, error: ''});
        } catch (err) {
            setState({list: [], loading: false, error: err.message});
        }
    };

    const addUser = async (name, pwd, role) => {
        try {
            const data = await createdUser(name, pwd, role);
            if (!data.ok) return { ok: false, message: data.message }
                setState(prev => ({...prev, list: [...prev.list, data.data] }));
                return data;
        } catch (error) {
            setState(prev => ({...prev, error: error.message }));
            return {ok: false, message: `Error: ${error.message}`}
        }
    }

    const editUser = async (id, payload) => {};

    const removeUser = async (code) => {
        try {
            const data = await deleteUser(code);
            console.log(data);
            if (!data.ok) return { ok: false, message: data.message }
                setState(prev => ({
                    ...prev,
                    list: prev.list.filter(user => String(user.code) !== String(code))
                }));
                return data;
        } catch (error) {
            //setState(prev => ({...prev, error: error.message }));
            return {ok: false, message: `Error: ${error.message}`}
        }
    };

    return {
        ...state,
        fetchUsers,
        addUser,
        editUser,
        removeUser
    }

}
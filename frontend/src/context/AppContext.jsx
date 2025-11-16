import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const AUTH_API_URL = "https://projekt-crud-kacper-omen-backend.onrender.com/api/auth";
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${AUTH_API_URL}/me`, { withCredentials: true })
            .then((res) => setUser(res.data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);
    
    const value = {
        AUTH_API_URL,
        user, setUser,
        loading,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
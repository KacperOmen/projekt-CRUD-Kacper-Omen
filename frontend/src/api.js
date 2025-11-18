import axios from "axios";

const API_URL = "https://projekt-crud-kacper-omen-backend.onrender.com/api/clients";

export const getClients = () => axios.get(API_URL, {withCredentials: true});
export const createClient = (client) => axios.post(API_URL, client, {withCredentials: true});
export const updateClient = (id, client) => axios.put(`${API_URL}/${id}`, client, {withCredentials: true});
export const deleteClient = (id) => axios.delete(`${API_URL}/${id}`, {withCredentials: true});

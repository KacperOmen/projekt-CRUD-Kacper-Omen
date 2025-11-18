import ClientForm from "../components/ClientForm";
import ClientList from "../components/ClientList";
import { getClients, createClient, updateClient, deleteClient } from "../api";
import {useState, useEffect, useContext} from 'react'
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

export default function ClientsPage() {
    const [clients, setClients] = useState([]);
    const [editingClient, setEditingClient] = useState(null);

    const fetchClients = async () => {
        try {
        const res = await getClients();
        setClients(res.data); 
        } catch (error) {
        console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleCreate = async (client) => {
        try {
        await createClient(client); 
        fetchClients(); 
        } catch (error) {
        console.error("Error creating client:", error.response?.data || error);
        }
    };

    const handleUpdate = async (id, client) => {
        try {
        await updateClient(id, client);
        setEditingClient(null);
        fetchClients();
        } catch (error) {
        console.error("Error updating client:", error.response?.data || error);
        }
    };

    const handleDelete = async (id) => {
        try {
        await deleteClient(id);
        fetchClients();
        } catch (error) {
        console.error("Error deleting client:", error.response?.data || error);
        }
    };

    const {AUTH_API_URL, setUser} = useContext(AppContext);

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        try {
            e.preventDefault(); 

            axios.defaults.withCredentials = true;

            const {data} = await axios.post(`${AUTH_API_URL}/logout`);
            
            if (data.success) {
                setUser(null);
                navigate('/');
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {            
            toast.error(error.message)
        }
    }


    return (
        <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Clients Manager</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <ClientForm 
                    onCreate={handleCreate} 
                    onUpdate={handleUpdate} 
                    editingClient={editingClient} 
                />

                <ClientList 
                    clients={clients} 
                    onEdit={setEditingClient} 
                    onDelete={handleDelete} 
                />
            </div>
        </div>
    )
}
import { useState, useEffect } from "react";
import ClientList from "../components/ClientList";
import ClientForm from "../components/ClientForm";
import { getClients, createClient, updateClient, deleteClient } from "../api";

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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Clients Manager</h1>
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
  );
}
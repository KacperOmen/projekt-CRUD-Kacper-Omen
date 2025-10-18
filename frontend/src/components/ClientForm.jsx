import { useState, useEffect } from "react";

export default function ClientForm({ onCreate, onUpdate, editingClient }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [rentalPeriod, setRentalPeriod] = useState("");
  const [rentalDate, setRentalDate] = useState("");

  useEffect(() => {
    if (editingClient) {
      setName(editingClient.name);
      setSurname(editingClient.surname);
      setRentalPeriod(editingClient.rental_period);
      setRentalDate(editingClient.rental_date.slice(0,10)); 
    } else {
      setName(""); setSurname(""); setRentalPeriod(""); setRentalDate("");
    }
  }, [editingClient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientData = {
      name,
      surname,
      rental_period: Number(rentalPeriod),
      rental_date: rentalDate,
    };
    if (editingClient) {
      onUpdate(editingClient._id, clientData);
    } else {
      onCreate(clientData);
    }
    setName(""); setSurname(""); setRentalPeriod(""); setRentalDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
      <h2 className="text-xl mb-2">{editingClient ? "Edit Client" : "Add Client"}</h2>
      <input 
        className="border p-2 w-full mb-2" 
        placeholder="Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
      <input 
        className="border p-2 w-full mb-2" 
        placeholder="Surname" 
        value={surname} 
        onChange={e => setSurname(e.target.value)} 
      />
      <input 
        type="number"
        className="border p-2 w-full mb-2" 
        placeholder="Rental period (days)" 
        value={rentalPeriod} 
        onChange={e => setRentalPeriod(e.target.value)} 
      />
      <input 
        type="date"
        className="border p-2 w-full mb-2" 
        placeholder="Rental date" 
        value={rentalDate} 
        onChange={e => setRentalDate(e.target.value)} 
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {editingClient ? "Update" : "Add"}
      </button>
    </form>
  );
}

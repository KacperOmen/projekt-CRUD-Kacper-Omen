import { useState, useEffect } from "react";

export default function ClientForm({ onCreate, onUpdate, editingClient }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [rentalPeriod, setRentalPeriod] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingClient) {
      setName(editingClient.name);
      setSurname(editingClient.surname);
      setRentalPeriod(editingClient.rental_period);
      setRentalDate(editingClient.rental_date.slice(0,10));
      setEmail(editingClient.email || "");
      setPhone(editingClient.phone || "");
    } else {
      setName(""); setSurname(""); setRentalPeriod(""); setRentalDate(""); setEmail(""); setPhone("");
    }
    setErrors({});
  }, [editingClient]);

  const validate = () => {
    const errs = {};

    if (!name || name.length < 3 || name.length > 50) errs.name = "Name must be 3-50 characters";
    if (!surname || surname.length < 3 || surname.length > 50) errs.surname = "Surname must be 3-50 characters";
    if (!rentalPeriod || isNaN(rentalPeriod) || Number(rentalPeriod) <= 0) errs.rentalPeriod = "Rental period must be a positive number";
    if (!rentalDate) errs.rentalDate = "Rental date is required";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) errs.email = "Invalid email format";
    if (phone && !/^\+?[\d\s-]+$/.test(phone)) errs.phone = "Invalid phone format";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return; 

    const clientData = {
      name,
      surname,
      rental_period: Number(rentalPeriod),
      rental_date: rentalDate,
      email,
      phone,
    };

    if (editingClient) {
      onUpdate(editingClient._id, clientData);
    } else {
      onCreate(clientData);
    }

    setName(""); setSurname(""); setRentalPeriod(""); setRentalDate(""); setEmail(""); setPhone("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
      <h2 className="text-xl mb-2">{editingClient ? "Edit Client" : "Add Client"}</h2>

      <input
        className="border p-2 w-full mb-1"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

      <input
        className="border p-2 w-full mb-1"
        placeholder="Surname"
        value={surname}
        onChange={e => setSurname(e.target.value)}
      />
      {errors.surname && <p className="text-red-500 text-sm mb-2">{errors.surname}</p>}

      <input
        type="number"
        className="border p-2 w-full mb-1"
        placeholder="Rental period (days)"
        value={rentalPeriod}
        onChange={e => setRentalPeriod(e.target.value)}
      />
      {errors.rentalPeriod && <p className="text-red-500 text-sm mb-2">{errors.rentalPeriod}</p>}

      <input
        type="date"
        className="border p-2 w-full mb-1"
        placeholder="Rental date"
        value={rentalDate}
        onChange={e => setRentalDate(e.target.value)}
      />
      {errors.rentalDate && <p className="text-red-500 text-sm mb-2">{errors.rentalDate}</p>}

      <input
        type="email"
        className="border p-2 w-full mb-1"
        placeholder="Email (optional)"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

      <input
        type="tel"
        className="border p-2 w-full mb-1"
        placeholder="Phone (optional)"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {editingClient ? "Update" : "Add"}
      </button>
    </form>
  );
}

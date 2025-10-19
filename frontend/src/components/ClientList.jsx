export default function ClientList({ clients, onEdit, onDelete }) {
  return (
    <div>
      {clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <ul className="space-y-2">
          {clients.map(client => (
            <li key={client._id} className="flex justify-between items-center p-2 border rounded">
              <div>
                <p className="font-bold">{client.name} {client.surname}</p>
                <p>Rental: {client.rental_period} days | Date: {client.rental_date}</p>
                 <div className="text-sm text-gray-600">
                  {client.email && <p>📧 {client.email}</p>}
                  {client.phone && <p>📞 {client.phone}</p>}
                </div>
              </div>
              <div className="space-x-2">
                <button 
                  className="bg-yellow-400 px-2 py-1 rounded"
                  onClick={() => onEdit(client)}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onDelete(client._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

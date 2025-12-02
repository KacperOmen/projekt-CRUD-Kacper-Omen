import Client from "../models/client.model.js";

const formatError = (status, error, fieldErrors = []) => ({
  timestamp: new Date().toISOString(),
  status,
  error,
  fieldErrors,
});

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json(formatError(500, "Internal server error", [{ message: error.message }]));
  }
};

export const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json(formatError(404, "Not Found", [{ field: "id", message: "Client not found" }]));
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json(formatError(500, "Internal server error", [{ message: error.message }]));
  }
};

export const postClient = async (req, res) => {
  try {
    const { name, surname, rental_period, rental_date, email, phone } = req.body;
    const fieldErrors = [];

    if (!name || name.length < 3 || name.length > 50)
      fieldErrors.push({ field: "name", message: "Name must be 3-50 characters" });
    if (!surname || surname.length < 3 || surname.length > 50)
      fieldErrors.push({ field: "surname", message: "Surname must be 3-50 characters" });
    if (!rental_period || isNaN(rental_period) || Number(rental_period) <= 0)
      fieldErrors.push({ field: "rental_period", message: "Rental period must be a positive number" });
    if (!rental_date) fieldErrors.push({ field: "rental_date", message: "Rental date is required" });
    if (email && !/^\S+@\S+\.\S+$/.test(email))
      fieldErrors.push({ field: "email", message: "Invalid email format" });
    if (phone && !/^\+?[\d\s-]+$/.test(phone))
      fieldErrors.push({ field: "phone", message: "Invalid phone format" });

    if (fieldErrors.length > 0) {
      return res.status(400).json(formatError(400, "Bad request", fieldErrors));
    }

    if (email) {
      const existing = await Client.findOne({ email });
      if (existing) {
        return res.status(409).json(
          formatError(409, "Conflict", [{ field: "email", message: "Client already exists" }])
        );
      }
    }

    const client = await Client.create(req.body);
    res.status(201).json(client);

  } catch (error) {
    res.status(500).json(formatError(500, "Internal server error", [{ message: error.message }]));
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json(formatError(404, "Not Found", [{ field: "id", message: "Client not found" }]));
    }

    const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedClient);

  } catch (error) {
    res.status(500).json(formatError(500, "Internal server error", [{ message: error.message }]));
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return res.status(404).json(formatError(404, "Not Found", [{ field: "id", message: "Client not found" }]));
    }

    res.status(200).json({ message: "Client deleted successfully" });

  } catch (error) {
    res.status(500).json(formatError(500, "Internal server error", [{ message: error.message }]));
  }
};

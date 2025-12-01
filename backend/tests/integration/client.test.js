import request from 'supertest';
import express from 'express';
import clientRoute from '../../routes/client.route.js';
import authRoute from '../../routes/auth.route.js';
import cookieParser from 'cookie-parser';
import User from '../../models/user.model.js';
import Client from '../../models/client.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: ".env.test" }); 

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/clients', clientRoute);
app.use('/api/auth', authRoute);

let token;
let testUserId;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL, {});

  const password = await bcrypt.hash('password', 10);
  const user = await User.create({ login: "testuser", email: "test@example.com", password, role: "USER" });
  testUserId = user._id;

  token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
});

afterAll(async () => {
  await User.deleteMany({});
  await Client.deleteMany({});
  await mongoose.connection.close();
});

describe("Client API Integration Tests", () => {

  const clientData = {
    name: "Jan",
    surname: "Kowalski",
    rental_period: 5,
    rental_date: "2025-12-01",
    email: "jan@example.com",
    phone: "+48123456789"
  };

  it("POST /api/clients with invalid payload returns 400", async () => {
    const res = await request(app)
      .post('/api/clients')
      .set('Cookie', [`token=${token}`])
      .send({});
    expect(res.statusCode).toBe(400);
  });

  it("POST /api/clients with duplicate client returns 409", async () => {
    await request(app).post('/api/clients')
      .set('Cookie', [`token=${token}`])
      .send(clientData);

    const res = await request(app).post('/api/clients')
      .set('Cookie', [`token=${token}`])
      .send(clientData);

    expect(res.statusCode).toBe(409);
  });

  it("GET /api/clients/:id for non-existing client returns 404", async () => {
    const res = await request(app)
      .get('/api/clients/64f9e7e0b0f1c9f123456789')
      .set('Cookie', [`token=${token}`]);
    expect(res.statusCode).toBe(404);
  });

  it("DELETE /api/clients/:id for non-existing client returns 404", async () => {
    const res = await request(app)
      .delete('/api/clients/64f9e7e0b0f1c9f123456789')
      .set('Cookie', [`token=${token}`]);
    expect(res.statusCode).toBe(404);
  });

  it("GET /api/clients without token returns 401", async () => {
    const res = await request(app)
      .get('/api/clients');
    expect(res.statusCode).toBe(401);
  });

});

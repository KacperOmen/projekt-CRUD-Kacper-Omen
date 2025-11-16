import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import clientRoute from './routes/client.route.js'
import authRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())

const allowedOrigins = ["https://projekt-crud-kacper-omen-backend.onrender.com", "http://localhost:5173"];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use("/api/clients", clientRoute);
app.use("/api/auth", authRoute);

app.get('/', (req, res) => {
    res.json({message: 'Welcome to Clients API'});
})

mongoose.connect('mongodb+srv://admin:admin@zadanie1db.owbdljg.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Zadanie1DB')
.then(() => {
    console.log("Connected to db");
    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running on port 3000');
    })
})
.catch(() => {
    console.log("Connection failed")
})

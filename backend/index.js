import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import clientRoute from './routes/client.route.js'

const app = express()
app.use(express.json())
app.use(cors());

app.use("/api/clients", clientRoute);

app.get('/', (req, res) => {
    res.json({message: 'Welcome to Clients API'});
})

mongoose.connect('mongodb+srv://admin:admin@zadanie1db.owbdljg.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Zadanie1DB')
.then(() => {
    console.log("Connected to db");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
})
.catch(() => {
    console.log("Connection failed")
})
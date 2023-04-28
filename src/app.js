const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const cors = require('cors');

const dotenv = require('dotenv')
dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: '*'}));

const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = process.env.CON_URL;

const todoRoute = require('./Routes/Todo.js')

app.use('/api/todos', todoRoute)

const start = async () => {
    try{
        await mongoose.connect(CONNECTION_STRING);
        app.listen(PORT, () => console.log("Server is running...."))
    }catch (err){
        console.log(err.message);
    }
};

start();
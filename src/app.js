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

const Todo = require('./Models/todoSchema')

app.get('/api', (req, res) => res.send("WellCome to Todo API"));

//get all task
app.get('/api/todos', async (req, res) => {
    try{
        const result = await Todo.find();
        res.send({todos: result});
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

//get a single task by id
app.get('/api/todos/:id', async (req, res) => {
  try{
    const todoId = req.params.id;
    const todo = await Todo.findById(todoId)
    if(!todo){
      res.status(400).json({error: "Todo not found"});
    }
    else{
      res.json({todo})
    }
  }catch(err){
    res.status(500).json({error: err.message})
  }
})

//create new task
app.post("/api/todos", async (req, res) => {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority
    });
    try {
      await todo.save();
      res.status(201).json({ todo });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// update a task
app.put('/api/todos/:id', async (req, res) => {
  try{
    const todoId = req.params.id;
    const updatedTodo = req.body;
    const isExists = await Todo.exists({_id: todoId});
    if(!isExists){
      res.status(400).json({error: "Todo not found"});
    }
    else{
      const todo = await Todo.findByIdAndUpdate(todoId, updatedTodo)
      res.json({todo})
    }
  }catch(err){
    res.status(500).json({error: err.message})
  }
})

//delete task
app.delete('/api/todos/:id', async (req, res) => {
  try{
    const todoId = req.params.id;
    const delTodo = await Todo.findByIdAndDelete(todoId);
    res.json({deleted: delTodo});
  }catch(err){
    res.status(500).json({error: err.message})
  }
})

const start = async () => {
    try{
        await mongoose.connect(CONNECTION_STRING);
        app.listen(PORT, () => console.log("Server is running...."))
    }catch (err){
        console.log(err.message);
    }
};

start();
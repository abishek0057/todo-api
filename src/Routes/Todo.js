const express = require('express');
const router = express.Router();
const Todo = require('../Models/todoSchema');

//get all task
router.get('/', async (req, res) => {
    try{
        const result = await Todo.find();
        res.send({todos: result});
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

//get a single task by id
router.get('/:id', async (req, res) => {
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
router.post("/", async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  try{
    const todoId = req.params.id;
    const delTodo = await Todo.findByIdAndDelete(todoId);
    res.json({deleted: delTodo});
  }catch(err){
    res.status(500).json({error: err.message})
  }
})

module.exports = router;
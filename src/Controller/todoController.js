const Todo = require('../Models/todoSchema');

const getAllTask = async (req, res) => {
    try {
        const result = await Todo.find({ userId: req.user.id }).sort({ updatedAt: -1 });
        res.send({ todos: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const getTaskById = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.find({ userId: req.user.id, _id: todoId })
        if (!todo) {
            res.status(400).json({ error: "Todo not found" });
        }
        else {
            res.json({ todo })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const createTask = async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        userId: req.user.id
    });
    try {
        await todo.save();
        res.status(201).json({ todo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const updateTask = async (req, res) => {
    try {
        const todoId = req.params.id;
        const updatedTodo = req.body;
        const isExists = await Todo.exists({ userId: req.user.id, _id: todoId });
        if (!isExists) {
            res.status(400).json({ error: "Todo not found" });
        }
        else {
            await Todo.findByIdAndUpdate(todoId, updatedTodo)
            const newTodo = await Todo.findById(todoId)
            res.json({ "updated": newTodo })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const deleteTask = async (req, res) => {
    try {
        const todoId = req.params.id;
        const delTodo = await Todo.deleteOne({ userId: req.user.id, _id: todoId });
        res.json({ deleted: delTodo });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}
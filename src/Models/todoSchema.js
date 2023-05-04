const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Please add the todo title"]
    },
    description: {
        type: String,
        require: [true, "Please add the todo description"]
    },
    priority: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    }
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema);
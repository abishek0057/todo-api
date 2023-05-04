const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"]
    },
    email: {
        type: String,
        require: [true, "Please add the user email"],
        unique: [true, "User with this email already exists"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        require: [true, "Please add the user password"],
    },
})

module.exports = mongoose.model("User", userSchema);
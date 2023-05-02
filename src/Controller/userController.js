const User = require('../Models/userSchema');
const { validatePassword, hashPassword } = require('../utils/hashPassword')

const userSignUp = async (req, res) => {
    try {
        const userExist = await User.exists({ email: req.body.email })
        if (userExist) {
            res.status(409).json({ message: "email already exist", emailExists: true })
        }
        else {
            const password = await hashPassword(req.body.password);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: password
            })
            const result = await newUser.save();
            res.status(201).json({ "newuser": result })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const userLogIn = async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email })
        if (user.length === 1) {
            const hashedPassword = user[0].password;
            const validPassword = await validatePassword(req.body.password, hashedPassword)
            if (validPassword) {
                res.send("you are logged in")
            } else {
                res.status(404).json({ message: "Invalid Password", invalidPassword: true })
            }
        }
        else {
            res.status(401).json({ message: "Invalid ", noUser: true })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { userSignUp, userLogIn }
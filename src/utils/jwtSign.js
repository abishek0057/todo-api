const jwt = require('jsonwebtoken')

const jwtAccessToken = (email, id) => {
    const token = jwt.sign({
        user: {
            email,
            id
        },
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30d' })
    return token;
}

module.exports = { jwtAccessToken };
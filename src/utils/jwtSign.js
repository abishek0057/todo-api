const jwt = require('jsonwebtoken')

const jwtAccessToken = (email, id) => {
    const token = jwt.sign({
        user: {
            email,
            id
        },
    },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: '30d' })
    return token;
}

module.exports = { jwtAccessToken };
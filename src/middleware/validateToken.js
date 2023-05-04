const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "User is not authorized", unauthorized: true });
            }
            else {
                req.user = decoded.user;
                next();
            }
        })
    } else {
        res.status(401).json({ message: "No authentication header provided", unauthorized: true });
    }
}

module.exports = { validateToken }
const express = require('express');
const router = express.Router();
const { userSignUp, userLogIn, currentUser } = require('../Controller/userController');
const { validateToken } = require('../middleware/validateToken');

router.post('/signup', userSignUp)
router.post('/login', userLogIn)
router.get('/current', validateToken, currentUser)

module.exports = router;
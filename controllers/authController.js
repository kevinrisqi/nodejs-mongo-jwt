const User = require('../models/User');
const validation = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login = async (req, res, next) => {
    const {error, value} = validation.loginValidation(req.body);
    if (error) return res.send(400, error.details[0].message)

    // Checking if the user is already in the database
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.send(400, 'Email or password is wrong')

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.send(400, 'Invalid email or password');

    const token = jwt.sign({_id: user._id, name: user.name}, process.env.TOKEN_SECRET)
    res.header('auth-token', token)

    res.send(200, token);

    next();
}

const verifyToken = async (req, res, next) => {
    const token = req.header('auth-token');
    // console.log(token)
    if (!token) return res.send(401, 'Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        // res.send('Authorized')
        next()
    } catch (error) {
        res.send(400, 'Invalid Token')
    }
}

module.exports = {
    login,
    verifyToken
}
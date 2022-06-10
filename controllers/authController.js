const User = require('../models/User');
const validation = require('../validation');
const bcrypt = require('bcryptjs');

const login = async (req, res, next) => {
    const {error, value} = validation.loginValidation(req.body);
    if (error) return res.send(400, error.details[0].message)

    // Checking if the user is already in the database
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.send(400, 'Email or password is wrong')

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.send(400, 'Invalid email or password');

    res.send(200, 'Logged In');

    next()
}

module.exports = {
    login
}
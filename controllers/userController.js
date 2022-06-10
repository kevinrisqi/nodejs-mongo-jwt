const User = require('../models/User');


const insertUser = async (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(201, savedUser);
        console.log(savedUser);
        next();
    } catch (error) {
        res.send(400, error);
    }
}

module.exports = {
    insertUser,
}
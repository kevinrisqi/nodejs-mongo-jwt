const User = require('../models/User');
const validation = require('../validation');
const Joi = require('@hapi/joi');

const schemaUser = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(6).required(),
});


const insertUser = async (req, res, next) => {

    const { error, value } = validation.registerValidation(req.body);
    if (error) return res.send(400, error.details[0].message)
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(201, savedUser);
        // console.log(savedUser);
        next();
    } catch (error) {
        res.send(400, error);
    }
}

module.exports = {
    insertUser,
}
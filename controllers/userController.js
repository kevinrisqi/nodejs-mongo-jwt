const User = require('../models/User');
const validation = require('../validation');
const bcrypt = require('bcryptjs');


const insertUser = async (req, res, next) => {

    // Validation
    const { error, value } = validation.registerValidation(req.body);
    if (error) return res.send(400, error.details[0].message);

    // Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.send(400, 'Email already exist')
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Creater new a user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send(201, savedUser);
        next();
    } catch (error) {
        res.send(400, error);
    }
}

module.exports = {
    insertUser,
}
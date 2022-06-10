const Joi = require('@hapi/joi');

const registerValidation = (data) => {

    const schemaUser = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schemaUser.validate(data);
}


module.exports = {
    registerValidation,
}
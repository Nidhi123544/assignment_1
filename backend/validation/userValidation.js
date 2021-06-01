const Joi = require('joi');


const userObject = (body) => {
    const schema = {
        displayName: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().min(10).required(),
        password: Joi.string().max(25).required(),
        confirmPassword: Joi.string().max(225).required(),
    }
    return Joi.validate(body, schema);
}

module.exports = { userObject };
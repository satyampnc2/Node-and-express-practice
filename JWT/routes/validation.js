const Joi = require('@hapi/joi');
const e = require('express');

const registerSchema = {
    name : Joi.string().min(5).required(),
    email : Joi.string().min(5).required().email(),
    password : Joi.string().min(5).required()
};

const loginSchema = {
    email : Joi.string().min(5).required().email(),
    password : Joi.string().min(5).required()
};

const registerValidation = (data) => {
    const {error} = Joi.validate(data,registerSchema);
    return error;
}

const loginValidation = (data) => {
    const {error} = Joi.validate(data,loginSchema);
    return error;
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;


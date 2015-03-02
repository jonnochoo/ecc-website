var Joi = require('joi');

var schema = {
    message: Joi.string().min(1).max(1000).required(),
    name: Joi.string().min(1).max(40).required(),
    from: Joi.string().email()
};

module.exports = schema;
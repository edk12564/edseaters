const Joi = require('joi');

const restaurantSchema = Joi.object({
    restaurant: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required(),
    }).required()
});

module.exports = restaurantSchema;
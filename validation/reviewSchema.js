const BaseJoi = require('joi');
const extension = require('./sanitizeHTML');

// Adds to Joi to sanitize fields we need using sanitizeHTML.
const Joi = BaseJoi.extend(extension);

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
});

module.exports = reviewSchema;


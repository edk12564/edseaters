const BaseJoi = require('joi');
const extension = require('./sanitizeHTML');

// Adds to Joi to sanitize fields we need using sanitizeHTML.
const Joi = BaseJoi.extend(extension);

const restaurantSchema = Joi.object({
    restaurant: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
    }).required(),
    // For deleting images from Cloudinary. This will hold a value if deleteImage is selected in the edit form. The value is the path for the image to be deleted.
    deleteImages: Joi.array()
});

module.exports = restaurantSchema;
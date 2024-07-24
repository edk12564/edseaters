const Joi = require('joi');

const restaurantSchema = Joi.object({
    restaurant: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required(),
    }).required(),
    // For deleting images from Cloudinary. This will hold a value if deleteImage is selected in the edit form. The value is the path for the image to be deleted.
    deleteImages: Joi.array()
});

module.exports = restaurantSchema;
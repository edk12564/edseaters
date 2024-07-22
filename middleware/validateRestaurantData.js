// Validate with Joi. We can use the restaurantSchema from our validation folder to validate restaurant creates and edits below.
const ExpressError = require('../utils/ExpressError');
const restaurantSchema = require('../validation/restaurantSchema');

const validateRestaurantData = (req, res, next) => {
    const { error } = restaurantSchema.validate(req.body);
    if(error) {
        // error.details gives an array of messages, so we map then join to get them in one string
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports = validateRestaurantData;
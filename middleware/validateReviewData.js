// Validation function for reviews
const ExpressError = require('../utils/ExpressError');
const reviewSchema = require('../validation/reviewSchema');

const validateReviewData = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports = validateReviewData;
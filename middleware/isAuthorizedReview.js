// Prevent hackers from using Postman to delete or update a restaurant entry for reviews.
const Review = require('../models/review');

const isAuthorized = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to update a review you didnt post.')
        return res.redirect(`/restaurants/${id}`)
    }
    next();
}

module.exports = isAuthorized;

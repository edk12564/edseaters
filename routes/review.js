// Review Routing

const express= require('express');
// Merge our params so we get access to the restaurant id from our app.js file.
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const Restaurant = require('../models/restaurant');
const validateReviewData = require('../middleware/validateReviewData');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAuthorizedReview = require('../middleware/isAuthorizedReview');



// Create
router.post('/', isLoggedIn, isAuthorizedReview, validateReviewData, catchAsync(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    restaurant.reviews.push(review);
    await review.save();
    await restaurant.save();
    req.flash('success', 'Your review has been submitted!');
    res.redirect(`/restaurants/${restaurant.id}`);
}))

// Read is in the same page as Restaurant

// Update is not implemented yet.

// Delete
// Route like this so we can get the id and reviewId for deletion.
router.delete('/:reviewId', isLoggedIn, isAuthorizedReview, catchAsync(async(req, res) => {
    const { id, reviewId } = req.params;
    const restaurant = await Restaurant.findById(id);
    const review = await Review.findById(reviewId);
    // Mongo code to pull and delete the item you specified
    await Restaurant.findByIdAndUpdate(id, {$pull: { reviews: reviewId }})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Your review has been deleted successfully!');
    res.redirect(`/restaurants/${id}`);
}))



module.exports = router;
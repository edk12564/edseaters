const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    restaurant.reviews.push(review);
    await review.save();
    await restaurant.save();
    req.flash('success', 'Your review has been submitted!');
    res.redirect(`/restaurants/${restaurant.id}`);
};

// Route like this so we can get the id and reviewId for deletion.
module.exports.deleteReview = async(req, res) => {
    const { id, reviewId } = req.params;
    const restaurant = await Restaurant.findById(id);
    const review = await Review.findById(reviewId);
    // Mongo code to pull and delete the item you specified
    await Restaurant.findByIdAndUpdate(id, {$pull: { reviews: reviewId }})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Your review has been deleted successfully!');
    res.redirect(`/restaurants/${id}`);
};
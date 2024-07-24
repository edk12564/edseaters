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
const reviewController = require('../controllers/reviews');



// Create
router.post('/', isLoggedIn, isAuthorizedReview, validateReviewData, catchAsync(reviewController.createReview));

// Delete
router.delete('/:reviewId', isLoggedIn, isAuthorizedReview, catchAsync(reviewController.deleteReview));



module.exports = router;
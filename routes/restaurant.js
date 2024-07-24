// Restaurant Routing

const express= require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurant');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAuthorized = require('../middleware/isAuthorized');
const validateRestaurantData = require('../middleware/validateRestaurantData');
const restaurantController = require('../controllers/restaurants');



// Index/Create
router.route('/')
    .get(catchAsync(restaurantController.index))
    .post(isLoggedIn, validateRestaurantData, catchAsync(restaurantController.createRestaurant))

// New
router.get('/new', isLoggedIn, restaurantController.renderNewForm);

// Edit
router.get('/:id/edit', isLoggedIn, isAuthorized, catchAsync(restaurantController.renderEditForm));

// Show/Update/Delete
router.route('/:id')
    .get(catchAsync(restaurantController.showRestaurant))
    .put(isLoggedIn, isAuthorized, validateRestaurantData, catchAsync(restaurantController.updateRestaurant))
    .delete(isLoggedIn, isAuthorized, catchAsync(restaurantController.delete))



module.exports = router;
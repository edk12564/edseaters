// Restaurant Routing

const express= require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurant');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAuthorized = require('../middleware/isAuthorized');
const validateRestaurantData = require('../middleware/validateRestaurantData');



// Index
router.get('/', catchAsync(async (req, res) => {
    const restaurants = await Restaurant.find({})
    res.render('restaurants/index', { restaurants });
}))

// New
router.get('/new', isLoggedIn, (req, res) => {
    res.render('restaurants/new');
})

// Create
router.post('/', isLoggedIn, validateRestaurantData, catchAsync(async (req, res) => {
    // We do req.body.restaurant because we formatted our new.ejs form to hold information in an object.
    const newRestaurant = new Restaurant(req.body.restaurant);
    newRestaurant.author = req.user._id;
    await newRestaurant.save()
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`restaurants/${newRestaurant._id}`);
}))

// Show
router.get('/:id', catchAsync(async (req, res) => {
    const id = req.params.id;
    // Populate the reviews and author ObjectIds. Also populate the author in the reviews object.
    const restaurant = await Restaurant.findById(id).populate({
        path: 'reviews', populate: {path: 'author'}
    }).populate('author');
    // So if someone accesses an id that does not exist
    if(!restaurant) {
        req.flash('error', 'Cannot find that restaurant!');
        res.redirect('/restaurants');
    }
    res.render('restaurants/show', { restaurant });
}))

// Edit
router.get('/:id/edit', isLoggedIn, isAuthorized, catchAsync(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    if(!restaurant) {
        req.flash('error', 'Cannot find that restaurant!');
        res.redirect('/restaurants');
    }
    res.render('restaurants/edit', {restaurant});
}))

// Update
router.put('/:id', isLoggedIn, isAuthorized, validateRestaurantData, catchAsync(async (req, res) => {
    const id = req.params.id;
    await Restaurant.findByIdAndUpdate(id, {...req.body.restaurant});
    req.flash('success', 'Successfully updated your restaurant!');
    res.redirect(`/restaurants/${id}`);
}))

// Delete
router.delete('/:id', isLoggedIn, isAuthorized, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Restaurant.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted your restaurant!');
    res.redirect('/restaurants');
}))



module.exports = router;
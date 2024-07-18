// Restaurant Routing

const express= require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Restaurant = require('../models/restaurant');
const restaurantSchema = require('../validation/restaurantSchema');




// Validate with Joi. We can use the restaurantSchema from our validation folder to validate restaurant creates and edits below.
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



// Index
router.get('/', catchAsync(async (req, res) => {
    const restaurants = await Restaurant.find({})
    res.render('restaurants/index', { restaurants });
}))

// New
router.get('/new', (req, res) => {
    res.render('restaurants/new');
})

// Create
router.post('/', validateRestaurantData, catchAsync(async (req, res) => {
    // We do req.body.restaurant because we formatted our new.ejs form to hold information in an object.
    const newRestaurant = new Restaurant(req.body.restaurant);
    await newRestaurant.save()
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`restaurants/${newRestaurant._id}`);
}))

// Show
router.get('/:id', catchAsync(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id).populate('reviews');
    // So if someone accesses an id that does not exist
    if(!restaurant) {
        req.flash('error', 'Cannot find that restaurant!');
        res.redirect('/restaurants');
    }
    res.render('restaurants/show', { restaurant });
}))

// Edit
router.get('/:id/edit', catchAsync(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    if(!restaurant) {
        req.flash('error', 'Cannot find that restaurant!');
        res.redirect('/restaurants');
    }
    res.render('restaurants/edit', {restaurant});
}))

// Update
router.put('/:id', validateRestaurantData, catchAsync(async (req, res) => {
    const id = req.params.id;
    await Restaurant.findByIdAndUpdate(id, {...req.body.restaurant});
    req.flash('success', 'Successfully updated your restaurant!');
    res.redirect(`/restaurants/${id}`);
}))

// Delete
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Restaurant.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted your restaurant!');
    res.redirect('/restaurants');
}))

module.exports = router;
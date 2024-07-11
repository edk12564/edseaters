// Imports
const express= require('express');
const app = express();
const path =require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const Joi = require('joi');

// Import the restaurant model from /models/restaurant.js
const Restaurant = require('./models/restaurant');

// Import the catchAsync function from /utils/catchAsync.js
const catchAsync = require('./utils/catchAsync');

// Import ExpressError class from /utils/ExpressError.js
const ExpressError = require('./utils/ExpressError');

// Import restaurantSchema for validation (Joi)
const restaurantSchema = require('./validation/restaurantSchema');



// Connect to Mongoose Server
mongoose.connect('mongodb://127.0.0.1:27017/edseats')
    .then(function a() {
        console.log("Database is working...");
    })
    .catch(function(error) {
        console.log("Database connection failed");
        console.log(error);
    })

// Connect the views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// Setup EJS Mate engine for parsing EJS. 
app.engine('ejs', engine);



// Middleware

// Parses the body of POST requests to allow for access
app.use(express.urlencoded({extended: true}));
// Allows for method override in templates so that PUT/PATCH/DELETE requests can be sent
app.use(methodOverride('_method'));



// Validate with Joi. We can use the restaurantSchema from our validation folder to validate restaurant creates and edits below.
const validateRestaurantData = (req, res, next) => {
    const { error } = restaurantSchema.validate(req.body);
    if(error) {
        // error.message gives an array of messages, so we map then join to get them in one string
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}



// Routing work

// Home
app.get('/', (req, res) => {
    res.render('home');
})

// Some random get route that makes a sample document
app.get('/makerestaurant', validateRestaurantData, catchAsync(async (req, res) => {
    const restaurant = new Restaurant({
        title: 'Marufuku Ramen',
        price: '$',
        description: "Famous ramen shop comes to Frisco, TX of all places. It's quite good considering the alternatives for ramen in the DFW metroplex."
    })
    await restaurant.save();
    res.send('Placeholder for restaurant just added');
}))

// Index
app.get('/restaurants', catchAsync(async (req, res) => {
    const restaurants = await Restaurant.find({})
    res.render('restaurants/index', { restaurants });
}))

// New
app.get('/restaurants/new', (req, res) => {
    res.render('restaurants/new');
})

// Create
app.post('/restaurants', validateRestaurantData, catchAsync(async (req, res) => {
    // We do req.body.restaurant because we formatted our new.ejs form to hold information in an object.
    const newRestaurant = new Restaurant(req.body.restaurant);
    await newRestaurant.save()
    res.redirect(`restaurants/${newRestaurant._id}`);
}))

// Show
app.get('/restaurants/:id', catchAsync(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    res.render('restaurants/show', { restaurant });
}))

// Edit
app.get('/restaurants/:id/edit', catchAsync(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    res.render('restaurants/edit', {restaurant});
}))

// Update
app.put('/restaurants/:id', validateRestaurantData, catchAsync(async (req, res) => {
    const id = req.params.id;
    await Restaurant.findByIdAndUpdate(id, {...req.body.restaurant});
    res.redirect(`/restaurants/${id}`)
}))

// Delete
app.delete('/restaurants/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Restaurant.findByIdAndDelete(id);
    res.redirect('/restaurants');
}))

// Invalid Route
app.all('*', (req, res, next) => {
    return next(new ExpressError('Page Not Found', 404));
})



// Basic Error Handling Middleware
app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if(!err.message) err.message = 'Oh No, Something went Wrong!'
    res.status(status).render('error', { err });
})



// Start the server
app.listen(3000, () => {
    console.log('Serving on port 3000');
})
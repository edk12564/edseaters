// This is an app that __.




// Imports
const express= require('express');
const app = express();
const path =require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');

// Import the restaurant model from /models/restaurant.js
const Restaurant = require('./models/restaurant');
// Import review model from /models/revew.js
const Review = require('./models/review');
// Import the catchAsync function from /utils/catchAsync.js
const catchAsync = require('./utils/catchAsync');
// Import ExpressError class from /utils/ExpressError.js
const ExpressError = require('./utils/ExpressError');
// Import restaurantSchema for restaurant validation (Joi)
const restaurantSchema = require('./validation/restaurantSchema');
// Import restaurantSchema for review validation (Joi)
const reviewSchema = require('./validation/reviewSchema');
// Import routes from ./routes/restaurants.js
const restaurantRoutes = require('./routes/restaurants');
// Import routes from ./routes/reviews.js
const reviewRoutes = require('./routes/reviews');



// Connect to Mongoose Server
mongoose.connect('mongodb://127.0.0.1:27017/edseats')

// This replaces the then/catch logic before.
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})



// Miscellanous Middleware

// Connect the views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
// Setup EJS Mate engine for parsing EJS. 
app.engine('ejs', engine);
// Parses the body of POST requests to allow for access
app.use(express.urlencoded({extended: true}));
// Allows for method override in templates so that PUT/PATCH/DELETE requests can be sent
app.use(methodOverride('_method'));
// Setup static directory in public
app.use(express.static(path.join(__dirname, 'public')));



// Session/Statefulness

// Session configs
const sessionConfig = {
    // Make this secret better later.
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    // store: mongo store implement later.
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

}

// Implement the session
app.use(session(sessionConfig));

// Implement flash alerts
app.use(flash());

// Flash middleware to auto apply to routes once flash has been defined.
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



// Routing

// Restaurant routes
app.use('/restaurants', restaurantRoutes);

// Review routes
app.use('/restaurants/:id/reviews', reviewRoutes);

// Home
app.get('/', (req, res) => {
    res.render('home');
})

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
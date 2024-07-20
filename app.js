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
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Import the restaurant model from /models/restaurant.js
const Restaurant = require('./models/restaurant');
// Import review model from /models/revew.js
const Review = require('./models/review');
// Import user model from /models/user.js
const User = require('./models/user');

// Import the catchAsync function from /utils/catchAsync.js
const catchAsync = require('./utils/catchAsync');
// Import ExpressError class from /utils/ExpressError.js
const ExpressError = require('./utils/ExpressError');

// Import restaurantSchema for restaurant validation (Joi)
const restaurantSchema = require('./validation/restaurantSchema');
// Import restaurantSchema for review validation (Joi)
const reviewSchema = require('./validation/reviewSchema');
// Import userSchema for review validation
// Do later

// Import routes from ./routes/restaurants.js
const restaurantRoutes = require('./routes/restaurant');
// Import routes from ./routes/reviews.js
const reviewRoutes = require('./routes/review');
// Import route from ./routes/users.js
const userRoutes = require('./routes/user'); 





// Connect to Mongoose Server
mongoose.connect('mongodb://127.0.0.1:27017/edseats')

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



// Authentication

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

// Lets initialize passport
app.use(passport.initialize());
// Lets setup a passport session so we can keep the user logged in
app.use(passport.session());
// Lets use passport to setup full authentication in our User model
passport.use(new LocalStrategy(User.authenticate()))
// // Lets put the user informaiton into the session so that they can login and stay logged in. And allow passport to interpret this information.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash middleware to auto apply to routes once flash has been defined. Also parsed user information from the session.
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



// Routes

// User routes
app.use('/', userRoutes);

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
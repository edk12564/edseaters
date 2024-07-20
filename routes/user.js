// User Routing

const express= require('express');
// Merge our params so we get access to the restaurant id from our app.js file.
const router = express.Router({ mergeParams: true });
const User = require('../models/user');
const userSchema = require('../validation/userSchema');
const passport = require('passport');
const storeReturnTo = require('../middleware/storeReturnTo');



// // Validation function for reviews
// const validateReviewData = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if(error) {
//         const msg = error.details.map(el => el.message).join(',');
//         throw new ExpressError(msg, 400);
//     }
//     else {
//         next();
//     }
// }



// Register
router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome to edseats!');
            res.redirect('/restaurants');
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
})

// Login
router.get('/login', (req, res) => {
    res.render('auth/login');
})

// For the authentication step, we can use Passport middleware
router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/restaurants';
    res.redirect(redirectUrl);
})

// Logout
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/restaurants');
    });
}); 

module.exports = router;
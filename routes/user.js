// User Routing

const express= require('express');
// Merge our params so we get access to the restaurant id from our app.js file.
const router = express.Router({ mergeParams: true });
const User = require('../models/user');
const userSchema = require('../validation/userSchema');
const passport = require('passport');
const storeReturnTo = require('../middleware/storeReturnTo');
const userController = require('../controllers/users');



// Register
router.route('/register')
    .get(userController.renderRegister)
    .post(userController.register);

// Login
router.route('/login')
    .get(userController.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.login);

// Logout
router.get('/logout', userController.logout); 



module.exports = router;
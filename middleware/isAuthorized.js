// Prevent hackers from using Postman to delete or update a restaurant entry.
const Restaurant = require('../models/restaurant');

const isAuthorized = async (req, res, next) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if(!restaurant.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to update a restaurant you didnt post.')
        return res.redirect(`/restaurants/${id}`)
    }
    next();
}

module.exports = isAuthorized;

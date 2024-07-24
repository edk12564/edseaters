const Restaurant = require('../models/restaurant');

module.exports.index = async (req, res) => {
    const restaurants = await Restaurant.find({})
    res.render('restaurants/index', { restaurants });
};

module.exports.renderNewForm = (req, res) => {
    res.render('restaurants/new');
};

module.exports.createRestaurant = async (req, res) => {
    // We do req.body.restaurant because we formatted our new.ejs form to hold information in an object.
    const newRestaurant = new Restaurant(req.body.restaurant);
    newRestaurant.author = req.user._id;
    await newRestaurant.save()
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`restaurants/${newRestaurant._id}`);
};

module.exports.showRestaurant = async (req, res) => {
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
};

module.exports.renderEditForm = async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    if(!restaurant) {
        req.flash('error', 'Cannot find that restaurant!');
        res.redirect('/restaurants');
    }
    res.render('restaurants/edit', {restaurant});
};

module.exports.updateRestaurant = async (req, res) => {
    const id = req.params.id;
    await Restaurant.findByIdAndUpdate(id, {...req.body.restaurant});
    req.flash('success', 'Successfully updated your restaurant!');
    res.redirect(`/restaurants/${id}`);
};

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await Restaurant.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted your restaurant!');
    res.redirect('/restaurants');
};
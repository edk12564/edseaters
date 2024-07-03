// Imports
const express= require('express');
const app = express();
const path =require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Import the restaurant model from /models/restaurant.js
const Restaurant = require('./models/restaurant');





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





// Middleware

// Parses the body of POST requests to allow for access
app.use(express.urlencoded({extended: true}));
// Allows for method override in templates so that PUT/PATCH/DELETE requests can be sent
app.use(methodOverride('_method'));





// Routing work

// Home
app.get('/', (req, res) => {
    res.render('home');
})

// Some random get route that makes a sample document
app.get('/makerestaurant', async (req, res) => {
    const restaurant = new Restaurant({
        title: 'Marufuku Ramen',
        price: '$',
        description: "Famous ramen shop comes to Frisco, TX of all places. It's quite good considering the alternatives for ramen in the DFW metroplex."
    })
    await restaurant.save();
    res.send('Placeholder for restaurant just added');
})

// Index
app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find({})
    res.render('restaurants/index', { restaurants });
})

// New
app.get('/restaurants/new', (req, res) => {
    res.render('restaurants/new');
})

// Create
app.post('/restaurants', async (req, res) => {
    // We do req.body.restaurant because we formatted our new.ejs form to hold information in an object.
    const newRestaurant = new Restaurant(req.body.restaurant);
    await newRestaurant.save()
    res.redirect(`restaurants/${newRestaurant._id}`);
})

// Show
app.get('/restaurants/:id', async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    res.render('restaurants/show', { restaurant });
})

// Edit
app.get('/restaurants/:id/edit', async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    res.render('restaurants/edit', {restaurant});
})

// Update
app.put('/restaurants/:id', async (req, res) => {
    const id = req.params.id;
    await Restaurant.findByIdAndUpdate(id, {...req.body.restaurant});
    res.redirect(`/restaurants/${id}`)
})

// Delete
app.delete('/restaurants/:id', async (req, res) => {
    const { id } = req.params;
    await Restaurant.findByIdAndDelete(id);
    res.redirect('/restaurants');
})




// Start the server
app.listen(3000, () => {
    console.log('Serving on port 3000');
})
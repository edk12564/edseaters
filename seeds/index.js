// A seeder. We will run this program whenever we want to seed our database.





// Copied from the master index.js

// Imports
const express= require('express');
const app = express();
const path =require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Import the restaurant model from /models/restaurant.js
const Restaurant = require('../models/restaurant');

// Connect to Mongoose Server
mongoose.connect('mongodb://127.0.0.1:27017/edseats')
    .then(function a() {
        console.log("Database is working...");
    })
    .catch(function(error) {
        console.log("Database connection failed");
        console.log(error);
    })





// Import the seed and seedHelper
const cities = require('./cities');
const {places, descriptors } = require('./seedHelpers');

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

// Write a function to empty the database and fill it with random entries
const seedDB = async() => {
    await Restaurant.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randCity = sample(cities);
        const entry = new Restaurant({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${randCity.city}, ${randCity.state}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dwexbbnm6/image/upload/v1721829643/edseats/exxy4eorfwwc605g6txq.jpg',
                  filename: 'edseats/exxy4eorfwwc605g6txq',
                }
              ],
            description: 'No description',
            price: 0.00,
            author: "669b27067307e96de4a55978"
        })
        await entry.save();
    }
}

// Call the function you wrote
seedDB();
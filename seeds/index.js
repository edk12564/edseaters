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

//  If not in prod, load the environment variables
if(process.env.NODE_ENV!== "production") {
    require('dotenv').config();
}



// // Import the seed and seedHelper
// const cities = require('./cities');
// const {places, descriptors } = require('./seedHelpers');

// const sample = (array) => {
//     return array[Math.floor(Math.random() * array.length)]
// }

// // Write a function to empty the database and fill it with random entries
// const seedDB = async() => {
//     await Restaurant.deleteMany({});
//     for (let i = 0; i < 50; i++) {
//         const randCity = sample(cities);
//         const entry = new Restaurant({
//             title: `${sample(descriptors)} ${sample(places)}`,
//             location: `${randCity.city}, ${randCity.state}`,
//             images: [
//                 {
//                   url: 'https://res.cloudinary.com/dwexbbnm6/image/upload/v1721829643/edseats/exxy4eorfwwc605g6txq.jpg',
//                   filename: 'edseats/exxy4eorfwwc605g6txq',
//                 }
//               ],
//             description: 'No description',
//             price: 0.00,
//             author: "669b27067307e96de4a55978",
//             geometry: {
//                 type: 'Point',
//                 coordinates: [-96.79,32.77]
//             }
//         })
//         await entry.save();
//     }
// }

// Lets use restaurant data instead of campground data
const restaurants = require('./restaurants')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mbxToken });


// Eventually I want to add more restaurants beyond just Dallas. That way we can have a cool cluster map showing all around the world.
const seedDB = async() => {
    await Restaurant.deleteMany({});
    for (let i = 0; i < restaurants.length; i++) {
        let geoData = await geocoder.forwardGeocode({
            query: restaurants[i].address,
            limit: 1
        }).send()
        const entry = new Restaurant({
            title: restaurants[i].name,
            location: restaurants[i].address,
            images: [
                {
                  url: 'https://images.unsplash.com/photo-1523218475566-ea0db0c23067?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGRpc2h8ZW58MHx8MHx8fDA%3D',
                  filename: 'edseats/exxy4eorfwwc605g6txb',
                }
              ],
            description: restaurants[i].description,
            price: restaurants[i].price,
            author: "669b27067307e96de4a55978",
            geometry: geoData.body.features[0].geometry
        })
        await entry.save();
    }
}

// Call the function you wrote
seedDB();
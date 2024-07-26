// Set up the Restaurant Model and export
const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

// We use a virtual here to keep the request lightweight. This prevents us from storing an extra thumbnail pointer in the database. We are replacing the /upload in the image url to /upload/w_200. This is because cloudinary adjusts images like this using the url.
ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
})

// This is how we keep virtuals when we JSON.stringify. We need this to access for map functionality.
const opts = { toJSON: { virtuals: true } };

const RestaurantSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    geometry: {
        type: {
          type: String, 
          enum: ['Point'], 
        },
        coordinates: {
          type: [Number],
        }
    }
}, opts);



// Virtual to access property for easy geodata information access.
RestaurantSchema.virtual('properties.popUpMarkup').get(function() {
    return `
    <h4>${this.title}</h2>
    <p>${this.description.substring(0,100)}...</p>
    <strong><a href="/restaurants/${this._id}">View Restaurant</a></strong>
    `
})



// Middleware for Restaurant.findOneAndDelete().
RestaurantSchema.post('findOneAndDelete', async function (restaurant) {
    if (restaurant.reviews) {
        await review.deleteMany({
            _id: {
                $in: restaurant.reviews
            }
        })
    }
})



module.exports = mongoose.model('Restaurant', RestaurantSchema);
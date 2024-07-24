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
    }
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
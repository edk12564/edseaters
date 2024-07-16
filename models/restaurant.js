// Set up the Restaurant Model and export
const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})



restaurantSchema.post('findOneAndDelete', async function (restaurant) {
    if (restaurant.reviews) {
        await review.deleteMany({
            _id: {
                $in: restaurant.reviews
            }
        })
    }
})



module.exports = mongoose.model('Restaurant', restaurantSchema);
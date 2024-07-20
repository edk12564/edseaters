// Set up the User Model and export
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

// Passport will automatically add on a username and password key to the user schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
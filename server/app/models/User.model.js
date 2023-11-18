const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 6,
    },
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    birthday: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
    

})

const User = mongoose.model('User', UserSchema);

module.exports = { User };
const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    name: {
        type: String,
        required: true,
        maxLength: 70,
    },
    address: {
        type: String,
        maxLength: 70,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date
    },
   
    

})

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = { UserInfo };
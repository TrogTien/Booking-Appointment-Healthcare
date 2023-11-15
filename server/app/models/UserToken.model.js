const mongoose = require('mongoose');

const UserTokenSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true
    }
   
    

})

const UserToken = mongoose.model('UserToken', UserTokenSchema);

module.exports = { UserToken };
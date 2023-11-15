const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.URL_MONGODB);
        console.log('Connect Successfully')
    } catch (error) {
        console.log('Connect Failure');
        console.log(error);
    }
}

module.exports = { connect };
const mongoose = require('mongoose');

const RequestDoctorSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true,
        maxLength: 50,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    birthday: {
        type: Date
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
  

})

const RequestDoctor = mongoose.model('RequestDoctor', RequestDoctorSchema);

module.exports = { RequestDoctor };
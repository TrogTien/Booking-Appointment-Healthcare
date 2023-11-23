const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    medicalSpecialty: [String],
    availableTimes: {
        type: [{
            day: Date,
            hours: [String]

        }],
        default: []
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 100000
    },
    isActive: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = { Doctor };
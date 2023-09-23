const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    medicalSpecialty: [String],
    availableTimes: [
        {
            day: Date,
            hours: [String]

        }
    ],

})

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = { Doctor };
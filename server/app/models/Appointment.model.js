const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        maxLength: 50,
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    day: {
        type: Date,
        required: true
    },
    birthday: {
        type: Date
    },
    appointmentTime: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
    },
    status: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    doctorId: {
        type: mongoose.Types.ObjectId,              // _id của collection doctor
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,              // _id của collection user
        required: true
    }
   

}, { timestamps: true})

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = { Appointment };